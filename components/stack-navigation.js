import * as React from "react";
import Main from "./main";
import About from "./abouit";
import TakePhoto from "./TakePhoto";
import Form from "./form";
import EditForm from "./editForm";
import UsersOfServer from "./UsersOfServer";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import TestApi from "./TestApi";
import MyPage from "./MyPage";

const Stack = createStackNavigator();

export default function Navigate() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            headerMode: "none",
            mode: "modal",
            title: "Контакты",
            headerStyle: {
              backgroundColor: "#F0E68C",
              height: 0,
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
            headerMode: "none",
            mode: "modal",
            title: "Подробности",
            headerStyle: {
              backgroundColor: "#F0E68C",
              height: 0,
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
        <Stack.Screen
          name="TakePhoto"
          options={{
            title: "Сделать фото",
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
          component={TakePhoto}
        />
        <Stack.Screen
          name="TestApi"
          options={{
            title: "Найти на сервере",
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
          component={TestApi}
        />
        <Stack.Screen
          name="UsersOfServer"
          options={{
            title: "О контакте",
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
          component={UsersOfServer}
        />
        <Stack.Screen
          name="MyPage"
          options={{
            headerMode: "none",
            mode: "modal",
            title: "Моя страница",
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
          component={MyPage}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
