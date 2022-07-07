import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Button, Text } from "react-native";
import { Alert } from "react-native";
import { Camera } from "expo-camera";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function TakePhoto({ route }) {
  const navigation = useNavigation();
  let { setSelectedImage, selectedImage, userImage } = route?.params || {};
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setImage(data.uri);
    }
  };
  if (hasCameraPermission === false) {
    return Alert.alert("Ошибка", "Нет доступа к камере");
  }
  return (
    <View style={{ flex: 1, backgroundColor: "#FFF8DC" }}>
      <View style={styles.cameraContainer}>
        {!image && (
          <Camera
            ref={(ref) => setCamera(ref)}
            autoFocus="on"
            style={styles.fixedRatio}
            type={type}
            ratio={"1:1"}
          />
        )}

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
      </View>
      {image && (
        <View
          style={{
            flex: 0 / 5,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingStart: 20,
            paddingEnd: 20,
          }}
        >
          <EvilIcons
            name="camera"
            size={45}
            onPress={() => {
              setImage(null);
            }}
            color="black"
          />
          <AntDesign
            name="check"
            size={40}
            color="black"
            onPress={() => {
              if (image === null || undefined) {
                userImage = require("../assets/Pngtree.png");
                navigation.goBack();
              } else {
                if (image.cancelled === true) {
                  return;
                }
                setSelectedImage({ localUri: image });

                if (selectedImage !== null) {
                  userImage = { uri: selectedImage.localUri };
                } else userImage = require("../assets/Pngtree.png");

                navigation.goBack();
              }
            }}
          />
        </View>
      )}
      {!image && (
        <View
          style={{
            flex: 0 / 5,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingStart: 20,
            paddingEnd: 20,
          }}
        >
          <EvilIcons
            name="redo"
            size={50}
            color="black"
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          />
          <Feather
            name="aperture"
            size={38}
            color="black"
            onPress={() => {
              takePicture();
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    alignSelf: "center",
    flex: 2,
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
  text: {
    marginBottom: "1%",
    marginLeft: "5%",
    fontFamily: "ns-light",
    fontSize: 15,
    backgroundColor: "#F7F6E4",
    width: 250,
    alignSelf: "center",
    borderRadius: 8,
    textAlign: "center",
    height: 30,
  },
});
