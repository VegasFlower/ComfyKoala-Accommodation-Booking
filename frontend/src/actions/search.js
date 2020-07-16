import axios from "axios";
import {
    GETID_SUCCESS,
    SEARCH_FAIL,
    SEARCH_SUCCESS,
    GETID_FAIL,
    SHOWINFO_SUCCESS,
    SHOWINFO_FAIL,
    COMPARE_SUCCESS,
    COMPARE_FAIL, CLEAR_SUCCESS
} from "./type";
import { createMessage, returnErrors } from "./message";


export const searchInfo = ( suburb,order ) => (dispatch,getState) =>{
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

    const body = JSON.stringify({ suburb,order });

    console.log(body)

    axios.post("/api/search", body,Header)
        .then(res => {
            console.log(res.data);
            if(res.data.code === 200){
                dispatch({
                    type:SEARCH_SUCCESS,
                    payload:res.data,
                })
            }else{
                dispatch({
                    type: SEARCH_FAIL
                })
            }
        })
        .catch(err => {
            dispatch({
                type: SEARCH_FAIL
            })
        });
};

export const comparePrice = (category) => (dispatch) =>{
    const Header = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    // If token, add to headers config
    const body = JSON.stringify({ category });


    axios.post("/api/compare_price", body,Header)
        .then(res => {
            console.log(res.data);
            if(res.data.code === 200){
                dispatch({
                    type:COMPARE_SUCCESS,
                    payload:res.data,
                });
                return res.data.message
            }else{
                dispatch({
                    type: COMPARE_FAIL
                })
            }
        })
        .catch(err => {
            dispatch({
                type: COMPARE_FAIL
            })
        });
};




export const getPropertyId =(id)=> (dispatch) =>{
    if(id){
        dispatch({
            type:GETID_SUCCESS,
            payload:id
        })
    }else{
        dispatch({
            type:GETID_FAIL,
        })
    }
};


export const clearMessage =() => (dispatch)=>{
    dispatch({
        type:CLEAR_SUCCESS,
        payload:''
    })
}