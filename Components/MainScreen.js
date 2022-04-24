import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Modal, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-web';
import { getData, storeData } from '../Values/Storage';
import React, { useState, useEffect, useRef } from 'react'
import GestureRecognizer from 'react-native-swipe-gestures';
import Player from './Player';
import Btn from './Btn';
import MyText from './MyText';
import { COLORS, getTheme, updateIndex } from '../Values/Colors'
import PlayerScreen from './PlayerScreen';
import Dice from './Dice';

const generateID = () => {
  const r = (Math.random() + 1).toString(36).substring(7)
  return r
}

const MainScreen = () => {
  const fontSizes = {2:100,3:100,4:90,5:80,6:80}
  const themes = ['purple', 'pink', 'grey']
  const [showBar, setShowBar] = useState(false)
  const [playerHealth, setPlayerHealth] = useState(20)
  const [mode, setMode] = useState('Commander')
  const [themeIndex, setThemeIndex] = useState(null)
  const [loading, setLoading] = useState(true)
  const [theme, setTheme] = useState(getTheme())
  const [players, setPlayers] = useState(null)
  const [selectedDice, setSelectedDice] = useState(0)
  const [playersID, setPlayersID] = useState({players: [{id:generateID(), rotation:"180deg", health:20, fontsize:fontSizes[2], mode:mode, theme:theme, size:2},
    {id:generateID(), rotation:"0deg", health:20, fontsize:fontSizes[2], mode:mode, theme:theme, size:2}]})
    
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
    modalShown={player.modalShown}
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
      setShowBar(prev => !prev)
    }}
    onSwipeRight={() => {
        setShowBar(prev => !prev)
    }}
    onSwipeUp={() => {
      setShowBar(prev => !prev)
    }}
    onSwipeDown={() => {
      setShowBar(prev => !prev)
    }}
    >
    <TouchableWithoutFeedback 
    onPress={() => {
      if(showBar) {
        setShowBar(prev => !prev)
      }
      Keyboard.dismiss()}}>
      <View style={[styles.players , {backgroundColor:theme ? theme.primary : null}]}>
      <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{flex:1, marginTop: playersID.players.length === 3 ? 32 : 16}}> 
      <Modal
        animationType='fade'
        transparent={true}
        visible={showBar}
        onRequestClose={() => {
          setShowBar(prev => !prev);
        }}
        onPress={(e) => e.preventDefault()}
      >
        <View style={[{flex: 1}, ( showBar ) ? {backgroundColor:'rgba(0,0,0,0.3)'} : '']}>
          <View style={[styles.modalView, {backgroundColor: theme ? theme.primary : null, flexDirection:'column'}]}>
              <View style={{flexDirection:'row', marginBottom:32}}>
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
                />
              </View>
              <View style={{alignItems:'center', marginLeft:8}}>
                <MyText 
                  text='Game mode'
                  style={{color:theme ? theme.secondary : COLORS.colorSecondary, fontSize:18}}
                />
                <Btn 
                  onPress={() => {
                  setMode(mode => mode === 'Standard' ? 'Commander' : 'Standard')
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
              <Dice 
                theme={theme}
                selectedDice={selectedDice}
                setSelectedDice={setSelectedDice}
              />
                <View style={{marginTop:32}}>
                <Btn 
                onPress={() => setShowBar(prev => !prev)}
                title={'close'}
                color={theme ? theme.tertiary : COLORS.colorTertiary}
                textColor={theme ? theme.secondary : COLORS.colorSecondary}
                />
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
      marginTop: 80,
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

export default MainScreen