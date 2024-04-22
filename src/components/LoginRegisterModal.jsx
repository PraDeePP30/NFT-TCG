import { useState, input } from "react";
import Modal from "react-modal";
import styles from "../styles";
import { useGlobalContext } from "../context";

import React from 'react'

const LoginRegisterModal = () => {
  const {contract, walletAddress, modalIsOpen, setIsOpen, setShowAlert, setErrorMessage} = useGlobalContext();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  console.log(walletAddress);
  const handleClick = async () => {
    if(name && email) {
    await contract.registerPlayer(walletAddress, name, email, { gasLimit: 500000 });
        setShowAlert({
          status: true,
          type: 'info',
          message: `${name} is being summoned!`,
        });
        setTimeout(() => {
          setIsOpen(false); // Close the modal after 8000 milliseconds
          navigate('/game-modes');
        }, 5000);
      }
    else{
      setErrorMessage("Please fill all the fields");
    }
    // setIsOpen(false);
  };
  return (
    <Modal
      isOpen={modalIsOpen}
      className={`absolute inset-0 ${styles.flexCenter} flex-col ${styles.glassEffect}`}
      overlayClassName="Overlay"
    >
    <div className="flex-col bg-slate-950 w-80 h-80 p-10 justify-center rounded-xl">
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
      <div>
      <button className={styles.button} onClick={handleClick} >Register</button>
      </div>
    </div>
    </Modal>
  )
}

export default LoginRegisterModal
