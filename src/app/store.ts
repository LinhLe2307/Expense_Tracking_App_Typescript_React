import { configureStore } from '@reduxjs/toolkit'
import categoriesReducer from '../features/categories/categoriesSlice';
import expenseReducer from '../features/expense/expenseSlice';
import incomeReducer from '../features/income/incomeSlice'

const store = configureStore({
  reducer: {
    expense: expenseReducer,
    income: incomeReducer,
    categories: categoriesReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export default store;