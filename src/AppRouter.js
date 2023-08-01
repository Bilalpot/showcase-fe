import React from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './pages/Auth';
import NotFound from './pages/NotFound';
import { EDUCATIONS_ROUTE, LOGIN_ROUTE, SIGN_UP_ROUTE } from './utils/routes';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Education from './pages/Education';
import ProtectedRoute from './utils/components/ProtectedRoute';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />}>
          <Route path={LOGIN_ROUTE} element={<Login />} />
          <Route path={SIGN_UP_ROUTE} element={<SignUp />} />
          <Route path="/auth" element={<Navigate to={LOGIN_ROUTE} />} />
        </Route>
        <Route
          path={EDUCATIONS_ROUTE}
          element={
            <ProtectedRoute>
              <Education />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to={EDUCATIONS_ROUTE} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
