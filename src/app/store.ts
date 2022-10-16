import { configureStore } from '@reduxjs/toolkit'
import expenseReducer from '../features/expense/expenseSlice'

export default configureStore({
  reducer: {
    expense: expenseReducer
  }
})