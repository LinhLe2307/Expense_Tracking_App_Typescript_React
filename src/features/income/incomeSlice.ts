import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ThunkDispatch as Dispatch} from 'redux-thunk';
import incomeServices from "../../services/incomeAPI";
import {IncomeModel} from "../../models/reduxModels"

const initialExpenseState: IncomeModel = {
    totalIncome: 0,
}

export const incomeSlice = createSlice({
    name: "income",
    initialState: initialExpenseState,
    reducers: {
        getTotalIncome: (state, action: PayloadAction<number>) => {
            state.totalIncome = action.payload
        },
        addNewIncome: (state, action: PayloadAction<number>) => {
            state.totalIncome += action.payload
        },
    }
});

export const initializeIncome = () => {
    return async (dispatch: Dispatch<any, any, any>) => {
        const income:number = await incomeServices.getAll();
        dispatch(getTotalIncome(income))
    }
}

export const {getTotalIncome, addNewIncome} = incomeSlice.actions;
export default incomeSlice.reducer;