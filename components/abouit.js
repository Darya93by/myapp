import React, { useState } from "react";
import { StyleSheet, Text, View, Alert, Image, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { Menu, MenuItem } from "react-native-material-menu";
import { Entypo } from "@expo/vector-icons";

export default function About({ route }) {
  const navigation = useNavigation();
  const {
    deleteContact,
    item,
    handleSlectedCont,
    addSelectCont,
    selectedCont,
  } = route?.params || {};
  const [visible, setVisible] = useState(false);
  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);

  return (
    <ScrollView>
      <View style={styles.headerStyle}>
        <AntDesign
          name="arrowleft"
          size={24}
          style={{ paddingTop: 19, paddingLeft: 16 }}
          color="black"
          onPress={() => navigation.goBack()}
        />
        <Text style={[styles.headerTitleStyle, { flex: 3 }]}>Подробности</Text>
        <View style={{ paddingTop: 17, right: 7 }}>
          <Menu
            visible={visible}
            anchor={
              <Text onPress={showMenu} style={{ marginRight: 5 }}>
                <Entypo
                  name="dots-three-vertical"
                  size={30}
                  style={{ marginRight: 5 }}
                  color="black"
                />
              </Text>
            }
            onRequestClose={hideMenu}
          >
            <MenuItem
              onPress={() => [
                handleSlectedCont(item),
                navigation.navigate("EditForm", {
                  selectedCont: selectedCont,
                  addSelectCont: addSelectCont,
                  item,
                }),
              ]}
            >
              Редактировать
            </MenuItem>
            <MenuItem
              onPress={() => {
                Alert.alert("", "Вы действительно хотите удалить контакт?", [
                  {
                    text: "Да",
                    onPress: () => {
                      console.log(item), deleteContact(item.key);
                      navigation.goBack();
                    },
                  },
                  {
                    text: "Нет",
                    onPress: () => console.log("отмена"),
                  },
                ]);
              }}
            >
              Удалить
            </MenuItem>
            <MenuItem onPress={() => console.log("with other")}>
              Поделиться контактом
            </MenuItem>
          </Menu>
        </View>
      </View>
      <View style={styles.About}>
        <Image source={item.image} style={styles.image} />

        <Text style={styles.text}>
          <Text style={{ fontFamily: "ns-500" }}>Имя:</Text> {item.name}{" "}
          {item.lastname}
        </Text>
        <Text style={styles.text}>
          <Text style={{ fontFamily: "ns-500" }}>Номер:</Text> {item.number}{" "}
        </Text>
        <Text style={styles.text}>
          <Text style={{ fontFamily: "ns-500" }}>Заметка: </Text>
          {item.more}{" "}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  About: {
    paddingTop: 10,
    alignItems: "center",
  },
  text: {
    fontFamily: "ns-light",
    fontSize: 20,
    alignSelf: "flex-start",
    marginLeft: 15,
  },
  image: {
    height: 200,
    width: 200,
    marginBottom: 35,
  },
  headerStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F0E68C",
    height: 65,
    borderRadius: 0,
  },
  headerTitleStyle: {
    fontFamily: "ns-normal",
    fontSize: 26,
    color: "#000",
    paddingLeft: "5%",
    paddingTop: 13,
  },
});
