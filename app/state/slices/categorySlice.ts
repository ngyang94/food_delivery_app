import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: categoriesProp = {
  categories: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getCategoriesAsync.fulfilled,
      (state, actions: PayloadAction<categoryItem[]>) => {
        state.categories = actions.payload;
      },
    );
  },
});

export const getCategoriesAsync = createAsyncThunk(
  "category/getCategoriesAsync",
  async () => {
    return await new Promise<categoryItem[]>((resolve, reject) => {
      const timeId = setTimeout(() => {
        resolve([
          {
            id: "c1",
            name: "Burgers",
          },
          {
            id: "c2",
            name: "Pizza",
          },
          {
            id: "c3",
            name: "Burrito",
          },
          {
            id: "c4",
            name: "Crispy",
          },
          {
            id: "c5",
            name: "Noodle",
          },
        ]);
      }, 1000);
    });
  },
);

const categoryReducer = categorySlice.reducer;
export default categoryReducer;
