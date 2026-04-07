import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const calculateTotalPrice = (cart: CartItem[]): number => {
  return cart.reduce((prev, cur) => prev + cur.menu.price * cur.amount, 0);
};
const calculateTotalItems = (cart: CartItem[]): number => {
  return cart.length;
};

const initialState: CartProp = {
  cart: [],
  totalPrice: 0,
  totalItems: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, actions: PayloadAction<MenuItem>) => {
      const existingCartItemIndex = state.cart.findIndex(
        (cartItem) => cartItem.menu.id == actions.payload.id,
      );

      if (existingCartItemIndex != -1) {
        state.cart[existingCartItemIndex].amount += 1;
      } else {
        const newCartItem: CartItem = {
          menu: actions.payload,
          amount: 1,
        };
        state.cart.push(newCartItem);
      }
      state.totalPrice = calculateTotalPrice(state.cart);
      state.totalItems = calculateTotalItems(state.cart);
    },
    removeItem: (state, actions: PayloadAction<string>) => {
      const cartItemFoundIndex = state.cart.findIndex(
        (cartItem) => cartItem.menu.id == actions.payload,
      );
      if (cartItemFoundIndex != -1) {
        state.cart.splice(cartItemFoundIndex, 1);
      }
      state.totalPrice = calculateTotalPrice(state.cart);
      state.totalItems = calculateTotalItems(state.cart);
    },
    decreaseQty: (state, actions: PayloadAction<string>) => {
      const cartItemFoundIndex = state.cart.findIndex(
        (cartItem) => cartItem.menu.id == actions.payload,
      );
      if (cartItemFoundIndex != -1) {
        state.cart[cartItemFoundIndex].amount -= 1;
      }
      state.totalPrice = calculateTotalPrice(state.cart);
      state.totalItems = calculateTotalItems(state.cart);
    },
    increaseQty: (state, actions: PayloadAction<string>) => {
      const cartItemFoundIndex = state.cart.findIndex(
        (cartItem) => cartItem.menu.id == actions.payload,
      );
      if (cartItemFoundIndex != -1) {
        state.cart[cartItemFoundIndex].amount += 1;
      }
      state.totalPrice = calculateTotalPrice(state.cart);
      state.totalItems = calculateTotalItems(state.cart);
    },
    clearCart: (state) => {
      state.cart = [];
      state.totalPrice = calculateTotalPrice(state.cart);
      state.totalItems = calculateTotalItems(state.cart);
    },
  },
});

export const { addItem, removeItem, decreaseQty, increaseQty, clearCart } =
  cartSlice.actions;
const cartReducer = cartSlice.reducer;
export default cartReducer;
