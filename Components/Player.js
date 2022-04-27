import React, { useState, useEffect } from 'react'
import { StyleSheet, TextInput, View, TouchableOpacity, TouchableWithoutFeedback, Modal, Dimensions} from "react-native";
import { Feather } from '@expo/vector-icons'; 
import { COLORS } from '../Values/Colors';
import Btn from './Btn';
import MyText from './MyText';
import CommanderScreen from './CommanderScreen';

const calculateObject = (size, index) => {
    const obj = []
    const self = {2:{0:[false, true], 1:[false,true]},
                  3:{0:[false,false, true], 1: [false, true, false], 2:[false,false,true]},
                  4:{0:[false,false,false, true],1:[false,false,true,false], 2:[false,false,true,false],3:[false,false,false, true]},
                  5:{0:[false,false,false, false,true],1:[false,false,false,true, false], 2:[false,false,false,true,false],3:[false,false,false,false,true],4:[false,false,true,false,false]},
                  6:{0:[false,false,false, false,false,true],1:[false,false,false,false,true,false], 
                     2:[false,false,false,false,true,false],3:[false,false,false,false,true,false],4:[false,false,false,false,true,false],5:[false,false,false,false,false,true]}}
    for(let i = 0 ; i < size ; i++) {
        obj.push({damage: 0 , selected : false, self: self[size][index][i]})
    }
    return obj
}

const getCommanderSize = () => {
    const {width, height} = Dimensions.get("window")
    if (width < 400) {
        return 50
    }
    if ( width > 400 && width < 500) {
        return 60
    } 
    if ( width > 500 && width < 600) {
        return 70
    } 
    if ( width > 600) {
        return 75
    }
}

const getFontSize = () => {
    const {width, height} = Dimensions.get("window")
    if (width < 400) {
        return 40
    }
    if ( width > 400 && width < 500) {
        return 50
    } 
    if ( width > 500 && width < 600) {
        return 60
    } 
    if ( width > 600) {
        return 70
    }
}

const Player = (props) => {
    const commanderSize = getCommanderSize()
    const rotations = ['0deg', '90deg', '180deg', '270deg']
    const [fontsize, setFontsize] = useState(props.fontsize)
    const [life, setLife] = useState(props.health)
    const [rotate, setRotate] = useState(props.rotation)
    const [mode, setMode] = useState(props.mode)
    //const [name, setName] = useState('')
    const [rotateIndex, setRotationIndex] = useState(rotations.indexOf(props.rotation) + 1)
    const [longPressPositive, setLongPressPositive] = useState(null)
    const [longPressNegative, setLongPressNegative] = useState(null)
    const [commanderObject, setCommanderObject] = useState(null)
    const [commanderComponenet, setCommanderComponenent] = useState(null)
    const [theme, setTheme] = useState(props.theme)
    const [showModal, setShowModal] = useState(false)
    const tick = 180
    
    useEffect(() => {
        setFontsize(props.fontsize)
    },[props.fontsize])

    useEffect(() => {
        setMode(props.mode)
        setCommanderObject(calculateObject(props.size, props.index))
    },[props.size, props.mode])

    useEffect(() => {
        updateCommanderComponent()
    },[commanderObject, theme])

    useEffect(() => {
        setTheme(props.theme)
    },[props.theme])

    useEffect(() => {
        setLife(props.health)
        setRotationIndex(rotations.indexOf(props.rotation) + 1)
    },[props.rotation, props.health, props.fontsize])

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

    const updateCommanderComponent = () => {
        if(commanderObject) {
            setCommanderComponenent(commanderObject.map((obj, i) => {
                return (
                <SquareCommander 
                    key={i}
                    index={i}
                    self={obj.self}
                    damage={obj.damage}
                    selected={obj.selected}
                    theme={theme}
                />)}))
        }
    }

    const selectObject = (index) => {
        const temp = [...commanderObject]
        temp.map((obj, i) => {
            obj.selected = false
            if(index === i && !obj.self) {
                obj.selected = true
            }
            return obj
        })
        setCommanderObject(temp)
    }

    const updateObject = (positive) => {
        const temp = [...commanderObject]
        temp.map((obj) => {
            if(obj.selected) {
                if(positive) {
                    obj.damage ++
                    setLife(life => life - 1)
                }   
                if(!positive) {
                    if (obj.damage > 0) {
                        obj.damage --
                        setLife(life => life + 1)
                    }
                }
            }
            return obj
        })
        setCommanderObject(temp)
    } 
    
    const SquareCommander = (props) => {
        return (
            <TouchableOpacity
            onPress={() => selectObject(props.index)}
            > 
            <View 
            style={{backgroundColor:props.theme ? props.theme.tertiary : 'red', width:commanderSize, 
            height: commanderSize, justifyContent:'center', alignContent:'center',
            borderRadius:6, borderColor:props.selected ? props.theme.secondary : null, borderWidth: props.selected ? 2 : 0}}>
            <MyText 
                style={{color: props.theme ? props.theme.secondary : null, textAlign:'center', fontSize:20}}
                text={props.self ? '' : props.damage}
            />
            </View>
            </TouchableOpacity>
        )
    }

    const calculateRotation = (index) => {
        if ( commanderObject ) {
            if (commanderObject.length === 2 || commanderObject.length === 3) {
                if (index === 0) {
                    return "180deg"
                } else {
                    return "0deg"
                }
            }
            if ( commanderObject.length === 4 || commanderObject.length === 5) {
                if (index === 0 || index === 1) {
                    return "180deg"
                } else {
                    return "0deg"
                }
            }
            if ( commanderObject.length === 6) {
                if (index === 0 || index === 1) {
                    return "180deg"
                } else if (index === 2) {
                    return "90deg"
                } else if (index === 3) {
                    return "270deg"
                } else {
                    return "0deg"
                }
            }
        }
    }

    return (
        <View style={{backgroundColor: theme ? theme.primary : null, flex:1, justifyContent:'center', alignItems:'center'}}>
            <Modal
            animationType='fade'
            transparent={true}
            visible={showModal}
            onRequestClose={() => {
                setShowModal(!showModal)
                props.modalShown(false)
                }}
            ><View style={[{flex: 1}, ( showModal ) ? {backgroundColor:'rgba(0,0,0,0.3)'} : '']}>
                <View style={[styles.modalView, {backgroundColor: theme ? theme.primary : null, 
                flexDirection:'col', transform: [{rotate: calculateRotation(props.index)}]}]}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <View>
                            <TouchableOpacity
                            onPress={() => updateObject(false)}
                            hitSlop={{left:20,right:20,top:20,bottom:20}}
                            >
                                <MyText 
                                    style={{fontSize:getFontSize(), color: theme ? theme.secondary : COLORS.colorSecondary , width:16}}
                                    text='-'
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{marginLeft:14*(getFontSize()/40), marginRight:14*(getFontSize()/40)}}>
                            <CommanderScreen 
                                objects={commanderComponenet}
                                index={props.index}
                            />
                        </View>
                        <View>
                        <TouchableOpacity
                            onPress={() => updateObject(true)}
                            hitSlop={{left:20,right:20,top:20,bottom:20}}
                        >
                            <MyText 
                                style={{fontSize:getFontSize(), color: theme ? theme.secondary : COLORS.colorSecondary, width:16}}
                                text='+'
                            />
                        </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ marginTop:20}}>
                        <Btn 
                        color={theme ? theme.tertiary : COLORS.colorTertiary}
                        textColor={theme ? theme.secondary : COLORS.colorSecondary}
                        onPress={() => {
                            setShowModal(!showModal)}} 
                        title="Close" />
                    </View>
                    </View>
                </View>
            </Modal>
            <View style={{ flex:1, flexDirection:'column', alignItems:'center' , justifyContent:'center', transform: [{rotate: rotate ? rotate : "0deg"}]}}>
                <View style={{flexDirection:'row'}}>
                <TouchableOpacity 
                onPress={() => {
                    setLife(life => life - 1)
                }} 
                style={{ justifyContent:'center', alignItems:'center'}}
                onLongPress={() => {
                    setLongPressNegative(true)}}
                onPressOut={() =>{ 
                    setLongPressNegative(false)}}
                >
                    <MyText 
                    style={{fontSize:fontsize/2 , color:theme ? theme.secondary :COLORS.colorSecondary}}
                    text='-'
                />
                </TouchableOpacity>
                <TouchableWithoutFeedback
                onPress={() => { 
                    if (mode === 'Commander') {
                        setShowModal(true)
                    }
                }}
                >
                <View>
                <MyText 
                style={{fontSize:fontsize, color: theme ? theme.secondary : COLORS.colorSecondary, 
                marginLeft:24, marginRight:24}}
                text={life}
                />
                </View>
                </TouchableWithoutFeedback>
                <TouchableOpacity 
                onPress={() => {
                    setLife(life => life + 1)
                }} 
                style={{  justifyContent:'center',  alignItems:'center'}}
                onLongPress={() => setLongPressPositive(true)}
                onPressOut={() => setLongPressPositive(false)}
                >
                    <MyText 
                    style={{fontSize:fontsize/2 , color: theme ? theme.secondary : COLORS.colorSecondary}}
                    text ='+'
                    />
                </TouchableOpacity>
                </View>
                <View style={{ flexDirection:'column', alignItems:'center'}}>
                <TouchableOpacity
                onPress={() => {
                    setRotationIndex((rotateIndex + 1) % rotations.length)
                    setRotate(rotations[rotateIndex])
                }}
                hitSlop={{left:25,right:25, bottom:25}}
                >
                <Feather 
                    name="rotate-cw" 
                    size={fontsize/4} 
                    color={theme ? theme.secondary : COLORS.colorSecondary} 
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
    modalView: {
        flex:1,
        margin: 25,
        marginTop: 250,
        marginBottom:250,
        backgroundColor: COLORS.colorPrimary,
        borderRadius: 10,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.5,
        shadowRadius: 12,
        elevation: 5,
        justifyContent:'center'
      },
  });

/*
<TextInput
                    style={{height:fontsize/3, fontSize:fontsize/5, 
                    textAlign:'center', color: theme ? theme.secondary : COLORS.colorSecondary, 
                    marginBottom:12, fontFamily:'BebasNeue-Regular',
                    opacity:name === '' ? 0.5 : 1, borderWidth:0}} 
                    value={name}
                    onChangeText={setName}
                    placeholder='Name'
                    placeholderTextColor={theme ? theme.secondary : COLORS.colorSecondary}
                />

*/



export default Player