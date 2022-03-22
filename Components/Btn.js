import react,{ useState} from "react"
import { Pressable, StyleSheet, Text, View } from 'react-native';
const Btn = (props) => {
    return (
        <Pressable 
            onPress={() => {
                props.onPress()
                }}
            >
            <View style={[styles.btn, {backgroundColor:props.color} ]}>
                <Text>
                {props.title}
                </Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    btn:{
        flex:1,
        alignItems:'center',
        margin:4,
        padding:8,
        borderRadius:4,
    },
    btnHighlight: {
        flex:1,
        
    }
});


export default Btn