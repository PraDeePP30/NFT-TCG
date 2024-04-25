import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Nav } from '../components'
import styles from '../styles'
import { useGlobalContext } from '../context'
import { CustomButton, CustomInput} from '../components'
import Alert from '../components/Alert'
import { ethers } from 'ethers';

// import Card1 from '../assets/images/00.png'
// import Card2 from '../assets/images/01.png'
// import Card3 from '../assets/images/02.png'
// import Card4 from '../assets/images/03.png'
const ArenaHome = () => {
  const { contract, gameData, accountBalance, battleName, setBattleName, setShowAlert, setErrorMessage, selectedCards, setSelectedCards, showAlert, walletAddress } = useGlobalContext();
  const [waitBattle, setWaitBattle] = useState(false);
  const [availableCards, setAvailableCards] = useState([]);
  const [noCards, setNoCards] = useState(true);
  // const [reload, setReload] = useState(true);
  const [cardMinted, setCardMinted] = useState(false);
  const [displayBattlesPage, setDisplayBattlePage] = useState(false);
  const navigate = useNavigate();

  var mintCardLink = '';

  useEffect(() => {
    if (gameData?.activeBattle?.battleStatus === 1) {
      navigate(`/battle/${gameData.activeBattle.name}`);
    } else if (gameData?.activeBattle?.battleStatus === 0) {
      setWaitBattle(true);
    }
    console.log();
  }, [gameData]);

  useEffect(() => {
    // console.log('Available jbbjhb:', availableCards);/
    console.log("Hiiii");
    fetchAvailableCards();
  }, []);


  useEffect(() => {
    if (availableCards.length < 1) {
      setNoCards(true);
    }
    else{
      setNoCards(false);
    }
  }, [availableCards]);

  const fetchAvailableCards = async () => {
    try{
        if(contract){
        let cards = await contract.getAvailableCards(walletAddress);
        console.log('cards: ',cards);
        const temp = [];
        cards.forEach(async (item, index) => {
          // console.log(`Item at index ${index}: ${item}`);
          try {
            const response = await fetch(item);
            // console.log(response);
            if (!response.ok) {
              throw new Error('Network response was not ok.');
            }
            
            const data = await response.json();
            // console.log('data:',data);
            // if(!availableCards.includes(data.image_link)){
            //   console.log('Card Link: ',data.image_link);
            //   setAvailableCards([...availableCards, data.image_link]);
            // }
            // setAvailableCards([...availableCards, data.image_link]);
            temp.push(data.image_link);
            console.log('Temp:',temp);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
          // console.log('Json Data',jsonData);
      });
      setTimeout(() => {
        setAvailableCards(temp);
      }, 500);
      // console.log('Available Cards:',availableCards);
     }
    }
    catch(error){
      console.log(error);
      setShowAlert({
        status: true,
        type: 'failure',
        message: error.message,
      });
    }
  };


  const handleClick = async () => {
    if (battleName === '' || battleName.trim() === '') return null;
    console.log(battleName)
    try {
      // await contract.createBattle(battleName);

      setWaitBattle(true);
    } catch (error) {
      setErrorMessage(error);
    }
  };



  
  // Usage example
  const fetchData = () => {
      mintCardLink = 'https://bafybeige2was3qob2esyv4kbtxa5obijpv4vhkhmw2clcypmbhnxzpko5i.ipfs.w3s.link/1.json';
      console.log('Mint Card Link:',mintCardLink);
      
    try{
      // Call the async function
        console.log('Mint Card Link:',mintCardLink);
        mintCard();
        setTimeout(() => {
          fetchAvailableCards();
        }, 32000);
    }
    catch(error){
      setErrorMessage(error);
      // console.log(error);
    }
    
  };

  const mintCard = async () => {
    console.log('Minting card:', mintCardLink);
    await contract.payToMint(
      walletAddress, mintCardLink, { value: ethers.utils.parseEther('0.05') }
    );
    // console.log('Card minted');
  };
  
  // const [selectedItems, setSelectedItems] = useState([]);

  const handleButtonClick = (index) => {
    if (selectedCards.includes(index)) {
      // If selected, remove it from the list
      setSelectedCards(selectedCards.filter((item) => item !== index));
    } else {
      // If not selected, add it to the list
      setSelectedCards([...selectedCards, index]);
    }
  };

  useEffect(() => {
    console.log(gameData);
    console.log('Selected Items:', selectedCards);
    console.log('Available Cards:', availableCards);
  }, [selectedCards]);
  // useEffect(() => {
  //   const fetchBattles = async () => {
  //     const battles = await contract.getPendingBattles();
  //     console.log(battles);
  //   };
  //   fetchBattles();
  // }, []);

  return (
    <div className='flex flex-col h-screen'>
      {showAlert?.status && <Alert type={showAlert.type} message={showAlert.message} />}
      <Nav></Nav>
      <div className={`${styles.arenaHomeContainer}`}>
        {displayBattlesPage ? 
          <div className={`${styles.arenaHomeBattlesContainer} `}>
            <p className={styles.text}> Available Battles </p>
            {gameData.pendingBattles.map((pendingBattle, index) => (
              <div key={index} className='flex flex-row m-2'>
                <p className={`${styles.text} text-lg`}>{`${index+1}. ${pendingBattle}`}</p>
                <button className={`${styles.btn} ml-6 w-2 h-10 text-center `} onClick={() => navigate(`battle/${pendingBattle}`)}>Join</button>
              </div>
              ))}
            <p className={`${styles.infoText} hover:text-blue-700`} onClick={() => setDisplayBattlePage(false)}>
            Or create new battle
          </p>
          </div> 
          :
          <div className={styles.arenaHomeBattlesContainer}>
          <div className='flex items-center justify-center'>
            <CustomInput
                className={styles.input}
                label="Battle"
                placeHolder="Enter battle name"
                value={battleName}
                handleValueChange={setBattleName}
              />
            {
              noCards ?
                <button className='px-4 py-2 h-[60px] rounded-lg bg-gray-500 w-fit text-white font-bold'>Create</button> 
                :
                <CustomButton
                title="Create"
                handleClick={handleClick}
                restStyles="w-1/2 h-[60px]"
              />
            }
          </div>
          {
            noCards ?
            <p className={`font-rajdhani font-medium mt-4 text-lg text-slate-950 cursor-pointer`}>
            Or join already existing battles
            </p>
            :
            <p className={`${styles.infoText} hover:text-blue-700`} onClick={() => setDisplayBattlePage(true)}>
              Or join already existing battles
            </p>
          }
          
      </div>
      }
        {
          availableCards.length < 1 ?
          <div className='w-9/12 h-full flex flex-col items-center justify-center'>
            <p className={`${styles.text} mt-60`}>You dont have any cards...</p>
            <button className={`${styles.buttonLight} mb-72 hover:border-2 hover:border-slate-950`}
              onClick={fetchData}
              > Mint </button>
          </div>
           :
          <div className='w-9/12 h-full items-center flex flex-col'> 
            <p className={styles.text}> Available Cards </p>
            {   availableCards.length < 5 &&
                <button className={`text-black w-20 h-10 text-4 transition-[0.1s] border-2 border-solid border-black bg-white rounded-md hover:text-white hover:bg-slate-950 hover:border-2 hover:border-slate-950`}
                onClick={fetchData}
                > Mint </button>
            }
            
            <div className={styles.arenaHomeCardsContainer}>
                {availableCards.map((link, index) => (
                  <div key={index} className={styles.cardContainer}>
                    <img src={link} className={`${styles.cardImg} mb-2`} alt={`Image ${index + 1}`} />
                    <button className={`${styles.cardBtn} ${ selectedCards.includes(link) ? "bg-blue-700 text-white" : "bg-stone-950 text-white"}`} onClick={() => handleButtonClick(link)}>Select</button>
                  </div>
                ))}
            </div>
        </div>
        }
      </div>
    </div>
  )
}

export default ArenaHome
