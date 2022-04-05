import React, { useState, useEffect } from 'react'
import { StyleSheet, Button, Text, View, TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons'; 
import { COLORS } from '../Values/Colors';
import Btn from './Btn';
import MyText from './MyText';


const Player = (props) => {
    
    const rotations = ['0deg', '90deg', '180deg', '270deg']
    const [fontsize, setFontsize] = useState(props.fontsize)
    const [life, setLife] = useState(props.health)
    const [rotate, setRotate] = useState(props.rotation)
    const [rotateIndex, setRotationIndex] = useState(rotations.indexOf(props.rotation) + 1)
    const [longPressPositive, setLongPressPositive] = useState(null)
    const [longPressNegative, setLongPressNegative] = useState(null)
    const tick = 200

    useEffect(() => {
        setFontsize(props.fontsize)
        setLife(props.health)
        setRotationIndex(rotations.indexOf(props.rotation) + 1)
    }, [props.rotation, props.health, props.fontsize])
    
    useEffect(() => {
        if(longPressNegative !== null) {
            let interval = setInterval(() => {
                if (!longPressNegative) {
                    clearInterval(interval)
                }
                setLife(life => life - 1)
                }, tick)
            return () => {
                clearInterval(interval)
            }
        }   
    },[longPressNegative])

    useEffect(() => {
        if(longPressPositive !== null) {
            let interval = setInterval(() => {
                if (!longPressPositive) {
                    clearInterval(interval)
                }
                setLife(life => life + 1)
                }, tick)
            return () => {
                clearInterval(interval)
            }
        }   
    },[longPressPositive])


    return (
        <View style={{backgroundColor:life > 0 ? COLORS.colorPrimary : COLORS.red, flex:1, justifyContent:'center', alignItems:'center'}}>
            <View style={{flexDirection:'column', alignItems:'center' , justifyContent:'center', transform: [{rotate: rotate ? rotate : "0deg"}]}}>
                <View style={{flexDirection:'row'}}>
                <TouchableOpacity 
                onPress={() => setLife(life - 1)} 
                style={{flex:1, justifyContent:'center', width:fontsize/2, alignItems:'center'}}
                onLongPress={() => {
                    setLongPressNegative(true)}}
                onPressOut={() =>{ 
                    setLongPressNegative(false)}}
                >
                    <MyText 
                    style={{fontSize:fontsize/2 , color:COLORS.colorSecondary}}
                    text='-'
                    />
                </TouchableOpacity>
                <MyText 
                style={{fontSize:fontsize, color:COLORS.colorSecondary, marginLeft:fontsize/8, marginRight:fontsize/8}}
                text={life}
                />
                <TouchableOpacity 
                onPress={() => {setLife(life + 1)}} 
                style={{ flex:1, justifyContent:'center', width:fontsize/2, alignItems:'center'}}
                onLongPress={() => setLongPressPositive(true)}
                onPressOut={() => setLongPressPositive(false)}
                >
                    <MyText 
                    style={{fontSize:fontsize/2 , color:COLORS.colorSecondary}}
                    text ='+'
                    />
                </TouchableOpacity>
                </View>
                <Feather 
                    name="rotate-cw" 
                    size={fontsize/3} 
                    color={COLORS.colorSecondary} 
                    onPress={() => {
                        setRotationIndex((rotateIndex + 1) % rotations.length)
                        setRotate(rotations[rotateIndex])
                    }}
                />
            </View>
        </View>
    )
} 

const styles = StyleSheet.create({
    container: {
      flex:1,
    },
    text: {
        fontSize: 32,
        color: COLORS.colorSecondary,
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