import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { useNavigate } from 'react-router-dom';

import { GetParams } from '../utils/onboard.js';
import { ABI, ADDRESS } from '../contract';
import { createEventListeners } from './createEventListeners';

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState('');
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [step, setStep] = useState(1);
  const [gameData, setGameData] = useState({ players: [], pendingBattles: [], activeBattle: null });
  const [showAlert, setShowAlert] = useState({ status: false, type: 'info', message: '' });
  const [battleName, setBattleName] = useState('');
  // const [battleCreated, setBattleCreated] = useState(false);
  const [cardMinted, setCardMinted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [updateGameData, setUpdateGameData] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCards, setSelectedCards] = useState({});
  const [selectedCardsStats, setSelectedCardsStats] = useState({});
  const [availableCards, setAvailableCards] = useState({});
  const [availableCardsStats, setAvailableCardsStats] = useState({});
  const [accountBalance, setAccountBalance] = useState(0);
  const [LobbyStatus, setLobbyStatus] = useState(false);
  const player1Ref = useRef();
  const player2Ref = useRef();

  const navigate = useNavigate();

  //* Reset web3 onboarding modal params
  useEffect(() => {
    const resetParams = async () => {
      const currentStep = await GetParams();

      setStep(currentStep.step);
    };

    resetParams();

    window?.ethereum?.on('chainChanged', () => resetParams());
    window?.ethereum?.on('accountsChanged', () => resetParams());
  }, []);


  useEffect( () => {
      const isCards = JSON.parse(localStorage.getItem('cards'));
      const isStats = JSON.parse(localStorage.getItem('cardsStats'));
      if(isCards && isStats){
        console.log('LocalStorage: ',isCards);
        console.log('LocalStorageStats: ',isStats);
        setSelectedCards(isCards);
        setSelectedCardsStats(isStats);
      }
      else{
        console.log('LocalStorage: ',isCards);
        console.log('LocalStorageStats: ',isStats);
        setSelectedCards({});
        setSelectedCardsStats({});
      }
  }, [])

  //* Set the wallet address to the state
  const updateCurrentWalletAddress = async () => {
    const accounts = await window?.ethereum?.request({ method: 'eth_requestAccounts' });

    if (accounts) setWalletAddress(accounts[0]);
  };

  useEffect(() => {
    updateCurrentWalletAddress();

    window?.ethereum?.on('accountsChanged', updateCurrentWalletAddress);
  }, []);

  //* Set the smart contract and provider to the state
  useEffect(() => {
    const setSmartContractAndProvider = async () => {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const newProvider = new ethers.providers.Web3Provider(connection);
      const signer = newProvider.getSigner();
      const newContract = new ethers.Contract(ADDRESS, ABI, signer);

      setProvider(newProvider);
      setContract(newContract);
      console.log('Contract:', newContract);
    };

    setSmartContractAndProvider();
  }, []);

  useEffect(() => {
    const fetchAccountBalance = async () => {
      if (provider) {
        const balance = await provider.getBalance(walletAddress);
        setAccountBalance(ethers.utils.formatEther(balance));
      }
    };
    fetchAccountBalance();
  },[]);

  //* Activate event listeners for the smart contract
  useEffect(() => {
    if (step === -1 && contract) {
      createEventListeners({
        navigate,
        contract,
        provider,
        walletAddress,
        setShowAlert,
        player1Ref,
        player2Ref,
        setUpdateGameData,
        setCardMinted,
        cardMinted,
      });
    }
  }, [step]);

  //* Set the game data to the state
  // useEffect(() => {
  //   const fetchGameData = async () => {
  //     if (contract) {
  //       const fetchedBattles = await contract.getAllBattles();
  //       const pendingBattles = fetchedBattles.filter((battle) => battle.battleStatus === 0);
  //       let activeBattle = null;

  //       fetchedBattles.forEach((battle) => {
  //         if (battle.players.find((player) => player.toLowerCase() === walletAddress.toLowerCase())) {
  //           if (battle.winner.startsWith('0x00')) {
  //             activeBattle = battle;
  //           }
  //         }
  //       });

  //       setGameData({ pendingBattles: pendingBattles.slice(1), activeBattle });
  //     }
  //   };

  //   fetchGameData();
  // }, [contract, updateGameData]);


    useEffect(() => {
    const fetchGameData = async () => {
      if (contract) {
        const pendingBattles = await contract.getIncompleteBattleNames("tiger");
        // const pendingBattles = ["Battle1","Battle2","Battle3","Battle4","Battle5"];
        let activeBattle = null;

        // fetchedBattles.forEach((battle) => {
        //   if (battle.players.find((player) => player.toLowerCase() === walletAddress.toLowerCase())) {
        //     if (battle.winner.startsWith('0x00')) {
        //       activeBattle = battle;
        //     }
        //   }
        // });

        setGameData({ pendingBattles: pendingBattles, activeBattle });
      }
    };

    fetchGameData();
  }, [contract, updateGameData]);


  //* Handle alerts
  useEffect(() => {
    if (showAlert?.status) {
      const timer = setTimeout(() => {
        setShowAlert({ status: false, type: 'info', message: '' });
      }, [5000]);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  //* Handle error messages
  useEffect(() => {
    if (errorMessage) {
      const parsedErrorMessage = errorMessage?.data?.message?.slice('VM Exception while processing transaction: revert '.length).slice(0, -1);

      if (parsedErrorMessage) {
        setShowAlert({
          status: true,
          type: 'failure',
          message: parsedErrorMessage,
        });
      }
    }
  }, [errorMessage]);

  return (
    <GlobalContext.Provider
      value={{
        player1Ref,
        player2Ref,
        contract,
        gameData,
        walletAddress,
        updateCurrentWalletAddress,
        showAlert,
        setShowAlert,
        battleName,
        setBattleName,
        errorMessage,
        setErrorMessage,
        isOpen,
        setIsOpen,
        availableCards,
        setAvailableCards,
        selectedCards,
        setSelectedCards,
        availableCardsStats,
        setAvailableCardsStats,
        selectedCardsStats,
        setSelectedCardsStats,
        cardMinted,
        accountBalance,
        LobbyStatus,
        setLobbyStatus,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);