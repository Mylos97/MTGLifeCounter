import React, { useState, useEffect } from 'react'
import { StyleSheet, TextInput, View, TouchableOpacity, TouchableWithoutFeedback} from "react-native";
import { Feather } from '@expo/vector-icons'; 
import { COLORS } from '../Values/Colors';
import Btn from './Btn';
import MyText from './MyText';


const Player = (props) => {
    
    const rotations = ['0deg', '90deg', '180deg', '270deg']
    const [fontsize, setFontsize] = useState(props.fontsize)
    const [life, setLife] = useState(props.health)
    const [rotate, setRotate] = useState(props.rotation)
    const [mode, setMode] = useState(props.mode)
    const [name, setName] = useState('')
    const [rotateIndex, setRotationIndex] = useState(rotations.indexOf(props.rotation) + 1)
    const [longPressPositive, setLongPressPositive] = useState(null)
    const [longPressNegative, setLongPressNegative] = useState(null)
    const [commanderDamage, setCommanderDamage] = useState(0)
    const [showCommanderDamage, setShowCommanderDamage] = useState(false)
    const tick = 180

    useEffect(() => {
        setFontsize(props.fontsize)
        setLife(props.health)
        setRotationIndex(rotations.indexOf(props.rotation) + 1)
        setMode(props.mode)

        if(props.mode === 'Standard') {
            setShowCommanderDamage(false)
        }

    }, [props.rotation, props.health, props.fontsize, props.mode])
    
    useEffect(() => {
        if(longPressNegative !== null) {
            let interval = setInterval(() => {
                if (!longPressNegative) {
                    clearInterval(interval)
                }
                if(longPressNegative) setLife(life => life - 1)
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
                if(longPressPositive) setLife(life => life + 1)
                }, tick)
            return () => {
                clearInterval(interval)
            }
        }   
    },[longPressPositive])


    return (
        <View style={{backgroundColor:life > 0 ? COLORS.colorPrimary : COLORS.red, flex:1, justifyContent:'center', alignItems:'center'}}>
            <View style={{flex:1, flexDirection:'column', alignItems:'center' , justifyContent:'center', transform: [{rotate: rotate ? rotate : "0deg"}]}}>
                <View style={{flexDirection:'row'}}>
                <TouchableOpacity 
                onPress={() => {
                    if( !showCommanderDamage ) {
                        setLife(life => life - 1)
                    }
                    if( showCommanderDamage ) {
                        setCommanderDamage(life => life - 1)
                    }
                }} 
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
                <TouchableOpacity>

                </TouchableOpacity>
                <TouchableWithoutFeedback
                onPress={() => { 
                    if (mode === 'Commander') {
                        setShowCommanderDamage(showCommanderDamage => !showCommanderDamage)
                    }
                }}
                >
                <View>
                <MyText 
                style={{fontSize:fontsize, color:COLORS.colorSecondary, marginLeft:fontsize/10, marginRight:fontsize/10}}
                text={!showCommanderDamage ? life : commanderDamage}
                />
                </View>
                </TouchableWithoutFeedback>

                <TouchableOpacity 
                onPress={() => {
                    if (!showCommanderDamage) {
                        setLife(life => life + 1)
                    }
                    if (showCommanderDamage) {
                        setCommanderDamage(life => life + 1)
                    }
                    }} 
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
                <View style={{ flexDirection:'column', alignItems:'center'}}>
                <TextInput
                    style={{height:fontsize/3, fontSize:fontsize/5, 
                    textAlign:'center', color:COLORS.colorSecondary, 
                    marginBottom:12, fontFamily:'BebasNeue-Regular',
                    opacity:name === '' ? 0.5 : 1, borderWidth:0}} 
                    value={name}
                    onChangeText={setName}
                    placeholder='Name'
                    placeholderTextColor={COLORS.colorSecondary}
                />

                <TouchableOpacity
                onPress={() => {
                    setRotationIndex((rotateIndex + 1) % rotations.length)
                    setRotate(rotations[rotateIndex])
                }}
                hitSlop={{left:25,right:25, bottom:25}}
                >

                <Feather 
                    name="rotate-cw" 
                    size={fontsize/3} 
                    color={COLORS.colorSecondary} 

                />
                </TouchableOpacity>
                </View>


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