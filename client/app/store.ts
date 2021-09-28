import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import chatReducer from '../features/chat/chatSlice';
import currencyReducer from '../features/currencies/currenciesSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
    currency: currencyReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
