import { useState } from "react";
import {
    Col,
    Nav,
    NavItem,
    Row,
    Tab,
    Tabs,
    TabContent,
    TabPane,
} from "react-bootstrap";
import DailyReport from "../DailyReport/DailyReport";
import GraphDisplay from "../Expense/GraphDisplay";
import MonthlyReport from "../MonthlyReport/MonthlyReport";
import React, { useEffect } from "react";
import {
    useParams,
    useNavigate,
    Link,
    matchPath,
    NavLink,
    useLocation,
    Routes,
    Route,
} from "react-router-dom";

const History = () => {
    const { page } = useParams();
    let navigate = useNavigate();
    const tabNameToIndex = {
        0: "daily-report",
        1: "monthly-report",
    } as const;
    const indexToTabName = {
        "daily-report": 0,
        "monthly-report": 1,
    } as const;
    const [selectedTab, setSelectedTab] = useState(0);

    console.log(page);
    const handleChange = (event: string | null) => {
        console.log("event", event);
        if (event !== null) {
            const newNumber = +event
            navigate(`/history/${tabNameToIndex[newNumber as keyof typeof tabNameToIndex]}`);
        }
        // setSelectedTab(newValue)
    };

    return (
        <div>
            <GraphDisplay />
            <Tabs
                defaultActiveKey={0}
                id="justify-tab-example"
                className="mb-3"
                justify
                onSelect={handleChange}
            >
                <Tab eventKey={0} title="Day">
                    <DailyReport />
                </Tab>
                <Tab eventKey={1} title="Month">
                    <MonthlyReport />
                </Tab>
            </Tabs>

            {/* <Tab.Container
                id="left-tabs-example" defaultActiveKey="day"
            >
                <Nav variant="pills" className="flex-column">
                    <Row>
                        <Col sm={2}>
                            <Nav.Item style={{ border: "1px solid black", borderRadius: "10px" }}>
                                <Nav.Link eventKey="day">Day</Nav.Link>
                            </Nav.Item>
                        </Col>
                        <Col sm={2}>
                            <Nav.Item style={{ border: "1px solid black", borderRadius: "10px" }}>
                                <Nav.Link eventKey="month">Month </Nav.Link>
                            </Nav.Item>
                        </Col>
                    </Row>
                </Nav>

                <Tab.Content>
                    <Tab.Pane eventKey="day">
                        <DailyReport />
                    </Tab.Pane>
                    <Tab.Pane eventKey="month">
                        <MonthlyReport />
                    </Tab.Pane>
                </Tab.Content>

            </Tab.Container> */}
        </div>
    );
};

export default History;
