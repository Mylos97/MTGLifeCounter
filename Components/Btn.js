import { Pressable, StyleSheet, View, Text  } from 'react-native';
import { MyText} from './MyText'
import { COLORS } from "../Values/Colors";


const Btn = (props) => {
    return (
        <Pressable 
            onPress={() => {
                props.onPress()
                }}
            >
            <View style={[styles.btn, {backgroundColor:props.color}, props.style]}>
                <Text 
                style={{color:COLORS.colorSecondary}}
                > {props.title}
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