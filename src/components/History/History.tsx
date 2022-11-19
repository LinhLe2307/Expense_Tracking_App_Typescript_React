import { useCallback, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import DailyReport from "../DailyReport/DailyReport";
import GraphDisplay from "../Expense/GraphDisplay";
import MonthlyReport from "../MonthlyReport/MonthlyReport";

const History = () => {
    const { page } = useParams();
    let navigate = useNavigate();
    const [key, setKey] = useState<string | null>();
    const tabNameToIndex = {
        0: "daily-report",
        1: "monthly-report",
    } as const;
    const indexToTabName = {
        "daily-report": 0,
        "monthly-report": 1,
    } as const;
    const [selectedTab, setSelectedTab] = useState
        (page && indexToTabName[page as keyof typeof indexToTabName]);
    const handleChange = (event: string | null) => {
        if (event !== null && key !== null && key !== undefined) {
            const newNumber = +event;
            const newUrl = tabNameToIndex[newNumber as keyof typeof tabNameToIndex];
            navigate(
                `/history/${newUrl}`
            );
            setSelectedTab(indexToTabName[newUrl])
            // setKey(indexToTabName[newUrl].toString())
        }
    };

    const callTab = useCallback(() => {
        if (key !== null && key !== undefined) {
            const newKey = +key;
            if (newKey === 0) {
                return <DailyReport />;
            } else {
                return <MonthlyReport />;
            }
        }
    }, [key]);

    return (
        <div>
            <GraphDisplay />
            <Tabs
                defaultActiveKey={0}
                id="justify-tab-example"
                className="mb-3"
                justify
                onSelect={(e) => {
                    handleChange(e);
                    setKey(e);
                }}
            >
                <Tab eventKey={0} title="Day">
                    {callTab()}
                </Tab>
                <Tab eventKey={1} title="Month">
                    {callTab()}
                </Tab>
            </Tabs>
        </div>
    );
};

export default History;
