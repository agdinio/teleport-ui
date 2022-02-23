import { Route, Redirect } from "react-router-dom";

const GuardedRoute = ({ component: Component, condition, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        condition() ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default GuardedRoute;
