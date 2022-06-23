import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { gStyle } from "../styles/gStyle";

export default function About({ route }) {
  return (
    <View style={styles.About}>
      <Image source={route.params.image} style={{ height: 200, width: 200 }} />

      <Text style={styles.text}>
        {" "}
        Имя: {route.params.name} {route.params.lastname}
      </Text>
      <Text style={styles.text}> Номер: {route.params.number} </Text>
      <Text style={styles.text}> Заметка: {route.params.more} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  About: {
    paddingTop: 10,
  },
  text: {
    fontFamily: "ns-light",
    fontSize: 15,
  },
});
