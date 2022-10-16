import { configureStore } from '@reduxjs/toolkit'
import expenseReducer from '../features/expense/expenseSlice'

const store = configureStore({
  reducer: {
    expense: expenseReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export default store;