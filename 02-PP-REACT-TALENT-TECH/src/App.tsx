import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import CalculatorPage from './pages/CalculatorPage'; // Sin llaves {}
import RegisterPage from './pages/RegisterPage';
import UserDataPage from './pages/UserDataPage'; // Sin llaves {}
import 'bootstrap/dist/css/bootstrap.min.css';

export const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<CalculatorPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/user-data" element={<UserDataPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App; // Esta línea es crucial