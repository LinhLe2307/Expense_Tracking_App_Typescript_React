import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThunkDispatch as Dispatch } from "redux-thunk";
import serviceAPI from "../../services/serviceAPI";
import {
  CategoriesModel,
  ExpenseModel,
  ExpenseArrayModel,
} from "../../models/reduxModels";

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
      serviceAPI.postSingle("node/", action.payload);
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
        (expense) => expense.id !== deleteId
      );

      serviceAPI.deleteAxios(baseURL, deleteId);
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
        postsIdsArray.map((id) => id && serviceAPI.deleteAxios(baseURL, id)),
        selectedPosts.map((post) => serviceAPI.postSingle(baseURL, post)),
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

    const newCategories: ([] | [number, string])[] = categoriesList.map(
      (category) =>
        category.nid ? [+category.nid[0].value, category.title[0].value] : []
    );

    const newExpense = expenseList
      .map((expense) => expense.field_expense_categories)
      .map((expense) => expense && expense.map((item) => item.target_id));

    const newExCateList: string[][] = [];

    console.log("newCategories", newCategories);

    for (let y = 0; y < newExpense.length; y++) {
      const newSub: string[] = [];
      if (newExpense[y] !== undefined) {
        for (let z = 0; z < newExpense[y].length; z++) {
          for (let x = 0; x < newCategories?.length; x++) {
            if (
              newCategories.length !== 0 &&
              newCategories[x].length !== 0 &&
              +newExpense[y][z] === newCategories[x][0]
            ) {
              newSub.push(newCategories[x][1]!);
            }
          }
        }
      }
      newExCateList.push(newSub);
    }
    // console.log(newExCateList);

    const newClone = [...expenseList];
    const newExpenseList = newClone.map((expense, i) => {
      return { ...expense, new_expense_categories: newExCateList[i] };
    });

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
