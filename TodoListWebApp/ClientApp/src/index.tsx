import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux';
import App from "./app";
import configureStore from "./redux/configureStore";
import {Router} from "react-router-dom";
import history from './components/history'

const store = configureStore()

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
                <App/>
        </Router>
    </Provider>
    ,
    document.getElementById('root')
);
