import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";

import { useEffect } from "react";
import "./global.css";

export default function RootLayout() {
  const [fontLoaded, error] = useFonts({
    "Quicksand-bold": require("../assets/fonts/Quicksand/Quicksand-Bold.ttf"),
    "Quicksand-medium": require("../assets/fonts/Quicksand/Quicksand-Medium.ttf"),
    "Quicksand-regular": require("../assets/fonts/Quicksand/Quicksand-Regular.ttf"),
    "Quicksand-semibold": require("../assets/fonts/Quicksand/Quicksand-SemiBold.ttf"),
    "Quicksand-light": require("../assets/fonts/Quicksand/Quicksand-Light.ttf"),
  });
  useEffect(() => {
    if (error) throw error;
    if (fontLoaded) SplashScreen.hideAsync();
  }, [fontLoaded, error]);
  return <Stack screenOptions={{ headerShown: false }} />;
}
