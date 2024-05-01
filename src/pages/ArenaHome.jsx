import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Nav } from '../components'
import styles from '../styles'
import { useGlobalContext } from '../context'
import { CustomButton, CustomInput} from '../components'
import Alert from '../components/Alert'
import { ethers } from 'ethers';

const contactFlask = async () => {
  try {
    // Define the URL of your Flask server endpoint
    const url = 'http://127.0.0.1:5000/choose_card'; // Replace with your actual Flask server endpoint

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



const ArenaHome = () => {
  const { contract, gameData, accountBalance, battleName, availableCards, setAvailableCards, setBattleName, setShowAlert,
          setErrorMessage, selectedCards, setSelectedCards, showAlert, walletAddress, cardMinted, setAvailableCardsStats, availableCardsStats,
          selectedCardsStats, setSelectedCardsStats,  player2Ref, setLobbyStatus, confirmedCards, setConfirmedCards,confirmedCardsStats, setConfirmedCardsStats  } = useGlobalContext();
  const [waitBattle, setWaitBattle] = useState(false);
  const [noCards, setNoCards] = useState(true);
  const [displayBattlesPage, setDisplayBattlePage] = useState(false);
  const navigate = useNavigate();
  const { mode } = useParams();

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
    console.log('confirmed Cards:', confirmedCards);
    // console.log("Hiiii");
    // setTimeout(() => {
    localStorage.setItem('cards', JSON.stringify(selectedCards));
    localStorage.setItem('cardsStats', JSON.stringify(selectedCardsStats));
    localStorage.setItem('confirmedCards', JSON.stringify(confirmedCards));
    localStorage.setItem('confirmedCardsStats', JSON.stringify(confirmedCardsStats));
    console.log('Card Minted',cardMinted);
    fetchAvailableCards();
    fetchConfirmedCards();
    // }, 3000);
  }, [contract, cardMinted]);

  useEffect(() => {
    if (Object.keys(availableCards).length < 1) {
      setNoCards(true);
    }
    else{
      setNoCards(false);
    }
  }, [availableCards]);

  const fetchAvailableCards = async () => {
    try{
        console.log("Fetch Cards");
        // console.log(contract);
        if(contract){
        let cards = await contract.getAvailableCards(walletAddress);
        console.log('cards: ',cards.length);
        const temp = {};
        const tempStats = {};
        cards.forEach(async (item, index) => {
          // console.log(`Item at index ${index}: ${item}`);
          try {
            const response = await fetch(item);
            // console.log(response);
            if (!response.ok) {
              throw new Error('Network response was not ok.');
            }
            
            const data = await response.json();
            temp[item] = data.image_link;
            tempStats[item] = data;
            console.log('Temp stats:',tempStats);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
          // console.log('Json Data',jsonData);
      });
      setTimeout(() => {
        setAvailableCards(temp);
        setAvailableCardsStats(tempStats);
      }, 500);
      console.log('Available Cards:',availableCards);
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

  const fetchConfirmedCards = async () => {
    try{
        console.log("Fetch Cards");
        // console.log(contract);
        if(contract){
        let cards = await contract.getContractCards(walletAddress);
        const temp = {};
        const tempStats = {};
        cards.forEach(async (item, index) => {
          // console.log(`Item at index ${index}: ${item}`);
          try {
            const response = await fetch(item);
            // console.log(response);
            if (!response.ok) {
              throw new Error('Network response was not ok.');
            }
            
            const data = await response.json();
            temp[item] = data.image_link;
            tempStats[item] = data;
            console.log('Temp stats:',tempStats);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
          // console.log('Json Data',jsonData);
      });
      setTimeout(() => {
        setConfirmedCards(temp);
        setConfirmedCardsStats(tempStats);
      }, 500);
      console.log('Confirmed Cards:',confirmedCards);
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

  const joinBattle = async (battle) => {
    try {
      await contract.joinBattleByName(battle, walletAddress);
    } catch (error) {
      setErrorMessage(error);
    }
  };

  const handleCreateBattle = async () => {
    player2Ref.current=null;
    if (battleName === '' || battleName.trim() === '') {
      setShowAlert({
        status: true,
        type: 'failure',
        message: 'Battle name should not be empty!',
      });
      return;
    }
    console.log(battleName)
    if(Object.keys(confirmedCards).length !== 3){
      setShowAlert({
        status: true,
        type: 'failure',
        message: 'You should select exactly 3 Cards.',
      });
      return;
    }
    try {
      await contract.createBattle(walletAddress, mode, battleName);
      // setWaitBattle(true);
      setTimeout(() => {
        localStorage.setItem('confirmedCards', JSON.stringify(confirmedCards));
        localStorage.setItem('confirmedCardsStats', JSON.stringify(confirmedCardsStats));
        setLobbyStatus(true);
        navigate(`/arena/${mode}/battle/${battleName}`);
      }, 25000)
    } catch (error) {
      setErrorMessage(error);
    }
  };

  const handleJoinBattle = (pendingBattle) =>{
    player2Ref.current="player2";
    if(Object.keys(confirmedCards).length !== 3){
      setShowAlert({
        status: true,
        type: 'failure',
        message: 'You should select exactly 3 Cards.',
      });
      return;
    }
    localStorage.setItem('confirmedCards', JSON.stringify(confirmedCards));
    localStorage.setItem('confirmedCardsStats', JSON.stringify(confirmedCardsStats));
    // setShowAlert({ status: true, type: 'info', message: `${ground.name} is battle ready!` });
    joinBattle(pendingBattle);
    setTimeout(() => {
      setLobbyStatus(true);
      navigate(`/arena/${mode}/battle/${pendingBattle}`);
    }, 15000);
      
  }

  
  // Usage example
  const fetchData = async () => {
    
      // mintCardLink = 'https://bafybeige2was3qob2esyv4kbtxa5obijpv4vhkhmw2clcypmbhnxzpko5i.ipfs.w3s.link/1.json';
      // console.log('Mint Card Link:',mintCardLink);
      // console.log('CArdMintd',cardMinted);
      
    try{
        let mintCardLink = null;
        let isDataReceived = false;
        // Call the contactFlask function to fetch data from the Flask server
        mintCardLink = await contactFlask();

        // Start polling loop
        while (!isDataReceived) {
          // Check if data is received
          if (mintCardLink !== null) {
            // Data received, set flag to true to exit loop
            isDataReceived = true;
            mintCardLink = mintCardLink.link;
          }
        }
        // Call the async function
        // console.log('Mint Card Link:',mintCardLink);
        mintCard(mintCardLink);
        setTimeout(() => {
          setShowAlert({
            status: true,
            type: 'success',
            message: 'Card Minted Successfully',
          })
        }, 25000);
    }
    catch(error){
      // setErrorMessage(error);
      console.log(error);
    }
    
  };

  const mintCard = async (mintCardLink) => {
    console.log('Minting card:', mintCardLink);
    await contract.payToMint(
      walletAddress, mintCardLink, { value: ethers.utils.parseEther('0.05') }
    )
    // console.log('Card minted');
  };
  
  const handleButtonClick = (key, link) => {
    // Check if the key exists in the selectedCards dictionary
    if(confirmedCards.hasOwnProperty(key)){
      if (selectedCards.hasOwnProperty(key)){
        const updatedSelectedCards = { ...selectedCards };
        const updatedSelectedCardsStats = { ...selectedCardsStats};
        delete updatedSelectedCards[key];
        delete updatedSelectedCardsStats[key];
        
        setSelectedCards(updatedSelectedCards);
        selectedCardsStats(updatedSelectedCardsStats)
        // setConfirmedCards({ ...confirmedCards, [key]: link})
      }
      else{
        setSelectedCards({ ...selectedCards, [key]: link }); // Add the key to the dictionary with a truthy value
        setSelectedCardsStats({ ...selectedCardsStats, [key]: confirmedCardsStats[key]})
      }
    }
    else if (selectedCards.hasOwnProperty(key)) {
        // If selected, remove it from the dictionary
        const updatedSelectedCards = { ...selectedCards }; // Create a copy of the dictionary
        const updatedSelectedCardsStats = { ...selectedCardsStats}
        delete updatedSelectedCards[key]; // Remove the key from the copy
        delete updatedSelectedCardsStats[key];
        setSelectedCards(updatedSelectedCards); // Update the state with the modified dictionary
        setSelectedCardsStats(updatedSelectedCardsStats);
    }
    else{
        // If not selected, add it to the dictionary
        setSelectedCards({ ...selectedCards, [key]: link }); // Add the key to the dictionary with a truthy value
        const temp = availableCardsStats[key];
        setSelectedCardsStats({ ...selectedCardsStats, [key]: temp})
    }
};

// Confirmation and revoke under Development
  const handleCardsConfirmation = () =>{
    Object.keys(selectedCards).forEach(async (key) => {
      try {
          await contract.transferCardToContract(key); // Assuming `receiverAddress` is defined elsewhere
          console.log(`Transferred card with key ${key} successfully.`);
          setConfirmedCards({ ...confirmedCards, [key]: selectedCards[key] }); // Add the key to the dictionary with a truthy value
          localStorage.setItem('confirmedCards', JSON.stringify(confirmedCards));
          delete availableCards[key];
          delete selectedCards[key];
          delete selectedCardsStats[key];
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

  const handleRevoke = () =>{
    Object.keys(selectedCards).forEach(async (key) => {
      try {
          await contract.transferCardFromContract(walletAddress, key); // Assuming `receiverAddress` is defined elsewhere
          console.log(`Transferred card with key ${key} successfully.`);

          const updatedConfirmedCards= { ...confirmedCards}
          delete updatedConfirmedCards[key];
          setConfirmedCards(updatedConfirmedCards); 
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

  useEffect(() => {
    // console.log(gameData);
    console.log('Selected Items:', selectedCards);
    console.log('Available Cards:', availableCards);
    console.log('Available Items Stats:',availableCardsStats);
    console.log('Selected Items Stats:', selectedCardsStats);
    console.log('Confirmed Cards:', confirmedCards);
    console.log('Confirmed Cards Stats:', confirmedCardsStats);

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
                <button className={`${styles.btn} ml-6 w-2 h-10 text-center `} onClick={()=>handleJoinBattle(pendingBattle)}>Join</button>
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
                handleClick={handleCreateBattle}
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
          Object.keys(availableCards).length < 1 ?
          <div className='w-9/12 h-full flex flex-col items-center justify-center'>
            <p className={`${styles.text} mt-60`}>You dont have any cards...</p>
            <button className={`${styles.buttonLight} mb-72 hover:border-2 hover:border-slate-950`}
              onClick={fetchData}
              > Mint </button>
          </div>
           :
          <div className='w-9/12 h-full items-center flex flex-col overflow:scroll'> 
            <p className={styles.text}> Available Cards </p>
            {   Object.keys(availableCards).length < 5 &&
                <button className={`text-black w-20 h-10 text-4 transition-[0.1s] border-2 border-solid border-black bg-white rounded-md hover:text-white hover:bg-slate-950 hover:border-2 hover:border-slate-950`}
                onClick={fetchData}
                > Mint </button>
            }
            
            <div className={styles.arenaHomeCardsContainer}>
            {Object.entries(availableCards).map(([key, link]) => (
              <div key={key} className={styles.cardContainer}>
                <img src={link} className={`${styles.cardImg} mb-2`} alt={`Image ${key}`} />
                <button 
                  className={`${styles.cardBtn} ${selectedCards.hasOwnProperty(key) ? "bg-blue-700 text-white" : "bg-stone-950 text-white"}`} 
                  onClick={() => handleButtonClick(key, link)}
                >
                  Select
                </button>
              </div>
            ))}
            {Object.entries(confirmedCards).map(([key, link]) => (
              <div key={key} className={styles.cardContainer}>
                <img src={link} className={`${styles.cardImg} mb-2`} alt={`Image ${key}`} />
                <button 
                  className={`${styles.cardBtn} ${selectedCards.hasOwnProperty(key) ? "bg-blue-700 text-white" : "bg-green-700 text-white"}`} 
                  onClick={() => handleButtonClick(key, link)}
                >
                  Select
                </button>
              </div>
            ))}

            </div>
            <div className='flex flex-row items-center justify-center'>
              <button className={`text-black w-32 h-8 mt-[5px] mb-[5px] transition-[0.1s] border-2 border-solid border-black bg-white rounded-md hover:text-white hover:bg-slate-950 hover:border-2 hover:border-slate-950`}
                  onClick={handleCardsConfirmation}
                  > Confirm Cards </button>
              <button className={`text-black w-32 h-8 mt-[5px] mb-[5px] transition-[0.1s] border-2 border-solid border-black bg-white rounded-md hover:text-white hover:bg-slate-950 hover:border-2 hover:border-slate-950`}
              onClick={handleRevoke}
              > Revoke Cards </button>
            </div>
        </div>
        }
      </div>
    </div>
  )
}

export default ArenaHome
