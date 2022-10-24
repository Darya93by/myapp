import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
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
          <View>
            <Text style={{ flex: 8, paddingTop: 9 }}>{item.email}</Text>
          </View>
        )}
      />
    </View>
  );
}
