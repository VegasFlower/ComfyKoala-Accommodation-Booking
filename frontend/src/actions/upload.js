import axios from "axios";
import {
    GETUPDATEID_SUCCESS,
    GETUPDATEID_FAIL,
    UPLOAD_FAIL,
    UPLOAD_SUCCESS,
    UPDATEPROPERTY_SUCCESS,
    UPDATEPROPERTY_FAIL
} from "./type";
import { createMessage, returnErrors } from "./message";

export const upload = ({description,
                           pet_allow,
                           parking,
                           feature,
                           start_date,
                           address,
                           category,
                           price,
                           bond,
                           least_period}) => (dispatch,getState) => {
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

    const body = JSON.stringify({description,
        pet_allow,
        parking,
        feature,
        start_date,
        address,
        category,
        price,
        bond,
        least_period });

    axios.post("/api/property_info", body, Header)
        .then(res => {
            console.log(res.data);
            if(res.data.code === 200){
                dispatch(createMessage({ uploadsuccess: res.data.message }));
                dispatch({
                    type: UPLOAD_SUCCESS,
                    payload:res.data
                })
            }else{
                dispatch({
                    type: UPLOAD_FAIL
                })
                dispatch(returnErrors(res.data.message,res.data.code))
            }
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
        });
};



export const updateProperty = ({id, description,
                                     pet_allow,
                                     parking,
                                     feature,
                                     start_date,
                                     address,
                                     category,
                                     price,
                                     bond,
                                     least_period}) => (dispatch,getState) => {
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

    const body = JSON.stringify({
        id,
        description,
        pet_allow,
        parking,
        feature,
        start_date,
        address,
        category,
        price,
        bond,
        least_period });

    axios.put("/api/property_info", body, Header)
        .then(res => {
            console.log(res.data);
            if(res.data.code === 200){
                dispatch(createMessage({ updatepropertysuccess: res.data.message }));
                dispatch({
                    type: UPDATEPROPERTY_SUCCESS,
                    payload:res.data
                })
            }else{
                dispatch({
                    type: UPDATEPROPERTY_FAIL
                })
                dispatch(returnErrors(res.data.message,res.data.code))
            }
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
        });


}

export const getUpdatePropertyId =(id,index)=> (dispatch) =>{
    if(id){
        dispatch({
            type:GETUPDATEID_SUCCESS,
            payload:{id,index}
        })
    }else{
        dispatch({
            type:GETUPDATEID_FAIL,
        })
    }
};

