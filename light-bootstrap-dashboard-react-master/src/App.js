import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Login from "views/Login.jsx"
import Resigter from "views/Resigter.jsx"

import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";
import UserContext from "./context/UserContext"
import Axios from "axios";
import VerifyEmail from "views/VerifyEmail"
import AdminLayout from "layouts/Admin"
import PrivateRoute from "PrivateRoute";
export default function App() {

    const [userData, setUserData] = useState({
        token: undefined,
        user: undefined
    })
    useEffect(() => {
        const checkLoggedIn = async () => {
            let token = localStorage.getItem("auth-token")
            if (token === null) {
                localStorage.setItem("auth-token", "")
                token = ""
            }
            const tokenRes = await Axios.post("http://localhost:8080/auth/tokenIsValid", null, { headers: { "authorization": token } })
            if (tokenRes.data) {
                const userRes = await Axios.get("http://localhost:8080/user/auth", { headers: { "authorization": token } });
                //const userRes = await Axios.get("http://localhost:8080/user/auth",{headers :{"authorization": "Bearer" +" "+ token}});
                setUserData({
                    token,
                    user: userRes.data
                })
            }
        }

        checkLoggedIn();
    }, [])

    return (
        <div>
            <BrowserRouter>
                <UserContext.Provider value={{ userData, setUserData }} >
                    <Switch>

                        <Route path="/" exact component={Login} />
                        <Route path="/signup" exact component={Resigter} />
                        <Route path="/verify" component={VerifyEmail} />
                        <Switch>
                        <PrivateRoute path="/admin" component={AdminLayout} />
                            
                        </Switch>
                    </Switch>
                    {/* <Switch>
                            <Route path="/admin" render={props => <AdminLayout {...props} />} />
                            <Redirect from="/" to="/admin/dashboard" />
                        </Switch> */}
                </UserContext.Provider>
            </BrowserRouter>
        </div>
    )

}
