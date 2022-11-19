import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import DetailsInfo from "./components/Card/DetailsInfo";
import History from "./components/History/History";
import HomePage from "./components/HomePage";
import Income from "./components/Income/Income";
import Layout from "./pages/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/:id" element={<DetailsInfo />} />
          <Route path="/income-report" element={<Income />} />
          {/* <Route path="/history" element={<History />} /> */}
          {/* <Navigate exact from="/history" to "history/daily-report" /> */}
          <Route path="/history/:page" element={<History />} />
          {/* <Route path="/history" element={<History />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
