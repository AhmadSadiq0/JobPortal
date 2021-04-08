import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

const ImageButton = (props) => {
    return (
        <TouchableOpacity onPress={() => props.onPress()}>
            <Image style={{ width: 40, height: 40 }} source={props.src} />
        </TouchableOpacity>
    )
}
export default ImageButton;