import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import { useAppDispatch } from '../../app/hooks';
import { addNewExpense, editExpense } from '../../features/expense/expenseSlice';
import {ExpenseModel} from "../../models/reduxModels";

interface MyProps {
  typeForm: string,
  handleClose: ()=>void,
  show:boolean
}

function ExpenseForm ({typeForm, handleClose, show }: MyProps){
    

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

    const submitHandler = (e: React.FormEvent<HTMLFormElement>, typeForm: string):void => {
        e.preventDefault();
        if(typeForm === "add") {
          dispatch(addNewExpense(inputExpense))
        } else {
          dispatch(editExpense(inputExpense))
        }
        window.location.reload()
    }

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">Save</Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ExpenseForm