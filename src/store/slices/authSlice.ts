import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLogged: boolean;
  email: string | null;
}
const initialState: AuthState = {
  isLogged: false,
  email: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<{ email: string }>) => {
      state.isLogged = true;
      state.email = action.payload.email;
    },
    setLogout: (state) => {
      state.isLogged = false;
      state.email = null;
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;

export default authSlice.reducer;
