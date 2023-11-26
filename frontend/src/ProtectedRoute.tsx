import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { getToken } from './routes/TokenManagement/token';

interface ProtectedRouteProps extends RouteProps {
  component: React.ComponentType<any>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const token = getToken();

  return (
    <Route
      {...rest}
      render={(props) =>
        token ? <Component {...props} /> : <Redirect to="/Login" />
      }
    />
  );
};

export default ProtectedRoute;
