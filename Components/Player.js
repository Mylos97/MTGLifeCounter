import React, { useState } from 'react'
import { StyleSheet, Button, Text, View } from "react-native";
import { COLORS } from '../Values/Colors';

const Player = (props) => {
   
    const colors = ['red','green','blue','black', 'white']
    const [life, setLife] = useState(props.health)
    const [color, setColor] = useState(colors[Math.floor(Math.random() * 3)])
    const [colorIndex, setColorIndex] = useState(0)

    return (
        <View style={[styles.container , {backgroundColor: COLORS[color]}]}>
            <Text style={styles.text}> {life}</Text> 
            <View style={styles.btns}>
                <Button style={styles.btn} onPress={() => setLife(life+1)} title="+" />
                <Button style={styles.btn} onPress={() => setLife(life-1)} title="-" />
            </View>
            <View>
                <Button style={styles.btns} onPress={() => {
                    setColorIndex((colorIndex + 1) % colors.length) 
                    setColor(colors[colorIndex])
                    }} title="Change Color"/>
            </View>

        </View> 
    )
} 

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'blue',
      width: '100%', 
      flex:1,
      alignItems: 'center'
    },
    text: {
        fontSize: 32,
        color: COLORS.fontColor,
        //transform: [{rotate:'90deg'}]
    }, 
    btns : {
        flexDirection:"row",
        //transform: [{rotate:'90deg'}]
    }
  });


export default Player