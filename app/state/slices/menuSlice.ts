import { burger, burrito, pizza, salad, spaghetti } from "@/constant/images";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: MenuProp = {
  menu: [],
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getMenuAsync.fulfilled,
      (state, action: PayloadAction<MenuItem[]>) => {
        state.menu = action.payload;
      },
    );
  },
});

export const getMenuAsync = createAsyncThunk(
  "menu/getMeuAsync",
  async (menuParam: {
    category: string | undefined;
    query: string | undefined;
    setTimeIdForCancel: (timeId: number) => void;
  }) => {
    // fake api call
    return await new Promise<MenuItem[]>((resolve, reject) => {
      const timeId = setTimeout(() => {
        const dummyMenu: MenuItem[] = [
          {
            id: "m1",
            image: burrito,
            name: "Burrito",
            category: "c3",
            price: 19.99,
          },
          {
            id: "m2",
            image: spaghetti,
            name: "Spaghetti",
            category: "c5",
            price: 19.99,
          },
          {
            id: "m3",
            image: burger,
            name: "Burger",
            category: "c1",
            price: 19.99,
          },
          {
            id: "m4",
            image: pizza,
            name: "Pizza",
            category: "c2",
            price: 19.99,
          },
          {
            id: "m5",
            image: salad,
            name: "Salad",
            category: "c4",
            price: 19.99,
          },
        ];

        if (!!menuParam.category) {
          resolve(
            dummyMenu.filter((menu) => menu.category == menuParam.category),
          );
        }
        if (!!menuParam.query) {
          resolve(
            dummyMenu.filter((menu) =>
              menu.name.includes(menuParam.query || ""),
            ),
          );
        }
        resolve(dummyMenu);
      }, 1000);
      menuParam.setTimeIdForCancel(timeId);
    });
  },
);

const menuReducer = menuSlice.reducer;
export default menuReducer;
