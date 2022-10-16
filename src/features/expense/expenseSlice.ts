import {createSlice} from "@reduxjs/toolkit";
import expenseServices from "../../services/expenseAPI"

export const expeseSlice = createSlice({
    name: "expense",
    initialState: {
        expenseList: [],
        addExpense: false,
        editExpense: false
    },
    reducers: {
        getExpenseList: (state, action) => {
            state.expenseList = action.payload
        }
    }
});

export const initializeExpense = () => {
    return async (dispatch) => {
        const expenseList = await expenseServices.getAll();
        dispatch(getExpenseList(expenseList))
    }
}

export const {getExpenseList} = createSlice.actions;
export default expeseSlice.reducer;