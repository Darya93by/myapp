import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  Alert,
  Linking,
  Image,
} from "react-native";
import { gStyle } from "../styles/gStyle";
import { Ionicons } from "@expo/vector-icons";
import Form from "./form";
import { MaterialIcons } from "@expo/vector-icons";
import EditForm from "./editForm";
import { Entypo } from "@expo/vector-icons";
import Swipeout from "react-native-swipeout";
import { Foundation } from "@expo/vector-icons";
import { Searchbar } from "react-native-paper";

export default function Main({ navigation }) {
  const [contact, setContact] = useState([
    {
      image: require("../assets/Pngtree.png"),
      name: "Дарья",
      lastname: "Пушкарь",
      number: "+375(33)6905793",
      more: "more",
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

  const [formAdd, setFormAdd] = useState(false);
  const [editForm, setEditForm] = useState(false);

  // const img = require("../assets/Pngtree.png");
  const addContact = (newContact, userImage) => {
    setContact((list) => {
      newContact.key = Math.random().toString(36);
      newContact.image = userImage;
      return [newContact, ...list];
    });
    setSearching((list) => {
      newContact.key = Math.random().toString(36);
      newContact.image = userImage;
      return [newContact, ...list];
    });
    setFormAdd(false);
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
  const item = () => {
    setContact((list) => {
      return list.map((elem) => {
        return elem;
      });
    });
  };

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
          <FlatList
            keyExtractor={(item) => item.key}
            style={{ top: -20 }}
            data={searchinf}
            renderItem={({ item, key }) => (
              <Swipeout
                left={[
                  {
                    sensitivity: 150,
                    autoClose: true,
                    onClose: () => {
                      if (item.key != null) {
                        return (item.key = null);
                      }
                    },
                    onOpen: () => {
                      handleSlectedCont(item);
                    },
                    text: (
                      <Foundation
                        name="telephone"
                        size={24}
                        color="black"
                        onPress={() => {
                          makeCall(item.number);
                        }}
                      />
                    ),
                  },
                ]}
                right={[
                  {
                    sensitivity: 150,
                    style: {
                      backgroundColor: "#FFFFFF",
                    },
                    autoClose: true,
                    onClose: () => {
                      if (item.key != null) {
                        return (item.key = null);
                      }
                    },
                    onOpen: () => {
                      handleSlectedCont(item);
                    },

                    text: [
                      <MaterialIcons
                        name="delete"
                        size={20}
                        color="black"
                        style={{ backgroundColor: "#FFFFFF", padding: 14 }}
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
                      />,
                      <Entypo
                        name="edit"
                        size={20}
                        color="black"
                        style={{
                          padding: 14,
                          backgroundColor: "#FFFFFF",
                          right: 5,
                        }}
                        onPress={() => [
                          handleSlectedCont(item),
                          navigation.navigate("EditForm", {
                            selectedCont: selectedCont,
                            addSelectCont: addSelectCont,
                            item,
                          }),
                        ]}
                      />,
                    ],
                  },
                ]}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate("About", item)}
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
              </Swipeout>
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
            setFormAdd(true);
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
    width: 30,
    height: 30,
    left: 5,
    alignItems: "flex-start",
    alignSelf: "center",
    borderRadius: 50,
  },
});
