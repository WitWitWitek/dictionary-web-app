/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';

export const authSlice = createSlice({
  name: 'auth',
  initialState: { token: null, username: null },
  reducers: {
    logIn: (state, action) => {
      const { accessToken, username } = action.payload;
      state.token = accessToken;
      state.username = username;
    },
    logOut: (state) => {
      state.token = null;
      state.username = null;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;

export const selectCurrentToken = (state: RootState): string | null => state.auth.token;
export const selectCurrentUser = (state: RootState): string | null => state.auth.username;
