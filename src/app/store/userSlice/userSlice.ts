import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface IUser {}
interface UserState {
  user: any;
  loading: boolean;
}
const initialState: UserState = {
  user: null,
  loading: false,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setUser, setLoading } = userSlice.actions;

export const selectUser = (state: UserState) => state.user;
export const selectLoading = (state: UserState) => state.loading;

export const userReducer = userSlice.reducer;
