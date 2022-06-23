import * as React from "react";
import { useState, useCallback, useEffect } from "react";
import { StyleSheet, View, Animated } from "react-native";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { gStyle } from "./styles/gStyle";
import MainStack from "./components/stack-navigation";
import "react-native-gesture-handler";
import { MenuProvider } from "react-native-popup-menu";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  const [font, setFont] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          "ns-light": require("./assets/fonts/Noto_Sans/NotoSans-Light.ttf"),
          "ns-bold": require("./assets/fonts/Noto_Sans/NotoSans-Bold.ttf"),
          "ns-500": require("./assets/fonts/Noto_Sans/NotoSans-Medium.ttf"),
          "ns-400": require("./assets/fonts/Noto_Sans/NotoSans-Regular.ttf"),
          "ns-italic": require("./assets/fonts/Noto_Sans/NotoSans-Italic.ttf"),
          "ns-normal": require("./assets/fonts/Noto_Sans/NotoSerif-Regular.ttf"),
          "ns-serif": require("./assets/fonts/Noto_Sans/NotoSerif-Bold.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setFont(true);
      }
    }

    prepare();
  }, []);

  const appPage = useCallback(async () => {
    if (font) {
      await SplashScreen.hideAsync();
    }
  }, [font]);

  if (!font) {
    return null;
  }

  return (
    <MenuProvider>
      <View onLayout={appPage} style={gStyle.main}>
        <MainStack />
      </View>
    </MenuProvider>
  );
}

const styles = StyleSheet.create({});
