import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThunkDispatch as Dispatch } from "redux-thunk";
import serviceAPI from "../../services/serviceAPI";
import {
  CategoriesModel,
  ExpenseModel,
  ExpenseArrayModel,
} from "../../models/reduxModels";
import { convertIdToLabel } from "../../functions/reusableFunction";

const baseURL = "node/expense";

const initialExpenseState: ExpenseArrayModel<ExpenseModel> = {
  inputLists: [],
  openEditItem: false,
  editId: 0,
  show: false,
};

export const expenseSlice = createSlice({
  name: "expense",
  initialState: initialExpenseState,
  reducers: {
    getExpenseList: (state, action: PayloadAction<ExpenseModel[]>): void => {
      state.inputLists = action.payload;
    },

    addNewExpense: (state, action: PayloadAction<ExpenseModel>): void => {
      serviceAPI.postSingle(action.payload);
      state.inputLists = state.inputLists.concat(action.payload);
    },

    editExpense: (state, action: PayloadAction<ExpenseModel>): void => {
      const editExense = action.payload;
      const findIndex = state.inputLists.find(
        (expense) => expense.nid && expense.nid[0].value === state.editId
      );
      if (findIndex !== undefined) {
        const indexElement = state.inputLists.indexOf(findIndex);
        state.inputLists.splice(indexElement, 0, editExense);
        state.inputLists = state.inputLists;
      }
      serviceAPI.putAxios(baseURL, state.editId, editExense);
    },

    deleteExpense: (state, action: PayloadAction<number>): void => {
      const deleteId = action.payload;
      state.inputLists = state.inputLists.filter(
        (expense) => expense.nid && expense.nid[0].value !== deleteId
      );

      serviceAPI.deleteAxios(deleteId);
    },

    handleOpenEditExpense: (state, action): void => {
      state.editId = action.payload;
      state.openEditItem = !state.openEditItem;
    },

    deleteExpenseCategories: (state, action: PayloadAction<ExpenseModel[]>) => {
      state.inputLists = action.payload;
      const selectedPosts = action.payload;
      const postsIdsArray = action.payload.map((post) => post.id);
      Promise.all([
        postsIdsArray.map((id) => id && serviceAPI.deleteAxios(id)),
        selectedPosts.map((post) => serviceAPI.postSingle(post)),
      ]);
    },

    handleOpenForm: (state) => {
      state.show = !state.show;
    },
  },
});

export const initializeExpense = () => {
  return async (dispatch: Dispatch<any, any, any>) => {
    const expenseList: ExpenseModel[] = await serviceAPI.getAll(baseURL);
    const categoriesList: CategoriesModel[] = await serviceAPI.getAll(
      "node/categories"
    );

    const newExpenseList = convertIdToLabel(expenseList, categoriesList);

    dispatch(getExpenseList(newExpenseList));
  };
};

export const {
  getExpenseList,
  addNewExpense,
  editExpense,
  deleteExpense,
  handleOpenEditExpense,
  deleteExpenseCategories,
  handleOpenForm,
} = expenseSlice.actions;
export default expenseSlice.reducer;
