import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import ImageSlider from 'react-native-image-slider';
import { GridList, Error } from '../../components';
import { Context as JobsContext } from '../../store/context/JobsContext';
import { PRIMARY_COLOR } from '../../../res/colors'
import { manageNotifcations } from '../../helper/functions';
import firebase from '../../../res/firebase';
import { SLIDER_IMAGES, LOADING_GRID_LIST } from '../../../res/strings';
import { InterstitialAd, AdEventType, TestIds } from '@react-native-firebase/admob';
import { INTERSTITIAL_AD_ID } from '../../../res/strings';

const MainScreen = (props) => {
    const { state: jobsState, getJobs } = useContext(JobsContext);
    const { jobs, error,loading } = jobsState;

    const [pageNum, setPageNum] = useState(2);
    //Interstitial Ad
    const interstitial = InterstitialAd.createForAdRequest(INTERSTITIAL_AD_ID);

    useEffect(() => {
        manageNotifcations()
        async function loadJobs() {
            await getJobs(1)
        }
        if (!jobs.length)
            loadJobs();

        //Loading Interstitial ad
        const eventListener = interstitial.onAdEvent(type => {
            if (type === AdEventType.LOADED) {
            }
        });
        // Start loading the interstitial straight away
        interstitial.load();
        // Unsubscribe from events on unmount
        return () => {
            eventListener();
        };
    }, [jobs.length])

    const onPress = (jobDetails) => {
        if (!loading) {
            try {
                props.navigation.navigate('Details', { jobDetails })
                interstitial.show()
            } catch (e) {

            }
        }
    }
    const onLoadMorePressed = async () => {
        if (jobs.length) {
            let count = pageNum;
            await getJobs(pageNum)
            count++
            setPageNum(count)
        } else {
            await getJobs(1)
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.sliderContainer}>
                <ImageSlider
                    loopBothSides={true}
                    resizeMode={'contain'}
                    autoPlayWithInterval={2000}
                    images={SLIDER_IMAGES} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.heading}>Job Listings:</Text>
                <ActivityIndicator animating={true} style={{ opacity: loading ? 1.0 : 0.0 }} color={PRIMARY_COLOR} />
                <Text style={{ ...styles.heading, opacity: 0 }}>Job Listings:</Text>
            </View>
            {error ? <Error>{error}</Error> : null}
            <GridList
                data={jobs.length ? jobs : LOADING_GRID_LIST}
                numColumns={3}
                onPress={(selectedJob) => onPress(selectedJob)}
                buttonStyle={styles.button}
                onButtonPressed={() => onLoadMorePressed()}
                loading={loading}
            />

        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sliderContainer: {
        height: '28%'
    },
    heading: {
        margin: 5,
        fontWeight: 'bold',
        fontSize: 16
    },
    button: {
        width: 200,
        alignSelf: 'center',
        backgroundColor: PRIMARY_COLOR
    }
})
export default MainScreen;