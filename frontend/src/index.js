import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import Information from "./components/Infopage/information";
import Owneraccom from "./components/Infopage/owneraccom";
import Login from "./components/account/Login";
import Register from "./components/account/register";
import Detailpage from "./components/Infopage/detailpage";
import {HashRouter,Route,Switch,Redirect} from 'react-router-dom';
import store from "./store/store";
import { Provider } from 'react-redux';
import Submitpage from "./components/Infopage/submitpage";
import Reset from "./components/account/Reset";
import Studentaccom from "./components/Infopage/studentaccom";
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import Alert from "./components/Alert/alert";
import PrivateRoute from "./components/account/PrivateRouter";
import {loadUser} from "./actions/auth";

const alertOptions = {
    timeout: 3000,
};


ReactDOM.render(
    <Provider store={store}>
        {store.dispatch(loadUser())}
        <AlertProvider template={AlertTemplate} {...alertOptions}>
        <HashRouter>
            <Alert />
            <Switch>
                <PrivateRoute exact path='/' component={App}/>
                <PrivateRoute exact path='/information' component={Information}/>
                <PrivateRoute exact path='/submitinfo' component={Submitpage}/>
                <PrivateRoute exact path='/owneraccommodation' component={Owneraccom}/>
                <PrivateRoute exact path='/studentaccommodation' component={Studentaccom}/>
                <PrivateRoute exact path='/detailpage/:id' component={Detailpage}/>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/register' component={Register}/>
                <Route exact path='/reset' component={Reset}/>
            </Switch>
        </HashRouter>
        </AlertProvider>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
