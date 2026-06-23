import { createSlice } from '@reduxjs/toolkit';

const userFromStorage = localStorage.getItem('cartworx_user')
  ? JSON.parse(localStorage.getItem('cartworx_user'))
  : null;

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: userFromStorage,
    token: userFromStorage?.token || null,
    isAuthenticated: !!userFromStorage,
    loading: false,
    error: null,
  },
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.user = action.payload;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem('cartworx_user', JSON.stringify(action.payload));
    },
    loginFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('cartworx_user');
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFail, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
