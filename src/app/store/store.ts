import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userSlice/userSlice";
import { locationReducer } from "./locationSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    location: locationReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
