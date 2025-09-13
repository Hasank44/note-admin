import { Navigate } from 'react-router-dom';

const isAuthenticated = !!localStorage.getItem('auth_token');

const PublicRoute = ({ children }) => {
  return isAuthenticated ? <Navigate to="/" replace /> : children;
};

export default PublicRoute;