import { userList } from "@/constant/userData";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthState = {
  isAuthenticated: false,
  username: "",
  email: "",
  phone: "",
  address1: "",
  address2: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        loginAsync.fulfilled,
        (
          state,
          action: PayloadAction<{
            id: number;
            email: string;
            password: string;
            name: string;
            phone: string;
            address1: string;
            address2: string;
          }>,
        ) => {
          if (!!action.payload) {
            state.isAuthenticated = true;
            state.username = action.payload.name;
            state.email = action.payload.email;
            state.phone = action.payload.phone;
            state.address1 = action.payload.address1;
            state.address2 = action.payload.address2;
          }
        },
      )
      .addCase(
        logoutAsync.fulfilled,
        (state, actions: PayloadAction<boolean>) => {
          if (actions.payload) {
            state.isAuthenticated = false;
            state.username = "";
          }
        },
      );
  },
});

export const loginAsync = createAsyncThunk(
  "auth/loginAsync",
  async (loginInfo: { email: string; password: string }) => {
    return await new Promise<{
      id: number;
      email: string;
      password: string;
      name: string;
      phone: string;
      address1: string;
      address2: string;
    }>((resolve, reject) => {
      setTimeout(() => {
        userList.find((user) => {
          if (
            user.email == loginInfo.email &&
            user.password == loginInfo.password
          ) {
            resolve(user);
          } else {
            reject(new Error("Invalid email or password"));
          }
        });
      }, 2000);
    });
  },
);

export const logoutAsync = createAsyncThunk("auth/logoutAsync", async () => {
  return new Promise<boolean>((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
});

export default authSlice.reducer;
