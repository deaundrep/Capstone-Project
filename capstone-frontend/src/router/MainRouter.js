import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { startChecking } from "../actions/auth";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import Navbar from '../components/NavBar';
import Access from '../components/Access'
import HomePage from "../components/Home";

const MainRouter = () => {
    const dispatch = useDispatch();
    const { checking, uid } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(startChecking());
    }, [dispatch]);

    if (checking) {
        return <h5>loading...</h5>;
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/"
                        isAuthenticated={!!uid}
                        component={HomePage}
                    />
                    <PublicRoute
                        exact
                        path="/login"
                        isAuthenticated={!!uid}
                        component={Access}
                    />
                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    );
};

export default MainRouter;