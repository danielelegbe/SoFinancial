import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { User } from '../../generated/graphql';

// Define a type for the slice state
export interface IMessage {
  content: string;
  createdAt: Date;
  from: User;
  id: number;
  to: User;
}

interface SelectedUser {
  id: number | null;
  messages: IMessage[];
}

// Define the initial state using that type

const initialState: SelectedUser = {
  id: null,
  messages: [],
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setOtherUser: (state: SelectedUser, { payload }: PayloadAction<number>) => {
      state.id = payload;
    },
    setAllMessages: (
      state: SelectedUser,
      { payload }: PayloadAction<IMessage[]>
    ) => {
      return {
        ...state,
        messages: payload,
      };
    },

    addNewMessage: (
      state: SelectedUser,
      { payload }: PayloadAction<IMessage>
    ) => {
      return {
        ...state,
        messages: [...state.messages, payload],
      };
    },
  },
});

export const { setOtherUser, setAllMessages, addNewMessage } =
  chatSlice.actions;

export const selectChatUser = (state: RootState) => state.chat;

export default chatSlice.reducer;
