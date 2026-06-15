import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLogged: boolean;
  email: string | null;
  token: string | null;
  id: number | null;
}

const savedToken = localStorage.getItem("token");
const savedEmail = localStorage.getItem("email");
const savedId = localStorage.getItem("userId");

const initialState: AuthState = {
  isLogged: !!savedToken,
  email: savedEmail,
  token: savedToken,
  id: savedId ? Number(savedId) : null,
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
        id: number;
        rememberMe: boolean;
      }>
    ) => {
      const { token, email, id, rememberMe } = action.payload;
      state.isLogged = true;
      state.email = email;
      state.token = token;
      state.id = id;

      if (rememberMe) {
        localStorage.setItem("token", token);
        localStorage.setItem("email", email);
        localStorage.setItem("userId", String(id));
      }
    },
    setLogout: (state) => {
      state.isLogged = false;
      state.email = null;
      state.token = null;
      state.id = null;

      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("userId");
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;

export default authSlice.reducer;
