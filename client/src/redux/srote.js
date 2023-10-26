import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../pages/Auth/userSlice";
import cartSlice from "../pages/Cart/cartSlice";

const store = configureStore({
  reducer: {
    users: userSlice.reducer,
    carts: cartSlice.reducer,
  },
});
export default store;
