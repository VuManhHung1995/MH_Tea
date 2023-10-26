import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  currentUser: JSON.parse(localStorage.getItem("user")) || {},
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      return { ...current(state), currentUser: {} };
    },
    login(state, action) {
      const newState = {
        ...current(state),
        currentUser: action.payload,
      };
      return newState;
    },
  },
});
export default userSlice;
