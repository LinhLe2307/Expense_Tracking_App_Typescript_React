import Button from 'react-bootstrap/Button';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {ExpenseModel, ExpenseArrayModel} from "../models/reduxModels"
import { initializeExpense } from "../features/expense/expenseSlice";
import ExpenseCard from "./Card/ExpenseForm";
import SingleCard from './Card/SingleCard';


const HomePage = () => {
    const dispatch = useDispatch();
    const openAddExpense = useSelector<ExpenseArrayModel, boolean>((state) => state.openAddExpense);
    const openEditExpense = useSelector<ExpenseArrayModel, boolean>((state) => state.openEditExpense);
    const expenseLists = useSelector<ExpenseArrayModel>((state) => state.expenseLists);

    useEffect(()=> {
        initializeExpense();
    }, [dispatch])

  return (
    <div>
        
        <Button type="button">+</Button> 

        {expenseLists.map((expense: ExpenseModel) => 
            <SingleCard expense={expense} key={expense.id}/>
        )}
        
        {openAddExpense && <ExpenseCard />} 

        {openEditExpense && <ExpenseCard />}
        
    </div>
  )
}

export default HomePage