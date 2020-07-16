import axios from "axios";
import {
    SHOWINFO_FAIL, SHOWINFO_SUCCESS, UPDATECOMMENT_FAIL, UPDATECOMMENT_SUCCESS, BOOK_FAIL,
    BOOK_SUCCESS,
    REQUEST_FAIL,
    REQUEST_SUCCESS, ACCEPT_SUCCESS, ACCEPT_FAIL, REJECT_FAIL, REJECT_SUCCESS
} from "./type";
import { createMessage, returnErrors } from "./message";

export const showPropertyInfo = (id)=> (dispatch,getState) => {
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
    // const body = JSON.stringify({id});
    axios.get(`/api/detailed_property/${id}`, Header)
        .then(res => {
            console.log(res.data);
            if(res.data.code === 200){
                dispatch({
                    type:SHOWINFO_SUCCESS,
                    payload:res.data,
                })
            }else{
                dispatch({
                    type: SHOWINFO_FAIL
                })
            }
        })
        .catch(err => {
            dispatch({
                type: SHOWINFO_FAIL
            })
        });

};


export const updateComment = (id,comment,rate)=> (dispatch,getState) => {
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
    const body = JSON.stringify({id,comment,rate});

    axios.post("/api/comment",body, Header)
        .then(res => {
            console.log(res.data);
            if(res.data.code === 200){
                dispatch(createMessage({ commentsuccess: res.data.message }));
                dispatch({
                    type:UPDATECOMMENT_SUCCESS,
                    payload:res.data,
                })
            }else{
                dispatch({
                    type: UPDATECOMMENT_FAIL
                })
                dispatch(returnErrors(res.data.message,res.data.code))
            }
        })
        .catch(err => {
            dispatch({
                type: SHOWINFO_FAIL
            })
            dispatch(returnErrors(err.response.data, err.response.status))
        });

}


export const BookProperty = (property_id)=> (dispatch,getState) => {
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
    const body = JSON.stringify({property_id});

    axios.post("/api/booking",body, Header)
        .then(res => {
            console.log(res.data);
            if(res.data.code === 200){
                dispatch(createMessage({ booksuccess: res.data.message }));
                dispatch({
                    type:BOOK_SUCCESS,
                    payload:res.data,
                })
            }else{
                dispatch({
                    type: BOOK_FAIL
                })
                dispatch(returnErrors(res.data.message,res.data.code))
            }
        })
        .catch(err => {
            dispatch({
                type: BOOK_FAIL
            })
            dispatch(returnErrors(err.response.data, err.response.status))
        });

}


//alternative option:

// export const BookProperty = (customer_id,property_id)=> (dispatch) => {
//     // const token = getState().auth.token;
//     const Header = {
//         headers: {
//             "Content-Type": "application/json"
//         }
//     };
//     // If token, add to headers config
//     // if (token) {
//     //     Header.headers["AUTH-TOKEN"] = token;
//     // }
//     const body = JSON.stringify({customer_id,property_id});
//
//     axios.post("/api/booking",body, Header)
//         .then(res => {
//             console.log(res.data);
//             if(res.data.code === 200){
//                 dispatch(createMessage({ booksuccess: res.data.message }));
//                 dispatch({
//                     type:BOOK_SUCCESS,
//                     payload:res.data,
//                 })
//             }else{
//                 dispatch({
//                     type: BOOK_FAIL
//                 })
//                 dispatch(returnErrors(res.data.message,res.data.code))
//             }
//         })
//         .catch(err => {
//             dispatch({
//                 type: BOOK_FAIL
//             })
//             dispatch(returnErrors(err.response.data, err.response.status))
//         });
//
// }


export const RequestBookingInfo = () =>(dispatch,getState)=>{
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
    axios.get("/api/approve", Header)
        .then(res => {
            console.log(res.data);
            if(res.data.code === 200){
                dispatch({
                    type:REQUEST_SUCCESS,
                    payload:res.data,
                })
            }else{
                dispatch({
                    type: REQUEST_FAIL
                })
            }
        })
        .catch(err => {
            dispatch({
                type: REQUEST_FAIL
            })
        });


}



export const acceptBook = (user_id,property_id,action)=>(dispatch,getState)=>{
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
    const body = JSON.stringify({user_id,property_id,action});
    axios.post("/api/approve",body, Header)
        .then(res => {
            console.log(res.data);
            if(res.data.code === 200){
                dispatch(createMessage({ approvesuccess: res.data.message }));
                dispatch({
                    type:ACCEPT_SUCCESS,
                    payload:res.data
                })
            }else{
                dispatch({
                    type: ACCEPT_FAIL
                })
                dispatch(returnErrors(res.data.message,res.data.code))
            }
        })
        .catch(err => {
            dispatch({
                type: ACCEPT_FAIL
            })
            dispatch(returnErrors(err.response.data, err.response.status))
        });
};




export const rejectBook = (user_id,property_id,action) =>(dispatch,getState)=>{
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
    const body = JSON.stringify({user_id,property_id,action});
    axios.post("/api/approve",body, Header)
        .then(res => {
            console.log(res.data);
            if(res.data.code === 200){
                dispatch(createMessage({ rejectsuccess: "reject booking success" }));
                dispatch({
                    type:REJECT_SUCCESS,
                    payload:res.data
                })
            }else{
                dispatch({
                    type: REJECT_FAIL
                })
                dispatch(returnErrors(res.data.message,res.data.code))
            }
        })
        .catch(err => {
            dispatch({
                type: ACCEPT_FAIL
            })
            dispatch(returnErrors(err.response.data, err.response.status))
        });
}


// export const requestBook = (user_id,user_name,address,property_id)=>(dispatch)=>{
//     dispatch({
//         type:REQUEST_SUCCESS,
//         payload:{user_id,user_name,address,property_id}
//     })
//     dispatch(createMessage({ requestsuccess: "request booking success" }));
// }
//
//
// export const rejectBook = () =>(dispatch)=>{
//     dispatch({
//         type:REQUEST_FAIL,
//     })
//     dispatch(createMessage({ rejectsuccess: "reject booking success" }));
// }