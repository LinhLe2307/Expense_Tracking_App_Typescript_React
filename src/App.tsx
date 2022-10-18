import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import DetailsInfo from './components/Card/DetailsInfo';
import HomePage from './components/HomePage';
import Layout from './pages/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />}/>
          <Route path="/:id" element={<DetailsInfo />}/>
        </ Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
