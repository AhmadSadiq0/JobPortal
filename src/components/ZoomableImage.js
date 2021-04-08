import React from 'react';
import { Image, Dimensions } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';

const ZoomableImage = (props) => {

    return (
        <ImageZoom cropWidth={Dimensions.get('window').width}
            cropHeight={Dimensions.get('window').height}
            imageWidth={Dimensions.get('window').width}
            imageHeight={200} >
            <Image style={{ width: Dimensions.get('window').width, height: 200 }}
                resizeMode={'contain'}
                source={{ uri: props.uri }} />
        </ImageZoom>
    )

}
export default ZoomableImage;