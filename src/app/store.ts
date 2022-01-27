import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counter/counterSlice'
import fetchUserByUserNameSlice from './features/user/fetchUserByUserName'
import usersSlice from './features/entities/user'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [fetchUserByUserNameSlice.name]: fetchUserByUserNameSlice.reducer,
    [usersSlice.name]: usersSlice.reducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
