import React from 'react'
import { GameMode, Nav } from '../components'
import styles from '../styles'
// import { useGlobalContext } from '../context'

const MarketPlace = () => {
    
  return (
    <>
      <Nav></Nav>
        <div className={styles.gameModesContainer}>
        <h1 className={styles.gameModesHeading}>Ready to Play? Select a theme</h1>
        </div>
    </>
  )
}

export default MarketPlace
