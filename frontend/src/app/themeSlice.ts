import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Theme } from '../types';

export const themeSlice = createSlice({
  name: 'theme',
  initialState: { theme: 'light' as Theme },
  reducers: {
    setTheme: (state, action: { payload: Theme }) => {
      // eslint-disable-next-line no-param-reassign
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;

export const selectTheme = (state: RootState) => state.theme.theme;
