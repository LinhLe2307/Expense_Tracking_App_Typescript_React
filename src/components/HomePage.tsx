import { useEffect, useState } from "react";

import Expense from './Expense/Expense';
import { useAppDispatch } from '../app/hooks';
import { initializeExpense } from "../features/expense/expenseSlice";
import GraphDisplay from "./Expense/GraphDisplay";
import TopSpending from "./TopSpending/TopSpending";


const HomePage = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(initializeExpense());
    }, [dispatch]);


    return (
        <div>
            <TopSpending />
            
            <GraphDisplay />
            <Expense />
        </div>
    )
}

export default HomePage