import SingleCard from "./Card/SingleCard";
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import ExpenseCard from "./Card/ExpenseCard";

interface InputExpense {
    title: string,
    price: number,
    color: string
}

const HomePage = () => {
    const [addExpense, setAddExpense] = useState(false);
    const [inputExpense, setInputExpense] = useState<InputExpense>({
        title: "",
        price: 0,
        color: ""
    })

    const handleAddExpense = ():void => {
        setAddExpense(prev => !prev)
    }

    const handleInputExpense = (e: React.ChangeEvent<HTMLFormElement> ): void => {
        setInputExpense({
            ...inputExpense,
            [e.target.name] : e.target.value
        })
        console.log(inputExpense.title)
    }

  return (
    <div>
        <div>{inputExpense.title}</div>
        <div>{inputExpense.color}</div>
        {/* <SingleCard /> */}
        <Button variant="primary" onClick={handleAddExpense}>+</Button>
        {addExpense && <ExpenseCard handleAddExpense={handleAddExpense}
        handleInputExpense={handleInputExpense}
        />}
    </div>
  )
}

export default HomePage