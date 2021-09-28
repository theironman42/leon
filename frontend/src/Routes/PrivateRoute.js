import React from 'react'
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';


export default function PrivateRoute({ component: Component, authorized, ...rest }) {
    const userLogin = useSelector(state => state.userLogin);
    const userInfo = userLogin && userLogin.userInfo 
    const auth = (authorized && userInfo) ? authorized.includes(userInfo.role) : false 
    return (
      <Route
        {...rest}
        render={(props) =>
          userInfo ? (
            auth ?
            (<Component {...props} />):
            <Redirect
              to={{
                pathname: `/`,
                state: { from: props.location }
              }}
            />
          ) : (
            <Redirect
              to={{
                pathname: `/login`,
                search: `?redirect=${props.location.pathname.slice(1)}`,
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }