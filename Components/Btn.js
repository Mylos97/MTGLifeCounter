import { Pressable, StyleSheet, View, Text  } from 'react-native';
import  MyText from './MyText'
import { COLORS } from "../Values/Colors";


const Btn = (props) => {
    return (
        <Pressable 
            onPress={() => {
                props.onPress()
                }}
            >
            <View style={[styles.btn, {backgroundColor:props.color}, props.style]}>
                <MyText 
                style={{color:props.textColor,fontSize:15}}
                text={props.title}
                />
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    btn:{
        alignItems:'center',
        margin:4,
        padding:10,
        borderRadius:4,
    },
    btnHighlight: {
        flex:1,
    }
});


export default Btn