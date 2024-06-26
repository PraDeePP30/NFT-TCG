import { ethers } from 'ethers';

import { ABI } from '../contract';
// import { playAudio, sparcle } from '../utils/animation.js';
// import { defenseSound } from '../assets';

const AddNewEvent = (eventFilter, provider, cb) => {
  provider.removeListener(eventFilter);

  provider.on(eventFilter, (logs) => {
    const parsedLog = (new ethers.utils.Interface(ABI)).parseLog(logs);

    cb(parsedLog);
  });
};

//* Get battle card coordinates
const getCoords = (cardRef) => {
  const { left, top, width, height } = cardRef.current.getBoundingClientRect();

  return {
    pageX: left + width / 2,
    pageY: top + height / 2.25,
  };
};

const emptyAccount = '0x0000000000000000000000000000000000000000';

export const createEventListeners = ({ navigate, contract, provider, walletAddress, setShowAlert, player1Ref, player2Ref, setUpdateGameData, setCardMinted, cardMinted, setBattleCreated }) => {
  const NewPlayerEventFilter = contract.filters.NewPlayer();
  AddNewEvent(NewPlayerEventFilter, provider, ({ args }) => {
    console.log('New player created!', args);

    if (walletAddress.toLowerCase() === args.owner.toLowerCase()) {
      setShowAlert({
        status: true,
        type: 'success',
        message: 'Player has been successfully registered',
      });
    }
  });

const cardMintedEventFilter = contract.filters.NFTMinted();
AddNewEvent(cardMintedEventFilter, provider, ({ args }) => {
  console.log('New card Minted!', args);
  // console.log('initial:',cardMinted);
  // var negated = !cardMinted;
  // console.log('negated:',negated)
  // console.log('wallet addr',walletAddress);
  // console.log('args: ',args.recipient);
  if (walletAddress.toLowerCase() === args.recipient.toLowerCase()) {
    // console.log("ffefweff");
    setCardMinted(prevCardMinted => {
      // You can access the previous state (prevCardMinted) here
      console.log('Previous state:', prevCardMinted);
    
      // Toggle the value based on the previous state
      return !prevCardMinted;
    });
    // setCardMinted(negated);
  }
  // console.log('later',cardMinted);
});

const battleCreatedEvent = contract.filters.BattleCreated();
AddNewEvent(battleCreatedEvent, provider, ({args}) => {
  console.log('New battle Created!', args);
  // if (walletAddress.toLowerCase() === args.player1.toLowerCase() || walletAddress.toLowerCase() === args.player2.toLowerCase()) {
    if (walletAddress.toLowerCase() === args.host.toLowerCase()) {
    // navigate(`/arena/tiger/${args.battleName}`);
  }
  setUpdateGameData((prevUpdateGameData) => prevUpdateGameData + 1);
});

const battleJoinedEvent = contract.filters.BattleJoined();
AddNewEvent(battleJoinedEvent, provider, ({args}) => {
  console.log('Battle Joined!', args);
  const opponent = args.opponent;
  const battleName = args.battleName;
  // if (walletAddress.toLowerCase() === args.player1.toLowerCase() || walletAddress.toLowerCase() === args.player2.toLowerCase()) {
  if (walletAddress.toLowerCase() !== opponent.toLowerCase()){
    player2Ref.current = opponent;
  }
  setUpdateGameData((prevUpdateGameData) => prevUpdateGameData + 1);
});

  // const NewBattleEventFilter = contract.filters.NewBattle();
  // AddNewEvent(NewBattleEventFilter, provider, ({ args }) => {
  //   console.log('New battle started!', args, walletAddress);

  //   if (walletAddress.toLowerCase() === args.player1.toLowerCase() || walletAddress.toLowerCase() === args.player2.toLowerCase()) {
  //     navigate(`/battle/${args.battleName}`);
  //   }

  //   setUpdateGameData((prevUpdateGameData) => prevUpdateGameData + 1);
  // });

//   const NewGameTokenEventFilter = contract.filters.NewGameToken();
//   AddNewEvent(NewGameTokenEventFilter, provider, ({ args }) => {
//     console.log('New game token created!', args.owner);

//     if (walletAddress.toLowerCase() === args.owner.toLowerCase()) {
//       setShowAlert({
//         status: true,
//         type: 'success',
//         message: 'Player game token has been successfully generated',
//       });

//       navigate('/create-battle');
//     }
//   });

//   const BattleMoveEventFilter = contract.filters.BattleMove();
//   AddNewEvent(BattleMoveEventFilter, provider, ({ args }) => {
//     console.log('Battle move initiated!', args);
//   });

//   const RoundEndedEventFilter = contract.filters.RoundEnded();
//   AddNewEvent(RoundEndedEventFilter, provider, ({ args }) => {
//     console.log('Round ended!', args, walletAddress);

//     for (let i = 0; i < args.damagedPlayers.length; i += 1) {
//       if (args.damagedPlayers[i] !== emptyAccount) {
//         if (args.damagedPlayers[i] === walletAddress) {
//         //   sparcle(getCoords(player1Ref));
//         } else if (args.damagedPlayers[i] !== walletAddress) {
//         //   sparcle(getCoords(player2Ref));
//         }
//       } else {
//         // playAudio(defenseSound);
//       }
//     }

//     setUpdateGameData((prevUpdateGameData) => prevUpdateGameData + 1);
//   });

//   // Battle Ended event listener
//   const BattleEndedEventFilter = contract.filters.BattleEnded();
//   AddNewEvent(BattleEndedEventFilter, provider, ({ args }) => {
//     if (walletAddress.toLowerCase() === args.winner.toLowerCase()) {
//       setShowAlert({ status: true, type: 'success', message: 'You won!' });
//     } else if (walletAddress.toLowerCase() === args.loser.toLowerCase()) {
//       setShowAlert({ status: true, type: 'failure', message: 'You lost!' });
//     }

//     navigate('/create-battle');
//   });
};