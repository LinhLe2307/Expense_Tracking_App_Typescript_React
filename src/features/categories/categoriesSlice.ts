import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {ThunkDispatch as Dispatch} from 'redux-thunk';
import { DefaultModel, ExpenseArrayModel } from "../../models/reduxModels";

import categoriesServices from "../../services/categoriesAPI";

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

            categoriesServices.postAll(newCategory)
        },
    } 
});

export const initializeCategories = () => {
    return async(dispatch: Dispatch<any,any,any>)=>{
        const response: DefaultModel[]= await categoriesServices.getAll();
        dispatch(getCategoriesList(response))
    }
}

export const { getCategoriesList, addNewCategory} = categoriesSlice.actions;
export default categoriesSlice.reducer;
