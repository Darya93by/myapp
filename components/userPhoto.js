import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

export default function userPhoto({ route }) {
  const navigation = useNavigation();
  let { setSelectedImage, selectedImage, userImage, image } =
    route?.params || {};

  return (
    <View>
      {image && (
        <Image
          source={{ uri: image }}
          style={{
            flex: 1,
            borderRadius: 100,
            aspectRatio: 1,
            alignSelf: "center",
          }}
        />
      )}
      <AntDesign
        name="check"
        size={40}
        color="black"
        onPress={() => {
          if (image.cancelled === true) {
            return;
          }
          setSelectedImage({ localUri: image });

          if (selectedImage !== null) {
            userImage = { uri: selectedImage.localUri };
          } else userImage = require("../assets/Pngtree.png");

          navigation.goBack().goBack();
        }}
      />
    </View>
  );
}
