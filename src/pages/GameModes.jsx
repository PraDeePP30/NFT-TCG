import React from 'react'
import { GameMode, Nav } from '../components'
import styles from '../styles'
// import { useGlobalContext } from '../context'

const GameModes = () => {
    const mode1 = {
        imageAlt: 'image',
        title: 'Tiger Arena',
        imageSrc: 'https://bafybeif3jsargnwtj3mni2a7tyxxs6a27wtkyok5zvald7yzqdzlmod4sq.ipfs.w3s.link/GameModes.png',
        value: 'tiger'
    }
    const mode2 = {
        imageAlt: 'image',
        title: 'Anime Arena',
        imageSrc: 'https://bafybeif3jsargnwtj3mni2a7tyxxs6a27wtkyok5zvald7yzqdzlmod4sq.ipfs.w3s.link/GameModesBW.png',
        value: 'anime'
    }
    const mode3 = {
        imageAlt: 'image',
        title: 'Tiger Theme',
        imageSrc: 'https://bafybeif3jsargnwtj3mni2a7tyxxs6a27wtkyok5zvald7yzqdzlmod4sq.ipfs.w3s.link/GameModesBW.png',
        value: 'tiger'
    }
    const mode4 = {
        imageAlt: 'image',
        title: 'Tiger Theme',
        imageSrc: 'https://bafybeif3jsargnwtj3mni2a7tyxxs6a27wtkyok5zvald7yzqdzlmod4sq.ipfs.w3s.link/GameModesBW.png',
        value: 'tiger'
    }
    // const {setIsOpen} = useGlobalContext();
    // setIsOpen(false);

  return (
    <>
      <Nav></Nav>
      <div className={styles.gameModesContainer}>
      <div className={styles.gameModesFeatures}>
        <h1 className={styles.gameModesHeading}>Ready to Play? Select a theme</h1>
        <div className={styles.gameModesContainer1}>
          <GameMode imageAlt={mode1.imageAlt} title={mode1.title} imageSrc={mode1.imageSrc} value={mode1.value} available={true}></GameMode>
          <GameMode imageAlt={mode2.imageAlt} title={mode2.title} imageSrc={mode2.imageSrc} value={mode2.value} available={false}></GameMode>
          <GameMode imageAlt={mode3.imageAlt} title={mode3.title} imageSrc={mode3.imageSrc} value={mode3.value} available={false}></GameMode>
          <GameMode imageAlt={mode4.imageAlt} title={mode4.title} imageSrc={mode4.imageSrc} value={mode4.value} available={false}></GameMode>
        </div>
        </div>
      </div>
    </>
  )
}

export default GameModes
