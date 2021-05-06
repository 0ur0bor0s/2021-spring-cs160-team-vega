import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Search from "./pages/Search";
import MyListings from "./pages/MyListings";

export const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                <Route path="/search" component={Search} />
                <Route path="/mylistings" component={MyListings} />
            </Switch>
        </BrowserRouter>
    );
}