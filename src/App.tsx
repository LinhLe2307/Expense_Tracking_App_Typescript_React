import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import DetailsInfo from "./components/Card/DetailsInfo";
import DailyReport from "./components/DailyReport/DailyReport";
import CategoriesReport from "./components/MonthlyReport/CategoryDetails";
import Layout from "./pages/Layout";
import Income from "./components/Income/Income";
import Expense from "./components/Expense/Expense";
import MonthlyReport from "./components/MonthlyReport/MonthlyReport";
import HomePage from "./components/HomePage";
import History from "./components/History/History";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/:id" element={<DetailsInfo />} />
          <Route path="/income-report" element={<Income />} />
          <Route path="/daily-report" element={<DailyReport />} />
          <Route path="/monthly-report" element={<MonthlyReport />} />
          {/* <Route path="/history" element={<History />} /> */}
          {/* <Navigate exact from="/history" to "history/daily-report" /> */}
          <Route path="/history/:page" element={<History />} />
          <Route path="/history" element={<History />} />


        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
