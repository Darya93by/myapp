import { Searchbar } from "react-native-paper";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Search({ contact }) {
  const navigation = useNavigation();
  const [values, setVal] = useState("");
  const searchFunction = (text) => {
    if (text) {
      const newData = contact.filter((item) => {
        const itemData =
          item.name || item.lastname
            ? item.name.toUpperCase() || item.lastname.toUpperCase()
            : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setVal(newData);
    } else {
      setVal(contact);
    }
  };
  return (
    <Searchbar
      placeholder="Поиск"
      onChangeText={() => {
        searchFunction(values);
      }}
      value={values}
      style={styles.Search}
    />
  );
}

const styles = StyleSheet.create({
  Search: {
    top: -30,
    fontFamily: "ns-light",
    fontSize: 15,
    borderRadius: 10,
  },
});
