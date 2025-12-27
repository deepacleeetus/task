import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  cartList: [],
  cartCount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: INITIAL_STATE,

  reducers: {
    clearCart: (state) => {
  state.cartList = [];
  state.cartCount = 0;
},
    increment: (state) => {
      state.cartCount += 1;
    },

    decrement: (state) => {
      if (state.cartCount > 0) {
        state.cartCount -= 1;
      }
    },

    addTocart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartList.find((i) => i.id === item.id);

      if (existingItem) {
        existingItem.food_quantity += 1;
      } else {
        state.cartList.push({ ...item, food_quantity: 1 });
      }

      state.cartCount += 1;
    },

    increaseQuantity: (state, action) => {
      const item = state.cartList.find((i) => i.id === action.payload);
      if (item) {
        item.food_quantity += 1;
        state.cartCount += 1;
      }
    },

    decreaseQuantity: (state, action) => {
      const item = state.cartList.find((i) => i.id === action.payload);
      if (item && item.food_quantity > 1) {
        item.food_quantity -= 1;
        state.cartCount -= 1;
      } else if (item && item.food_quantity === 1) {
        state.cartList = state.cartList.filter((i) => i.id !== action.payload);
        state.cartCount -= 1;
      }
    },
    removeItem: (state, action) => {
     const id = action.payload;
     const itemToRemove = state.cartList.find(i => i.id === id);
     if (itemToRemove) {
         state.cartCount -= itemToRemove.food_quantity;
         state.cartList = state.cartList.filter(i => i.id !== id);
        }
    },
  },

});

export const {
  increment,
  decrement,
  addTocart,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
