import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Text, Button, Alert } from "react-native";
import {Ionicons} from '@expo/vector-icons'

import Card from "../components/Card";
import Colors from "../constants/Colors";

const GenerateNumberBetween = (
  min: number,
  max: number,
  excluded: number
): any => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;

  if (randomNumber === excluded) {
    return GenerateNumberBetween(min, max, excluded);
  }

  return randomNumber;
};

const GameScreen = (props: any) => {
  const [currentGuess, setCurrentGuess] = useState(
    GenerateNumberBetween(1, 100, props.userChoice)
  );

  const [numberOfGuesses, setNumberOfGuesses] = useState(0);

  // useRef allows us to rerender the component without resetting the value, cool!
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  // Get our props
  const {userChoice, onGameFinished} = props;

  useEffect(() => {
    if (currentGuess === userChoice) {
        onGameFinished(numberOfGuesses);
    }
  },[currentGuess, userChoice, onGameFinished])

  const nextGuessHandler = (direction: any) => {
    if (
      (direction === "lower" && currentGuess < userChoice) ||
      (direction === "higher" && currentGuess > userChoice)
    ) {
      Alert.alert("Hmm, that doesn't seem right...", "Give the proper hint..", [
        { text: "My Bad!", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
      
    }

    const nextNumber = GenerateNumberBetween(currentLow.current, currentHigh.current, currentGuess);

    setCurrentGuess(nextNumber);
    setNumberOfGuesses(numberOfGuesses => numberOfGuesses + 1);
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Opponents Guess</Text>
      <Text style={styles.selectedNumber}>{currentGuess}</Text>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button
            title="Lower"
            color={Colors.darkSecondary}
            onPress={nextGuessHandler.bind(this, "lower")}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Higher"
            color={Colors.darkSecondary}
            onPress={nextGuessHandler.bind(this, "higher")}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  selectedNumber: {
    marginVertical: 5,
    marginBottom: 20,
    fontSize: 60,
    color: Colors.secondary,
    fontWeight: "500",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    borderColor: Colors.primary,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80%",
  },
  button: {
    backgroundColor: Colors.secondary,
    borderRadius: 8,
    padding: 6,
  },
  title: {
    fontSize: 35,
    color: Colors.secondary,
    marginBottom: 10,
    fontFamily: 'supermercadoOne'
  },
});

export default GameScreen;
