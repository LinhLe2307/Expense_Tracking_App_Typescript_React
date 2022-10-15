import SingleCard from "./Card/SingleCard";
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import ExpenseCard from "./Card/ExpenseCard";

const HomePage = () => {
    const [addExpense, setAddExpense] = useState(false);
    const [inputExpense, setInputExpense]

    const handleAddExpense = () => {
        setAddExpense(prev => !prev)
    }
  return (
    <div>
        <SingleCard />
        <Button variant="primary" onClick={handleAddExpense}>+</Button>
        {addExpense && <ExpenseCard handleAddExpense={handleAddExpense}/>}
    </div>
  )
}

export default HomePage