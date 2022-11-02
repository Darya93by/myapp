import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { Searchbar } from "react-native-paper";

export default function TestApi({ route }) {
  // тренируемся работать с сервером
  const navigation = useNavigation();
  const { addContact, contact } = route?.params || {};

  const [data, setData] = useState([]);

  useEffect(() => {
    async function prepare() {
      const response = await fetch("https://reqres.in/api/users?page=2")
        .then((res) => res.json())
        .then((res) => res.data);
      setData(response);
    }
    prepare();
  });

  const [searchinf, setSearching] = useState([]);

  const searchFunction = (text) => {
    if (text) {
      const newData = data.filter((item) => {
        const itemData = item.first_name
          ? item.first_name.toUpperCase()
          : "".toUpperCase();
        const itemDataL = item.last_name
          ? item.last_name.toUpperCase()
          : "".toUpperCase();
        const textData = text.toString().toUpperCase();
        console.log(textData);
        if (itemDataL.indexOf(textData) > -1) {
          return itemDataL.indexOf(textData) > -1;
        } else return itemData.indexOf(textData) > -1;
      });
      setSearching(data);
      setSearching(newData);
    } else {
      setSearching([]);
    }
  };

  let stateAdd = (j) => {
    let more1 = contact.map((i) => i.more);
    if (more1.includes(j.email)) {
      j.icon = "check";
      return false;
    } else {
      j.icon = "plus";
      return true;
    }
  };

  const [isRender, setIsRender] = useState(false);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("UsersOfServer", {
          item,
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
        <Image source={{ uri: item.avatar }} style={styles.image} />
        <Text
          style={[styles.nameStyle, { flex: 8, paddingTop: 9 }]}
          key={item.id}
        >
          {item.first_name} {item.last_name}
        </Text>
        {stateAdd(item) ? (
          <TouchableOpacity
            onPress={() => {
              item.icon = "check";

              Alert.alert("", "Добавить этот контакт?", [
                {
                  text: "Да",
                  onPress: () => {
                    addContact(
                      {
                        name: item.last_name,
                        lastname: item.last_name,
                        number: "",
                        more: item.email,
                        image: "",
                      },
                      { uri: item.avatar }
                    );
                    setSearching((List) => {
                      return List.filter(
                        (searchinf) => searchinf.id != item.id
                      );
                    });
                  },
                },
                ,
                {
                  text: "Нет",
                  onPress: () => console.log("отмена"),
                },
              ]);
            }}
          >
            <AntDesign
              name="plus"
              size={27}
              color="black"
              style={{
                alignSelf: "flex-end",
                paddingEnd: 13,
                paddingVertical: 10,
              }}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity>
            <AntDesign
              name="check"
              size={27}
              color="black"
              style={{
                alignSelf: "flex-end",
                paddingEnd: 13,
                paddingVertical: 10,
              }}
            />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <Searchbar
        placeholder="Поиск"
        onChangeText={(text) => {
          searchFunction(text);
        }}
        value={searchinf}
        style={styles.Search}
      />
      <FlatList
        data={searchinf}
        keyExtractor={(item) => item.id.toString()}
        extraData={isRender}
        renderItem={renderItem}
        refreshing={isRender}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  nameStyle: {
    flex: 8,
    fontSize: 18,
    fontFamily: "ns-light",
    margin: 8,
    left: 10,
    alignItems: "flex-start",
  },
  image: {
    width: 35,
    height: 35,
    left: 5,
    alignItems: "flex-start",
    alignSelf: "center",
    borderRadius: 50,
  },
});
