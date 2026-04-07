import { RootState } from "@/app/state/store";
import { bag } from "@/constant/icons";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";

const CartButton = () => {
  const totalItems = useSelector<RootState, number>(
    (state) => state.cart.totalItems,
  );

  function gotoCart() {
    router.push("/(tabs)/cart");
  }

  return (
    <TouchableOpacity className="cart-btn" onPress={gotoCart}>
      <Image source={bag} className="size-5 invert" resizeMode="contain" />
      {totalItems > 0 && (
        <View className="cart-badge">
          <Text className="small-bold text-white text-center text-[9px]">
            {totalItems}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CartButton;
