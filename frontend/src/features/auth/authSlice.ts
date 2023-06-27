import { createSlice } from '@reduxjs/toolkit';

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
