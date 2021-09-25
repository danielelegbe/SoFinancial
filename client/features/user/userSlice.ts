import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

// Define a type for the slice state
interface LoggedInUser {
  access_token: string;
}

// Define the initial state using that type

const initialState: LoggedInUser = {
  access_token: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAccessToken: (
      state: LoggedInUser,
      { payload }: PayloadAction<string>
    ) => {
      state.access_token = payload;
    },
  },
});

export const { setAccessToken } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
