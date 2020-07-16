import {
    LOADOWNERINFO_FAIL,
    LOADOWNERINFO_SUCCESS,
    DELETE_FAIL,
    DELETE_SUCCESS,
    DISPLAY_SUCCESS,
    DISPLAY_FAIL,
    LOADSTUDENTINFO_SUCCESS,
    LOADSTUDENTINFO_FAIL,
    CANCELBOOKING_SUCCESS,
    CANCELBOOKING_FAIL,
} from "../actions/type";

const initialState = {
    isDisplay:false,
    isOwnerInfoLoaded:null,
    isDeleted:false,
    isCancel:null,
    properties:[],
    properties_list:[],
    booking_list:[],
    message:''
};

export default function (state = initialState, action) {
    switch(action.type) {
        case LOADOWNERINFO_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isOwnerInfoLoaded: true,
            };
        case LOADSTUDENTINFO_SUCCESS:
            return {
                ...state,
                ...action.payload,
            };
        case LOADSTUDENTINFO_FAIL:
            return {
                ...state,
            };
        case LOADOWNERINFO_FAIL:
            return {
                ...state,
                isOwnerInfoLoaded: false,
            };
        case DELETE_SUCCESS:
            return {
                ...state,
                isDeleted: true,
            };
        case DELETE_FAIL:
            return {
                ...state,
                isDeleted: false,
            };
        case DISPLAY_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isDisplay: true,
        };
        case DISPLAY_FAIL:
            return {
                ...state,
                isDisplay: false,
            };
        case CANCELBOOKING_SUCCESS:
            return {
                ...state,
                isCancel: true,
            }
        case CANCELBOOKING_FAIL:
            return {
                ...state,
                isCancel: false,
            }
        default:
            return state;
    }
}