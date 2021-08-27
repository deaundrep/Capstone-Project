import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import CalScreen from "../components/Calendar/CalScreen";
import { useDispatch, useSelector } from "react-redux";
import { startChecking } from "../actions/auth";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import LoginPage from "../components/auth/LoginPage"
//import HomePage from "../components/Home";

const MainRouter = () => {
    const dispatch = useDispatch();
    const { checking, uid } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(startChecking());
    }, [dispatch]);

    // if (checking) {
    //     return <h5>loading...</h5>;
    // }

    return (
        <Router>
            <div>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/"
                        isAuthenticated={!!uid}
                        component={CalScreen}
                    />
                    <PublicRoute
                        exact
                        path="/login"
                        isAuthenticated={!!uid}
                        component={LoginPage}
                    />
                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    );
};

export default MainRouter;