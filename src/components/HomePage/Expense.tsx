import { Button, Dropdown } from 'react-bootstrap';
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
        <Button 
            variant="dark" 
            onClick={handleShow} 
            type="button" 
            style={{
                position:"absolute",
                bottom: "3rem",
                right: "3rem",
                borderRadius: "50%"
            }}
        >
            +
        </Button>

            {/* <Calendar onChange={onChange} value={value} /> */}
        
        <h1> €{expenseLists.reduce((prev, curr) => prev + (+curr.price), 0)} spent today</h1>

        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Default View
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {["Communication", "Education", "Accomodation", "Fuel"]
                    .map(item => (
                        <Dropdown.Item
                            eventKey={item}
                            key={item}
                        >
                            {item}
                        </Dropdown.Item>
                ))} 
            </Dropdown.Menu>
        </Dropdown>

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