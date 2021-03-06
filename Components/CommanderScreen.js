import React from 'react'
import { View} from "react-native";


const margin = 6

// The commander screen for the different amount of players 2 to 6
const CommanderScreen = (props) => {
    if (props.objects.length === 2 ) {
        return (
            <View style={{flexDirection:'column'}}>
                <View style={{margin:margin }}>
                    {props.objects[0]}
                </View>
                <View style={{margin:margin }}>
                    {props.objects[1]}
                </View>
            </View>
        )
    }

    if ( props.objects.length === 3 ) {
        return (
            <View style={{ flexDirection:'column' }}>
                <View style={{margin:margin}}>
                    {props.objects[0]}
                </View>
                <View style={{margin:margin}}>
                    {props.objects[1]}
                </View>
                <View style={{margin:margin}}>
                    {props.objects[2]}
                </View>
            </View>
        )
    } 
    if (props.objects.length === 4) {
        return (
            <View style={{flexDirection:'column' }}>
                <View style={{ flexDirection:'row' }}>
                    <View style={{margin:margin}}>
                        {props.objects[0]}
                    </View>
                    <View style={{margin:margin}}>
                        {props.objects[1]}
                    </View>
                </View>
                <View style={{ flexDirection:'row'}}>
                    <View style={{margin:margin}}>
                        {props.objects[2]}
                    </View>
                    <View style={{margin:margin}}>
                        {props.objects[3]}
                    </View>
                </View>
            </View>
        )
    }
    if (props.objects.length === 5) {
        return (
            <View style={{ flexDirection:'column', }}>
                <View style={{ flexDirection:'row' }}>
                    <View style={{margin:margin}}>
                    {props.objects[0]}
                    </View>
                    <View style={{margin:margin}}>
                    {props.objects[1]}
                    </View>
                </View>
                <View style={{ flexDirection:'row', justifyContent:'center'}}>
                    <View style={{margin:margin}}>
                    {props.objects[2]}
                    </View>
                </View>
                <View style={{ flexDirection:'row'}}>
                    <View style={{margin:margin}}>
                    {props.objects[3]}
                    </View>
                    <View style={{margin:margin}}>
                    {props.objects[4]}
                    </View>
                </View>
            </View>
        )
    }
    if (props.objects.length === 6) {
        if (props.index === 2 || props.index === 3) {
            return (
                <View style={{ flexDirection:'column',  alignItems:'center' }}>
                    <View style={{ flexDirection:'row' }}>
                        <View style={{margin:margin}}>
                        {props.objects[0]}
                        </View>
                        <View style={{margin:margin}}>
                        {props.objects[1]}
                        </View>
                        <View style={{margin:margin}}>
                        {props.objects[2]}
                        </View>
                    </View>
                    <View style={{ flexDirection:'row'}}>
                        <View style={{margin:margin}}>
                        {props.objects[3]}
                        </View>
                        <View style={{margin:margin}}>
                        {props.objects[4]}
                        </View>
                        <View style={{margin:margin}}>
                        {props.objects[5]}
                        </View>
                    </View>
                </View>
            )
        } else {
            return (
                <View style={{ flexDirection:'column',  alignItems:'center' }}>
                    <View style={{flexDirection:'row' }}>
                        <View style={{margin:margin}}>
                        {props.objects[0]}
                        </View>
                        <View style={{margin:margin}}>
                        {props.objects[1]}
                        </View>
                    </View>
                    <View style={{ flexDirection:'row'}}>
                        <View style={{margin:margin}}>
                        {props.objects[2]}
                        </View>
                        <View style={{margin:margin}}>
                        {props.objects[3]}
                        </View>
                    </View>
                    <View style={{ flexDirection:'row'}}>
                        <View style={{margin:margin}}>
                        {props.objects[4]}
                        </View>
                        <View style={{margin:margin}}>
                        {props.objects[5]}
                        </View>
                    </View>
                </View>
            )
        }
    }
}

export default CommanderScreen