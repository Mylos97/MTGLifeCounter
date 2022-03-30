import react,{ useState} from "react"
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Btn = (props) => {
    return (
        <Pressable 
            onPress={() => {
                props.onPress()
                }}
            >
            <View style={[styles.btn, {backgroundColor:props.color}, props.style]}>
                <Text>
                {props.title}
                </Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    btn:{
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