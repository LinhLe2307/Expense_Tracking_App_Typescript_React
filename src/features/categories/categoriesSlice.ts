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
        addNewCategory: (state, action) => {
            state.categoriesList = state.categoriesList.concat(action.payload)

            categoriesServices.postAll(action.payload)
        }
    }
});

export const initializeCategories = () => {
    return async(dispatch: Dispatch<any,any,any>)=>{
        const response = await categoriesServices.getAll();
        dispatch(getCategoriesList(response))
    }
}

export const {getCategoriesList, addNewCategory} = categoriesSlice.actions;
export default categoriesSlice.reducer;
