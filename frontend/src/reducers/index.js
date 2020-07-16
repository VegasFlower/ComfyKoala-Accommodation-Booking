import { combineReducers } from "redux";
import auth from "./auth";
import upload from "./upload"
import display from './display'
import search from "./search";
import show from "./show"
import error from "./error";
import message from "./message";

export default combineReducers({
    auth,
    upload,
    display,
    search,
    show,
    error,
    message
});