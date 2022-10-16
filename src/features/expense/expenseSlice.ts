import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ThunkDispatch as Dispatch} from 'redux-thunk';
import expenseServices from "../../services/expenseAPI";
import {ExpenseModel, ExpenseArrayModel} from "../../models/reduxModels"

const initialExpenseState: ExpenseArrayModel = {
    expenseLists: [],
    openAddExpense: false,
    openEditExpense: false
}

export const expenseSlice = createSlice({
    name: "expense",
    initialState: initialExpenseState,
    reducers: {
        getExpenseList: (state, action: PayloadAction<ExpenseModel[]>) => {
            state.expenseLists = action.payload
        },

        addNewExpense : (state, action: PayloadAction<ExpenseModel>) => {
            state.expenseLists = state.expenseLists.concat(action.payload);

            expenseServices.postAll(action.payload)
        },

        handleOpenAddExpense: (state) => {
            state.openAddExpense = !state.openAddExpense
        },

        handleOpenEditExpense: (state) => {
            state.openEditExpense = !state.openEditExpense
        }

    }
});

export const initializeExpense = () => {
    return async (dispatch: Dispatch<any, any, any>) => {
        const expense:ExpenseModel[] = await expenseServices.getAll();
        dispatch(getExpenseList(expense))
    }
}

export const {getExpenseList, addNewExpense, handleOpenAddExpense, handleOpenEditExpense} = expenseSlice.actions;
export default expenseSlice.reducer;