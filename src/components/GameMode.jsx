import React from 'react'
import styles from '../styles'

const GameMode = (props) => {
  // console.log(props.props.title)
  // console.log(props)
  return (
    <div className={styles.gameModeCard}>
      <h2 className={styles.gameModeText}>{props.props.title}</h2>
      <img
        alt={props.props.imageAlt}
        src={props.props.imageSrc}
        className={styles.gameModeImage}
      />
    </div>
  )
}

export default GameMode
