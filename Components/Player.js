import React, { useState, useEffect } from 'react'
import { StyleSheet, Button, Text, View, TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons'; 
import { COLORS } from '../Values/Colors';

import Btn from './Btn';
import MyText from './MyText';


const Player = (props) => {
    
    const colors = ['red','green','blue','black', 'white']
    const rotations = ['0deg', '90deg', '180deg', '270deg']
    const [fontsize, setFontsize] = useState(props.fontsize)
    const [life, setLife] = useState(props.health)
    const [color, setColor] = useState(colors[Math.floor(Math.random() * 3)])
    const [colorIndex, setColorIndex] = useState(colors.indexOf(color) + 1)
    const [rotate, setRotate] = useState(props.rotation)
    const [rotateIndex, setRotationIndex] = useState(rotations.indexOf(props.rotation) + 1)
    console.log(fontsize)

    const getRotation = (rotation) => {
        if (rotation == '0deg') {
            return 'row'
        }
        if (rotation == '90deg') {
            return 'column'
        }
        if (rotation == '180deg') {
            return 'row-reverse'
        }
        if (rotation == '270deg') {
            return 'column-reverse'
        }
    }

    useEffect(() => {
        setFontsize(props.fontsize)
        setLife(props.health)
        setRotationIndex(rotations.indexOf(props.rotation) + 1)
    }, [props.rotation, props.health, props.fontsize])
    

    return (
        <View style={{backgroundColor:COLORS.colorPrimary, flex:1, justifyContent:'center', alignItems:'center'}}>
            <View style={{flexDirection:'column', alignItems:'center' , justifyContent:'center', transform: [{rotate: rotate ? rotate : "0deg"}]}}>
                <View style={{flexDirection:'row', alignItems:'center' }}>
                <TouchableOpacity onPress={() => setLife(life - 1)}>
                    <MyText 
                    style={{fontSize:fontsize/2 , color:COLORS.colorSecondary}}
                    text='-'
                    >
                    </MyText>
                </TouchableOpacity>
                <MyText 
                style={{fontSize:fontsize, color:COLORS.colorSecondary, marginLeft:14, marginRight:14}}
                text={life}
                >
                </MyText>
                <TouchableOpacity onPress={() => {setLife(life + 1)}}>
                    <MyText 
                    style={{fontSize:fontsize/2 , color:COLORS.colorSecondary}}
                    text ='+'
                    >
                        
                    </MyText>
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

    /*
return (
            <View style={{flex:1 , backgroundColor: life > 0 ? COLORS.colorPrimary : 'rgb(255,100,98)', 
            alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
                <View style={{flex:1,transform: [{rotate: rotate ? rotate : "0deg"}], textAlign:'center', flexDirection:'row' , backgroundColor:'grey', alignItems:'center'}}>
                <TouchableOpacity style={{backgroundColor:'red', justifyItems:'center' }}>
                        <Text style={{color:COLORS.colorSecondary, fontSize:fontsize/2}}>
                            -
                        </Text>
                </TouchableOpacity>
                <Text style={[styles.text, {fontSize:fontsize}]}>
                    {life}
                </Text>
                <TouchableOpacity style={{backgroundColor:'red', justifyItems:'center' }}>
                        <Text style={{color:COLORS.colorSecondary, fontSize:fontsize/2}}>
                            +
                        </Text>
                </TouchableOpacity>
                </View>
                <View style={{backgroundColor:'grey'}}>
                <View style={{}}>

                </View>    
                </View>
            </View>
    )
    */
    

    /*

                <TouchableOpacity 
            onPress={() => setLife(life-1)}
            style={{flex:1 , backgroundColor: COLORS.colorPrimary ,  justifyContent: 'center'}}>
            <View>
            <Text style={{textAlign:'center', fontSize: fontsize/3, color:COLORS.colorSecondary }}>
                -
            </Text>
            </View>

                        <TouchableOpacity 
            onPress={() => setLife(life+1)}
            style={{flex:1, backgroundColor:COLORS.colorPrimary, justifyContent: 'center'}}>
            <View>
            <Text style={{textAlign:'center', fontSize: fontsize/3, color:COLORS.colorSecondary}}>
                +
            </Text>
            </View>
            </TouchableOpacity>
    */
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