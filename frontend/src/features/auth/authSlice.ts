/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export const authSlice = createSlice({
  name: 'auth',
  initialState: { token: null },
  reducers: {
    logIn: (state, action) => {
      const { accessToken } = action.payload;
      state.token = accessToken;
    },
    logOut: (state) => {
      state.token = null;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;

export const selectCurrentToken = (state: RootState): string | null => state.auth.token;
