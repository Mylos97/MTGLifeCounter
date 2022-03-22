import React, { useState } from 'react'
import { StyleSheet, Button, Text, View } from "react-native";
import Btn from './Btn';
import { COLORS } from '../Values/Colors';

const Player = (props) => {
   
    const colors = ['red','green','blue','black', 'white']
    const [life, setLife] = useState(props.health)
    const [color, setColor] = useState(colors[Math.floor(Math.random() * 3)])
    const [colorIndex, setColorIndex] = useState(0)
    
    return (
        <View style={[styles.container , {backgroundColor: life > 0 ? COLORS[color] : 'rgb(255,100,98)'}]}>
            <Text style={styles.text}>{life}</Text> 
            <View style={styles.btns}>
                <Btn 
                onPress={() => setLife(life+1)} 
                color={COLORS.btnSecondary} 
                title="+" />
                <Btn 
                onPress={() => setLife(life-1)}
                color={COLORS.btnSecondary} 
                title="-" />
            </View>
            <View>
                <Btn 
                title="Change Color"
                color={COLORS.btnSecondary}
                onPress={() => {
                    setColorIndex((colorIndex + 1) % colors.length) 
                    setColor(colors[colorIndex])
                    }}/>
            </View>

        </View> 
    )
} 

const styles = StyleSheet.create({
    container: {
      width: '100%', 
      flex:1,
      alignItems: 'center',
      //transform: [{rotate:'90deg'}]
    },
    text: {
        fontSize: 32,
        color: COLORS.fontColor,
    }, 
    btns : {
        flexDirection:"row",
    }
  });


export default Player