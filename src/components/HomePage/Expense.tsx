import { Button } from 'react-bootstrap';
import { useState } from "react";
import { nanoid } from 'nanoid';

import ExpenseForm from "../Card/ExpenseForm";
import SingleCard from '../Card/SingleCard';
import { useAppSelector } from '../../app/hooks';
import { ExpenseModel } from '../../models/reduxModels';

const Expense = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const openEditExpense = useAppSelector((state) => state.expense.openEditExpense);
    const expenseLists = useAppSelector((state) => state.expense.expenseLists);

    return (
    <>
        <Button variant="dark" onClick={handleShow} type="button">
            +
            </Button>

            {/* <Calendar onChange={onChange} value={value} /> */}

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
    </>
  )
}

export default Expense