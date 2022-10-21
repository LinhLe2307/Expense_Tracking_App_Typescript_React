import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ThunkDispatch as Dispatch} from 'redux-thunk';
import serviceAPI from "../../services/serviceAPI";
import {ExpenseModel, ExpenseArrayModel} from "../../models/reduxModels"

const baseURL = "http://localhost:3010/notes"

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
            serviceAPI.postSingle(baseURL,action.payload);
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
            serviceAPI.putAxios(baseURL, state.editId, editExense)
        },

        deleteExpense: (state, action:PayloadAction<number>):void => {
            const deleteId = action.payload;
            state.inputLists = state.inputLists.filter(expense => expense.id !== deleteId)
            
            serviceAPI.deleteAxios(baseURL,deleteId)
        },

        handleOpenEditExpense: (state, action):void => {
            state.editId = action.payload
            state.openEditItem = !state.openEditItem
        },

        deleteExpenseCategories: (state, action:PayloadAction<ExpenseModel[]>) => {
            state.inputLists = action.payload;
            const selectedPosts = action.payload
            const postsIdsArray = action.payload.map(post => post.id);

            console.log("postIdArray", postsIdsArray)

            Promise.all([postsIdsArray.map((id) => 
                id && serviceAPI.deleteAxios(baseURL, id))
            , selectedPosts.map(post => serviceAPI.postSingle(baseURL, post))
            ])
        }

    }
});

export const initializeExpense = () => {
    return async (dispatch: Dispatch<any, any, any>) => {
        const expense:ExpenseModel[] = await serviceAPI.getAll(baseURL);
        dispatch(getExpenseList(expense))
    }
}

export const {
    getExpenseList, 
    addNewExpense, 
    editExpense, 
    deleteExpense, 
    handleOpenEditExpense, 
    deleteExpenseCategories
} = expenseSlice.actions;
export default expenseSlice.reducer;