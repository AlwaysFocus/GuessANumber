import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";

import Card from "../components/Card";
import Input from "../components/Input";
import Colors from "../constants/Colors";

const StartGameScreen = () => {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(0);

  const numberInputHandler = (inputText: any) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };

  const resetInputHandler = () => {
    setConfirmed(false);
    setEnteredValue("");
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert("Invalid number", "Number must be between 1 and 99", [
        { text: "Try Again", style: "destructive", onPress: resetInputHandler },
      ]);
      return;
    }
    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue("");
    Keyboard.dismiss();
  };

  let confirmedOutput;
  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.outputContainer}>
      <View style={styles.confirmedOutputContainer}>
        <Text style={styles.title}>You Chose</Text>
        <Text style={styles.selectedNumber}>{selectedNumber}</Text>
        <View style={styles.button} >
        <Button color={Colors.darkSecondary} title="Start Game" onPress={() => {}}/>
        </View>
      </View>
      </Card>
    );
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <Text style={styles.title}>Start a new Game!</Text>
        <Card style={styles.card}>
          <Text style={styles.cardHeader}>Enter a number between 1 and 99</Text>
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            maxLength={2}
            onChangeText={numberInputHandler}
            value={enteredValue}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.cancelButton}>
              <Button
                color={Colors.secondary}
                title="Reset"
                onPress={resetInputHandler}
              />
            </View>
            <View style={styles.button}>
              <Button
                color={Colors.darkSecondary}
                title="Guess!"
                onPress={confirmInputHandler}
              />
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 15,
  },
  card: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
  },
  input: {
    width: 80,
    textAlign: "center",
    fontSize: 30,
  },
  cardHeader: {
    color: "white",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    color: Colors.secondary,
  },
  button: {
    backgroundColor: Colors.secondary,
    borderRadius: 8,
    padding: 6,
  },
  cancelButton: {
    backgroundColor: Colors.darkPrimary,
    borderRadius: 8,
    padding: 6,
  },
  selectedNumber: {
    marginVertical: 5,
    marginBottom: 20,
    fontSize: 60,
    color: Colors.secondary,
    fontWeight: "500",
    borderWidth: 2,
    borderRadius: 3,
    padding: 5,
    borderColor: Colors.primary
  },
  confirmedOutputContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  outputContainer: {
    marginTop: 25,
    height: 225,
    width: '50%'
  }
});

export default StartGameScreen;
