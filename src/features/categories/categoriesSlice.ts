import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {ThunkDispatch as Dispatch} from 'redux-thunk';
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

        addNewTransaction: (state, action:PayloadAction<string>):void => {
            const inputCategory = action.payload;
            const findIndex = state.categoriesList.find(categoryItem => categoryItem.categoryTitle.indexOf(inputCategory) !== -1); 
            if(findIndex !== undefined) {
                let transactions = JSON.parse(JSON.stringify(findIndex));
                transactions.categoryTransactions++;        
                categoriesServices.putAxios(transactions.id, transactions);
            }
        }
    } 
});

export const initializeCategories = () => {
    return async(dispatch: Dispatch<any,any,any>)=>{
        const response = await categoriesServices.getAll();
        dispatch(getCategoriesList(response))
    }
}

export const {getCategoriesList, addNewCategory, addNewTransaction} = categoriesSlice.actions;
export default categoriesSlice.reducer;
