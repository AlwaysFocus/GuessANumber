import React from "react";
import { StyleSheet, View, Text, Button, Image } from "react-native";

import Card from "../components/Card";
import Colors from "../constants/Colors";

const GameOverScreen = (props: any) => {
  return (
    <View style={styles.screen}>
      <Card style={styles.card}>
        <Text style={styles.text}>The Game is Over!</Text>
        
        
        <Text style={styles.text}>
          Number of rounds: {props.numberOfRounds}
        </Text>
        <Text style={styles.text}>Your number: {props.userNumber}</Text>
      </Card>
      <View style={styles.button}>
        <Button
          title="Start New Game"
          onPress={props.onStartNewGame}
          color={Colors.darkPrimary}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: Colors.secondary,
    borderRadius: 8,
    padding: 6,
  },
  card: {
    padding: 25,
    marginBottom: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 25,
    paddingVertical: 5,
    color: Colors.secondary,
  },
  imageContainer: {
    width: 300,
    height: 300,
  },
  image: {
    width: '80%',

  }
});

export default GameOverScreen;
