import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ThunkDispatch as Dispatch} from 'redux-thunk';
import expenseServices from "../../services/expenseAPI";
import {ExpenseModel, ExpenseArrayModel} from "../../models/reduxModels"

const initialExpenseState: ExpenseArrayModel = {
    expenseLists: [],
    openEditExpense: false,
    editId: 0,
}

export const expenseSlice = createSlice({
    name: "expense",
    initialState: initialExpenseState,
    reducers: {
        getExpenseList: (state, action: PayloadAction<ExpenseModel[]>) => {
            state.expenseLists = action.payload
        },

        addNewExpense : (state, action: PayloadAction<ExpenseModel>) => {
            expenseServices.postAll(action.payload);
            state.expenseLists = state.expenseLists.concat(action.payload)
        },

        editExpense:(state, action) => {
            const editExense = action.payload;
            const findIndex = state.expenseLists.find(expense => expense.id === state.editId)
            if(findIndex !== undefined) {
                const indexElement = state.expenseLists.indexOf(findIndex);
                state.expenseLists.splice(indexElement, 0, editExense);
                state.expenseLists =  state.expenseLists

            }
            expenseServices.putExpense(state.editId, editExense)
        },

        handleOpenEditExpense: (state, action) => {
            state.editId = action.payload
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

export const {getExpenseList, addNewExpense, editExpense, handleOpenEditExpense} = expenseSlice.actions;
export default expenseSlice.reducer;