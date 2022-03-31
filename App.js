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

const PlayerScreen = (props) => {

  if(props.length < 4) {
    return (
      <View style={styles.players}>
        {props.players}
      </View>
    )
  }

  if (props.length === 4) {
    return (
      <View style={styles.container}>
          <View style={styles.row6}>
            {props.players[0]}
            {props.players[1]}
          </View>
          <View style={styles.row6}>
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
        <View style={{backgroundColor:'green', flex:4}}>
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
      <View style={styles.container}>
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


function MainScreen() {
  const fontSizes = {2:100,3:90,4:60,5:50,6:40}
  const [playersID, setPlayersID] = useState({players:
    [{id:generateID(), rotation:"180deg", health:20, fontsize:fontSizes[2]},
    {id:generateID(), rotation:"0deg", health:20, fontsize:fontSizes[2]},] })
  const [showBar, setShowBar] = useState(false)
  const [playerHealth, setPlayerHealth] = useState(20)
  const [players, setPlayers] = useState(playersID.players.map((player) => 
  <Player key={player.id} health={playerHealth} rotation={player.rotation} fontsize={player.fontsize}/>))

  const updatePlayers = () => {
    setPlayers(playersID.players.map((player, i) => (
    <Player key={player.id} health={player.health} rotation={player.rotation} index={i} fontsize={fontSizes[players.length]}/>)))
  }

  useEffect(() => {
    updatePlayers()
  }, [playersID])

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

  const addPlayer = () => {
    if(playersID.players.length < 6) {
      const tmpPlayers = {...playersID}
      tmpPlayers.players.push({id: generateID(), health:playerHealth})
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
        <PlayerScreen players= {players} length={playersID.players.length}/>
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
    overflow:'hidden',
    borderColor:'#fff',
    backgroundColor:'grey',
  },
  container: {
    flex:1,
  },
  row : {
    flex:2,
    flexDirection: 'row', 
  },
  row6: {
    flex:1,
    flexDirection: 'row',
  },
  modalView: {
    margin: 20,
    marginTop: 70,
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
    //transform: [{ rotate:'90deg'} ,{translateY:Dimensions.get('window').width/2}]
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