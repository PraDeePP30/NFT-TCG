/* eslint-disable react/jsx-no-bind */
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styles from '../styles';
import CustomButton from './CustomButton';
import { useGlobalContext } from '../context';

const LobbyModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { LobbyStatus, setLobbyStatus } = useGlobalContext();
  useEffect(() => {
    console.log('LobbyStatus:::', LobbyStatus);
    if (LobbyStatus){
        setModalIsOpen(true);
    }
    else{
        setModalIsOpen(false);
    }
  }, [LobbyStatus]);

  const generateStep = () => {
    console.log("lobby");
    if (LobbyStatus) {
        
        // setModalIsOpen(true);
        return (
            <>
                <p className={styles.modalText}>
                You are in the Battle lobby!
                </p>
                <p className={styles.modalText}>
                Please wait for the other player to join.
                </p>
                <CustomButton
                title="Start Game"
                handleClick={() => setLobbyStatus(false)}
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