import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {ThunkDispatch as Dispatch} from 'redux-thunk';
import { categoryTransactions } from "../../functions/reusableFunction";
import { CategoriesModel, CategoriesModelArray } from "../../models/reduxModels";

import categoriesServices from "../../services/categoriesAPI";

const initialCategoriesState:CategoriesModelArray = {
    categoriesList: []
}

export const categoriesSlice = createSlice({
    name: "categories",
    initialState: initialCategoriesState,
    reducers: {
        getCategoriesList:(state, action:PayloadAction<CategoriesModel[]>) =>{
            state.categoriesList = action.payload
        },
        addNewCategory: (state, action:PayloadAction<CategoriesModel>) => {
            const newCategory = {...action.payload, categoryTransactions: 0};

            state.categoriesList = state.categoriesList.concat(newCategory)

            categoriesServices.postAll(newCategory)
        },

        addNewTransaction: (state, action:PayloadAction<string[]>):void => {
            categoryTransactions(action, state, "add")
        },

        deleteTransaction: (state, action: PayloadAction<string[]>):void => {
            categoryTransactions(action, state, "delete")
            
        }
    } 
});

export const initializeCategories = () => {
    return async(dispatch: Dispatch<any,any,any>)=>{
        const response = await categoriesServices.getAll();
        dispatch(getCategoriesList(response))
    }
}

export const {getCategoriesList, addNewCategory, addNewTransaction, deleteTransaction} = categoriesSlice.actions;
export default categoriesSlice.reducer;
