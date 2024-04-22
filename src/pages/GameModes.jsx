import React from 'react'
import { useState } from 'react'
import { GameMode, Nav } from '../components'
import { useNavigate } from 'react-router-dom'
import styles from '../styles'

const GameModes = () => {
    const props = {
        imageAlt: 'image',
        title: 'Tiger Theme',
        imageSrc: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
    }
    const navigate = useNavigate();
    const [mode, setMode] = useState('');
    const handleChange = (e) => {
        console.log("wefwrrwgwrgrw");
        setMode(e.target.value);
        navigate(`/arena/${mode}`);
    }
  return (
    <>
      <Nav></Nav>
      <div className={styles.gameModesContainer}>
      <div className={styles.gameModesFeatures}>
        <h1 className={styles.gameModesHeading}>Ready to Play? Select a mode</h1>
        <div className={styles.gameModesContainer1}>
          <GameMode props={props} value='tiger'></GameMode>
          <GameMode props={props} value='' ></GameMode>
          <GameMode props={props} value='' ></GameMode>
          <GameMode props={props} value='' ></GameMode>
        </div>
        <button className={styles.button} onClick={(e)=>navigate(`/arena/tiger`)}>Navig</button>
        </div>
      </div>
    </>
  )
}

export default GameModes
