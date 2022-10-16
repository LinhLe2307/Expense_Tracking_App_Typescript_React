import {createSlice, ThunkAction, AnyAction, PayloadAction} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import expenseServices from "../../services/expenseAPI";
import {ExpenseModel, ExpenseArrayModel} from "../../models/reduxModels"

const initialExpenseState: ExpenseArrayModel = {
    expenseLists: [],
    openAddExpense: false,
    openEditExpense: false
}

export const expeseSlice = createSlice({
    name: "expense",
    initialState: initialExpenseState,
    reducers: {
        getExpenseList: (state, action: PayloadAction<ExpenseModel[]>) => {
            state.expenseLists = action.payload
        },

        handleAddExpense: (state, action:PayloadAction<boolean>) => {
            state.openAddExpense = action.payload
        },

        handleEditExpense: (state, action: PayloadAction<boolean>) => {
            state.openEditExpense = action.payload
        }

    }
});

export const initializeExpense = () : ThunkAction<void,RootState,unknown,AnyAction> => {
    return async (dispatch) => {
        const expenseLists:ExpenseModel[] = await expenseServices.getAll();
        dispatch(getExpenseList(expenseLists))
    }
}

export const {getExpenseList, handleAddExpense, handleEditExpense} = expeseSlice.actions;
export default expeseSlice.reducer;