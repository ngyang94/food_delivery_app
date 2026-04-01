import { userList } from "@/app/dummy_data/dummy_data";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthState = {
  isAuthenticated: false,
  username: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      loginAsync.fulfilled,
      (
        state,
        action: PayloadAction<{
          email: string;
          password: string;
          name: string;
        }>,
      ) => {
        // console.log("got do1");
        // console.log(action.payload);
        // console.log(state);
        if (!!action.payload) {
          state.isAuthenticated = true;
          state.username = action.payload.name;
          //   console.log(state);
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

export default authSlice.reducer;
