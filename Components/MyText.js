import React from 'react';
import { Text, View } from 'react-native';

const MyText = (props) => {
        return (
            <View>
                <Text style={[props.style, {fontFamily:'BebasNeue-Regular'}]}>
                    {props.text}
                </Text>
            </View>
        )
    
}

export default MyText