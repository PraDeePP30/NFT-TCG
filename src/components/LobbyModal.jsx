/* eslint-disable react/jsx-no-bind */
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styles from '../styles';
import CustomButton from './CustomButton';
import { useGlobalContext } from '../context';

const LobbyModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { LobbyStatus, setLobbyStatus, player2Ref , player1Ref} = useGlobalContext();
  useEffect(() => {
    console.log('LobbyStatus:::', LobbyStatus , "Player 2 ref:", player2Ref.current);
    if (LobbyStatus && !player2Ref.current){
        setModalIsOpen(true);
    }
  }, [LobbyStatus]);

  const generateStep = () => {
    if (LobbyStatus && !player2Ref.current) {
        
        return (
            <>
                <p className={styles.modalText}>
                You are in the Battle lobby!
                </p>
                <p className={styles.modalText}>
                Please wait for the other player to join.
                </p> 
               
            </>
            );
    }
    else{
      return (
        <>
            <p className={styles.modalText}>
            You are in the Battle lobby!
            </p>
            <p className={styles.modalText}>
              Other player has joined the lobby.
            </p>
            
            <CustomButton
            title="Start Game"
            handleClick={() => {
              setLobbyStatus(false);
              setModalIsOpen(false);  
            }
            }
            />
        </>
        );
    }
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      className={`absolute inset-0 ${styles.flexCenter} h-full w-full flex-col z-10 ${styles.glassEffect} `}
      overlayClassName="Overlay"
    >
      {generateStep()}
    </Modal>
  );
};

export default LobbyModal;