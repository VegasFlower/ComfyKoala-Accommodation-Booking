import React,{ Component,Fragment } from 'react';
import logo from '../logo.svg';
import Header from "./common/header";
import Searchsection from "./common/Searchsection";
import Extendsection from "./common/Extendsection";
import Slidersetion from  "./common/slidersetion";
import Chatbot from "./common/chatbot";
import Alert from "./Alert/alert";
import {connect} from 'react-redux';
import {HashRouter,Route,Switch} from 'react-router-dom';
import {loadUser} from "../actions/auth";


class App extends Component {

  render() {
    return(
        <Fragment>
            {/*<Alert />*/}
            <Header />
            <Slidersetion />
            <Searchsection />
            <Extendsection />
            <Chatbot />
        </Fragment>
    );
  }
}


export default App;

