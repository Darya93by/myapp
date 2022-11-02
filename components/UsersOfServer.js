import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function UsersOfServer({ route }) {
  const navigation = useNavigation();
  const { item } = route?.params || {};
  return (
    <View style={{ flex: 1 }}>
      <Image source={{ uri: item.avatar }} style={styles.image} />
      <Text style={styles.text}>
        Name: {item.first_name} {item.last_name}
      </Text>
      <Text style={styles.text}>Email: {item.email}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    height: 200,
    width: 200,
    marginBottom: 35,
    alignSelf: "center",
  },
  text: {
    fontFamily: "ns-light",
    fontSize: 20,
    alignSelf: "flex-start",
    marginLeft: 15,
  },
});
