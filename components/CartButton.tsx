import { bag } from "@/constant/icons";
import { Image, Text, TouchableOpacity, View } from "react-native";

const CartButton = () => {
  const totalItems = 8;

  return (
    <TouchableOpacity className="cart-btn" onPress={() => {}}>
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
