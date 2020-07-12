import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Route , BrowserRouter} from "react-router-dom";
import Login from "./components/Login";
import { CookiesProvider } from "react-cookie";
import Register from "./components/Register";

const routing = (
  <BrowserRouter>
    <CookiesProvider>
      <div>
        <Route exact path="/" component={App} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </div>
    </CookiesProvider>
  </BrowserRouter>
)

ReactDOM.render(
    routing,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
