import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Button } from "react-native";
import { Alert } from "react-native";
import { Camera } from "expo-camera";
import FlatButton from "./FlatButton";
import { useNavigation } from "@react-navigation/native";

export default function TakePhoto({ route }) {
  const navigation = useNavigation();
  const userImage = route?.params || {};
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
    <View style={{ flex: 1 }}>
      <View style={styles.cameraContainer}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={styles.fixedRatio}
          type={type}
          ratio={"1:1"}
        />
      </View>
      <Button
        title="Flip Image"
        onPress={() => {
          setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          );
        }}
      ></Button>
      <Button
        title="Take Picture"
        onPress={() => {
          takePicture();
        }}
      />
      {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
      <FlatButton text="Сохранить" onPress={() => navigation.goBack(image)} />
    </View>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: "row",
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
});
