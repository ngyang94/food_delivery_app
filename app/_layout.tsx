import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";

import { useEffect } from "react";
import { Provider } from "react-redux";
import "./global.css";
import store from "./state/store";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontLoaded, error] = useFonts({
    "Quicksand-bold": require("../assets/fonts/Quicksand/Quicksand-Bold.ttf"),
    "Quicksand-medium": require("../assets/fonts/Quicksand/Quicksand-Medium.ttf"),
    "Quicksand-regular": require("../assets/fonts/Quicksand/Quicksand-Regular.ttf"),
    "Quicksand-semibold": require("../assets/fonts/Quicksand/Quicksand-SemiBold.ttf"),
    "Quicksand-light": require("../assets/fonts/Quicksand/Quicksand-Light.ttf"),
    "PlaywriteIE-Regular": require("../assets/fonts/PlaywriteIE-Regular.ttf"),
  });
  useEffect(() => {
    if (error) throw error;
    if (fontLoaded) SplashScreen.hideAsync();
  }, [fontLoaded, error]);

  if (!fontLoaded && !error) {
    return null;
  }
  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }} />
    </Provider>
  );
}
