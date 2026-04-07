import { arrowLeft, search } from "@/constant/icons";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

const CustomHeader = ({ title }: { title?: string }) => {
  function gotoSearch() {
    router.push("/(tabs)/search");
  }
  return (
    <View className="flex flex-row w-full items-center justify-between py-5">
      <TouchableOpacity>
        <Image source={arrowLeft} className="size-5" />
      </TouchableOpacity>
      {title && <Text className="font-quicksand-bold text-lg">{title}</Text>}
      <TouchableOpacity onPress={gotoSearch}>
        <Image source={search} className="size-5" />
      </TouchableOpacity>
    </View>
  );
};
export default CustomHeader;
