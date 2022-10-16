import Button from 'react-bootstrap/Button';
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {ExpenseModel} from "../models/reduxModels";
import { initializeExpense } from "../features/expense/expenseSlice";
import {handleOpenAddExpense} from "../features/expense/expenseSlice";
import ExpenseForm from "./Card/ExpenseForm";
import SingleCard from './Card/SingleCard';

const HomePage = () => {
    const dispatch = useAppDispatch();
    const openAddExpense = useAppSelector((state) => state.expense.openAddExpense);
    const openEditExpense = useAppSelector((state) => state.expense.openEditExpense);
    const expenseLists = useAppSelector((state) => state.expense.expenseLists);

    useEffect(() => {
        dispatch(initializeExpense());
    }, [dispatch]);

    return (
        <div>
            
            <Button type="button" onClick={() => dispatch(handleOpenAddExpense())}>+</Button> 

            {!openAddExpense && <ExpenseForm />} 
            { expenseLists.map((expense: ExpenseModel) => 
                <SingleCard expense={expense} key={expense.id}/>
            
            )}
    

            {/* {openEditExpense && <ExpenseCard />} */}
            
        </div>
  )
}

export default HomePage