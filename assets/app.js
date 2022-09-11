/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch, withRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import TodoList from "./pages/TodoList";

const App = () => {
    const NavbarWithRouter = withRouter(Navbar);
    return (
        <>
            <HashRouter>
                    <NavbarWithRouter />
                    <Switch>
                        <Route path="/login" component={TodoList} />
                        <Route path="/register" component={TodoList} />
                        <Route path="/todos" component={TodoList} />
                        <Route path="/" component={TodoList} />
                    </Switch>
                    <Footer />
            </HashRouter>
        </>
    );
}

const rootElement = document.querySelector("#app");
ReactDOM.render(<App />, rootElement);