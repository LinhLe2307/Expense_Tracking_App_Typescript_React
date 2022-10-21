import { Button, Dropdown } from 'react-bootstrap';
import { useState } from "react";
import { nanoid } from 'nanoid';

import ExpenseForm from "../Card/ExpenseForm";
import SingleCard from '../Card/SingleCard';
import { useAppSelector } from '../../app/hooks';
import { ExpenseModel } from '../../models/reduxModels';
import GraphDisplay from './GraphDisplay';
import { customDate } from '../../functions/reusableFunction';

const Expense = () => {
    const [selectView, setSelectView] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const openEditExpense = useAppSelector((state) => state.expense.openEditItem);
    const expenseLists = useAppSelector((state) => state.expense.inputLists);

    const categoriesList = useAppSelector(state => state.categories.inputLists);

    const filterExpense:ExpenseModel[] = expenseLists.filter((expense:ExpenseModel) => expense.date === customDate(new Date()))

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

        
        <GraphDisplay />

        <h1>€{
            filterExpense.reduce((prev, curr) => prev + (+curr.price), 0) 
        } spent today</h1>

        

        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Default View
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {categoriesList
                    .map((item) => (
                        <Dropdown.Item
                            eventKey={item.title}
                            key={nanoid()}
                            onClick={() => setSelectView(item.title)}
                        >
                            {item.title}
                        </Dropdown.Item>
                ))} 
            </Dropdown.Menu>
        </Dropdown>
                        
        <Button onClick={()=> setSelectView("")}>Reset</Button>

        <h3>{selectView === "" ? "All" : selectView}</h3>

        {
            filterExpense
                .filter((expense:ExpenseModel) => {
                    return selectView === "" ? expense : expense.categories.indexOf(selectView) !== -1
                })
                .map((expense:ExpenseModel) => 
                    <SingleCard expense={expense} key={nanoid()} handleShow={handleShow}
                />)
        }

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