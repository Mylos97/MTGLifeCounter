import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Modal, Button } from 'react-native';
import { registerRootComponent } from 'expo';
import { Dimensions } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-web';
import React, { useState, useEffect } from 'react'
import GestureRecognizer from 'react-native-swipe-gestures';
import Player from './Components/Player';
import Btn from './Components/Btn';
import { COLORS } from './Values/Colors';

const generateID = () => {
  const r = (Math.random() + 1).toString(36).substring(7)
  return r
}

function MainScreen() {
  const [playersID, setPlayersID] = useState({players:[{id:generateID()},{id:generateID()},{id:generateID()}, {id:generateID()}]})
  const [showBar, setShowBar] = useState(false)
  const [playerHealth, setPlayerHealth] = useState(20)
  const [players, setPlayers] = useState(playersID.players.map((player) => <Player key={player.id} health={playerHealth}/>))

  const updatePlayers = () => {
    setPlayers(playersID.players.map((player) => <Player key={player.id} health={playerHealth} />))
  }

  useEffect(() => {
    updatePlayers()
  },[playersID])

  const clearPlayerIDs = () => {
    const tmpPlayers = {players:[]}
    for(let i = 0 ; i < playersID.players.length ; i++) {
      tmpPlayers.players.push({id: generateID()})
    }
    setPlayersID(tmpPlayers)
  }

  const updatePlayerHealth = () => {
    if (playerHealth + 10 > 40) {
      setPlayerHealth(20)
    } else {
      setPlayerHealth(playerHealth + 10)
    }
    clearPlayerIDs()
  }

  const addPlayer = () => {
    if(playersID.players.length < 6) {
      const tmpPlayers = {...playersID}
      tmpPlayers.players.push({id: generateID()})
      setPlayersID(tmpPlayers)
      updatePlayers()
    } 
  }

  const removePlayer = () => {
    if(playersID.players.length > 2) {
      const tmpPlayers = {...playersID}
      tmpPlayers.players.pop(tmpPlayers.players.length - 1)
      setPlayersID(tmpPlayers)
      updatePlayers()
    } 
  }


  return (
    <GestureRecognizer 
    style={styles.players} 
    onSwipeLeft={() => {
      setShowBar(true)
    }}
    onSwipeRight={() => {
      if(showBar){
        setShowBar(false)}
    }}
    >
    <TouchableWithoutFeedback 
    onPress={() =>{
      if(showBar) {
        setShowBar(false)
      }
    }}>
      <View style={styles.players}>
      <Modal
        animationType='fade'
        transparent={true}
        visible={showBar}
        onRequestClose={() => {
          setShowBar(!showBar);
        }}
        onPress={(e) => e.preventDefault()}
      >
        <View style={styles.centeredView} >
          <View style={styles.modalView}>
              <View style={styles.addBtns}>
                <View style={styles.btn}>
                  <Btn 
                  color={COLORS.btnAdd}
                  onPress={() => addPlayer()} 
                  title="Add player" />
                </View>
                <View>
                <Btn 
                color={COLORS.btnRemove}
                onPress={() => removePlayer()} 
                title="Remove player"/>
                </View>
              </View>
              <View>
                <Text>
                  Life total
                </Text>
                <View>
                </View>
                <Btn 
                onPress={() => updatePlayerHealth()}
                title={playerHealth}
                color={COLORS.red}
                ></Btn>
              </View>
          </View>
        </View>
      </Modal>
        {players}
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
    </GestureRecognizer>

  )
}

export default function App() {
  return (
      <MainScreen/>
  );
}

const styles = StyleSheet.create({
  players: {
    flex: 1,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flexDirection:'row',
    justifyContent:'center'
  },
  centeredView: {
    flex: 1,
    transform: [{ rotate:'90deg'} ,{translateY:Dimensions.get('window').width/2}]
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