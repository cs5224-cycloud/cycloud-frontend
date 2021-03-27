import { Auth } from 'aws-amplify';
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  let isLoggedIn = false;
  // Add your own authentication on the below line.
  Auth.currentAuthenticatedUser({
      bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
  })
    .then(user => {
      isLoggedIn = true;
      console.log(user);
    })
    .catch(err => {
      isLoggedIn = false;
      console.log(err);
    });

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login' }} />
        )
      }
    />
  )
}

export default PrivateRoute;
