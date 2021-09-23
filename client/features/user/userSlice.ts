import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

// Define a type for the slice state
interface LoggedInUser {
  accessToken: string;
  id: number | null;
}

// Define the initial state using that type

const initialState: LoggedInUser = {
  accessToken: '',
  id: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (
      state: LoggedInUser,
      { payload }: PayloadAction<LoggedInUser>
    ) => {
      return {
        ...state,
        accessToken: payload.accessToken,
      };
    },
    setAccessToken: (
      state: LoggedInUser,
      { payload }: PayloadAction<string>
    ) => {
      state.accessToken = payload;
    },
  },
});

export const { setUser, setAccessToken } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
