import { search } from "@/constant/icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";

const SearchBar = () => {
  const params = useLocalSearchParams<{ query?: string }>();
  const [query, setQuery] = useState(params.query);

  const handleSearch = (text: string) => {
    setQuery(text);
    if (!text) router.setParams({ query: undefined });
  };

  const handleSubmit = () => {
    if (!!query?.trim()) {
      router.setParams({ query: query.trim() });
    }
  };

  return (
    <View className="flex flex-row justify-between border border-gray-300 rounded-full items-center">
      <TextInput
        className="flex p-5 w-[90%]"
        placeholder="Search for pizzas, burgers ..."
        value={query}
        onChangeText={handleSearch}
        onSubmitEditing={handleSubmit}
        returnKeyType="search"
      />
      <TouchableOpacity className="pr-5" onPress={() => console.log("search")}>
        <Image
          source={search}
          className="size-6"
          resizeMode="contain"
          tintColor="#5d5f6d"
        />
      </TouchableOpacity>
    </View>
  );
};
export default SearchBar;
