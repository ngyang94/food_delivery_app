import CartButton from "@/components/CartButton";
import { offers } from "@/constant/data";
import { arrowDown, arrowRight } from "@/constant/icons";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={offers}
        renderItem={({ item, index }) => {
          const isEven = index % 2 == 0;
          return (
            <View className="pb-5">
              <Pressable
                className={
                  "offer-card" + (isEven ? " flex-row-reverse" : " flex-row")
                }
                style={{ backgroundColor: item.color }}
                android_ripple={{ color: "#ffffff" }}
              >
                {({ pressed }) => (
                  <>
                    <View className={"h-full w-1/2"}>
                      <Image
                        source={item.image}
                        className={"size-full"}
                        resizeMode={"contain"}
                      />
                    </View>
                    <View className="offfer-card__info">
                      <Text className="h1-bold text-white leading-tight">
                        {item.title}
                      </Text>
                      <Image source={arrowRight} className="size-10" />
                    </View>
                  </>
                )}
              </Pressable>
            </View>
          );
        }}
        ListHeaderComponent={() => (
          <View className="flex-row justify-between w-full my-5">
            <View className="flex-start">
              <Text className="small-bold text-primary">DELIEVER TO</Text>
              <TouchableOpacity className="flex-center flex-row gap-x-1 mt-0.5">
                <Text className="paragraph-bold text-dark-100">Croatia</Text>
                <Image
                  source={arrowDown}
                  className="size-3"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            <CartButton />
          </View>
        )}
        contentContainerClassName="pb-28 px-5"
      />
    </SafeAreaView>
  );
}
