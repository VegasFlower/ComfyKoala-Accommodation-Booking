import {LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    RESET_SUCCESS,
    RESET_FAIL,
    UPDATEPROFILE_FAIL,
    UPDATEPROFILE_SUCCESS,
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
} from "../actions/type";


const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    isProfileUpdated:null,
    isLogin:null,
    isRegister:null,
    isLoading: false,
    isReset:null,
    user: null,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case USER_LOADED:
            return {
                ...state,
                user:action.payload.info,
                isAuthenticated: true,
                isLoading: false,
            };
        case LOGIN_SUCCESS:
            localStorage.setItem("token", action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLogin:true,
                isRegister:false,
                isLoading: false
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLogin:null,
                isRegister: true,
                isLoading: false
            };
        case RESET_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isAuthenticated: false,
                isLogin:null,
                isReset: true,
                isRegister: null,
                isLoading: false
            };
        case LOGOUT_SUCCESS:
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                user: null,
                isLogin: null,
                isRegister: null,
                isAuthenticated: null,
                isLoading: false
            };
        case LOGIN_FAIL:
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                user: null,
                isLogin: false,
                isRegister: null,
                isAuthenticated: null,
                isLoading: false
            };
        case RESET_FAIL:
            return {
                ...state,
                ...action.payload,
                isAuthenticated: false,
                isLogin:null,
                isReset: false,
                isRegister: null,
                isLoading: false
            };
        case REGISTER_FAIL:
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                user: null,
                isLogin: null,
                isRegister: false,
                isAuthenticated: false,
                isLoading: false
            };
        case UPDATEPROFILE_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isProfileUpdated: true,
            }
        case UPDATEPROFILE_FAIL:
            return {
                ...state,
                ...action.payload,
                isProfileUpdated: false,
            }
        case AUTH_ERROR:
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            };
        default:
            return state;
    }
}