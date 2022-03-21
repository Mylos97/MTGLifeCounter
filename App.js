import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Modal, Button } from 'react-native';
import { registerRootComponent } from 'expo';
import { Dimensions } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-web';
import React, { useState } from 'react'
import GestureRecognizer from 'react-native-swipe-gestures';
import Player from './Components/Player';
import { COLORS } from './Values/Colors';

const generateID = () => {
  const r = (Math.random() + 1).toString(36).substring(7)
  return r
}

function MainScreen() {
  const [playersID, setPlayersID] = useState({players:[{id:generateID()},{id:generateID()},{id:generateID()}, {id:generateID()}]})
  const [showBar, setShowBar] = useState(false)
  const [players, setPlayers] = useState(playersID.players.map((player) => <Player key={player.id} health={40}/>))
  
  const updatePlayers = () => {
    setPlayers(playersID.players.map((player) => <Player key={player.id} health={40}/>))
  }

  const addPlayer = () => {
    if(playersID.players.length < 4) {
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
    onSwipeLeft={(state) => {
      setShowBar(true)
      console.log("i am open")
    }}
    onSwipeRight={(e) => {
      if(showBar){
        console.log("close sw")
        setShowBar(false)}
    }}
    >
    <TouchableWithoutFeedback onPress={() =>{
      if(showBar) {
        setShowBar(false)
        console.log("cloes")
      }
    }}>
      <View style={styles.players}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showBar}
        onRequestClose={() => {
          setShowBar(!showBar);
        }}
        onPress={(e) => e.preventDefault()}
      >
        <View style={styles.centeredView} >
          <View style={styles.modalView}>
              <Button 
              color={COLORS.btnAdd}
              onPress={() => addPlayer()} 
              title="Add player" />
              <Button 
              color={COLORS.btnRemove}
              onPress={() => removePlayer()} 
              title="Remove player"/>
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
    elevation: 5
  },
  centeredView: {
    flex: 1,
    transform: [{ rotate:'90deg'} ,{translateY:Dimensions.get('window').width/2}]

  },
});

registerRootComponent(App)