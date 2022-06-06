import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity, TouchableWithoutFeedback, Modal, Dimensions} from "react-native";
import { Feather } from '@expo/vector-icons'; 
import { COLORS } from '../Values/Colors';
import Btn from './Btn';
import MyText from './MyText';
import CommanderScreen from './CommanderScreen';


// This determines the commander square which cant be selected, could probably be done in a smarter way :=)
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

// Scaling functions
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

// Scaling functions
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
    const [tempLife, setTempLife] = useState(0)
    const [isActive, setIsActive] = useState(0)
    const [timerActive, setTimerActive] = useState(false)
    const [rotate, setRotate] = useState(props.rotation)
    const [mode, setMode] = useState(props.mode)
    //const [name, setName] = useState('') can easily be implemented but im not sure if i want it
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
    }, [props.fontsize])


    // Temporary life counter to easily show the user how much the current life has changed resets after an interval 
    useEffect(() => { 
        if (timerActive) {
            const timer = isActive > 0 && setInterval(() => setIsActive(isActive - 1), 100);
            if (isActive === 0) {
                setTempLife(0)
                setTimerActive(false)
          }
          return () => clearInterval(timer);
        } 
    },[isActive, timerActive])


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

    // Life changing at a constant speed same for positive and negative could also be made smarter
    useEffect(() => {
        if(longPressNegative !== null) {
            let interval = setInterval(() => {
                if (!longPressNegative) {
                    clearInterval(interval)
                }
                if(longPressNegative) {
                    setLife(life => life - 1)
                    setTempLife(life => life - 1)
                    setTimerActive(true)
                    if (isActive < 20) {
                        setIsActive(30)
                    }
                }
                }, tick)
            return () => {
                clearInterval(interval)
            }
        }   
    },[longPressNegative])

    // Life changing at a constant speed same for positive and negative could also be made smarter
    useEffect(() => {
        if(longPressPositive !== null) {
            let interval = setInterval(() => {
                if (!longPressPositive) {
                    clearInterval(interval)
                } 
                if(longPressPositive) {
                    setLife(life => life + 1)
                    setTempLife(life => life + 1)
                    setTimerActive(true)
                    if (isActive < 20) {
                        setIsActive(30)
                    }
                }
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

    // Updates the state of the changed commander square
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

    // A square on the commander popup 
    const SquareCommander = (props) => {
        return (
            <TouchableOpacity
            onPress={() => selectObject(props.index)}
            disabled={props.self || props.selected}
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

    // Calculates the rotation of commandersquare based on the index 
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
                hitSlop={{left:60,right:20,top:20,bottom:20}} 
                onPress={() => {
                    setLife(life => life - 1)
                    setTempLife(life => life - 1)
                    setTimerActive(true)
                    if (isActive < 20) {
                        setIsActive(30)
                    }
                }} 
                style={{ justifyContent:'center', alignItems:'center'}}
                onLongPress={() => {
                    setIsActive(30)
                    setTimerActive(true)                    
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
                <View style={{flexDirection:'column'}}>
                <MyText
                style={{fontSize:fontsize/5, color: theme ? tempLife === 0 ? theme.primary : theme.secondary : COLORS.colorSecondary
                , textAlign:'center'}}
                text={tempLife}
                >                   
                </MyText>
                <MyText 
                style={{fontSize:fontsize, color: theme ? theme.secondary : COLORS.colorSecondary, 
                marginLeft:24, marginRight:24}}
                text={life}
                />
                </View>
                </TouchableWithoutFeedback>
                <TouchableOpacity
                hitSlop={{left:20,right:60,top:20,bottom:20}} 
                onPress={() => {
                    setLife(life => life + 1)
                    setTempLife(life => life + 1)
                    setTimerActive(true)
                    if (isActive < 20) {
                        setIsActive(30)
                    }
                }} 
                style={{  justifyContent:'center',  alignItems:'center'}}
                onLongPress={() => {
                setIsActive(30)
                setTimerActive(true)
                setLongPressPositive(true)}}
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

/* If i ever want to add the name again
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