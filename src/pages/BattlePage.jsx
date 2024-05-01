import React, {useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../styles'
import { useGlobalContext } from '../context'
import Alert from '../components/Alert'
import cardBack from '../assets/images/cardBack.png'

const contactFlask = async (method, endpoint, data1=null) => {
    try {
      const baseURL = 'http://127.0.0.1:5000'; 
      const url = `${baseURL}/${endpoint}`;
        
        const requestOptions = {
            method: method.toUpperCase(), // Convert method to uppercase ('GET' or 'POST')
            headers: {
                'Content-Type': 'application/json',
            },
        };
     if (method === 'POST'){   
            requestOptions['body']=JSON.stringify(data1);
        };
    
  
      const response = await fetch(url, requestOptions);
  
      console.log(`Flask ${method} Response:`, response);
        
    if (!response.ok) {
        throw new Error(`Network response was not ok for ${method} request.`);
      }
      const data2 = await response.json();
      console.log(`Data received from Flask server (${method} request):`, data2);
      return data2;

    } catch (error) {
      console.error(`Error contacting Flask server (${method} request):`, error);
      throw error; 
    }
  };

const BattlePage = () => {
    const { confirmedCards,setConfirmedCards, showAlert, setShowAlert, confirmedCardsStats, setConfirmedCardsStats, walletAddress, contract } = useGlobalContext();
    const { battlename } = useParams();
    const [clickedIndex, setClickedIndex] = useState(null);
    const [selectedValue, setSelectedValue] = useState("select stat");
    const [clickedCardStat, setClickedCardStat] = useState({});
    const [clickedCard, setClickedCard] = useState('');
    const [clickedStat, setClickedStat] = useState('');
    const [toss, setToss] = useState(true);
    const [play, setPlay] = useState(false);
    const [role, setRole] = useState(null); // player1 or player2
    const [receivedStat, setReceivedStat] = useState('');
    const navigate = useNavigate();
    var intervalId;
    var intervalIdGetStat;
    var intervalIdGetWinner;
    const [modal, setModal] = useState(false);

    useEffect(() => {
        if (Object.keys(confirmedCards).length == 0) {
            setShowAlert({
                status: true,
                type: 'success',
                message: "Battle completed successfully!",
                });
          const timeoutId = setTimeout(() => {
            navigate('/arena/tiger');
          }, 10000); 
          return () => {clearTimeout(timeoutId);clearInterval(intervalIdGetStat)};
        }
      }, [confirmedCards, navigate]);

    const handleContainerClick = (index, key) => {
      setClickedIndex(index === clickedIndex ? null : index);
      const temp = confirmedCardsStats[key];
      console.log("key: ",key, confirmedCardsStats);
      setClickedCardStat(temp);
      setClickedCard(key);
      console.log("clickedCardStat: ", clickedCardStat);
      console.log("clickedCard:", clickedCard);
    };

    const handleCall = async () =>{
        if (role == false){
            setClickedStat(receivedStat);
        }
        console.log("Clicked Card",clickedCard);
        console.log("Clicked Stat:", clickedStat);
        console.log("Selected value:", selectedValue);

        try{
            const data = {
                'ipfs_link': clickedCard,
                'input_string': clickedStat,
                'address': walletAddress
            };
          
            const response = await contactFlask('POST', 'game_handler', data);
        
            console.log('Response from backend:', response);
            if (response.message !== "Your input has been received."){
                handleCall();
            }
            else{
                intervalIdGetWinner = setInterval(fetchWinner, 5000);
            }
        }
        catch(error){
            console.error('Error:', error);
        }
    }
    const handleTransfer = (selectedCards) =>{
        selectedCards.forEach(async (key) => {
          try {
              await contract.transferCardFromContract(walletAddress, key); // Assuming `receiverAddress` is defined elsewhere
              console.log(`Transferred card with key ${key} successfully.`);              
          } catch (error) {
              console.error(`Error transferring card with key ${key}:`, error);
          }
          finally{
            setTimeout(async() =>{
              const res = await contract.getOwnerOfTokenByName(key);
              console.log('Token Owner: ',res);
            },20000);
          }
        });
      }

    async function fetchWinner() {
        const response = await contactFlask('POST', "get_winner", {"address": walletAddress});
        console.log(response);
        var getWinner = response.message || response.input_string;
        setReceivedStat('');
        setClickedStat('');
        if (response.message != "Waiting for the other player.") {
            setShowAlert({
                status: true,
                type: 'success',
                message: getWinner,
                });
            clearInterval(intervalIdGetWinner);
            if (getWinner === "You are the winner!"){
                const cards = [response.player1_ipfs_link, response.player2_ipfs_link];
                handleTransfer(cards);
            }
            setTimeout(() => {
                if (role==false){
                    setPlay(true);
                }
                else{
                    intervalIdGetStat = setInterval(fetchStat, 5000);
                    setPlay(false);
                }
                
                setRole(!role);
                const updatedConfirmedCards= { ...confirmedCards}
                delete updatedConfirmedCards[response.player1_ipfs_link];
                const updatedConfirmedCardsStats= { ...confirmedCardsStats}
                delete updatedConfirmedCardsStats[response.player1_ipfs_link];

                setConfirmedCards(updatedConfirmedCards); 
                setConfirmedCardsStats(updatedConfirmedCardsStats);
                localStorage.setItem('confirmedCards', JSON.stringify(updatedConfirmedCards));
                localStorage.setItem('confirmedCardsStats', JSON.stringify(confirmedCardsStats));
                
            }, 10000);
                      
        }
    }

    async function fetchStat() {
        const response = await contactFlask('GET', "get_stat");
        console.log(response);
        var getStat = response.message || response.input_string;
        if (response.message != "Waiting for other player."){
            setReceivedStat(getStat);
            clearInterval(intervalIdGetStat);
        }
    }

    const handleToss = async () => {
            const method = 'POST';
            const data = {'address': walletAddress};
            const response = await contactFlask(method, "store_address", data);
            console.log(response);
            setToss(false);
            var getRole='Waiting for other player.';      
            
            async function fetchRole() {
                if (getRole === "Waiting for other player."){
                    getRole = await contactFlask(method, "get_role", data);

                    getRole = getRole.message || getRole.role;
                    // console.log('Role: ',getRole.message);
                }
                else{
                    if (getRole === true){
                        setShowAlert({
                            status: true,
                            type: 'success',
                            message: 'You Won the Toss.',
                          });
                          setPlay(true);
                    }
                    else{
                        setShowAlert({
                            status: true,
                            type: 'success',
                            message: 'You Lost the Toss.',
                          });
                          setPlay(false);
                          intervalIdGetStat = setInterval(fetchStat, 5000);
                    }
                    setRole(getRole);
                    clearInterval(intervalId);
                }
            }
            intervalId = setInterval(fetchRole, 5000);
            
        }
        
    const handlePlay = async () => {
        setPlay(false);
    }
   
    return (
     <div className='w-full h-screen flex flex-col'>     
        {showAlert?.status && <Alert type={showAlert.type} message={showAlert.message} />}
        {/* <h1 className='text-3xl text-slate-950 text-center mb-4'>Battle Page</h1> */}
        <p className='mt-4 text-3xl font-bold text-slate-950 text-center mb-4'>Welcome to the Battle {battlename}</p>
        <div className='flex flex-row h-full w-full'>
            <div className='flex flex-col w-6/12 items-center'>
                <div className={styles.battlePageContainer}>
                {Object.entries(confirmedCards).map(([key, link], index) => (
                    <div 
                        key={key} 
                        className={`${styles.battleCardContainer} ${index === clickedIndex ? styles.clicked : ''}`} 
                        style={{ zIndex: index === clickedIndex ? Object.keys(confirmedCards).length + 1 : Object.keys(confirmedCards).length - index }}
                        onClick={() => handleContainerClick(index, key)}
                    >
                        <img src={link} className={`${styles.cardImg} mb-2`} alt={`Image ${index + 1}`} />
                    </div>
                    ))}
                </div>
                {
                    toss?
                    <button className='text-center rounded-md px-[20px] py-[8px] border-2 ml-4 bg-slate-950 text-white transition-[0.3s] hover:bg-blue-600 hover:border-blue-800'
                            onClick={handleToss}>Toss</button>
                            :role === "Waiting for other player."?
                            <p className='text-xl font-bold text-slate-950'>Waiting for other player.</p>
                            :null
                    
                }
                <div className='flex flex-col'>
                <p className='font-bold text-xl'>{role} </p>
                </div>
                {
                    role && play?
                    <div className='flex flex-col'>
                        <p className='font-bold text-xl'>Your Turn!</p>
                        <div className='flex flex-row items-center justify-center'>
                            {/* <input type="text" placeholder='Number' className='text-slate-950 outline-slate-950 w-24 h-10 p-4 m-4 rounded-md border-[1px] border-slate-950'
                                onChange={(e) => {
                                    if (e.target.value === '' || regex.test(e.target.value)) handleValueChange(e.target.value);
                                  }}/> */}
                            <button className='text-white w-[70px] text-center h-10 m-4 transition-[0.3s] border-2 border-solid border-white bg-slate-950 rounded-md hover:text-black hover:border-slate-950 hover:bg-white'
                                onClick={()=>handlePlay()}>Play</button>
                        </div>
                    </div>
                    :role==true?
                    <div className='flex flex-row p-4 items-center justify-center'>
                        <select
                            name="Traits"
                            id="Traits"
                            className={styles.selectDropdown}
                            value={selectedValue}
                            onChange={(e) => {setSelectedValue(e.target.value); setClickedStat( e.target.selectedOptions[0].getAttribute("stat"));}}
                            >
                            <option className={styles.selectOption} stat="select stat" value="select stat">Select Stat</option>
                            {Object.entries(clickedCardStat).map(([key, value]) => {
                                if (key !== "Name" && key !== "TotalScore" && key !== "image_link") {
                                    const optionValue = `${key}:${value}`;
                                return (
                                    <option key={key} className={styles.selectOption} stat={key} value={value}>
                                    {key}:{value}
                                    </option>
                                );
                                }
                            })}
                        </select>

                        <button className='text-center rounded-md px-[20px] py-[8px] border-2 ml-4 bg-slate-950 text-white transition-[0.3s] hover:bg-blue-600 hover:border-blue-800'
                            onClick={handleCall}>Call</button>
                    </div>
                    :role==false && receivedStat==''?
                    <p className='font-bold text-xl'>Waiting for opponent's move</p>

                    :role==false && receivedStat!=''?
                    
                    <div className='flex flex-col p-4 items-center justify-center'>
                        <p className='font-bold text-xl'>Opponent have chosed {receivedStat}!
                        </p>
                        <div className='flex flex-row p-4 items-center justify-center'>
                        <select
                            name="Traits"
                            id="Traits"
                            className={styles.selectDropdown}
                            value={selectedValue}
                            onChange={(e) => {setSelectedValue(e.target.value); setClickedStat(e.target.selectedOptions[0].getAttribute("stat"));}}
                            >
                            <option className={styles.selectOption} stat="select stat" value="select stat">Select Stat</option>
                            {Object.entries(clickedCardStat).map(([key, value]) => {
                                if (key == receivedStat) {
                                return (
                                    <option key={key} className={styles.selectOption} stat={key} value={value}>
                                    {key}:{value}
                                    </option>
                                );
                                }
                                return null;
                            })}
                        </select>
                        <button className='text-center rounded-md px-[20px] py-[8px] border-2 ml-4 bg-slate-950 text-white transition-[0.3s] hover:bg-blue-600 hover:border-blue-800'
                                onClick={handleCall}>Call</button>
                        </div>
                    </div>
                    :null
                }
                
            </div>
            

            <div className={styles.battlePageContainerFixed}>
            {Object.entries(confirmedCards).map(([key, link]) => (
                <div key={key} className={`${styles.battleCardContainerFixed} `}>
                    <img src={cardBack} className={`w-full h-full object-contain mb-2`} alt={`Image ${key}`} />
                    {/* <button className={`${styles.btn} ${ confirmedCards.hasOwnProperty(key) ? "bg-blue-700 text-white" : "text-white"}`} onClick={() => handleButtonClick(key)}>Select</button> */}
                </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default BattlePage
