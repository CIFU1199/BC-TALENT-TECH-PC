import { Link, useLocation } from 'react-router-dom';
import { Navbar as BsNavbar, Nav, Container, Button, Dropdown, Badge } from 'react-bootstrap';
import { Calculator, PersonFill, CardList, MoonFill, SunFill } from 'react-bootstrap-icons';
import { useState, useEffect } from 'react';

export const Navbar = () => {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.setAttribute('data-bs-theme', 'light');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Verificar si hay datos de usuario guardados
  const hasUserData = !!localStorage.getItem('userData');

  return (
    <BsNavbar bg={darkMode ? 'dark' : 'primary'} variant={darkMode ? 'dark' : 'light'} expand="lg" sticky="top" className="shadow-sm">
      <Container fluid="lg">
        <BsNavbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <Calculator className="me-2" size={24} />
          <span className="fw-bold">Calcula App</span>
        </BsNavbar.Brand>
        
        <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
        
        <BsNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              as={Link} 
              to="/" 
              active={location.pathname === '/'}
              className="d-flex align-items-center"
            >
              <Calculator className="me-1" /> Calculadora
            </Nav.Link>
            
            <Nav.Link 
              as={Link} 
              to="/register" 
              active={location.pathname === '/register'}
              className="d-flex align-items-center"
            >
              <PersonFill className="me-1" /> Registro
            </Nav.Link>
            
            <Nav.Link 
              as={Link} 
              to="/user-data" 
              active={location.pathname === '/user-data'}
              className="d-flex align-items-center"
              disabled={!hasUserData}
            >
              <CardList className="me-1" /> 
              Datos 
              {hasUserData && <Badge bg="success" className="ms-1">✓</Badge>}
            </Nav.Link>
          </Nav>
          
          <div className="d-flex align-items-center">
            <Button 
              variant={darkMode ? 'outline-light' : 'outline-light'} 
              onClick={toggleDarkMode}
              size="sm"
              className="me-2"
            >
              {darkMode ? <SunFill /> : <MoonFill />}
            </Button>
            
            <Dropdown>
              <Dropdown.Toggle variant={darkMode ? 'outline-light' : 'outline-light'} size="sm">
                Opciones
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/">
                  Inicio
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/register">
                  Registro
                </Dropdown.Item>
                <Dropdown.Item 
                  as={Link} 
                  to="/user-data" 
                  disabled={!hasUserData}
                >
                  Ver datos
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item 
                  onClick={() => {
                    localStorage.clear();
                    window.location.reload();
                  }}
                  className="text-danger"
                >
                  Limpiar todos los datos
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
};