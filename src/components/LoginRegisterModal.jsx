import { useState, input } from "react";
import Modal from "react-modal";
import styles from "../styles";
import { useGlobalContext } from "../context";
import {Alert} from './'
import React from 'react'

const LoginRegisterModal = () => {
  const {contract, walletAddress, isOpen, setIsOpen, showAlert, setShowAlert, setErrorMessage} = useGlobalContext();
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
      isOpen={isOpen}
      className={`absolute inset-0 ${styles.flexCenter} flex-col ${styles.glassEffect}`}
      overlayClassName="Overlay"
    >
      <div>
        {/* <svg viewBox="0 0">
          <path d="M 10,30 L 90,70 M 10,70 L 90,30"></path>
        </svg> */}
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
      </div>
      
    </Modal>
  )
}

export default LoginRegisterModal
