import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";

interface Category {
  id: string;
  name: string;
}
const Filter = ({ categories }: { categories: Category[] }) => {
  const searchParams = useLocalSearchParams();
  const [active, setActive] = useState(searchParams.category || "");
  const handlePress = (id: string): void => {
    setActive(id);

    if (id == "all") router.setParams({ category: undefined });
    else router.setParams({ category: id });
  };

  const filterData: (Category | { id: string; name: string })[] = categories
    ? [{ id: "all", name: "All" }, ...categories]
    : [{ id: "all", name: "All" }];

  return (
    <FlatList
      data={filterData}
      renderItem={({ item }) => (
        <TouchableOpacity
          className={
            "elevation-md rounded-lg px-5 py-2 " +
            (active == item.id ||
            (item.id == "all" &&
              active == "" &&
              searchParams.category == undefined)
              ? "bg-amber-500"
              : "bg-white")
          }
          onPress={() => handlePress(item.id)}
        >
          <Text
            className={
              active == item.id ||
              (item.id == "all" &&
                active == "" &&
                searchParams.category == undefined)
                ? "text-white"
                : "text-gray-400"
            }
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id}
      horizontal
      contentContainerClassName="gap-x-2 pb-2"
      showsHorizontalScrollIndicator={false}
    />
  );
};
export default Filter;
