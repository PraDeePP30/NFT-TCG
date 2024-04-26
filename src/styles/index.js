const styles = {
    // general
    headText: 'font-rajdhani font-bold text-white sm:text-6xl text-4xl',
    normalText: 'font-rajdhani font-normal text-[24px] text-siteWhite',
    footerText: 'font-rajdhani font-medium text-base text-white',
    infoText: 'font-rajdhani font-medium mt-4 text-lg text-slate-950 cursor-pointer',

    // input: 'bg-siteDimBlack text-white outline-none focus:outline-siteViolet p-4 rounded-md sm:max-w-[50%] max-w-full',
    input: 'text-slate-950 outline-slate-950 p-4 m-4 rounded-md border-[1px] border-slate-950',
    button: 'text-white w-[140px] h-12 text-[1.75rem] m-4 transition-[0.3s] border-2 border-solid border-white bg-slate-950 rounded-md hover:text-black hover:bg-white',
    buttonLight: 'text-black w-[140px] h-12 text-[1.75rem] m-4 transition-[0.3s] border-2 border-solid border-black bg-white rounded-md hover:text-white hover:bg-slate-950',
    text: 'text-black font-bold text-2xl text-center p-2',
    // glassmorphism
    glassEffect: 'bg-white backdrop-filter backdrop-blur-lg bg-opacity-10',
  
    // Home page
    homeBanner: 'w-full flex items-center pt-[64px] pl-[48px] pr-[48px] flex-col pb-[64px] justify-center bg-slate-950',
    homeText: 'text-white text-xs text-center font-semibold mb-[32px] tracking-[2px] uppercase',
    homeSubText: 'text-white text-5xl text-center mb-[16px]',
    homeButton: 'text-white w-[170px] h-14 text-[1.75rem] mt-[16px] transition-[0.3s] border-2 border-solid border-white bg-slate-950 ml-0 rounded-md hover:text-black hover:bg-white',

    //game mode
    gameModeCard: 'w-auto h-auto flex p-[16px] shadow-[5px_5px_10px_0px_rgba(18,18,18,0.1)] items-center flex-col justify-center hover:shadow-[5px_5px_10px_0px_rgba(18,18,18,0.5)]',
    gameModeCardNA: 'w-auto h-auto flex p-[16px] shadow-[5px_5px_10px_0px_rgba(18,18,18,0.1)] bg-neutral-400 items-center flex-col justify-center',
    gameModeText: 'text-4xl mb-[32px] font-bold',
    gameModeImage: 'w-[415px] h-[250px] object-cover rounded-md',

    gameModesContainer: 'w-full flex overflow-hidden items-start flex-col justify-start',
    gameModesFeatures: 'w-full h-full flex p-[48px] max-w-full flex-col',
    gameModesHeading: 'text-5xl mb-[48px] font-bold',
    gameModesContainer1: 'flex-[0_0_auto] w-full h-full grid gap-[100px] items-start grid-cols-3',

    //arena Home page
    arenaHomeContainer: 'w-full static items-center justify-center flex flex-row overflow-hidden',
    arenaHomeBattlesContainer: 'w-3/12 h-auto border-r-4 border-slate-950 flex items-center justify-center p-10 flex-col',
    arenaHomeCardsContainer: 'w-full h-full flex items-center justify-center p-4 grid grid-cols-3 place-content-around overflow-scroll',

    //battle page
    battlePageContainer: 'w-full h-auto flex pt-10 pl-10 pb-10 items-start justify-start flex-row',
    battlePageContainerFixed: 'w-6/12 h-full flex pt-10 pl-10 items-start justify-start flex-row',
    battleCardContainer: 'w-[250px] h-[300px] flex flex-col items-center justify-center mr-[-50px] cursor-pointer transition-[0.3s] ease-in-out glass-morphism relative hover:z-[9999] hover:scale-[1.1]',
    battleCardContainerFixed: 'w-[250px] h-[300px] flex flex-col items-center rounded-md justify-center mr-[-50px] cursor-pointer transition-[0.3s] ease-in-out glass-morphism relative',
    clicked:'z-[9999] scale-[1.1]',
    selectDropdown: 'w-[170px] h-[40px] bg-white text-black rounded-md outline-slate-300 border-[1px] border-slate-500 hover:border-2 hover:border-slate-950 focus:border-2 focus:border-blue-300 text-center cursor-pointer',
    selectOption: 'p-[10px] text-sm',
    // hoc page
    hocContainer: 'min-h-screen flex xl:flex-row flex-col relative',
    hocContentBox: 'flex flex-1 justify-between bg-siteblack py-8 sm:px-12 px-8 flex-col',
    hocLogo: 'w-[160px] h-[52px] object-contain cursor-pointer',
    hocBodyWrapper: 'flex-1 flex justify-center flex-col xl:mt-0 my-16',
  
    // join battle page
    joinHeadText: 'font-rajdhani font-semibold text-2xl text-white mb-3',
    joinContainer: 'flex flex-col gap-3 mt-3 mb-5',
    joinBattleTitle: 'font-rajdhani font-normal text-xl text-white',
    joinLoading: 'font-rajdhani font-normal text-xl text-white',

    // navbar
    navContainer: 'w-full h-[78px] bg-slate-950 flex sticky top-0 items-center justify-end pt-[16px]',
    navIcon: 'w-[78px] h-[78px] p-[20px] mr-[8px] fill-white hover:bg-white hover:fill-black active:fill-black active:bg-white',

    // battleground page
    battlegroundContainer: 'min-h-screen bg-landing flex-col py-12 px-4',
    battleGroundsWrapper: 'flex-wrap mt-10 max-w-[1200px]',
    battleGroundCard: 'sm:w-[420px] w-full h-[260px] p-2 glass-morphism m-4 rounded-lg cursor-pointer battle-card',
    battleGroundCardImg: 'w-full h-full object-cover rounded-md',
    battleGroundCardText: 'font-rajdhani font-semibold text-2xl text-white',
  
    // Game page
    gameContainer: 'w-screen min-h-screen bg-cover bg-no-repeat bg-center flex-col',
    gameMoveBox: 'sm:w-20 w-14 sm:h-20 h-14 rounded-full cursor-pointer border-[2px]',
    gameMoveIcon: 'w-1/2 h-1/w-1/2 object-contain',
  
    // player info component
    playerImg: 'w-14 h-14 object-contain rounded-full',
    playerHealth: 'flex flex-row bg-white rounded-md p-2 sm:min-w-[512px] min-w-[312px] sm:min-h-[48px] min-h-[40px] bg-opacity-10 backdrop-filter backdrop-blur-lg mx-3',
    playerHealthBar: 'sm:w-4 w-2 sm:h-8 h-6 rounded-sm',
    playerMana: 'w-14 h-14 rounded-full text-white font-rajdhani font-extrabold text-2xl cursor-pointer',
    playerInfo: 'font-rajdhani font-medium',
    playerInfoSpan: 'font-extrabold text-white',
  
    // card component
    cardContainer: 'w-[250px] h-[350px] flex flex-col items-center justify-center m-10 glass-morphism',
    cardImg: 'w-full h-full object-contain',
    cardPointContainer: 'absolute sm:w-[40px] w-[32px] sm:h-[40px] h-[32px] rounded-[25px] bottom-[31.4%]',
    cardPoint: 'font-rajdhani text-[20px] font-bold',
    cardTextContainer: 'absolute w-full bottom-[13.5%] left-3',
    cardText: 'font-rajdhani text-[26px] font-bold text-white',
    cardBtn: 'px-4 py-2 rounded-lg w-fit text-white font-bold border-2 hover:bg-white hover:border-slate-950 hover:text-slate-950 transition-all ease-in duration-300',
  
    // custom button component
    btn: 'px-4 py-2 rounded-lg bg-stone-950 w-fit text-white font-bold border-2 hover:bg-white hover:border-slate-950 hover:text-slate-950 transition-all ease-in duration-300',
  
    // custom input component
    label: 'font-rajdhani font-semibold text-2xl text-white mb-3',

    // gameload component
    gameLoadContainer: 'absolute inset-0 z-10 w-full h-screen gameload flex-col',
    gameLoadBtnBox: 'w-full flex justify-end px-8',
    gameLoadText: 'font-rajdhani text-siteWhite text-2xl mt-5 text-center',
    gameLoadPlayersBox: 'flex justify-evenly items-center mt-20',
    gameLoadPlayerImg: 'md:w-36 w-24 md:h-36 h-24 object-contain rounded-full drop-shadow-lg',
    gameLoadPlayerText: 'mt-3 font-rajdhani text-white md:text-xl text-base',
    gameLoadVS: 'font-rajdhani font-extrabold text-siteViolet text-7xl mx-16',
  
    // gameInfo component
    gameInfoIconBox: 'absolute right-2 top-1/2',
    gameInfoIcon: 'bg-siteViolet w-10 h-10 rounded-md cursor-pointer',
    gameInfoIconImg: 'w-3/5 h-3/5 object-contain invert',
    gameInfoSidebar: 'absolute p-6 right-0 top-0 h-screen rounded-md flex-col transition-all ease-in duration-300',
    gameInfoSidebarCloseBox: 'flex justify-end mb-8',
    gameInfoSidebarClose: 'w-10 h-10 rounded-md bg-siteViolet text-white font-rajdhani font-extrabold text-xl cursor-pointer',
    gameInfoHeading: 'font-rajdhani font-bold text-white text-3xl',
    gameInfoText: 'font-rajdhani font-medium text-white text-xl mb-2',
  
    // common
    flexCenter: 'flex items-center justify-center',
    flexEnd: 'flex justify-end items-end',
    flexBetween: 'flex justify-between items-center',
  
    // alert
    info: 'text-blue-700 bg-blue-100 dark:bg-blue-200 dark:text-blue-800',
    success: 'text-green-700 bg-green-100 dark:bg-green-200 dark:text-green-800',
    failure: 'text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800',
    alertContainer: 'absolute z-10 top-5 left-0 right-0',
    alertWrapper: 'p-4 rounded-lg font-rajdhani font-semibold text-lg ',
    alertIcon: 'flex-shrink-0 inline w-6 h-6 mr-2',
  
    // modal
    modalText: 'font-rajdhani font-bold text-3xl text-black mb-6 text-center',
  };
  
  export default styles;