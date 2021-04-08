import React from 'react';
import { Text, View, Image } from 'react-native';
const Error = (props) => {
    return (
        <View style={{ flexDirection: 'row' }}>
            <Image style={{ width: 20, height: 20 }}
                source={require('../../assets/images/error.png')}
            />
            <Text style={{ color: '#DA2128',marginLeft: 5 }}>{props.children}</Text>
        </View>
    )
}
export default Error;