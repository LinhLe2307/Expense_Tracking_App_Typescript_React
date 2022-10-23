import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {ThunkDispatch as Dispatch} from 'redux-thunk';
import { CategoriesModel, ExpenseArrayModel } from "../../models/reduxModels";
import serviceAPI from "../../services/serviceAPI";

const baseURL = "http://localhost:3010/categories";

const initialCategoriesState:ExpenseArrayModel<CategoriesModel> = {
    inputLists: [],
    openEditItem: false,
    editId: 0,
    show: false,
    editCategory: ""
}

export const categoriesSlice = createSlice({
    name: "categories",
    initialState: initialCategoriesState,
    reducers: {
        getCategoriesList:(state, action:PayloadAction<CategoriesModel[]>) =>{
            state.inputLists = action.payload
        },
        addNewCategory: (state, action:PayloadAction<CategoriesModel>) => {
            const newCategory = action.payload;

            state.inputLists = state.inputLists.concat(newCategory)

            serviceAPI.postSingle(baseURL, newCategory)
        },
        editCategoryContent:(state, action:PayloadAction<CategoriesModel>):void => {
            const editItem = action.payload;
            const findIndex = state.inputLists.find(expense => expense.title === state.editCategory)
            if(findIndex !== undefined) {
                const indexElement = state.inputLists.indexOf(findIndex);
                console.log(indexElement)
                state.inputLists.splice(indexElement, 0, editItem);
                state.inputLists =  state.inputLists
                findIndex.id && serviceAPI.putAxios(baseURL, findIndex.id, editItem)
            }
        },
        deleteCategory: (state, action:PayloadAction<number>):void => {
            const deleteItem = action.payload;
            serviceAPI.deleteAxios(baseURL, deleteItem)

            state.inputLists = state.inputLists.filter(expense => expense.id !== deleteItem)
        },
        
        handleOpenEditCategory: (state, action):void => {
            state.editCategory = action.payload
            state.openEditItem = !state.openEditItem
        }
    } 
});

export const initializeCategories = () => {
    return async(dispatch: Dispatch<any,any,any>)=>{
        const response: CategoriesModel[]= await serviceAPI.getAll(baseURL);
        dispatch(getCategoriesList(response))
    }
}

export const { 
    getCategoriesList, 
    addNewCategory, 
    editCategoryContent, 
    deleteCategory, 
    handleOpenEditCategory,
} = categoriesSlice.actions;
export default categoriesSlice.reducer;