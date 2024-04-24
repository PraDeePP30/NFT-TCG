import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Nav } from '../components'
import styles from '../styles'
import { useGlobalContext } from '../context'
import { CustomButton, CustomInput} from '../components'
import Card1 from '../assets/images/00.png'
import Card2 from '../assets/images/01.png'
import Card3 from '../assets/images/02.png'
import Card4 from '../assets/images/03.png'
const ArenaHome = () => {
  const { contract, gameData, battleName, setBattleName, setErrorMessage, selectedCards, setSelectedCards } = useGlobalContext();
  const [waitBattle, setWaitBattle] = useState(false);

  const [displayBattlesPage, setDisplayBattlePage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (gameData?.activeBattle?.battleStatus === 1) {
      navigate(`/battle/${gameData.activeBattle.name}`);
    } else if (gameData?.activeBattle?.battleStatus === 0) {
      setWaitBattle(true);
    }
  }, [gameData]);

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

  const imageLinks = [
    Card1,
    Card2,
    Card3,
    Card4,
    // Add more image links as needed
  ];

  // const [selectedItems, setSelectedItems] = useState([]);

  const handleButtonClick = (index) => {
    // Check if the item is already selected
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

              <CustomButton
                title="Create"
                handleClick={handleClick}
                restStyles="w-1/2 h-[60px]"
              />
          </div>
          <p className={`${styles.infoText} hover:text-blue-700`} onClick={() => setDisplayBattlePage(true)}>
            Or join already existing battles
          </p>
      </div>
      }
        <div className='w-9/12 h-full'>
          <p className={styles.text}> Available Cards </p>
          <div className={styles.arenaHomeCardsContainer}>
              {imageLinks.map((link, index) => (
                <div key={index} className={styles.cardContainer}>
                  <img src={link} className={`${styles.cardImg} mb-2`} alt={`Image ${index + 1}`} />
                  <button className={`${styles.cardBtn} ${ selectedCards.includes(link) ? "bg-blue-700 text-white" : "bg-stone-950 text-white"}`} onClick={() => handleButtonClick(link)}>Select</button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArenaHome
