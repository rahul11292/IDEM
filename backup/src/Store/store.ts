import { configureStore } from '@reduxjs/toolkit'
import AuthenticationReducer from '../Components/Authentication/AuthenticationSlice'
import AllCardsReducer from './../Components/AllCards/AllCardsSlice'
import CardOpenViewSliceReducer from './../Components/Common/CardOpenView/CardOpenViewSlice'
// ...

export const store = configureStore({
  reducer: {
      auth : AuthenticationReducer,
      allCards : AllCardsReducer,
      cardView: CardOpenViewSliceReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch