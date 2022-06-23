import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Menu, MenuItem } from "react-native-material-menu";
import { Entypo } from "@expo/vector-icons";

export default function Options({
  setEditForm,
  handleSlectedCont,
  deleteContact,
  setVisible,
  item,
  visible,
  addSelectCont,
}) {
  console.log({ route });
  return (
    <View
      style={{ height: "100%", alignItems: "center", justifyContent: "center" }}
    >
      <Entypo
        name="edit"
        size={20}
        color="black"
        style={[styles.delete, { backgroundColor: "red" }]}
        onPress={() => [setEditForm(true), handleSlectedCont(item)]}
      />
      <MaterialIcons
        name="delete"
        size={20}
        color="black"
        style={styles.delete}
        onPress={() => deleteContact(item.key)}
      />

      <Menu
        visible={visible}
        anchor={
          <Text onPress={() => setVisible(true)}>
            {" "}
            <Entypo
              name="dots-three-vertical"
              size={20}
              color="black"
              style={styles.delete}
            />
          </Text>
        }
        onRequestClose={() => setVisible(false)}
      >
        <MenuItem
          onPress={() => [
            setVisible(false),
            setEditForm(true),
            handleSlectedCont({ route }),
            addSelectCont({ route }),
          ]}
        >
          Редактировать
        </MenuItem>
        <MenuItem
          onPress={() => [
            setVisible(false),
            deleteContact({ route }.params.key),
          ]}
        >
          Удалить
        </MenuItem>
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({});
