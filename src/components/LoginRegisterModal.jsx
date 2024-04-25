import { useState, input } from "react";
import Modal from "react-modal";
import styles from "../styles";
import { useGlobalContext } from "../context";
import {Alert} from './'
import React from 'react'

const LoginRegisterModal = () => {
  const {contract, walletAddress, modalIsOpen, setIsOpen, showAlert, setShowAlert, setErrorMessage} = useGlobalContext();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  console.log(walletAddress);
  const handleClick = async () => {
    try {
    if(name && email) {
      await contract.registerPlayer(walletAddress, name, email, { gasLimit: 500000 });
        setShowAlert({
          status: true,
          type: 'info',
          message: `${name} is being summoned!`,
        });
      }

    else{
      setErrorMessage("Please fill all the fields");
    }
  }
  catch (error) {
    setErrorMessage(error);
  }

    setIsOpen(false);
  };
  return (
    <Modal
      isOpen={modalIsOpen}
      className={`absolute inset-0 ${styles.flexCenter} flex-col ${styles.glassEffect}`}
      overlayClassName="Overlay"
    >
    <div className="flex-col bg-slate-950 w-80 h-80 p-10 justify-center rounded-xl">
    {showAlert?.status && <Alert type={showAlert.type} message={showAlert.message} />}
      <div>
        <input className={styles.input} 
        type="text" 
        id="name" 
        onChange={(e) => { setName(e.target.value);
      }}
       placeholder="Name" 
       required/>
      </div>
      <div>
      <input className={styles.input} 
      type="email" 
      id="email" 
      onChange={(e) => { setEmail(e.target.value);
      }}
      placeholder="Email" required/>
      </div>
      <div className="flex items-center justify-center">
      <button className={styles.button} onClick={handleClick} >Register</button>
      </div>
    </div>
    </Modal>
  )
}

export default LoginRegisterModal
