import React from 'react';
import { ScrollView, Dimensions, Image, SafeAreaView, ImageBackground, Text, Linking, View, Touchable } from 'react-native';
import HTML from "react-native-render-html";
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import { WebView } from 'react-native-webview';
import HTMLView from 'react-native-htmlview';
import { PRIMARY_COLOR } from '../../../res/colors';
import { JOBPORTAL_IMG, SAVE_IMG, BACK_IMG } from '../../../res/drawable';
import { INTERSTITIAL_AD_ID } from '../../../res/strings';
import { isJobPortalUrl, createPDF, requestPermissions, showInterstitialAds } from '../../helper/functions';
import { ImageButton } from '../../components';
import { InterstitialAd, AdEventType, TestIds } from '@react-native-firebase/admob';

const detailsScreen = (props) => {
    const { jobDetails } = props.route.params;
    const contentWidth = useWindowDimensions().width;

    const onSavePressed = async () => {
        if (await requestPermissions())
            await createPDF(jobDetails.content, jobDetails.title)
    }
    const alterChildren = (node) => {
        //removing specific element
        return node.children.filter(
            (child) =>
                child.data != 'Job Overview'
        );
    }
    const onBackPressed = () => {
        props.navigation.goBack();
    }

    return (
        <SafeAreaView style={{ flex: 1, margin: 5 }}>

            <ScrollView>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <ImageButton
                        src={BACK_IMG}
                        onPress={() => onBackPressed()}
                    />
                    <Image
                        resizeMode={'contain'}
                        style={{ width: 200, height: 45, alignSelf: 'center' }}
                        source={JOBPORTAL_IMG}
                    />
                    <ImageButton
                        src={SAVE_IMG}
                        onPress={() => onSavePressed()}
                    />
                </View>
                <HTML
                    source={{
                        html: `<h2>${jobDetails.title}</h2>` + jobDetails.content
                    }}
                    contentWidth={contentWidth}
                    imagesMaxWidth={contentWidth}
                    tagsStyles={{
                        h2: { color: PRIMARY_COLOR },
                        a: { color: '#000000' }
                    }}
                    alterChildren={alterChildren}
                    onLinkPress={(_event, url) => { if (!isJobPortalUrl(url)) Linking.openURL(url) }}
                    renderers={{
                        img: (htmlAttribs, children, convertedCSSStyles, passProps) => {
                            return <WebView
                                style={{
                                    width: Dimensions.get('window').width,
                                    height: 400
                                }}
                                source={{ html: `<img src=${htmlAttribs.src}>` }}
                            />
                        }
                    }}
                />
            </ScrollView>
        </SafeAreaView>
    )
}
export default detailsScreen;