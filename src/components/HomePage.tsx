import { useEffect, useState } from "react";
import Calendar from 'react-calendar';

import { useAppDispatch } from '../app/hooks';
import { initializeExpense } from "../features/expense/expenseSlice";

import { Tab } from 'react-bootstrap';
import Expense from './HomePage/Expense/Expense';
import Income from "./HomePage/Income";
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';

const HomePage = () => {
    const [value, onChange] = useState(new Date());

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(initializeExpense());
    }, [dispatch]);

    return (
        <div>
            <h3>{value.toString()}</h3>
            {/* <Tabs
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
            </Tabs> */}
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                    <Nav.Link eventKey="first">Expense</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                    <Nav.Link eventKey="second">Income</Nav.Link>
                    </Nav.Item>
                </Nav>
                </Col>
                <Col sm={9}>
                <Tab.Content>
                    <Tab.Pane eventKey="first">
                    <Expense />
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
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