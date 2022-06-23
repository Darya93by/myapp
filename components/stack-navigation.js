import * as React from "react";
import Main from "./main";
import About from "./abouit";
import TakePhoto from "./TakePhoto";
import Form from "./form";
import EditForm from "./editForm";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

export default function Navigate() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            title: "Контакты",
            headerStyle: {
              backgroundColor: "#F0E68C",
              height: 65,
              borderRadius: 0,
            },
            headerTitleStyle: {
              fontFamily: "ns-normal",
              fontSize: 26,
              color: "#000",
              paddingLeft: "5%",
            },
          }}
        />

        <Stack.Screen
          name="About"
          component={About}
          options={{
            title: "Подробности",
            headerStyle: {
              backgroundColor: "#F0E68C",
              height: 80,
              borderRadius: 10,
            },
            headerTitleStyle: {
              fontFamily: "ns-normal",
              fontSize: 26,
            },
          }}
        />

        <Stack.Screen
          name="Form"
          component={Form}
          options={{
            title: "Добавить контакт",
            headerStyle: {
              backgroundColor: "#F0E68C",
              height: 60,
              borderRadius: 10,
            },
            headerTitleStyle: {
              fontFamily: "ns-normal",
              fontSize: 26,
            },
          }}
        />
        <Stack.Screen
          name="EditForm"
          component={EditForm}
          options={{
            title: "Изменить контакт",
            headerStyle: {
              backgroundColor: "#F0E68C",
              height: 60,
              borderRadius: 10,
            },
            headerTitleStyle: {
              fontFamily: "ns-normal",
              fontSize: 26,
            },
          }}
        />
        <Stack.Screen name="TakePhoto" component={TakePhoto} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
