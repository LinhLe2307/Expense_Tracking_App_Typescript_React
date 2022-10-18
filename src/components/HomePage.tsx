import { useEffect, useState } from "react";
import Calendar from 'react-calendar';

import { useAppDispatch } from '../app/hooks';
import { initializeExpense } from "../features/expense/expenseSlice";

import { Tab, Tabs } from 'react-bootstrap';
import Expense from './HomePage/Expense';
import Income from "./HomePage/Income";

const HomePage = () => {
    const [value, onChange] = useState(new Date());

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(initializeExpense());
    }, [dispatch]);

    return (
        <div>
            <h3>{value.toString()}</h3>
            <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="expense" title="Expense">
                    <Expense />
                </Tab>
                <Tab eventKey="income" title="Income">
                    <Income />
                </Tab>
            </Tabs>
        </div>
  )
}

export default HomePage