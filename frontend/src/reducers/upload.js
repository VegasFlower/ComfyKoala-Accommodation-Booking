import {
    UPLOAD_SUCCESS,
    UPLOAD_FAIL,
    GETUPDATEID_FAIL,
    GETUPDATEID_SUCCESS,
    UPDATEPROPERTY_SUCCESS,
    UPDATEPROPERTY_FAIL
} from "../actions/type";


const initialState = {
    id:0,
    arrayIndex:0,
    isGetUpdate:false,
    isPropertyUpdated:false,
    isUpload:null,
    property:null,
};

export default function (state = initialState, action) {
    switch(action.type) {
        case UPLOAD_SUCCESS:
            return{
                ...state,
                ...action.payload,
                isUpload:true,
            };
        case UPLOAD_FAIL:
            return{
                ...state,
                isUpload: false
            };
        case GETUPDATEID_SUCCESS:
            return{
                ...state,
                id:action.payload,
                isGetUpdate: true,
            }
        case GETUPDATEID_FAIL:
            return{
                ...state,
                id:action.payload.id,
                arrayIndex: action.payload.index,
                isGetUpdate: false,
            }
        case UPDATEPROPERTY_SUCCESS:{
            return {
                ...state,
                ...action.payload,
                isPropertyUpdated:true,
            }
        }
        case UPDATEPROPERTY_FAIL:{
            return {
                ...state,
                ...action.payload,
                isPropertyUpdated:false,
            }
        }
        default:
            return state;
    }
}