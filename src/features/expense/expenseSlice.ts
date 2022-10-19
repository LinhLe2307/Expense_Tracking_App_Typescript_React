import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ThunkDispatch as Dispatch} from 'redux-thunk';
import expenseServices from "../../services/expenseAPI";
import {ExpenseModel, ExpenseArrayModel} from "../../models/reduxModels"

const initialExpenseState: ExpenseArrayModel<ExpenseModel> = {
    inputLists: [],
    openEditItem: false,
    editId: 0,
}

export const expenseSlice = createSlice({
    name: "expense",
    initialState: initialExpenseState,
    reducers: {
        getExpenseList: (state, action: PayloadAction<ExpenseModel[]>):void => {
            state.inputLists = action.payload
        },

        addNewExpense : (state, action: PayloadAction<ExpenseModel>):void => {
            expenseServices.postAll(action.payload);
            state.inputLists = state.inputLists.concat(action.payload)
        },

        editExpense:(state, action:PayloadAction<ExpenseModel>):void => {
            const editExense = action.payload;
            const findIndex = state.inputLists.find(expense => expense.id === state.editId)
            if(findIndex !== undefined) {
                const indexElement = state.inputLists.indexOf(findIndex);
                state.inputLists.splice(indexElement, 0, editExense);
                state.inputLists =  state.inputLists

            }
            expenseServices.putExpense(state.editId, editExense)
        },

        deleteExpense: (state, action):void => {
            const deleteId = action.payload;
            state.inputLists = state.inputLists.filter(expense => expense.id !== deleteId)
            
            expenseServices.deleteAxios(deleteId)
        },

        handleOpenEditExpense: (state, action):void => {
            state.editId = action.payload
            state.openEditItem = !state.openEditItem
        }

    }
});

export const initializeExpense = () => {
    return async (dispatch: Dispatch<any, any, any>) => {
        const expense:ExpenseModel[] = await expenseServices.getAll();
        dispatch(getExpenseList(expense))
    }
}

export const {getExpenseList, addNewExpense, editExpense, deleteExpense, handleOpenEditExpense} = expenseSlice.actions;
export default expenseSlice.reducer;