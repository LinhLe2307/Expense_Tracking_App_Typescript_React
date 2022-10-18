import { Button, Dropdown } from 'react-bootstrap';
import { useState } from "react";
import { nanoid } from 'nanoid';

import ExpenseForm from "../../Card/ExpenseForm";
import SingleCard from '../../Card/SingleCard';
import { useAppSelector } from '../../../app/hooks';
import { ExpenseModel } from '../../../models/reduxModels';
import GraphDisplay from './GraphDisplay';

const Expense = () => {
    const [selectView, setSelectView] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const openEditExpense = useAppSelector((state) => state.expense.openEditExpense);
    const expenseLists = useAppSelector((state) => state.expense.expenseLists);

    const categoriesList = useAppSelector(state => state.categories.categoriesList);


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
        
        <GraphDisplay />

        <h1> €{expenseLists.reduce((prev, curr) => prev + (+curr.price), 0)} spent today</h1>

        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Default View
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {categoriesList
                    .map(item => (
                        <Dropdown.Item
                            eventKey={item.categoryTitle}
                            key={item.categoryTitle}
                            onClick={() => setSelectView(item.categoryTitle)}
                        >
                            {item.categoryTitle}
                        </Dropdown.Item>
                ))} 
            </Dropdown.Menu>
        </Dropdown>
                        
        <Button onClick={()=> setSelectView("")}>Reset</Button>

        <h3>{selectView === "" ? "All" : selectView}</h3>

        {
            expenseLists
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