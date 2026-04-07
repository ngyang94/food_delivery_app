import { trash } from "@/constant/icons";
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface CartItemProp {
  image: ImageSourcePropType;
  name: string;
  price: number;
  amount: number;
  minusButtonHandler?: () => void;
  addButtonHandler?: () => void;
  deleteButtonHandler?: () => void;
}
const CartItem = ({
  image,
  name,
  price,
  amount,
  minusButtonHandler,
  addButtonHandler,
  deleteButtonHandler,
}: CartItemProp) => {
  return (
    <View className="flex flex-row justify-between border border-gray-300 rounded-lg px-2 py-2">
      <Image source={image} className="size-20" resizeMode="contain" />
      <View className="w-[75%]">
        <Text className="font-quicksand-bold ">{name}</Text>
        <Text className="text-primary">${price}</Text>
        <View className="flex-row justify-between">
          <View className="flex-row items-center">
            <TouchableOpacity
              className="justify-center items-center"
              onPress={minusButtonHandler}
            >
              <Text className="text-primary text-3xl">-</Text>
            </TouchableOpacity>
            <Text className="px-4">{amount || 0}</Text>
            <TouchableOpacity
              className="justify-center items-center"
              onPress={addButtonHandler}
            >
              <Text className="text-primary text-2xl">+</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={deleteButtonHandler}>
            <Image source={trash} className="size-5" resizeMode="contain" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CartItem;
