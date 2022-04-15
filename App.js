import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import Constants from "expo-constants";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// https://github.com/expo/expo/issues/1141

export default class App extends Component {
  state = {
    PlayingStatus: "Start Song",
    icons: "play",
  };

  async _playRecording() {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/Hutang.mp3"),
      {
        shouldPlay: true,
        isLooping: false,
      },
      this._updateScreenForSoundStatus
    );
    this.sound = sound;
    this.setState({
      PlayingStatus: "Playing",
      icons: "pause",
    });
  }

  _updateScreenForSoundStatus = (status) => {
    if (status.isPlaying && this.state.PlayingStatus !== "Playing") {
      this.setState({ PlayingStatus: "Playing" });
    } else if (!status.isPlaying && this.state.PlayingStatus === "Playing") {
      this.setState({ PlayingStatus: "Pause" });
    }
  };

  async _pauseAndPlayRecording() {
    if (this.sound != null) {
      if (this.state.PlayingStatus == "Playing") {
        console.log("pausing...");
        await this.sound.pauseAsync();
        console.log("paused!");
        this.setState({
          PlayingStatus: "Pause",
          icons: "play",
        });
      } else {
        console.log("Playing...");
        await this.sound.playAsync();
        console.log("Playing!");
        this.setState({
          PlayingStatus: "Playing",
        });
      }
    }
  }

  _syncPauseAndPlayRecording() {
    if (this.sound != null) {
      if (this.state.PlayingStatus == "Playing") {
        this.sound.pauseAsync();
      } else {
        this.sound.playAsync();
      }
    }
  }

  _playAndPause = () => {
    switch (this.state.PlayingStatus) {
      case "Start Song":
        this._playRecording();
        break;
      case "Pause":
      case "Playing":
        this._pauseAndPlayRecording();
        break;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Apri Kurniawansyah 119140141</Text>
        <MaterialCommunityIcons
          name="music-circle"
          size={200}
          color="#1572A1"
        />
        <TouchableOpacity style={styles.button} onPress={this._playAndPause}>
          <AntDesign name={this.state.icons} size={20} color="#1572A1" />
          <Text style={styles.buttonText}>{this.state.PlayingStatus}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Hutang "Flor 88"</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
    paddingTop: Constants.statusBarHeight,
  },
  button: {
    alignItems: "center",
    width: 100,
    height: 50,
    margin: 5,
    borderRadius: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  buttonText: {
    textAlign: "center",
    backgroundColor: "transparent",
  },
  title: {
    textAlign: "center",
    backgroundColor: "transparent",
    color: "white",
    fontSize: 20,
  },
});
