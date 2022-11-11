import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThunkDispatch as Dispatch } from "redux-thunk";
import { CategoriesModel, ExpenseArrayModel } from "../../models/reduxModels";
import serviceAPI from "../../services/serviceAPI";

const baseURL = "node/categories";

const initialCategoriesState: ExpenseArrayModel<CategoriesModel> = {
  inputLists: [],
  openEditItem: false,
  editId: 0,
  show: false,
  editCategory: "",
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: initialCategoriesState,
  reducers: {
    getCategoriesList: (state, action: PayloadAction<CategoriesModel[]>) => {
      state.inputLists = action.payload;
    },
    addNewCategory: (state, action: PayloadAction<CategoriesModel>) => {
      const newCategory = action.payload;
      const findIndex = state.inputLists.find(
        (expense) => expense.title === newCategory.title
      );
      if (findIndex !== undefined) {
        state.inputLists = state.inputLists.concat(newCategory);
      }

      serviceAPI.postSingle(newCategory);
    },
    // editCategoryContent: (
    //   state,
    //   action: PayloadAction<CategoriesModel>
    // ): void => {
    //   const editItem = action.payload;
    //   if (state.editCategory && state.editCategory.length > 0) {
    //     const findIndex = state.inputLists.find(
    //       (expense) => expense.title[0].value === state.editCategory
    //     );
    //     // console.log(findIndex)
    //     if (findIndex !== undefined) {
    //       const indexElement = state.inputLists.indexOf(findIndex);
    //       // console.log(indexElement)
    //       state.inputLists.splice(indexElement, 0, editItem);
    //       state.inputLists = state.inputLists;
    //       findIndex.id && serviceAPI.putAxios(baseURL, findIndex.id, editItem);
    //     }
    //   }
    // },
    deleteCategory: (state, action: PayloadAction<number>): void => {
      const deleteItem = action.payload;
      serviceAPI.deleteAxios(deleteItem);

      state.inputLists = state.inputLists.filter(
        (expense) => expense.id !== deleteItem
      );
    },

    handleOpenEditCategory: (state, action: PayloadAction<string>): void => {
      state.editCategory = action.payload;
      state.openEditItem = !state.openEditItem;
    },
  },
});

export const initializeCategories = () => {
  return async (dispatch: Dispatch<any, any, any>) => {
    const response: CategoriesModel[] = await serviceAPI.getAll(baseURL);
    dispatch(getCategoriesList(response));
  };
};

export const {
  getCategoriesList,
  addNewCategory,
  // editCategoryContent,
  deleteCategory,
  handleOpenEditCategory,
} = categoriesSlice.actions;
export default categoriesSlice.reducer;
