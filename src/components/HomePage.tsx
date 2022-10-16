import SingleCard from "./Card/SingleCard";
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import ExpenseCard from "./Card/ExpenseCard";
import axios from "axios"

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

    const handleInputExpense = (e: React.ChangeEvent<HTMLInputElement> ): void => {
        setInputExpense(()=> {
            return {
            ...inputExpense,
            [e.target.name] : e.target.value
        }})
    }

    const addSubmitHandler = (e: React.ChangeEvent<HTMLFormElement>):void => {
        e.preventDefault()
        axios.post("http://localhost:3010/notes", inputExpense)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

  return (
    <div>
        {/* <SingleCard /> */}
        <Button variant="primary" onClick={handleAddExpense}>+</Button>
        <div>{inputExpense.title}</div>
        <div>{inputExpense.color}</div>
        <div>{inputExpense.price}</div>
        {addExpense && 
            <ExpenseCard 
                handleAddExpense={handleAddExpense}
                handleInputExpense={handleInputExpense}
                addSubmitHandler={addSubmitHandler}
            />
        }
    </div>
  )
}

export default HomePage