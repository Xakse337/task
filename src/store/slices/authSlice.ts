import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLogged: boolean;
  email: string | null;
  token: string | null;
}

const savedToken = localStorage.getItem("token");
const savedEmail = localStorage.getItem("email");

const initialState: AuthState = {
  isLogged: !!savedToken,
  email: savedEmail,
  token: savedToken,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (
      state,
      action: PayloadAction<{
        token: string;
        email: string;
        rememberMe: boolean;
      }>
    ) => {
      const { token, email, rememberMe } = action.payload;
      state.isLogged = true;
      state.email = email;
      state.token = token;

      if (rememberMe) {
        localStorage.setItem("token", token);
        localStorage.setItem("email", email);
      }
    },
    setLogout: (state) => {
      state.isLogged = false;
      state.email = null;
      state.token = null;

      localStorage.removeItem("token");
      localStorage.removeItem("email");
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;

export default authSlice.reducer;
