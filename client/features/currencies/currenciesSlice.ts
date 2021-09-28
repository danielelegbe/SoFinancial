import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { ICurrency } from '../../components/Currencies/AllCurrencies';

// Define a type for the slice state

// Define the initial state using that type

const initialState: ICurrency = {
  p: null,
};

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setLastPrice: (state: ICurrency, { payload }: PayloadAction<number>) => {
      state.p = payload;
    },
  },
});

export const { setLastPrice } = currencySlice.actions;

export const selectUser = (state: RootState) => state.user;

export default currencySlice.reducer;
