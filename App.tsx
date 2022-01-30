import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import Colors from "./constants/Colors";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

const fetchFonts = () => {
  return Font.loadAsync({
    supermercadoOne: require("./assets/fonts/SupermercadoOne-Regular.ttf"),
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [numberOfRounds, setNumberOfRounds] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setIsLoading(false)}
        onError={() => console.log("dang")}
      />
    );
  }

  const gameOverHandler = (numberOfRounds: any) => {
    setNumberOfRounds(numberOfRounds);
  };

  const startGameHandler = (selectedNumber: any) => {
    setUserNumber(selectedNumber);
    setNumberOfRounds(0);
  };

  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if (userNumber && numberOfRounds <= 0) {
    content = (
      <GameScreen userChoice={userNumber} onGameFinished={gameOverHandler} />
    );
  } else if (numberOfRounds > 0) {
    content = (
      <GameOverScreen
        numberOfRounds={numberOfRounds}
        userNumber={userNumber}
        onStartNewGame={() => {
          setUserNumber(undefined);
          setNumberOfRounds(0);
        }}
      />
    );
  }
  return (
    <View style={styles.screen}>
      <Header title="Guess a Number!" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
