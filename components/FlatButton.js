import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

export default function FlatButton({ text, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}> {text} </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    paddingVertical: "4%",
    paddingHorizontal: "8%",
    backgroundColor: "#F0E68C",
    width: "60%",
    alignSelf: "center",
    marginTop: "7%",
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "ns-normal",
    textTransform: "uppercase",
    textAlign: "center",
  },
});
