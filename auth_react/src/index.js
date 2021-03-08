import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.js";
import {withRouter} from "react-router-dom"
import { BrowserRouter as Router } from "react-router-dom";


ReactDOM.render(
    <Router>
          <App/>
    </Router>,
    document.getElementById("root")
);