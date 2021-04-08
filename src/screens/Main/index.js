import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import ImageSlider from 'react-native-image-slider';
import { GridList, Error } from '../../components';
import { Context as JobsContext } from '../../store/context/JobsContext';
import { PRIMARY_COLOR } from '../../../res/colors'
import { manageNotifcations } from '../../helper/functions';
import firebase from '../../../res/firebase';
import { SLIDER_IMAGES, LOADING_GRID_LIST } from '../../../res/strings';
const MainScreen = (props) => {
    const [loading, setLoading] = useState(true)
    const { state: jobsState, getJobs } = useContext(JobsContext);
    const { jobs, error } = jobsState;

    const [pageNum, setPageNum] = useState(2);

    useEffect(() => {
        manageNotifcations()
        async function loadJobs() {
            await getJobs(1)
            setLoading(false)
        }
        if (!jobs.length)
            loadJobs();

    }, [jobs.length])

    const onPress = (jobDetails) => {
        if (!loading)
            props.navigation.navigate('Details', { jobDetails })
    }
    const onLoadMorePressed = async () => {
        setLoading(true)
        if (jobs.length) {
            let count = pageNum;
            await getJobs(pageNum)
            count++
            setPageNum(count)
        } else {
            await getJobs(1)
        }
        setLoading(false)
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