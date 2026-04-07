import CartButton from "@/components/CartButton";
import Filter from "@/components/Filter";
import MenuCard from "@/components/MenuCard";
import SearchBar from "@/components/SearchBar";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../state/slices/cartSlice";
import { getCategoriesAsync } from "../state/slices/categorySlice";
import { getMenuAsync } from "../state/slices/menuSlice";
import type { AppDispatch, RootState } from "../state/store";

let menuTimeId: number | undefined;
const Search = () => {
  const menu = useSelector<RootState, MenuItem[]>((state) => state.menu.menu);
  const categories = useSelector<RootState, categoryItem[]>(
    (state) => state.category.categories,
  );
  const dispatch = useDispatch<AppDispatch>();

  const [isMenuLoading, setIsMenuLoading] = useState(false);
  const [isCatLoading, setIsCatLoading] = useState(false);

  const param = useLocalSearchParams<{ category: string; query: string }>();

  useEffect(() => {
    getMenuAndCat();
  }, []);

  function addToCart(cartItem: MenuItem) {
    dispatch(addItem(cartItem));
  }

  function setMenuTimeId(timeId: number) {
    menuTimeId = timeId;
  }

  function cancelGetMenu() {
    if (!!menuTimeId) clearTimeout(menuTimeId);
    menuTimeId = undefined;
  }

  async function getMenuAndCat() {
    await getCat();
    await getMenu();
  }
  async function getMenu() {
    setIsMenuLoading(true);
    cancelGetMenu();
    await dispatch(
      getMenuAsync({
        category: param.category,
        query: param.query,
        setTimeIdForCancel: setMenuTimeId,
      }),
    );
    setIsMenuLoading(false);
  }
  async function getCat() {
    setIsCatLoading(true);
    await dispatch(getCategoriesAsync());
    setIsCatLoading(false);
  }
  useEffect(() => {
    getMenu();
  }, [param.category, param.query]);

  return (
    <SafeAreaView className="bg-white h-full w-full">
      {(isMenuLoading && isCatLoading && (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator></ActivityIndicator>
        </View>
      )) || (
        <FlatList
          ListEmptyComponent={() =>
            (isMenuLoading && <ActivityIndicator></ActivityIndicator>) || (
              <View>
                <Text>No Menu Found.</Text>
              </View>
            )
          }
          data={isMenuLoading ? [] : menu}
          renderItem={({ item, index }) => {
            const isFirstRightColItem = index % 2 == 0;
            return (
              <View
                className={
                  "flex-1 max-w-[48%] " +
                  (!isFirstRightColItem ? "mt-10" : "mt-0")
                }
              >
                <MenuCard
                  {...item}
                  addToCartButtoHandler={() => addToCart(item)}
                />
              </View>
            );
          }}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperClassName="gap-7"
          contentContainerClassName="gap-7 px-5 pb-[150px]"
          ListHeaderComponent={() => (
            <View className="my-5 gap-5 w-full">
              <View className="justify-between flex-row w-full">
                <View className="flex-start">
                  <Text className="small-bold uppercase text-primary">
                    Search
                  </Text>
                  <View className="flex-start flex-row gap-x-1 mt-0.5">
                    <Text className="paragraph-semibold text-dark-100">
                      Find your favourite food
                    </Text>
                  </View>
                </View>
                <CartButton />
              </View>
              <SearchBar />

              {(isCatLoading && <ActivityIndicator></ActivityIndicator>) || (
                <Filter categories={categories} />
              )}
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};
export default Search;
