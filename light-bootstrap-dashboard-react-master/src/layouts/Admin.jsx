import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import AdminNavbar from "components/Navbars/AdminNavbar";

import Sidebar from "components/Sidebar/Sidebar";
import routes from "routes.js";
import image from "assets/img/sidebar-3.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/animate.min.css";

import "../assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
import "../assets/css/demo.css";
import "../assets/css/pe-icon-7-stroke.css";
import "../App.scss"
class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _notificationSystem: null,
      image: image,
      color: "black",
      hasImage: true
      
    };
  }
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          
          <Route
            path={prop.layout + prop.path}
            render={props => (
              
              <prop.component
              
                {...props}
                // handleClick={this.handleNotificationClick}
              />
            )}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  render() {
    return (
      <div className="wrapper">
        <Sidebar {...this.props} routes={routes} image={this.state.image}
        color={this.state.color}
        hasImage={this.state.hasImage}/>
        <div id="main-panel" className="main-panel" ref="mainPanel">
          <AdminNavbar
            {...this.props}
            brandText={this.getBrandText(this.props.location.pathname)}
          />
          <Switch>{this.getRoutes(routes)}</Switch>
       
          
        </div>
      </div>
    );
  }
}

export default Admin;
