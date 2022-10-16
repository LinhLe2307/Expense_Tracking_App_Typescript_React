import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from "react";
import axios from "axios"
interface MyProps {
  handleAddExpense: () => void,
}

interface InputExpense {
    title: string,
    price: number,
    color: string
}

function ExpenseForm ({handleAddExpense}: MyProps ){

    const [inputExpense, setInputExpense] = useState<InputExpense>({
        title: "",
        price: 0,
        color: ""
    })

    const handleInputExpense = (e: React.ChangeEvent<HTMLInputElement> ): void => {
        setInputExpense({
            ...inputExpense,
            [e.target.name] : e.target.value
        })
    }

    const addSubmitHandler = (e: React.FormEvent<HTMLFormElement>):void => {
        e.preventDefault()
        handleAddExpense()
        axios.post("http://localhost:3010/notes", inputExpense)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        
        window.location.reload()
    }

  return (
    <Card>
      <Card.Body>
        <Card.Title>Add/Edit Expense</Card.Title>
        <form onSubmit={(e) => addSubmitHandler(e)}>
          <div>
            <label>Title</label>
            <input required name="title" type="text" onChange={handleInputExpense}/>
          </div>
          <div>
            <label>Price</label>
            <input required name="price"  type="text" onChange={handleInputExpense}/>
          </div>
          <div>
            <label>Categories</label>
          </div>
          <div>
            <label>Color</label>
            <input required type="color" name="color" onChange={handleInputExpense}/>
          </div>
          <Button type="submit">Save</Button>
        </form>
      </Card.Body>
      </Card>
  )
}

export default ExpenseForm