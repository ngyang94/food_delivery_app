import CartItem from "@/components/CartItem";
import CustomHeader from "@/components/CustomHeader";
import { emptyCart } from "@/constant/icons";
import { useEffect } from "react";
import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  decreaseQty,
  increaseQty,
  removeItem,
} from "../state/slices/cartSlice";
import { AppDispatch, RootState } from "../state/store";

interface PaymentInfoStripeProp {
  label: string;
  value: string;
  labelStyle?: string;
  valueStyle?: string;
}
const PaymentInfoStripe = ({
  label,
  value,
  labelStyle,
  valueStyle,
}: PaymentInfoStripeProp) => (
  <View className="justify-between flex-row my-1">
    <Text className={"text-gray-500 font-quicksand" + labelStyle}>{label}</Text>
    <Text className={"font-quicksand-semibold " + valueStyle}>{value}</Text>
  </View>
);

export default function Cart() {
  const cart = useSelector<RootState, CartProp>((state) => state.cart);
  const dispatch = useDispatch<AppDispatch>();

  function increaseItem(id: string) {
    dispatch(increaseQty(id));
  }
  function decreaseItem(id: string) {
    dispatch(decreaseQty(id));
  }
  function removeSelectedItem(id: string) {
    dispatch(removeItem(id));
  }
  function placeOrder() {
    dispatch(clearCart());
    Alert.alert("Success", "Place Order Successfully.");
  }
  useEffect(() => {}, [cart]);
  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={cart.cart}
        renderItem={({ item }) => (
          <CartItem
            image={item.menu.image}
            name={item.menu.name}
            price={item.menu.price}
            amount={item.amount}
            minusButtonHandler={() => decreaseItem(item.menu.id)}
            addButtonHandler={() => increaseItem(item.menu.id)}
            deleteButtonHandler={() => removeSelectedItem(item.menu.id)}
          />
        )}
        keyExtractor={(item) => item.menu.id}
        contentContainerClassName="pb-28 px-5 pt-5"
        ListHeaderComponent={() => <CustomHeader title="Your Cart" />}
        ListEmptyComponent={() => (
          <View className="pt-5 items-center justify-center h-full">
            <Image source={emptyCart} className="size-20" />
            <Text className="text-center font-quicksand-semibold p-5">
              - Empty Cart -
            </Text>
          </View>
        )}
        ListFooterComponent={() =>
          cart.totalItems > 0 && (
            <View className="gap-5">
              <View className="mt-6 border border-gray-200 p-5 rounded-2xl">
                <Text className="font-quicksand-bold text-lg text-black mb-5">
                  Payment Summary
                </Text>
                <PaymentInfoStripe
                  label={`Total Items (${cart.totalItems})`}
                  value={`$${cart.totalPrice.toFixed(2)}`}
                />
                <PaymentInfoStripe label={`Delievery Fee`} value={`$5.00`} />
                <PaymentInfoStripe
                  label={`Discount`}
                  value={`- $0.50`}
                  valueStyle=" text-green-500"
                />
                <View className="border-t border-gray-300 my-2" />
                <PaymentInfoStripe
                  label={`Total`}
                  value={`$${(cart.totalPrice + 5 - 0.5).toFixed(2)}`}
                  labelStyle="font-quicksand-bold"
                  valueStyle="font-quicksand-bold text-right"
                />
              </View>
              <View>
                <TouchableOpacity
                  className="bg-primary rounded-full w-max"
                  onPress={placeOrder}
                >
                  <Text className="text-white text-center py-5 font-quicksand-bold">
                    Order Now
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
}
