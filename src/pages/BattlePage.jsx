import React, {useState} from 'react'
import { useParams } from 'react-router-dom';
import styles from '../styles'
import { useGlobalContext } from '../context'
import Alert from '../components/Alert'
import cardBack from '../assets/images/cardBack.png'

const BattlePage = () => {
    const { selectedCards } = useGlobalContext();
    console.log(selectedCards);
    const { battlename } = useParams();
    const [clickedIndex, setClickedIndex] = useState(null);
    const [toss, setToss] = useState(true);
    const regex = /^[0-9\b]+$/;
    const [number, setNumber] = useState('');
    const {showAlert, setShowAlert} = useGlobalContext();

    const handleContainerClick = (index) => {
      setClickedIndex(index === clickedIndex ? null : index);
    };

    const handleValueChange = (value) => {
        setNumber(value);
    }   

    const handleToss = async () => {
        if(number === ''){
            setShowAlert({
                status: true,
                type: 'failure',
                message: 'Please enter a number',
              });
            // return;
        };
        // await contract.toss(number);
        setToss(false);
    }

    return (
    <div className='w-full h-screen flex flex-col'>
        {showAlert?.status && <Alert type={showAlert.type} message={showAlert.message} />}
        {/* <h1 className='text-3xl text-slate-950 text-center mb-4'>Battle Page</h1> */}
        <p className='mt-4 text-3xl font-bold text-slate-950 text-center mb-4'>Welcome to the Battle {battlename}</p>
        <div className='flex flex-row h-full w-full'>
            <div className='flex flex-col w-6/12 items-center'>
                <div className={styles.battlePageContainer}>
                    {selectedCards.map((link, index) => (
                        <div 
                        key={index} 
                        className={`${styles.battleCardContainer} ${index === clickedIndex ? styles.clicked : ''}`} 
                        style={{ zIndex: index === clickedIndex ? selectedCards.length + 1 : selectedCards.length - index }}
                        onClick={() => handleContainerClick(index)}
                        >
                        <img src={link} className={`${styles.cardImg} mb-2`} alt={`Image ${index + 1}`} />
                        </div>
                    ))}
                </div>
                {
                    toss?
                    <div className='flex flex-col'>
                        <p className='font-bold text-xl'>Choose a number between 1-100</p>
                        <div className='flex flex-row items-center justify-center'>
                            <input type="text" placeholder='Number' className='text-slate-950 outline-slate-950 w-24 h-10 p-4 m-4 rounded-md border-[1px] border-slate-950'
                                onChange={(e) => {
                                    if (e.target.value === '' || regex.test(e.target.value)) handleValueChange(e.target.value);
                                  }}/>
                            <button className='text-white w-[70px] text-center h-10 m-4 transition-[0.3s] border-2 border-solid border-white bg-slate-950 rounded-md hover:text-black hover:bg-white'
                                onClick={()=>handleToss()}>Enter</button>
                        </div>
                    </div>
                    :
                    <div className='flex flex-row p-4 items-center justify-center'>
                        <select name="cars" id="cars" className={styles.selectDropdown}>
                            <option className={styles.selectOption} value="select stat">Select Stat</option>
                            <option className={styles.selectOption} value="volvo">Volvo</option>
                            <option className={styles.selectOption} value="saab">Saab</option>
                            <option className={styles.selectOption} value="mercedes">Mercedes</option>
                            <option className={styles.selectOption} value="audi">Audi</option>
                        </select>
                        <button className='text-center rounded-md px-[20px] py-[8px] border-2 ml-4 bg-slate-950 text-white transition-[0.3s] hover:bg-blue-600 hover:border-blue-800'>Call</button>
                    </div>
                }
                
            </div>
            

            <div className={styles.battlePageContainerFixed}>
                {selectedCards.map((link, index) => (
                    <div key={index} className={`${styles.battleCardContainerFixed} `}>
                    <img src={cardBack} className={`w-full h-full object-contain mb-2`} alt={`Image ${index + 1}`} />
                    {/* <button className={`${styles.btn} ${ selectedCards.includes(link) ? "bg-blue-700 text-white" : "text-white"}`} onClick={() => handleButtonClick(link)}>Select</button> */}
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default BattlePage
