import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {ThunkDispatch as Dispatch} from 'redux-thunk';
import { DefaultModel, ExpenseArrayModel } from "../../models/reduxModels";
import serviceAPI from "../../services/serviceAPI";

const baseURL = "http://localhost:3010/categories";

const initialCategoriesState:ExpenseArrayModel<DefaultModel> = {
    inputLists: [],
    openEditItem: false,
    editId: 0,
}

export const categoriesSlice = createSlice({
    name: "categories",
    initialState: initialCategoriesState,
    reducers: {
        getCategoriesList:(state, action:PayloadAction<DefaultModel[]>) =>{
            state.inputLists = action.payload
        },
        addNewCategory: (state, action:PayloadAction<DefaultModel>) => {
            const newCategory = action.payload;

            state.inputLists = state.inputLists.concat(newCategory)

            serviceAPI.postAll(baseURL, newCategory)
        },
        editCategory:(state, action:PayloadAction<DefaultModel>):void => {
            const editIncome = action.payload;
            const findIndex = state.inputLists.find(expense => expense.id === state.editId)
            if(findIndex !== undefined) {
                const indexElement = state.inputLists.indexOf(findIndex);
                state.inputLists.splice(indexElement, 0, editIncome);
                state.inputLists =  state.inputLists

            }
            serviceAPI.putAxios(baseURL, state.editId, editIncome)
        },
        deleteCategory: (state, action:PayloadAction<number>):void => {
            const deleteId = action.payload;
            state.inputLists = state.inputLists.filter(expense => expense.id !== deleteId)
            
            serviceAPI.deleteAxios(baseURL, deleteId)
        },

        handleOpenEditCategory: (state, action):void => {
            state.editId = action.payload
            state.openEditItem = !state.openEditItem
        }
    } 
});

export const initializeCategories = () => {
    return async(dispatch: Dispatch<any,any,any>)=>{
        const response: DefaultModel[]= await serviceAPI.getAll(baseURL);
        dispatch(getCategoriesList(response))
    }
}

export const { getCategoriesList, addNewCategory, editCategory, deleteCategory, handleOpenEditCategory} = categoriesSlice.actions;
export default categoriesSlice.reducer;
