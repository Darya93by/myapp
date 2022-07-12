import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  ScrollView,
  Share,
  Clipboard,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Menu, MenuItem } from "react-native-material-menu";
import { Entypo } from "@expo/vector-icons";
//import Clipboard from "@react-native-clipboard/clipboard"; -- НЕ РАБОТАЕТ С EXPO (  судя по всему не только у меня, использую устаревшую версию из реакт нетив)

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
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: item.name + " " + item.lastname + "\n" + item.number,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.headerStyle}>
          <AntDesign
            name="arrowleft"
            size={24}
            style={{ paddingTop: 19, paddingLeft: 16 }}
            color="black"
            onPress={() => navigation.goBack()}
          />
          <Text style={[styles.headerTitleStyle, { flex: 3 }]}>
            Подробности
          </Text>
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
                  setVisible(false),
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
                  setVisible(false);
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
              <MenuItem
                onPress={() => {
                  setVisible(false);
                  onShare();
                }}
              >
                Поделиться контактом
              </MenuItem>
            </Menu>
          </View>
        </View>
        <View style={styles.About}>
          <Image source={item.image} style={styles.image} />

          <Text style={styles.text}>
            <Text style={{ fontFamily: "ns-500" }}>Имя: </Text> {item.name}{" "}
            {item.lastname}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignSelf: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <Text style={[styles.text, { flex: 6 }]}>
              <Text style={{ fontFamily: "ns-500" }}>Номер: </Text>{" "}
              {item.number}{" "}
            </Text>
            <Text style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={() => Clipboard.setString(item.number)}
              >
                <AntDesign name="copy1" size={24} color="black" />
              </TouchableOpacity>
            </Text>
          </View>
          <Text style={styles.text}>
            <Text style={{ fontFamily: "ns-500" }}>Заметка: </Text> {item.more}{" "}
          </Text>
        </View>
      </ScrollView>
    </View>
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
