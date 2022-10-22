import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import DetailsInfo from './components/Card/DetailsInfo';
import DailyReport from './components/DailyReport/DailyReport';
import HomePage from './components/HomePage';
import CategoriesReport from './components/CategoriesReport/CategoriesReport';
import Layout from './pages/Layout';
import Income from './components/Income/Income';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />}/>
          <Route path="/:id" element={<DetailsInfo />}/>
          <Route path="/categories-report" element={<CategoriesReport />}/>
          <Route path="/daily-report" element={<DailyReport />}/>
        </ Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
