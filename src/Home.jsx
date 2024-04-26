import { useState, useEffect } from 'react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from './context'
import {Nav, Alert} from './components'

import styles from './styles'

const Home = () => {
  const { contract, walletAddress, gameData, showAlert, setIsOpen, setErrorMessage } = useGlobalContext();
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      // console.log(contract);
      const playerExists = await contract.isPlayer(walletAddress);
      if (!playerExists) {
        setIsOpen(true); // Open the modal
        // await contract.registerPlayer(walletAddress, { gasLimit: 500000 });

        // setShowAlert({
        //   status: true,
        //   type: 'info',
        //   message: `${playerName} is being summoned!`,
        // });

        // setTimeout(() => {
        //   // setIsOpen(false); // Close the modal after 8000 milliseconds
        //   navigate('/game-modes');
        // }, 5000);
      }
      else{
        navigate('/game-modes');
      }
    } catch (error) {
      setErrorMessage(error);
    }
  };

  // useEffect(() => {
  //   const createPlayerToken = async () => {
  //     const playerExists = await contract.isPlayer(walletAddress);
  //     const playerTokenExists = await contract.isPlayerToken(walletAddress);

  //     if (playerExists && playerTokenExists) navigate('/game-modes');
  //   };

  //   if (contract) createPlayerToken();
  // }, [contract]);

  useEffect(() => {
    if (gameData.activeBattle) {
      navigate(`/battle/${gameData.activeBattle.name}`);
    }
  }, [gameData]);

  return (
    <div className='w-full h-full flex-col items-center justify-start'>
      {showAlert?.status && <Alert type={showAlert.type} message={showAlert.message} />}
      <Nav></Nav>
      <div className={styles.homeBanner}>
        <span className={styles.homeText}>Cards Unleashed, Power Up Your Play.</span>
        <h1 className={styles.homeSubText}>Embrace the Change: Where Strategy Meets Destiny.</h1>
        <button className={styles.homeButton} onClick={handleClick} >Play</button>
      </div>
    </div>
  )
}

export default Home
