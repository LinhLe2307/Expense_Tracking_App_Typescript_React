import Button from 'react-bootstrap/Button';
import { useEffect, useState } from "react";

import { initializeExpense } from "../features/expense/expenseSlice";
import ExpenseCard from "./Card/ExpenseForm";
import SingleCard from './Card/SingleCard';
import { useDispatch } from 'react-redux';

interface ExpenseList {
    title: string,
    price: number,
    color: string,
    id: number
}

const HomePage = () => {
    const [addExpense, setAddExpense] = useState(false);
    const [editExpense, setEditExpense] = useState(false);

    const dispatch = useDispatch()

    const [expenseLists, setExpenseLists] = useState<ExpenseList[]>([]);

    const handleAddExpense = ():void => {
        setAddExpense(prev => !prev)
    }

    const handleEditExpense = () => {
        setEditExpense(prev => !prev)
    }


    useEffect(()=> {
        initializeExpense();
    }, [dispatch])

  return (
    <div>
        
        <Button type="button" onClick={handleAddExpense}>+</Button> 

        {expenseLists.map((expense) => 
            <SingleCard expense={expense} key={expense.id} handleEditExpense={handleEditExpense}/>
        )}
        
        {addExpense && <ExpenseCard handleAddExpense={handleAddExpense} />} 

        {editExpense && <ExpenseCard handleAddExpense={handleAddExpense} />}
        
    </div>
  )
}

export default HomePage