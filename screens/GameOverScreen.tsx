import React from "react";
import { StyleSheet, View, Text } from "react-native";



const GameOverScreen = (props: any) => {

    return (
        <View style={styles.screen}>
            <Text>The Game is Over!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default GameOverScreen;