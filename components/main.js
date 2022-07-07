import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Linking,
  Image,
} from "react-native";
import { gStyle } from "../styles/gStyle";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { Searchbar } from "react-native-paper";
import { SwipeListView } from "react-native-swipe-list-view";

export default function Main({ navigation }) {
  const [contact, setContact] = useState([
    {
      image: require("../assets/Pngtree.png"),
      name: "Дарья",
      lastname: "Пушкарь",
      number: "+375(33)6905793",
      more: " more more more more more more more more more more more more more more more more more more more more more more more more",
      key: 1,
    },
    {
      image: require("../assets/Pngtree.png"),
      name: "Елизавета",
      lastname: "Пушкарь",
      number: "+375(33)6905793",
      more: "more",
      key: 2,
    },
    {
      image: require("../assets/Pngtree.png"),
      name: "Ольга",
      lastname: "Пушкарь",
      number: "+375(33)6905793",
      more: "more",
      key: 3,
    },
    {
      image: require("../assets/Pngtree.png"),
      name: "Виктор",
      lastname: "Пушкарь",
      number: "+375(33)6905793",
      more: "more",
      key: 4,
    },
    {
      image: require("../assets/Pngtree.png"),
      name: "Валерия",
      lastname: "Сермяжко",
      number: "+375(33)6905793",
      more: "more",
      key: 5,
    },
    {
      image: require("../assets/Pngtree.png"),
      name: "Алексей",
      lastname: "Терёшкин",
      number: "+375(33)6905793",
      more: "more",
      key: 6,
    },
    {
      image: require("../assets/Pngtree.png"),
      name: "Виталий",
      lastname: "Коваль",
      number: "+375(33)6905793",
      more: "more",
      key: 7,
    },
    {
      image: require("../assets/Pngtree.png"),
      name: "Алевтина",
      lastname: "Солодкова",
      number: "+375(33)6905793",
      more: "more",
      key: 8,
    },
    {
      image: require("../assets/Pngtree.png"),
      name: "Полина",
      lastname: "Лосик",
      number: "+375(33)6905793",
      more: "more",
      key: 9,
    },
    {
      image: require("../assets/Pngtree.png"),
      name: "Татьяна",
      lastname: "Сорочинская",
      number: "+375(33)6905793",
      more: "more",
      key: 10,
    },
    {
      image: require("../assets/Pngtree.png"),
      name: "Евгений",
      lastname: "Сорочинский",
      number: "+375(33)6905793",
      more: "more",
      key: 11,
    },
    {
      image: require("../assets/Pngtree.png"),
      name: "Джек",
      lastname: "Терёшкин",
      number: "+375(33)6905793",
      more: "more",
      key: 12,
    },
  ]);

  const [editForm, setEditForm] = useState(false);

  const addContact = (newContact, userImage) => {
    setContact((list) => {
      if (newContact.key == undefined) {
        newContact.key = Math.random().toString(36);
        newContact.image = userImage;
      } else newContact.image = userImage;
      return [newContact, ...list];
    });
    setSearching((list) => {
      newContact.key = Math.random().toString(36);
      newContact.image = userImage;
      return [newContact, ...list];
    });
  };

  const stateContact = (elem) => {
    let listNam = contact.map((person) => person.number);
    if (listNam.includes(elem.number)) {
      return false;
    } else return true;
  };

  const deleteContact = (key) => {
    setContact((List) => {
      return List.filter((contact) => contact.key != key);
    });
    setSearching((List) => {
      return List.filter((searchinf) => searchinf.key != key);
    });
  };

  let [selectedCont, setSelectedCont] = useState("");
  const handleSlectedCont = (item) => {
    setSelectedCont((list) => {
      return item;
    });
  };

  const addSelectCont = (person, userImage) => {
    person.image = userImage;
    setContact((list) => {
      return list.map((elem) => {
        if (elem.key !== person.key) {
          return elem;
        } else return Object.assign(elem, person);
      });
    });
    setSearching((list) => {
      return list.map((elem) => {
        if (elem.key !== person.key) {
          return elem;
        } else return Object.assign(elem, person);
      });
    });
    setEditForm("false");
  };
  function makeCall(number) {
    Linking.openURL(`tel: ${number}`);
  }

  const [searchinf, setSearching] = useState(contact);
  const searchFunction = (text) => {
    if (text) {
      const newData = contact.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const itemDataL = item.lastname
          ? item.lastname.toUpperCase()
          : "".toUpperCase();
        const textData = text.toString().toUpperCase();
        console.log(textData);
        if (itemDataL.indexOf(textData) > -1) {
          return itemDataL.indexOf(textData) > -1;
        } else return itemData.indexOf(textData) > -1;
      });
      setSearching(contact);
      setSearching(newData);
    } else {
      setSearching(contact);
    }
  };

  return (
    <View style={gStyle.main}>
      <Searchbar
        placeholder="Поиск"
        onChangeText={(text) => {
          searchFunction(text);
        }}
        value={searchinf}
        style={styles.Search}
      />
      <View style={{ flex: 11.5 }}>
        <View>
          <SwipeListView
            keyExtractor={(item) => item.key}
            style={{ top: -20 }}
            data={searchinf}
            renderHiddenItem={({ item, key }) => (
              <View style={styles.rowBack}>
                <TouchableOpacity>
                  <Text>
                    <Foundation
                      name="telephone"
                      size={24}
                      color="black"
                      onPress={() => {
                        makeCall(item.number);
                      }}
                    />
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.backRightBtn, styles.backRightBtnLeft]}
                >
                  <Text>
                    <MaterialIcons
                      style={{
                        padding: 14,
                        right: 50,
                      }}
                      name="delete"
                      size={20}
                      color="black"
                      onPress={() => {
                        Alert.alert(
                          "",
                          "Вы действительно хотите удалить контакт?",
                          [
                            {
                              text: "Да",
                              onPress: () => deleteContact(item.key),
                            },
                            {
                              text: "Нет",
                              onPress: () => console.log("отмена"),
                            },
                          ]
                        );
                      }}
                    />
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ paddingRight: 10 }}>
                  <Text>
                    <Entypo
                      name="edit"
                      size={20}
                      color="black"
                      style={{
                        padding: 14,
                        right: 0,
                      }}
                      onPress={() => [
                        handleSlectedCont(item),
                        navigation.navigate("EditForm", {
                          selectedCont: selectedCont,
                          addSelectCont: addSelectCont,
                          item,
                        }),
                      ]}
                    />
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            leftOpenValue={50}
            rightOpenValue={-100}
            previewRowKey={"0"}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            directionalDistanceChangeThreshold={5}
            renderItem={({ item, key }) => (
              <TouchableOpacity
                onPress={() => {
                  handleSlectedCont(item);
                  console.log(item);
                  navigation.navigate("About", {
                    item: item,
                    deleteContact: deleteContact,
                    handleSlectedCont: handleSlectedCont,
                    addSelectCont: addSelectCont,
                    selectedCont: selectedCont,
                  });
                }}
              >
                <View
                  style={[
                    { flex: 1 },
                    { flexDirection: "row" },
                    { alignItems: "center" },
                    { backgroundColor: "#FFFFFF" },
                  ]}
                >
                  <Image source={item.image} style={styles.image} />
                  <Text style={styles.nameStyle} key={item.key}>
                    {item.name} {item.lastname}{" "}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <Ionicons
          name="person-add"
          size={35}
          style={styles.add}
          color="black"
          onPress={() => {
            navigation.navigate("Form", {
              addContact: addContact,
              stateContact: stateContact,
            });
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  add: {
    alignSelf: "flex-end",
    right: "6%",
    bottom: 15,
    position: "absolute",
  },
  addConatiner: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  nameStyle: {
    flex: 8,
    fontSize: 18,
    fontFamily: "ns-light",
    margin: 8,
    paddingBottom: 3,
    left: 10,
    alignItems: "flex-start",
  },
  close: {
    alignSelf: "flex-end",
    right: "5%",
  },
  delete: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    left: 0,
    paddingLeft: 5,
    backgroundColor: "#FFFFFF",
    height: "100%",
  },
  options: {
    height: 20,
  },
  Search: {
    top: -30,
    fontFamily: "ns-light",
    fontSize: 15,
    borderRadius: 10,
  },
  image: {
    width: 35,
    height: 35,
    left: 5,
    alignItems: "flex-start",
    alignSelf: "center",
    borderRadius: 50,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#DDD",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 50,
  },
  backRightBtnLeft: {
    right: 50,
  },
  backTextWhite: {
    color: "#FFF",
  },
});
