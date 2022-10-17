import Button from 'react-bootstrap/Button';
import { useEffect, useState } from "react";
import { nanoid } from 'nanoid'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {ExpenseModel} from "../models/reduxModels";
import { initializeExpense } from "../features/expense/expenseSlice";
import ExpenseForm from "./Card/ExpenseForm";
import SingleCard from './Card/SingleCard';

const HomePage = () => {
    const dispatch = useAppDispatch();
     const openEditExpense = useAppSelector((state) => state.expense.openEditExpense);
    const expenseLists = useAppSelector((state) => state.expense.expenseLists);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        dispatch(initializeExpense());
    }, [dispatch]);

    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
            +
            </Button>

            { expenseLists.map((expense: ExpenseModel) => 
                <SingleCard expense={expense} key={nanoid()} handleShow={handleShow}/>
            )}

            {openEditExpense ?
                <ExpenseForm 
                    typeForm="edit"
                    handleClose={handleClose}
                    show={show}
                />
                : <ExpenseForm 
                    typeForm="add" 
                    handleClose={handleClose}
                    show={show}
                />
            }
            
        </div>
  )
}

export default HomePage