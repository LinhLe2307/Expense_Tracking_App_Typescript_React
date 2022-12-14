import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThunkDispatch as Dispatch } from "redux-thunk";
import serviceAPI from "../../services/serviceAPI";
import { IncomeModel, ExpenseArrayModel } from "../../models/reduxModels";

const baseURL = "node/income";

const initialExpenseState: ExpenseArrayModel<IncomeModel> = {
  inputLists: [],
  openEditItem: false,
  editId: 0,
  show: false,
};

export const incomeSlice = createSlice({
  name: "income",
  initialState: initialExpenseState,
  reducers: {
    getTotalIncome: (state, action: PayloadAction<IncomeModel[]>) => {
      state.inputLists = action.payload;
    },
    addNewIncome: (state, action: PayloadAction<IncomeModel>) => {
      serviceAPI.postSingle(action.payload);
      state.inputLists = state.inputLists.concat(action.payload);
    },
    editIncome: (state, action: PayloadAction<IncomeModel>): void => {
      const editIncome = action.payload;
      const findIndex = state.inputLists.find(
        (expense) => expense.nid && expense.nid[0].value === state.editId
      );
      if (findIndex !== undefined) {
        const indexElement = state.inputLists.indexOf(findIndex);
        state.inputLists.splice(indexElement, 0, editIncome);
        state.inputLists = state.inputLists;
      }
      serviceAPI.patchAxios(state.editId, editIncome);
    },
    deleteIncome: (state, action: PayloadAction<number>): void => {
      const deleteId = action.payload;
      state.inputLists = state.inputLists.filter(
        (expense) => expense.nid && expense.nid[0].value !== deleteId
      );

      serviceAPI.deleteAxios(deleteId);
    },

    handleOpenEditIncome: (state, action): void => {
      state.editId = action.payload;
      state.openEditItem = !state.openEditItem;
    },
  },
});

export const initializeIncome = () => {
  return async (dispatch: Dispatch<any, any, any>) => {
    const income: IncomeModel[] = await serviceAPI.getAll(baseURL);
    dispatch(getTotalIncome(income));
  };
};

export const {
  getTotalIncome,
  addNewIncome,
  editIncome,
  deleteIncome,
  handleOpenEditIncome,
} = incomeSlice.actions;
export default incomeSlice.reducer;
