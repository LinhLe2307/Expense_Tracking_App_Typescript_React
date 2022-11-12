import { useEffect } from "react";

import { Tab } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Expense from './Expense/Expense';
import Income from "./Income/Income";

import { useAppDispatch } from '../app/hooks';
import { initializeExpense } from "../features/expense/expenseSlice";
import { customDate } from "../functions/reusableFunction";

const HomePage = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(initializeExpense());
    }, [dispatch]);

    return (
        <div>
            <h3>{customDate(new Date())}</h3>
            <Tab.Container id="left-tabs-example" defaultActiveKey="expense">
                <Row>
                <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                    <Nav.Link eventKey="expense">Expense</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                    <Nav.Link eventKey="income">Income</Nav.Link>
                    </Nav.Item>
                </Nav>
                </Col>
                <Col sm={9}>
                <Tab.Content>
                    <Tab.Pane eventKey="expense">
                        <Expense />
                    </Tab.Pane>
                    <Tab.Pane eventKey="income">
                        <Income />
                    </Tab.Pane>
                </Tab.Content>
                </Col>
                </Row>
            </Tab.Container>
        </div>
  )
}

export default HomePage