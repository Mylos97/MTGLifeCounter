import React,{ useState, useEffect, useRef } from 'react'
import { View, TouchableOpacity } from "react-native";
import MyText from './MyText';


const randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Dice = (props) => {
    const dices = [6,12,20]
    const [number, setNumber] = useState(6)
    const [rolling, setRolling] = useState(false)
    const times = useRef(0)
    useEffect(() => {
        setNumber(dices[props.selectedDice])
    },[props.selectedDice])

    // Determines how many roles and how long between each one 
    useEffect(() => {
        if(rolling !== false) {
            let timeOut = []
            for ( let i = 0 ; i < randomInteger(8,13) ; i++) {
                timeOut.push(randomInteger(150,250))
            }
            let interval = setInterval(() => {
                if (times.current > timeOut.length) {
                    clearInterval(interval)
                    times.current = 0
                    setRolling(false)
                }
                if(rolling) {
                    times.current++
                    setNumber(randomInteger(1, dices[props.selectedDice]))}
                }, timeOut[times.current])
            return () => {
                clearInterval(interval)
            }
        }  
    },[rolling])

    return (
        <TouchableOpacity 
        onPress={() => { if(!rolling) setRolling(true)}}
        onLongPress={() => {
            if(!rolling) props.setSelectedDice(selectedDice => (selectedDice + 1) % dices.length)}
        }
        >   
            <View style={{width:props.size, height:props.size, backgroundColor:props.theme ? props.theme.tertiary : '',
            borderRadius:10, alignItems:'center', justifyContent:'center'}}>
                <MyText 
                    text={number}
                    style={{color:props.theme ? props.theme.secondary : '', fontSize:props.size/2}}
                />
            </View>
        </TouchableOpacity>
    )
}

export default Dice