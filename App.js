import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Modal, KeyboardAvoidingView, Platform, Keyboard ,TouchableOpacity} from 'react-native';
import { registerRootComponent } from 'expo';
import {useFonts} from 'expo-font';
import { TouchableWithoutFeedback } from 'react-native-web';
import { getData, storeData } from './Values/Storage';
import React, { useState, useEffect, useRef } from 'react'
import GestureRecognizer from 'react-native-swipe-gestures';
import Player from './Components/Player';
import Btn from './Components/Btn';
import MyText from './Components/MyText';
import { COLORS, getTheme, updateIndex } from './Values/Colors';



const generateID = () => {
  const r = (Math.random() + 1).toString(36).substring(7)
  return r
}


const PlayerScreen = (props) => {

  if(props.length < 4) {
    return (
      <View style={{flex:1}}>
        {props.players}
      </View>
    )
  }

  if (props.length === 4) {
    return (
      <View style={{flex:1, flexDirection:'column' }}>
          <View style={{flex: 1, flexDirection:'row'}}>
            {props.players[0]}
            {props.players[1]}
          </View>
          <View style={{flex:1, flexDirection:'row'}}>
            {props.players[2]}
            {props.players[3]}
          </View>
    </View>
    )
  }
  if (props.length === 5) {
    return (
      <View style={{flex:1 , flexDirection:'column'}}>
        <View style={{flex:6, backgroundColor:'red', flexDirection:'row'}}>
          {props.players[0]}
          {props.players[1]}
        </View>
        <View style={{ flex:4}}>
          {props.players[4]}
        </View>
        <View style={{flex:6, backgroundColor:'blue', flexDirection:'row'}}>
          {props.players[2]}
          {props.players[3]}
        </View>
    </View>
    )
  }

  if (props.length === 6) {
    return (
      <View style={{flex:1}}>
          <View style={{flexDirection:'row', flex:1}}>
            {props.players[0]}
            {props.players[1]}
          </View>
          <View style={{flexDirection:'row',  flex:1}}>
            {props.players[2]}
            {props.players[3]}
          </View>
          <View style={{flexDirection:'row', flex:1}}>
            {props.players[4]}
            {props.players[5]}
          </View>
    </View>
    )
  }
}


const CommanderTable = (props) => {
  
  return (
    <View style={{flex: 1, backgroundColor: '#fff' }}>
    <Table borderStyle={{borderWidth: 1}}>
      <Row data={props.tableHead} style={{height: 40}} textStyle={{fontFamily:'BebasNeue-Regular'}}/>
      <TableWrapper style={{ flexDirection:'row'}}>
        <Col data={props.tableTitle} heightArr={[28,28]} style={{flex: 1, height:40}} textStyle={{fontFamily:'BebasNeue-Regular'}}/>
        <Rows data={props.tableData} style={{height:40}} textStyle={{fontFamily:'BebasNeue-Regular'}}/>
      </TableWrapper>
    </Table>
  </View>
  )
}

const MainScreen = () => {
  const fontSizes = {2:100,3:90,4:80,5:70,6:60}
  const themes = ['purple', 'pink', 'grey']
  const [showBar, setShowBar] = useState(false)
  const [playerHealth, setPlayerHealth] = useState(20)
  const [mode, setMode] = useState('Commander')
  const [themeIndex, setThemeIndex] = useState(null)
  const [loading, setLoading] = useState(true)
  const [theme, setTheme] = useState(getTheme())
  const [players, setPlayers] = useState(null)
  const [showCommanderDamage, setShowCommanderDamage] = useState(false)
  const [table, setTable] = useState(null)
  const [playersID, setPlayersID] = useState(
        {players: [{id:generateID(), rotation:"180deg", health:20, fontsize:fontSizes[2], mode:mode, theme:theme, size:2},
        {id:generateID(), rotation:"0deg", health:20, fontsize:fontSizes[2], mode:mode, theme:theme, size:2}]})
  const componentMounted = useRef(true)
  
  useEffect(async () => {
    let isMounted = true
    try {
      if(isMounted) setLoading(true)
      await getData().then(data => {
        if(isMounted) setThemeIndex(data.index)
        if(isMounted) setLoading(false)
        if(isMounted) updatePlayers()
        if(isMounted) updateIndex(data.index)
      })
    } catch (e) {
      console.log(e)
    }
    return () => {isMounted = false}
  },[])

  const updatePlayers = () => {
    setPlayers(playersID.players.map((player, i) => (
    <Player 
    key={player.id} 
    health={player.health} 
    rotation={player.rotation} 
    index={i} 
    fontsize={fontSizes[playersID.players.length]}
    mode={player.mode}  
    theme={theme}
    size={playersID.players.length}
    />)))
  }

  useEffect(() => {
    updatePlayers()
  }, [playersID])

  useEffect(() => {
    updateMode()
  },[mode])

  useEffect(() => {
    updatePlayers()
  },[theme])

  useEffect(() => {
    storeData({index:themeIndex}).then(() => {
      updateIndex(themeIndex)
      setTheme(getTheme())
    })
  },[themeIndex])

  const updatePlayerHealth = () => {
    const tmpPlayers = {...playersID}
    if (playerHealth + 10 > 40) {
      setPlayerHealth(20)
      tmpPlayers.players.map((p) => {
        p.health = 20
        return p
      })
    } else {
      setPlayerHealth(playerHealth + 10)
      tmpPlayers.players.map((p) => {
        p.health = playerHealth + 10
        return p
      })
    } 
    setPlayersID(tmpPlayers)
    updatePlayers()
  }

  const updateMode = () => {
    const tmpPlayers = {...playersID}
    tmpPlayers.players.map((p) => {
      p.mode = mode
      return p
    })
    setPlayersID(tmpPlayers)
    updatePlayers()
  }

  const addPlayer = () => {
    if(playersID.players.length < 6) {
      const tmpPlayers = {...playersID}
      tmpPlayers.players.push({id: generateID(), health:playerHealth, mode:mode, theme:theme})
      if(tmpPlayers.players.length <= 3) {
        tmpPlayers.players.map((player,i) => {
          if (i == 1) {
            player.rotation = "180deg"
          } else {
            
            player.rotation = "0deg"
          }
          return player
        })
      }
      if(tmpPlayers.players.length == 4) {
        tmpPlayers.players.map((player,i) => {
          if (i == 1 || i == 0) {
            player.rotation = "180deg"
          } else {
            player.rotation = "0deg"
          }
          return player
        })
      }
      if(tmpPlayers.players.length == 5) {
        tmpPlayers.players.map((player,i) => {
          if (i == 0 || i == 1) {
            player.rotation = "180deg"
          } 
          else if (i == 4 ) {
            player.rotation = "0deg"
          } else if (i == 2 || i == 3) {
            player.rotation = "0deg"
          }
          return player
        })
      }
      if(tmpPlayers.players.length == 6) {
        tmpPlayers.players.map((player,i) => {
          if (i == 0 || i == 1) {
            player.rotation = "180deg"
          } 
          else if (i == 2 ) {
            player.rotation = "90deg"
            
          } else if (i == 3) {
            player.rotation = "270deg"
          } else {
            player.rotation = "0deg"
          }
          return player
        })
      }

      setPlayersID(tmpPlayers)
      updatePlayers()
    } 
  }

  const removePlayer = () => {
    if(playersID.players.length > 2) {
      const tmpPlayers = {...playersID}
      tmpPlayers.players.pop(tmpPlayers.players.length - 1)
      if(tmpPlayers.players.length == 2) {
        tmpPlayers.players.map((player,i) => {
          if (i == 1) {
            player.rotation = "0deg"
          } else {
            player.rotation = "180deg"
          }
          return player
        })
      }
      if(tmpPlayers.players.length == 3) {
        tmpPlayers.players.map((player,i) => {
          if (i == 1 || i == 2) {
            player.rotation = "0deg"
          } else {
            player.rotation = "180deg"
          }
          return player
        })
      }

      if(tmpPlayers.players.length == 4) {
        tmpPlayers.players.map((player,i) => {
          if (i == 1 || i == 0) {
            player.rotation = "180deg"
          } else {
            player.rotation = "0deg"
          }
          return player
        })
      }
      if(tmpPlayers.players.length == 5) {
        tmpPlayers.players.map((player,i) => {
          if (i == 0 || i == 1) {
            player.rotation = "180deg"
          } 
          else if (i == 2 || i == 3) {
            player.rotation = "0deg"
          } else {
            player.rotation = "0deg"
          }
          return player
        })
      }
      setPlayersID(tmpPlayers)
      updatePlayers()
    } 
  }

  if(loading) {
    return null
  }

  return (
    <GestureRecognizer 
    style={styles.players} 
    onSwipeLeft={() => {
      setShowBar(true)
    }}
    onSwipeRight={() => {
        setShowBar(false)
    }}
    onSwipeUp={() => {
      setShowBar(true)
    }}
    onSwipeDown={() => {
      setShowBar(false)
    }}
    >
    
    <TouchableWithoutFeedback 
    onPress={() => {
      if(showBar) {
        setShowBar(false)
      }
      Keyboard.dismiss()}}>
      <View style={[styles.players , {backgroundColor:theme ? theme.primary : null}]}>
      <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{flex:1, marginTop:16}}> 
      <Modal
        animationType='fade'
        transparent={true}
        visible={showBar}
        onRequestClose={() => {
          setShowBar(!showBar);
        }}
        onPress={(e) => e.preventDefault()}
      >
        <View style={[{flex: 1}, showBar | showCommanderDamage ? {backgroundColor:'rgba(0,0,0,0.3)'} : '']}>
          <View style={[styles.modalView, {backgroundColor: theme ? theme.primary : null, flexDirection:'column'}]}>
              <View style={{flexDirection:'row'}}>

              <View style={styles.addBtns}>
                <View>
                <MyText 
                style={{color:theme ? theme.secondary : COLORS.colorSecondary, fontSize:18, textAlign:'center'}}
                text='Players'
                />
                  <Btn 
                  color={theme ? theme.tertiary : COLORS.colorTertiary}
                  textColor={theme ? theme.secondary : COLORS.colorSecondary}
                  onPress={() => addPlayer()} 
                  title="Add player" />
                </View>
                <View>
                <Btn 
                color={theme ? theme.tertiary : COLORS.colorTertiary}
                textColor={theme ? theme.secondary : COLORS.colorSecondary}
                onPress={() => removePlayer()} 
                title="Remove player"/>
                </View>
              </View>
              <View style={{ marginRight:8}}>
                <MyText 
                style={{color:theme ? theme.secondary : COLORS.colorSecondary, fontSize:18}}
                text='Life total'
                />
                <View>
                </View>
                <Btn 
                onPress={() => updatePlayerHealth()}
                title={playerHealth}
                color={theme ? theme.tertiary : COLORS.colorTertiary}
                textColor={theme ? theme.secondary : COLORS.colorSecondary}
                ></Btn>
              </View>
              <View style={{alignItems:'center', marginLeft:8}}>
                <MyText 
                  text='Game mode'
                  style={{color:theme ? theme.secondary : COLORS.colorSecondary, fontSize:18}}
                />
                <Btn 
                  onPress={() => {
                  setMode(mode => mode == 'Standard' ? 'Commander' : 'Standard')
                  }}
                  title={mode}
                  color={theme ? theme.tertiary : COLORS.colorTertiary}
                  textColor={theme ? theme.secondary : COLORS.colorSecondary}
                  style={{width:88}}
                />
                <Btn
                  style={{width:88}}
                  color={theme ? theme.tertiary : COLORS.colorTertiary}
                  textColor={theme ? theme.secondary : COLORS.colorSecondary}
                  onPress={() => {
                    setThemeIndex(i => (i + 1) % themes.length )
                  }}
                  title={themes[themeIndex]}
                />
              </View>
              </View>
          </View>
        </View>
      </Modal>
        <PlayerScreen players= {players} length={playersID.players.length}/>
        <StatusBar style="auto" />
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
    </GestureRecognizer>
  )
}

export default function App() {
  const [fontsLoaded] = useFonts({
    'BebasNeue-Regular': require('./assets/BebasNeue-Regular.ttf'),
  })
  const [loading, setLoading] = useState(true)

  if(!fontsLoaded) {
      return null
  }

  return (
      <MainScreen/>
  )
}

const styles = StyleSheet.create({
  players: {
    flex: 1,
    overflow:'hidden',
    borderColor:'#fff',
    backgroundColor:COLORS.colorPrimary,
  },
  container: {
    flex:1,
  },
  modalView: {
    margin: 20,
    marginTop: 70,
    backgroundColor: COLORS.colorPrimary,
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 5,
    flexDirection:'row',
    justifyContent:'center'
  },
  btn: {
    marginBottom:12,
  },
  addBtns: {
    flexDirection:'column',
    marginRight:12,
  }
});

registerRootComponent(App)