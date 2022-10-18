import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import DetailsInfo from './components/Card/DetailsInfo';
import HomePage from './components/HomePage';
import Income from './components/HomePage/Income';
import MonthlyBilling from './components/MonthlyBilling/MonthlyBilling';
import Layout from './pages/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />}/>
          <Route path="/:id" element={<DetailsInfo />}/>
          <Route path="/monthly-billing" element={<MonthlyBilling />}/>
        </ Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
