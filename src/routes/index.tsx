import AuthPage from 'pages/auth';
import ProfilePage from 'pages/profile';
import { Navigate, Route, Routes } from 'react-router-dom';

import PrivateRouter from './PrivateRouter';

const Root = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/login" />} />
    {['/login', '/register'].map((path) => (
      <Route
        path={path}
        key={path}
        element={
          <PrivateRouter>
            <AuthPage />
          </PrivateRouter>
        }
      />
    ))}
    <Route
      path="/profile"
      element={
        <PrivateRouter>
          <ProfilePage />
        </PrivateRouter>
      }
    />
  </Routes>
);

export default Root;
