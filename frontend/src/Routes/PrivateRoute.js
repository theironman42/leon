import React from 'react'
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';


export default function PrivateRoute({ component: Component, authorized, ...rest }) {
    let userLogin = useSelector(state => state.userLogin);
    let userInfo = userLogin && userLogin.userInfo 
    let auth = (authorized && userInfo) ? authorized.includes(userInfo.role) : false

    return (
      <Route
        {...rest}
        render={(props) =>
          auth ? (
            <Component {...props} />
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