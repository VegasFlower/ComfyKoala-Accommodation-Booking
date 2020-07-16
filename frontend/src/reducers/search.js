import {
    CLEAR_SUCCESS,
    COMPARE_FAIL,
    COMPARE_SUCCESS,
    GETID_FAIL,
    GETID_SUCCESS,
    SEARCH_FAIL,
    SEARCH_SUCCESS
} from "../actions/type";

const initialState = {
    id:0,
    isCompared:false,
    isSearched:false,
    isGot:false,
    data:[],
    message:""
};

export default function (state = initialState, action) {
    switch(action.type) {
        case SEARCH_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isSearched: true,
            };
        case SEARCH_FAIL:
            return {
                ...state,
                isSearched: false,
            };
        case COMPARE_SUCCESS:
            return {
                ...state,
                message:action.payload.message,
                isCompared: true,
            }
        case COMPARE_FAIL:
            return {
                ...state,
                message: action.payload.message
            }
        case GETID_SUCCESS:
            return {
                ...state,
                isGot:true,
                id:action.payload
            }
        case GETID_FAIL:
            return {
                ...state,
                isGot:false
            }
        case CLEAR_SUCCESS:
            return {
                ...state,
                message:action.payload
            }
        default:
            return state;
    }
}

