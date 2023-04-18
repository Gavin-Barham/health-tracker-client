import { Route, Redirect } from 'react-router-dom';

export const AuthRoute = ({ children, loggedIn, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        loggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};