import React from 'react'
import { GameMode, Nav } from '../components'
import styles from '../styles'
// import { useGlobalContext } from '../context'

const GameModes = () => {
    const mode1 = {
        imageAlt: 'image',
        title: 'Tiger Arena',
        // imageSrc: 'https://bafybeif3jsargnwtj3mni2a7tyxxs6a27wtkyok5zvald7yzqdzlmod4sq.ipfs.w3s.link/GameModes.png',
        imageSrc: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/470f9a30-16fd-4122-bd0b-8db6a82e6ec4/d9bd6tr-117e99db-6608-4489-aa98-39bca349ad65.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzQ3MGY5YTMwLTE2ZmQtNDEyMi1iZDBiLThkYjZhODJlNmVjNFwvZDliZDZ0ci0xMTdlOTlkYi02NjA4LTQ0ODktYWE5OC0zOWJjYTM0OWFkNjUuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.7Sspga5YCRv5cOPQWhHG9uq5ZJ0aTW220sbT7KiQZc4',
        value: 'tiger'
    }
    const mode2 = {
        imageAlt: 'image',
        title: 'X Arena',
        imageSrc: 'https://bafybeif3jsargnwtj3mni2a7tyxxs6a27wtkyok5zvald7yzqdzlmod4sq.ipfs.w3s.link/GameModesBW.png',
        value: 'anime'
    }
    const mode3 = {
        imageAlt: 'image',
        title: 'Y Arena',
        imageSrc: 'https://bafybeif3jsargnwtj3mni2a7tyxxs6a27wtkyok5zvald7yzqdzlmod4sq.ipfs.w3s.link/GameModesBW.png',
        value: 'tiger'
    }
    const mode4 = {
        imageAlt: 'image',
        title: 'Z Arena',
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
