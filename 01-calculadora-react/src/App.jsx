import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/NavBar';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './styles/theme';
import { CalculatorPage } from './pages/CalculatorPage';
import { RegisterPage } from './pages/RegisterPage';
import { UserDataPage } from './pages/UserDataPage';

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<CalculatorPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/user-data" element={<UserDataPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};