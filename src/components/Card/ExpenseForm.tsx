import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addNewExpense, editExpense } from '../../features/expense/expenseSlice';
import {ExpenseModel} from "../../models/reduxModels";

interface MyProps {
  typeForm: string
}

function ExpenseForm ({typeForm}: MyProps){
    const openAddExpense = useAppSelector((state) => state.expense.openAddExpense);
    const dispatch = useAppDispatch()

    const [inputExpense, setInputExpense] = useState<ExpenseModel>({
        title: "",
        price: 0,
        color: ""
    })

    const handleInputExpense = (e:React.ChangeEvent<HTMLInputElement>):void => {
        setInputExpense({
            ...inputExpense,
            [e.target.name] : e.target.value
        })
    }

    const submitHandler = (e: React.FormEvent<HTMLFormElement>, type: string):void => {
        e.preventDefault();
        if(type==="add") {
          dispatch(addNewExpense(inputExpense))
        } else {
          dispatch(editExpense(inputExpense))
        }
    }

  return (
    <Card>
      <Card.Body>
        <Card.Title>Add/Edit Expense</Card.Title>
          <form onSubmit={(e) => submitHandler(e, typeForm)}>
          <div>
            <label>Title</label>
            <input required name="title" type="text" onChange={handleInputExpense}/>
          </div>
          <div>
            <label>Price</label>
            <input required name="price"  type="number" onChange={handleInputExpense}/>
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