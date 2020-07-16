import axios from "axios";
import {
    LOADOWNERINFO_SUCCESS,
    LOADOWNERINFO_FAIL,
    DELETE_FAIL,
    DELETE_SUCCESS,
    DISPLAY_FAIL,
    DISPLAY_SUCCESS,
    LOADSTUDENTINFO_SUCCESS,
    LOADSTUDENTINFO_FAIL,
    CANCELBOOKING_SUCCESS,
    CANCELBOOKING_FAIL,
} from "./type";
import { createMessage, returnErrors } from "./message";

export const loadownerinfo = () => (dispatch,getState) =>{
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

    axios.get("/api/property_list", Header)
        .then(res => {
            console.log(res.data);
            if(res.data.code === 200){
                dispatch({
                    type:LOADOWNERINFO_SUCCESS,
                    payload:res.data,
                })
            }else{
                dispatch({
                    type: LOADOWNERINFO_FAIL
                })
            }
        })
        .catch(err => {
            dispatch({
                type: LOADOWNERINFO_FAIL
            })
        });
};


export const deleteinfo = (id) => (dispatch,getState) =>{
    const token = getState().auth.token;
    // const body = JSON.stringify({id});
    // const Header = {
    //     headers: {
    //         "Content-Type": "application/json",
    //     }
    // };
    // If token, add to headers config
    axios.delete("/api/property_info", { data: { id: id }, headers: { "AUTH-TOKEN": token} })
        .then(res => {
            console.log(res.data);
            if(res.data.code === 200){
                dispatch(createMessage({ deletesuccess: res.data.message }));
                dispatch({
                    type:DELETE_SUCCESS,
                    payload:res.data,
                })
            }else{
                dispatch({
                    type: DELETE_FAIL
                })
                dispatch(returnErrors(res.data.message,res.data.code))
            }
        })
        .catch(err => {
            dispatch({
                type: DELETE_FAIL
            })
            dispatch(returnErrors(err.response.data, err.response.status))
        });
};

export const loaddisplayinfo = () => (dispatch) =>{
    axios.get("/api/top_property")
        .then(res => {
            console.log(res.data);
            if(res.data.code === 200){
                dispatch({
                    type:DISPLAY_SUCCESS,
                    payload:res.data,
                })
            }else{
                dispatch({
                    type: DISPLAY_FAIL
                })
            }
        })
        .catch(err => {
            dispatch({
                type: DISPLAY_FAIL
            })
        });
};


export const loadstudentinfo = () => (dispatch,getState) =>{
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

    axios.get("/api/student_history", Header)
        .then(res => {
            console.log(res.data);
            if(res.data.code === 200){
                dispatch({
                    type:LOADSTUDENTINFO_SUCCESS,
                    payload:res.data,
                })
            }else{
                dispatch({
                    type: LOADSTUDENTINFO_FAIL
                })
            }
        })
        .catch(err => {
            dispatch({
                type: LOADSTUDENTINFO_FAIL
            })
        });
};


export const cancelBooking = (id) => (dispatch,getState) =>{
    const token = getState().auth.token;

    axios.delete("/api/booking", { data: { id: id }, headers: { "AUTH-TOKEN": token} })
        .then(res => {
            console.log(res.data);
            if(res.data.code === 200){
                dispatch(createMessage({ cancelsuccess: res.data.message }));
                dispatch({
                    type:CANCELBOOKING_SUCCESS,
                    payload:res.data,
                })
            }else{
                dispatch(returnErrors(res.data.message,res.data.code))
                dispatch({
                    type: CANCELBOOKING_FAIL
                })
            }
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({
                type: CANCELBOOKING_FAIL
            })
        });
};