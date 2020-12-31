import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import auth from './service/authService'
import AdminLayout from "layouts/Admin"


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    auth.isAuthenticated() ? (
        <Switch>
            <AdminLayout {...props} />
            <Redirect from="/" to="/admin/dashboard" />
        </Switch>
    ) : (
      <Redirect to={{
        pathname: '/'
      }}/>
    )
  )}/>
)

export default PrivateRoute

 
