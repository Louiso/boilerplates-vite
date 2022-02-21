import LoginPage from 'pages/login';
import ProfilePage from 'pages/profile';
import { Navigate, Route, Routes } from 'react-router-dom';

import PrivateRouter from './PrivateRouter';

const Root = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/login" />} />
    <Route
      path="/register"
      element={
        <PrivateRouter>
          <LoginPage />
        </PrivateRouter>
      }
    />
    <Route
      path="/login"
      element={
        <PrivateRouter>
          <LoginPage />
        </PrivateRouter>
      }
    />
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
