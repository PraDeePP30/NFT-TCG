import React, {useState} from 'react'
import { useParams } from 'react-router-dom';
import styles from '../styles'
import { useGlobalContext } from '../context'
import Alert from '../components/Alert'
import cardBack from '../assets/images/cardBack.png'

const contactFlask = async () => {
    try {
      // Define the URL of your Flask server endpoint
      const url = 'http://127.0.0.1:5000/toss'; // Replace with your actual Flask server endpoint
  
      // Make a GET request to the Flask server
      const response = await fetch(url);
      console.log('Flask Response: ',response);
      // Check if the request was successful
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
  
      // Parse the response body as JSON
      const data = await response.json();
  
      // Log or process the received data
      console.log('Data received from Flask server:', data);
  
      // Return the received data (if needed)
      return data;
    } catch (error) {
      // Handle any errors that occurred during the fetch operation
      console.error('Error contacting Flask server:', error);
      throw error; // Optional: rethrow the error to handle it outside this function
    }
  };

const BattlePage = () => {
    const { selectedCards, showAlert, setShowAlert, selectedCardsStats } = useGlobalContext();
    // console.log('SelectedCards:::',selectedCards);
    const { battlename } = useParams();
    const [clickedIndex, setClickedIndex] = useState(null);
    const [selectedValue, setSelectedValue] = useState("select stat");
    const [clickedCardStat, setClickedCardStat] = useState({});
    const [clickedCard, setClickedCard] = useState('');
    const [clickedStat, setClickedStat] = useState('');
    const [toss, setToss] = useState(true);

    const handleContainerClick = (index, key) => {
      setClickedIndex(index === clickedIndex ? null : index);
      const temp = selectedCardsStats[key];
      setClickedCardStat(temp);
      setClickedCard(key);
    };

    const handleCall = () =>{
        console.log("Clicked Card",clickedCard);
        console.log("Clicked Stat:", clickedStat);
        console.log("Selected value:", selectedValue);
    }

    const handleToss = async () => {
        setToss(false);
    }

    return (
    <div className='w-full h-screen flex flex-col'>
        {showAlert?.status && <Alert type={showAlert.type} message={showAlert.message} />}
        {/* <h1 className='text-3xl text-slate-950 text-center mb-4'>Battle Page</h1> */}
        <p className='mt-4 text-3xl font-bold text-slate-950 text-center mb-4'>Welcome to the Battle {battlename}</p>
        <div className='flex flex-row h-full w-full'>
            <div className='flex flex-col w-6/12 items-center'>
                <div className={styles.battlePageContainer}>
                {Object.entries(selectedCards).map(([key, link], index) => (
                    <div 
                        key={key} 
                        className={`${styles.battleCardContainer} ${index === clickedIndex ? styles.clicked : ''}`} 
                        style={{ zIndex: index === clickedIndex ? Object.keys(selectedCards).length + 1 : Object.keys(selectedCards).length - index }}
                        onClick={() => handleContainerClick(index, key)}
                    >
                        <img src={link} className={`${styles.cardImg} mb-2`} alt={`Image ${index + 1}`} />
                    </div>
                    ))}
                </div>
                {
                    toss?
                    <div className='flex flex-col'>
                        <p className='font-bold text-xl'>Click Toss!</p>
                        <div className='flex flex-row items-center justify-center'>
                            {/* <input type="text" placeholder='Number' className='text-slate-950 outline-slate-950 w-24 h-10 p-4 m-4 rounded-md border-[1px] border-slate-950'
                                onChange={(e) => {
                                    if (e.target.value === '' || regex.test(e.target.value)) handleValueChange(e.target.value);
                                  }}/> */}
                            <button className='text-white w-[70px] text-center h-10 m-4 transition-[0.3s] border-2 border-solid border-white bg-slate-950 rounded-md hover:text-black hover:border-slate-950 hover:bg-white'
                                onClick={()=>handleToss()}>Toss</button>
                        </div>
                    </div>
                    :
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
                                if (key !== "Name" && key !== "TotalScore" && key !== "image_link") {
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
                }
                
            </div>
            

            <div className={styles.battlePageContainerFixed}>
            {Object.entries(selectedCards).map(([key, link]) => (
                <div key={key} className={`${styles.battleCardContainerFixed} `}>
                    <img src={cardBack} className={`w-full h-full object-contain mb-2`} alt={`Image ${key}`} />
                    {/* <button className={`${styles.btn} ${ selectedCards.hasOwnProperty(key) ? "bg-blue-700 text-white" : "text-white"}`} onClick={() => handleButtonClick(key)}>Select</button> */}
                </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default BattlePage
