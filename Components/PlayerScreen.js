import React from 'react'
import { View} from "react-native";

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

export default PlayerScreen