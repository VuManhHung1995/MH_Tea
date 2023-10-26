import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  statusCheckBox: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    initCart: (state, action) => {
      const newState = {
        ...current(state),
        cart: action.payload,
      };
      return newState;
    },
    addCart: (state, action) => {
      const newState = {
        ...current(state),
        cart: [...current(state).cart, action.payload],
      };
      return newState;
    },
    // Xoa toan bo du lieu cart
    removeCart: (state) => {
      return { ...current(state), cart: [] };
    },
    // xoa du lieu 1 cart
    deleteCart: (state, action) => {
      const newCart = current(state).cart.filter(
        (item) => item.cartCode !== action.payload
      );
      const newState = { ...current(state), cart: newCart };
      return newState;
    },
    // cap nhat thong tin so luong san pham trong cart
    updateQuantity: (state, action) => {
      const newCart = current(state).cart.map((item) => {
        if (item.cartCode === action.payload.cartCode) {
          const newItem = { ...item, total: action.payload.quantity };
          return newItem;
        }
        return item;
      });
      return { ...current(state), cart: newCart };
    },
    // tinh tong tien cua tung san pham bao gom ca topping, quantity
    accumulatorPrice: (state, action) => {
      const newCarts = current(state).cart.map((cart) => {
        if (cart.cartCode === action.payload.cartCode) {
          const newCart = { ...cart, totalPrice: action.payload.totalPrice };
          return newCart;
        }
        return cart;
      });
      return { ...current(state), cart: newCarts };
    },
    // update trang thai cua tung checkbox
    updateStatusCheckbox: (state, action) => {
      return { ...current(state), statusCheckBox: action.payload };
    },
  },
});
export default cartSlice;
