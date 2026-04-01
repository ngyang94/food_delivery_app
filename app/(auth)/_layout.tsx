import { loginGraphic, logo } from "@/constant/images";
import { Redirect, Slot } from "expo-router";
import {
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

export default function _Layout() {
  const auth = useSelector<RootState, AuthState>((state) => {
    state.auth;
  });
  if (auth.isAuthenticated) {
    return <Redirect href="/" />;
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <ScrollView
        className="bg-white h-full"
        keyboardShouldPersistTaps="handled"
      >
        <View
          className="w-full relative"
          style={{ height: Dimensions.get("screen").height / 2.25 }}
        >
          <ImageBackground
            source={loginGraphic}
            className="size-full rounded-b-lg"
            resizeMode="stretch"
          />
          <Image
            source={logo}
            className="self-center size-48 absolute -bottom-16 z-10 border-orange-500 border-2 rounded-s-lg"
          />
        </View>
        <Slot />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
