import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export const authSlice = createSlice({
  name: 'auth',
  initialState: { token: null },
  reducers: {
    logIn: (state, action) => {
      const { accessToken } = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.token = accessToken;
    },
  },
});

export const { logIn } = authSlice.actions;

export const selectCurrentToken = (state: RootState): string | null => state.auth.token;
