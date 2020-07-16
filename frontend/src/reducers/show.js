import {
    SHOWINFO_FAIL,
    SHOWINFO_SUCCESS,
    UPDATECOMMENT_SUCCESS,
    UPDATECOMMENT_FAIL,
    BOOK_SUCCESS,
    BOOK_FAIL, REQUEST_SUCCESS, REQUEST_FAIL, ACCEPT_SUCCESS, REJECT_SUCCESS, REJECT_FAIL
} from "../actions/type";

// let number = 0;
// let requester = [];

const initialState = {
    id:0,
    number:0,
    requester:[],
    isShowed:false,
    isCommentUpdated:false,
    isBooked:false,
    property:[],
    message:'',
};

export default function (state = initialState, action) {
    switch(action.type) {
        case SHOWINFO_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isShowed:true
            };
        case SHOWINFO_FAIL:
            return {
                ...state,
                isShowed:false
            };
        case UPDATECOMMENT_SUCCESS:
            return {
                ...state,
                isCommentUpdated: true,
            }
        case UPDATECOMMENT_FAIL:
            return {
                ...state,
                isCommentUpdated: false
            }
        case BOOK_SUCCESS:
            // number -= 1;
            // requester.splice(-1,1);
            return {
                ...state,
                message:action.payload.message,
                isBooked:true,
                // requester: requester,
                // number: number,
            }
        case BOOK_FAIL:
            return {
                ...state,
                isBooked:false
            }
        case REQUEST_SUCCESS:
            // number += 1;
            // requester.push(action.payload);
            return {
                ...state,
                number:action.payload.number,
                requester: action.payload.data
            }
        case REQUEST_FAIL:
            // number -= 1;
            // requester.splice(-1,1);
            return {
                ...state,
                ...action.payload
            }
        case REJECT_SUCCESS:
        case REJECT_FAIL:
        case REJECT_SUCCESS:
        case ACCEPT_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}
