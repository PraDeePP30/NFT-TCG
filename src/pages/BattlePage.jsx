import React, {useState} from 'react'
import { useParams } from 'react-router-dom';
import styles from '../styles'
import { useGlobalContext } from '../context'
import cardBack from '../assets/images/cardBack.png'

const BattlePage = () => {
    const { selectedCards } = useGlobalContext();
    console.log(selectedCards);
    const { battlename } = useParams();
    const [clickedIndex, setClickedIndex] = useState(null);
    const handleContainerClick = (index) => {
      setClickedIndex(index === clickedIndex ? null : index);
    };

    return (
    <div className='w-full h-screen flex flex-col'>
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
