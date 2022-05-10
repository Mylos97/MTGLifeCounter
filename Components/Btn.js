import { Pressable, StyleSheet, View, Text, Dimensions  } from 'react-native';
import  MyText from './MyText'


const fontSize = () => {
    const {width, height} = Dimensions.get("window");
    if ( width < 500 ) {
        return 15
    }
    if ( width > 500 ) {
        return 20
    }

}

const Btn = (props) => {
    return (
        <Pressable 
            onPress={() => {
                props.onPress()
                }}
            >
            <View style={[styles.btn, {backgroundColor:props.color}, props.style]}>
                <MyText 
                style={{color:props.textColor,fontSize:fontSize(), textAlign:'center'}}
                text={props.title}
                />
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    btn:{
        alignItems:'center',
        padding:12,
        borderRadius:6,
    },
    btnHighlight: {
        flex:1,
    }
});


export default Btn