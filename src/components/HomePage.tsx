import Button from 'react-bootstrap/Button';
import { useEffect, useState } from "react";
import ExpenseCard from "./Card/ExpenseCard";
import axios from "axios"
import SingleCard from './Card/SingleCard';

interface ExpenseList {
    title: string,
    price: number,
    color: string,
    id: number
}

const HomePage = () => {
    const [addExpense, setAddExpense] = useState(false);

    const [expenseLists, setExpenseLists] = useState<ExpenseList[]>([]);

    const handleAddExpense = ():void => {
        setAddExpense(prev => !prev)
    }

    useEffect(()=> {
        axios.get("http://localhost:3010/notes")
        .then(res => setExpenseLists(res.data))
        .catch(err => console.log(err))
    }, [])
  return (
    <div>
        
        <button type="button" onClick={handleAddExpense}>+</button> 

        {expenseLists.map((expense) => 
            <SingleCard expense={expense} key={expense.id}/>
        )}
        
        <ExpenseCard handleAddExpense={handleAddExpense}/> 
        
    </div>
  )
}

export default HomePage