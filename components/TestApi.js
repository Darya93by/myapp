import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function TestApi({ route }) {
  // тренируемся работать с сервером
  const navigation = useNavigation();

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

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
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
          </View>
        )}
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
