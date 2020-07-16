import axios from "axios";
import {
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    LOGOUT_SUCCESS,
    RESET_SUCCESS,
    RESET_FAIL,
    UPDATEPROFILE_SUCCESS,
    UPDATEPROFILE_FAIL,
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
} from "../actions/type";
import { createMessage, returnErrors } from "./message";

export const loadUser = () => (dispatch, getState) => {
    const token = getState().auth.token;
    const Header = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    // If token, add to headers config
    if (token) {
        Header.headers["AUTH-TOKEN"] = token;
    }
        // User Loading
        dispatch({ type: USER_LOADING });

        axios.get("/api/user_info", Header)
            .then(res => {
                if(res.data.code === 200){
                    dispatch({
                        type:USER_LOADED,
                        payload:res.data
                    });
                }else{
                    dispatch({
                        type:AUTH_ERROR
                    });
                }
            })
            .catch(err => {
                // dispatch(returnErrors(err.response.data, err.response.status));
                dispatch({
                    type:AUTH_ERROR
                });
            });
    };


export const login = ( username , password ) => dispatch => {
    //Header
    const Header = {
        headers: {
            "Content-Type":"application/json"
        }
    };
    const body = JSON.stringify({username,password});

    axios.post('/api/login',body,Header).then(res =>{
        if(res.data.code === 200){
            dispatch(createMessage({ loginsuccess: res.data.message }));
            dispatch({
                type:LOGIN_SUCCESS,
                payload:res.data
            });
        }else{
            dispatch({
                type:LOGIN_FAIL
            });
            dispatch(returnErrors(res.data.message,res.data.code))
        }
        console.log(res.status);
    }).catch(err =>{
        if(err.status === 404){
            dispatch({
                type:LOGIN_FAIL
            });
            dispatch(returnErrors(err.response.data, err.response.status))
        }
    })
};


export const register = ({username,email,usertype,password}) => dispatch =>{
    //Header
    const Header = {
        headers: {
            "Content-Type":"application/json"
        }
    };
    const body = JSON.stringify({ username, email, usertype, password });
    axios.post('/api/register',body,Header).then(res =>{
        if(res.data.code === 200 ){
            dispatch(createMessage({ regeistersuccess: res.data.message }));
            dispatch({
                type:REGISTER_SUCCESS,
                payload:res.data
            });
        }else{
            dispatch(returnErrors(res.data.message,res.data.code))
            dispatch({
                type:REGISTER_FAIL
            });
        }
    }).catch(err =>{
        if(err.status === 404){
            dispatch(returnErrors(err.message,err.status))
            dispatch({
            type:REGISTER_FAIL
        })
        }
    })

};



export const logout =() => (dispatch,getState) => {
    const token = getState().auth.token;
    const Header = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    // If token, add to headers config
    if (token) {
        Header.headers["AUTH-TOKEN"] = token;
    }
    axios.post("/api/logout", null, Header)
        .then(res => {
            dispatch({
                type: LOGOUT_SUCCESS
            })
        })
        .catch(err => {
            console.log(err.message, err.status)
        });
};



export const Resetpassword = (username,email,password) => dispatch =>{
    const Header = {
        headers: {
            "Content-Type":"application/json"
        }
    };
    const body = JSON.stringify({username,email,password});

    axios.post("/api/find_account", body, Header)
        .then(res => {
            if(res.data.code === 200 ){
                dispatch(createMessage({ resetsuccess: res.data.message }));
                dispatch({
                    type:RESET_SUCCESS,
                    payload:res.data
                });
            }else{
                dispatch({
                    type:RESET_FAIL
                });
                dispatch(returnErrors(res.data.message,res.data.code))
            }
        })
        .catch(err => {
            dispatch(returnErrors(err.message,err.status))
        });

};


export const updateProfile = (email,password) => (dispatch,getState) => {
    const token = getState().auth.token;
    const Header = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    // If token, add to headers config
    if (token) {
        Header.headers["AUTH-TOKEN"] = token;
    }
    const body = JSON.stringify({email,password});

    axios.put("/api/user_info", body, Header)
        .then(res => {
            if(res.data.code === 200 ){
                dispatch(createMessage({ updateprofilesuccess: res.data.message }));
                dispatch({
                    type:UPDATEPROFILE_SUCCESS,
                    payload:res.data
                });
            }else{
                dispatch(returnErrors(res.data.message,res.data.code))
                dispatch({
                    type:UPDATEPROFILE_FAIL
                });
            }
        })
        .catch(err => {
            console.log(err.response.data, err.response.status)
            dispatch(returnErrors(err.message,err.status))
        });
};




