import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {ThunkDispatch as Dispatch} from 'redux-thunk';
import { categoryTransactions } from "../../functions/reusableFunction";
import { CategoriesModel, CategoriesModelArray, CategoryPriceModel } from "../../models/reduxModels";

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
            const newCategory = {
                ...action.payload, 
                categoryTransactions: 0, totalCategoryAmount: 0
            };

            state.categoriesList = state.categoriesList.concat(newCategory)

            categoriesServices.postAll(newCategory)
        },

        addNewTransaction: (state, action:PayloadAction<CategoryPriceModel>):void => {
            categoryTransactions(action, state, "add")
        },

        removeTransaction: (state, action: PayloadAction<CategoryPriceModel>):void => {
            categoryTransactions(action, state, "remove")
            
        },

    } 
});

export const initializeCategories = () => {
    return async(dispatch: Dispatch<any,any,any>)=>{
        const response = await categoriesServices.getAll();
        dispatch(getCategoriesList(response))
    }
}

export const { getCategoriesList, addNewCategory, addNewTransaction, removeTransaction } = categoriesSlice.actions;
export default categoriesSlice.reducer;
