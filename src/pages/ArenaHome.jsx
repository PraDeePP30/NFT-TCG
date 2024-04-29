import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Nav } from '../components'
import styles from '../styles'
import { useGlobalContext } from '../context'
import { CustomButton, CustomInput} from '../components'
import Alert from '../components/Alert'
import { ethers } from 'ethers';
import { local } from 'web3modal'

// import Card1 from '../assets/images/00.png'
// import Card2 from '../assets/images/01.png'
// import Card3 from '../assets/images/02.png'
// import Card4 from '../assets/images/03.png'

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
  const { contract, gameData, accountBalance, battleName, availableCards, setAvailableCards, setBattleName, setShowAlert, setErrorMessage, showAlert, walletAddress, cardMinted, setAvailableCardsStats, availableCardsStats } = useGlobalContext();
  const [waitBattle, setWaitBattle] = useState(false);
  const [selectedCards, setSelectedCards] = useState({});
  const [selectedCardsStats, setSelectedCardsStats] = useState({});
  const [noCards, setNoCards] = useState(true);
  const [confirmedCards, setConfirmedCards] = useState({});
  const [revokeCards, setRevokeCards] = useState({});
  const [confirmedCardsStats, setConfirmedCardsStats] = useState({});
  const [displayBattlesPage, setDisplayBattlePage] = useState(false);
  const navigate = useNavigate();
  const { mode } = useParams();

  useEffect(() => {
    if (gameData?.activeBattle?.battleStatus === 1) {
      navigate(`/battle/${gameData.activeBattle.name}`);
    } else if (gameData?.activeBattle?.battleStatus === 0) {
      setWaitBattle(true);
    }
    console.log();
  }, [gameData]);

  useEffect(()=> {
      const isCards = JSON.parse(localStorage.getItem('confirmedCards'));
      const isStats = JSON.parse(localStorage.getItem('confirmedCardsStats'));
      if(isCards && isStats){
        console.log('ConfirmedCards LS: ',isCards);
        console.log('ConfirmedCardsStats LS: ',isStats);
        setConfirmedCards(isCards);
        setConfirmedCardsStats(isStats);
      }
      else{
        console.log('ConfirmedCards LS: ',isCards);
        console.log('ConfirmedCardsStats LS: ',isStats);
        setConfirmedCards({});
        setConfirmedCardsStats({});
      }
  },[]);

  useEffect(() => {
    // localStorage.setItem('cards', JSON.stringify(selectedCards));
    // localStorage.setItem('cardsStats', JSON.stringify(selectedCardsStats));
    console.log('Card Minted',cardMinted);
    fetchAvailableCards();
  }, [contract, cardMinted, confirmedCards]);

  useEffect(() => {
    localStorage.setItem('confirmedCards', JSON.stringify(confirmedCards));
    localStorage.setItem('confirmedCardsStats', JSON.stringify(confirmedCardsStats));
    fetchAvailableCards();
  },[updateTransfer]);

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
            // console.log('data:',data);
            // if(!availableCards.includes(data.image_link)){
            //   console.log('Card Link: ',data.image_link);
            //   setAvailableCards([...availableCards, data.image_link]);
            // }
            // setAvailableCards([...availableCards, data.image_link]);
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

  const handleCreateBattle = async () => {
    if (battleName === '' || battleName.trim() === '') {
      setShowAlert({
        status: true,
        type: 'failure',
        message: 'Battle name should not be empty!',
      });
      return;
    }
    console.log(battleName)
    if(Object.keys(selectedCards).length !== 3){
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
        // localStorage.setItem('cards', JSON.stringify(selectedCards));
        // localStorage.setItem('cardsStats', JSON.stringify(selectedCardsStats));
        localStorage.setItem('confirmedCards', JSON.stringify(confirmedCards));
        localStorage.setItem('confirmedCardsStats', JSON.stringify(confirmedCardsStats));
        navigate(`/arena/${mode}/battle/${battleName}`);
      }, 25000)
    } catch (error) {
      setErrorMessage(error);
    }
  };

  const handleJoinBattle = (pendingBattle) =>{
    if(Object.keys(selectedCards).length !== 3){
      setShowAlert({
        status: true,
        type: 'failure',
        message: 'You should select exactly 3 Cards.',
      });
      return;
    }
    localStorage.setItem('confirmedCards', JSON.stringify(confirmedCards));
    localStorage.setItem('confirmedCardsStats', JSON.stringify(confirmedCardsStats));
    // localStorage.setItem('cards', JSON.stringify(selectedCards));
    // localStorage.setItem('cardsStats', JSON.stringify(selectedCardsStats));
    // setShowAlert({ status: true, type: 'info', message: `${ground.name} is battle ready!` });
    setTimeout(() => {
      navigate(`/arena/${mode}/battle/${pendingBattle}`);
    }, 1000);
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
  
  // const [selectedItems, setSelectedItems] = useState([]);

  const handleButtonClick = (key, link) => {
    // Check if the key exists in the selectedCards dictionary
    if (selectedCards.hasOwnProperty(key)) {
        // If selected, remove it from the dictionary
        const updatedSelectedCards = { ...selectedCards }; // Create a copy of the dictionary
        const updatedSelectedCardsStats = { ...selectedCardsStats}
        delete updatedSelectedCards[key]; // Remove the key from the copy
        delete updatedSelectedCardsStats[key];
        setSelectedCards(updatedSelectedCards); // Update the state with the modified dictionary
        setSelectedCardsStats(updatedSelectedCardsStats);
    } else {
        // If not selected, add it to the dictionary
        setSelectedCards({ ...selectedCards, [key]: link }); // Add the key to the dictionary with a truthy value
        const temp = availableCardsStats[key];
        setSelectedCardsStats({ ...selectedCardsStats, [key]: temp})
    }
};

const handleRevokeSelection = (key, link) => {
  // Check if the key exists in the selectedCards dictionary
  if (revokeCards.hasOwnProperty(key)) {
      // If selected, remove it from the dictionary
      const updatedRevokeCards = { ...revokeCards }; // Create a copy of the dictionary
      // const updatedRevokeCardsStats = { ...revokeCardsStats};
      delete updatedRevokeCards[key]; // Remove the key from the copy
      // delete updatedRevokeCardsStats[key];
      setRevokeCards(updatedRevokeCards); // Update the state with the modified dictionary
      // setRevokeCardsStats(updatedRevokeCardsStats);
  } else {
      // If not selected, add it to the dictionary
      setRevokeCards({ ...revokeCards, [key]: link }); // Add the key to the dictionary with a truthy value
      // const temp = availableCardsStats[key];
      // setRevokeCardsStats({ ...revokeCardsStats, [key]: temp})
  }
};

// Confirmation and revoke under Development
  const handleCardsConfirmation = () =>{
    const confirmedCardsLength = Object.keys(confirmedCards).length;
    const selectedCardsLength = Object.keys(selectedCards).length;
    if((confirmedCardsLength+selectedCardsLength)>3){
      setShowAlert({
        status: true,
        type: 'failure',
        message: 'You can only select 3 cards',
      });
      return;
    }
    
    // setConfirmedCardsStats(selectedCardsStats);
    Object.keys(selectedCards).forEach(async (key) => {
      try {
          await contract.transferCardToContract(key); // Assuming `receiverAddress` is defined elsewhere
          console.log(`Transferred card with key ${key} successfully.`);
      } catch (error) {
          console.error(`Error transferring card with key ${key}:`, error);
      }
      // finally{
      //   setTimeout(async() =>{
      //     const res = await contract.getOwnerOfTokenByName(key);
      //     console.log('Token Owner: ',res);
      //   },20000);
      // }
    });
    setTimeout(() => {
      setConfirmedCards(prevConfirmedCards => ({
        ...prevConfirmedCards,
        ...selectedCards
      }));
      setConfirmedCardsStats(prevConfirmedCardsStats => ({
        ...prevConfirmedCardsStats,
        ...selectedCardsStats
      }));
      setSelectedCards({});
      setSelectedCardsStats({});
    }, 25000);
  }

  const handleRevoke = () =>{
    Object.keys(revokeCards).forEach(async (key) => {
      try {
          await contract.transferCardFromContract(walletAddress,key); // Assuming `receiverAddress` is defined elsewhere
          if (confirmedCards.hasOwnProperty(key)) {
            // If selected, remove it from the dictionary
            const updatedConfirmedCards = { ...confirmedCards }; // Create a copy of the dictionary
            const updatedConfirmedCardsStats = { ...confirmedCardsStats};
            delete updatedConfirmedCards[key]; // Remove the key from the copy
            delete updatedConfirmedCardsStats[key];
            setConfirmedCards(updatedConfirmedCards); // Update the state with the modified dictionary
            setConfirmedCardsStats(updatedConfirmedCardsStats);
        }
          console.log(`Transferred card with key ${key} successfully.`);
      } catch (error) {
          console.error(`Error transferring card with key ${key}:`, error);
      }
  });
    setRevokeCards({});
    // setTimeout(() => {
      
    // }, 25000);
  }

  useEffect(() => {
    // console.log(gameData);
    console.log('Selected Items:', selectedCards);
    console.log('Available Cards:', availableCards);
    console.log('Available Items Stats:',availableCardsStats);
    console.log('Selected Items Stats:', selectedCardsStats);
    console.log('Confirmed Items:', confirmedCards);
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
            <button className={`text-black w-[80px] text-[1.25rem] h-14 m-4 transition-[0.3s] border-2 border-solid border-black bg-white rounded-md hover:text-white hover:bg-slate-950 mb-72 hover:border-2 hover:border-slate-950`}
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
              {Object.keys(confirmedCards).length > 0 && 
                Object.entries(confirmedCards).map(([key, link]) => (
                  <div key={key} className={styles.cardContainer}>
                    <img src={link} className={`${styles.cardImg} mb-2`} alt={`Image ${key}`} />
                    <button 
                      className={`${styles.cardBtn} ${!revokeCards.hasOwnProperty(key) ? "bg-green-500 text-white" : "bg-red-500 text-white"}`} 
                      onClick={() => handleRevokeSelection(key, link)}
                    >
                      Confirmed
                    </button>
                  </div>
                ))
              }

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