import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ThunkDispatch as Dispatch} from 'redux-thunk';
import incomeServices from "../../services/incomeAPI";
import {IncomeModel, IncomeArrayModel} from "../../models/reduxModels"

const initialExpenseState: IncomeArrayModel = {
    incomeList: []
}

export const incomeSlice = createSlice({
    name: "income",
    initialState: initialExpenseState,
    reducers: {
        getTotalIncome: (state, action: PayloadAction<IncomeModel[]>) => {
            state.incomeList = action.payload
        },
        addNewIncome: (state, action: PayloadAction<IncomeModel>) => {
            incomeServices.postAll(action.payload);
            state.incomeList = state.incomeList.concat(action.payload)

        },
    }
});

export const initializeIncome = () => {
    return async (dispatch: Dispatch<any, any, any>) => {
        const income:IncomeModel[] = await incomeServices.getAll();
        dispatch(getTotalIncome(income))
    }
}

export const {getTotalIncome, addNewIncome} = incomeSlice.actions;
export default incomeSlice.reducer;