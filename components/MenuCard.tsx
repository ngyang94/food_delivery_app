import {
    Image,
    ImageSourcePropType,
    Text,
    TouchableOpacity,
} from "react-native";

interface MenuCardProp {
  image: ImageSourcePropType;
  name: string;
  price: number;
  addToCartButtoHandler?: () => void;
}

function MenuCard({ image, name, price, addToCartButtoHandler }: MenuCardProp) {
  return (
    <TouchableOpacity
      className="pt-20 pb-5 flex justify-center items-center"
      style={{ boxShadow: "0px 6px 6px rgba(0, 0, 0, 0.15)" }}
    >
      <Image
        source={image}
        className="size-32 absolute -top-10 rounded-md flex-row justify-center left-[15%]"
        resizeMode="contain"
      />

      <Text className="text-center font-quicksand-bold text-lg">{name}</Text>

      <Text className="text-gray-500 font-quicksand">$ {price}</Text>

      <TouchableOpacity
        className="rounded bg-primary px-5 py-2 mt-3"
        onPress={addToCartButtoHandler}
      >
        <Text
          className="font-quicksand-semibold color-white"
          style={{ color: "white" }}
        >
          Add to Cart +
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

export default MenuCard;
