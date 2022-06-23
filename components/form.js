import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Image,
} from "react-native";
import { KeyboardAvoidingView } from "react-native";
import FlatButton from "./FlatButton";
import { Formik } from "formik";
import { Alert } from "react-native";
import { Menu, MenuItem } from "react-native-material-menu";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

export default function Form({ route }) {
  const { addContact, stateContact, image } = route?.params || {};
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

  const [selectedImage, setSelectedImage] = useState(null);
  let userImage;
  const [takePoto, setTakePhoto] = useState(false);

  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);
    if (pickerResult.cancelled === true) {
      return;
    }
    setSelectedImage({ localUri: pickerResult.uri });
  };

  if (selectedImage !== null) {
    userImage = { uri: selectedImage.localUri };
  } else userImage = require("../assets/Pngtree.png");

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <ScrollView>
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.form}>
            <Formik
              initialValues={{
                name: "",
                lastname: "",
                number: "",
                more: "",
                image: "",
              }}
              onSubmit={(values, action) => {
                if (!stateContact(values)) {
                  return Alert.alert(
                    "Такой номер уже существует",
                    "Продолжить?",
                    [
                      {
                        text: "Да",
                        onPress: () => {
                          addContact(values, userImage);
                          action.resetForm;
                        },
                      },

                      {
                        text: "Отмена",
                        onPress: () => {
                          console.log("отменено");
                        },
                      },
                    ]
                  );
                } else {
                  addContact(values, userImage);
                  action.resetForm;
                }
              }}
            >
              {(props) => (
                <View>
                  <View style={styles.container}>
                    <Image source={userImage} style={styles.image} />
                  </View>
                  <Text style={styles.text}> Укажите имя: </Text>
                  <TextInput
                    maxLength={12}
                    value={props.values.name}
                    style={styles.input}
                    onChangeText={props.handleChange("name")}
                  />

                  <Text style={styles.text}> Укажите фамилию: </Text>
                  <TextInput
                    maxLength={13}
                    style={styles.input}
                    value={props.values.lastname}
                    onChangeText={props.handleChange("lastname")}
                  />

                  <Text style={styles.text}> Номер:</Text>
                  <TextInput
                    maxLength={20}
                    style={styles.input}
                    value={props.values.number}
                    onChangeText={props.handleChange("number")}
                    keyboardType="phone-pad"
                  />

                  <Text style={styles.text}> Заметка о контакте: </Text>
                  <TextInput
                    maxLength={120}
                    style={styles.input}
                    value={props.values.more}
                    onChangeText={props.handleChange("more")}
                    placeholder=" Дополнительно "
                    multiline
                  />

                  <Menu
                    visible={visible}
                    anchor={
                      <Text onPress={showMenu} style={styles.text}>
                        {" "}
                        Добавить изображение{" "}
                      </Text>
                    }
                    onRequestClose={hideMenu}
                  >
                    <MenuItem
                      onPress={() => {
                        navigation.navigate("TakePhoto", {
                          userImage,
                        });
                        console.log("open camera");
                        hideMenu();
                      }}
                    >
                      Добавить фото
                    </MenuItem>
                    <MenuItem
                      onPress={() => {
                        openImagePickerAsync();
                        hideMenu();
                      }}
                    >
                      Загрузить из галереи
                    </MenuItem>
                  </Menu>

                  <FlatButton
                    text="Сохранить"
                    onPress={() => {
                      props.handleSubmit();
                      navigation.navigate("Main");
                    }}
                  />
                </View>
              )}
            </Formik>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: "5%",
  },
  input: {
    alignSelf: "center",
    width: "90%",
    borderRadius: 10,
    padding: "2%",
    borderWidth: 1,
    borderColor: "#000",
    marginBottom: "3%",
  },
  text: {
    marginBottom: "1%",
    marginLeft: "5%",
    fontFamily: "ns-light",
    fontSize: 15,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    borderRadius: 50,
    alignSelf: "center",
  },
});