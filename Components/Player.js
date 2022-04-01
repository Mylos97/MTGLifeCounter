import React, { useState, useEffect } from 'react'
import { StyleSheet, Button, Text, View, TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons'; 
import { COLORS } from '../Values/Colors';
import Btn from './Btn';


const Player = (props) => {
   
    const colors = ['red','green','blue','black', 'white']
    const rotations = ['0deg', '90deg', '180deg', '270deg']
    const [fontsize, setFontsize] = useState(props.fontsize)
    const [life, setLife] = useState(props.health)
    const [color, setColor] = useState(colors[Math.floor(Math.random() * 3)])
    const [colorIndex, setColorIndex] = useState(colors.indexOf(color) + 1)
    const [widthHeight , setWidthHeight] = useState(null)
    const [rotate, setRotate] = useState(props.rotation)
    const [rotateIndex, setRotationIndex] = useState(rotations.indexOf(props.rotation) + 1)


    const getRotation = (rotation) => {
        if (rotation == '0deg') {
            return 'row'
        }
        if (rotation == '180deg') {
            return 'row-reverse'
        }
    }

    useEffect(() => {
        setFontsize(props.fontsize)
        setLife(props.health)
        setRotationIndex(rotations.indexOf(props.rotation) + 1)
    }, [props.rotation, props.health, props.fontsize])
 
    return (
        <View style={{flex:1, flexDirection: getRotation(rotate) }  }>
            <TouchableOpacity 
            onPress={() => setLife(life-1)}
            style={{flex:1 , backgroundColor:'red' ,  justifyContent: 'center'}}>
            <View>
            <Text style={{textAlign:'center'}}>
                -
            </Text>
            </View>
            </TouchableOpacity>

            <View style={{flex:6 , backgroundColor: life > 0 ? COLORS[color] : 'rgb(255,100,98)', 
            alignItems:'center', justifyContent:'center', flexDirection:'column' }}>
                <View style={{transform: [{rotate: rotate ? rotate : "0deg"}], textAlign:'center'}}>
                <Text style={[styles.text, {fontSize:fontsize}]}>
                    {life}{props.index}
                </Text>
                <View style={{backgroundColor:'green', alignItems:'center'}}>
                <View style={{width:40, backgroundColor:'red'}}>
                <Feather 
                name="rotate-cw" 
                size={32} 
                color="black" 
                onPress={() => {
                    setRotationIndex((rotateIndex + 1) % rotations.length)
                    setRotate(rotations[rotateIndex])
                }}
                />
                </View>    

                </View>
                </View>
            </View>

            <TouchableOpacity 
            onPress={() => setLife(life+1)}
            style={{flex:1, backgroundColor:'blue', justifyContent: 'center'}}>
            <View>
            <Text style={{textAlign:'center'}}>
                +
            </Text>
            </View>
            </TouchableOpacity>
        </View>
    )

    /*
    return (
        <View style={[styles.container , {backgroundColor: life > 0 ? COLORS[color] : 'rgb(255,100,98)'}]} onLayout={(e) => onLayout(e)}>
            {widthHeight !== null && 
                <View style={[styles.content, { transform: [{rotate: rotate ? rotate : "0deg"}] }] }>
                <View style={{flexDirection:'row'}}>
                <Btn 
                    onPress={() => setLife(life+1)} 
                    color={COLORS.btnSecondary} 
                    title="+" 
                />
                <Text style={[styles.text, {fontSize:fontsize}]}>{life}{props.index}</Text> 
                <Btn 
                    onPress={() => setLife(life-1)}
                    color={COLORS.btnSecondary} 
                    title="-" 
                />
                </View>
                <View style={styles.btns}>
                    <Btn 
                    title="Color"
                    color={COLORS.btnSecondary}
                    onPress={() => {
                        setColorIndex((colorIndex + 1) % colors.length) 
                        setColor(colors[colorIndex])
                        }}/>
 
                    
                </View>
            </View>
            }
        </View> 


    )
    */
} 

const styles = StyleSheet.create({
    container: {
      flex:1,
    },
    text: {
        fontSize: 32,
        color: COLORS.fontColor,
    }, 
    btns : {
        flexDirection:"column",
    },
    content: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    }, 
  });


export default Player