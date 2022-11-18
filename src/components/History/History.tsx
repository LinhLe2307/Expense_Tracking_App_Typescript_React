import { Col, Nav, Row, Tab, Tabs } from 'react-bootstrap'
import DailyReport from '../DailyReport/DailyReport'
import GraphDisplay from '../Expense/GraphDisplay'
import MonthlyReport from '../MonthlyReport/MonthlyReport'

const History = () => {
    return (
        <div>
            <GraphDisplay />
            {/* <Tabs
                defaultActiveKey="day"
                id="justify-tab-example"
                className="mb-3"
                justify
            >
                <Tab eventKey="day" title="Day">
                    <DailyReport />
                </Tab>
                <Tab eventKey="month" title="Month">
                    <MonthlyReport />
                </Tab> */}
            {/* <Tab eventKey="longer-tab" title="Loooonger Tab">
                    <Sonnet />
                </Tab>
                <Tab eventKey="contact" title="Contact" disabled>
                    <Sonnet />
                </Tab> */}
            {/* </Tabs> */}
            <Tab.Container id="left-tabs-example" defaultActiveKey="day">
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

            </Tab.Container>
        </div >
    )
}

export default History