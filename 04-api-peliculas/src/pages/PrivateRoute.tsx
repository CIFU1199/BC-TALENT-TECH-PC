import React from 'react';
import {Navigate} from 'react-router-dom';


interface PrivateRouteProps {
    children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({children}) => {
    const authToken = localStorage.getItem('authToken'); // Obtener el token de autenticación del localStorage
    return authToken ? <>{children}</> : <Navigate to="/login" replace/>; // Si hay token, renderiza los hijos, si no, redirige a la página de inicio de sesión
}


export default PrivateRoute;