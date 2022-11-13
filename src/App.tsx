import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import DetailsInfo from './components/Card/DetailsInfo';
import DailyReport from './components/DailyReport/DailyReport';
import CategoriesReport from './components/CategoriesReport/CategoriesReport';
import Layout from './pages/Layout';
import Income from './components/Income/Income';
import Expense from './components/Expense/Expense';
import MonthlyReport from './components/MonthlyReport/MonthlyReport';
import HomePage from './components/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />}/>
          <Route path="/:id" element={<DetailsInfo />}/>
          <Route path="/income-report" element={<Income />}/>
          <Route path="/daily-report" element={<DailyReport />}/>
          <Route path="/monthly-report" element={<MonthlyReport />}/>
        </ Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
