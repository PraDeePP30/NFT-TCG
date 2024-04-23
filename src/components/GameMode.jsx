import React from 'react'
import styles from '../styles'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const GameMode = (props) => {
  const { title, imageSrc, imageAlt, value } = props;
  const navigate = useNavigate();
  const [mode, setMode] = useState(value);

  const handleClick = () => {
    navigate(`/arena/${mode}`);
}
  return (
    <div className={styles.gameModeCard} onClick={handleClick}>
      <h2 className={styles.gameModeText}>{title}</h2>
      <img
        alt={imageAlt}
        src={imageSrc}
        className={styles.gameModeImage}
      />
      {/* <button className={styles.buttonLight} onClick={handleClick}>Select</button> */}
    </div>
  )
}

export default GameMode
