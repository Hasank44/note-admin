import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MessageProvider from './context/MessageProvider.jsx';
import PrivateRoute from './utils/PrivateRoute.jsx';
import PublicRoute from './utils/PublicRoute.jsx';
import Dashboard from './components/pages/Dashboard/Dashboard.jsx';
import NotFound from './components/shared/NotFound.jsx';
import Login from './components/auth/Login.jsx';
import UserProvider from './context/UserProvider.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: '/', element: <PrivateRoute><Dashboard /></PrivateRoute>},
      { path:'/admin/login', element: <PublicRoute><Login /></PublicRoute>}
    ]}
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MessageProvider>
      <UserProvider>
        <RouterProvider router={router}>
        </RouterProvider>
      </UserProvider>
    </MessageProvider>
  </StrictMode>,
)
