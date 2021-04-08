import React from 'react';
import { View, Text, FlatList, Dimensions, StyleSheet, TouchableOpacity, Touchable, ScrollView } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { trimTimeFromDate } from '../helper/functions';
const GridList = (props) => {
    return (
        <ScrollView>
            <FlatList
                data={props.data}
                numColumns={props.numColumns}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => props.onPress(item)}>
                            <Card style={styles.card}>
                                <Card.Cover
                                    style={styles.cover}
                                    source={{ uri: item.cover }}
                                />
                                <Card.Title
                                    titleStyle={styles.title}
                                    subtitleStyle={styles.subtitle}
                                    title={item.title}
                                    subtitle={trimTimeFromDate(item.date)}
                                />
                            </Card>
                        </TouchableOpacity>
                    )
                }}
            />
            <Button
                icon="loading"
                mode="contained"
                onPress={() => props.onButtonPressed()}
                style={props.buttonStyle}
                disabled={props.loading}
            >
                Load More
            </Button>
        </ScrollView>
    )
}
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    card: {
        width: width / 2 - 10,
        height: 150,
        margin: 5
    },
    cover: { height: '60%' },
    title: {
        fontSize: 12
    },
    subtitle: {
        fontSize: 10
    }
})
export default GridList;