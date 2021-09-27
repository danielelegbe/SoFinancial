import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

// Define a type for the slice state
interface SelectedUser {
  id: number | null;
}

// Define the initial state using that type

const initialState: SelectedUser = {
  id: null,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setOtherUser: (state: SelectedUser, { payload }: PayloadAction<number>) => {
      state.id = payload;
    },
  },
});

export const { setOtherUser } = chatSlice.actions;

export const selectChatUser = (state: RootState) => state.chat;

export default chatSlice.reducer;
