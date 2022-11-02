import {GET_USER,UPDATE_USER,DELETE_USER} from './actionUser';
const initialState={
   isLoggedIn:false,
   username:'',
   email:'',
   profileImage:'',
   user_id:'',
   password:'',
   confirmPassword:'',
   action:'Signup',
    msg:'',
    userDetails:{}
}

const userReducer=(state=initialState, action)=>{

    switch(action.type){
        case GET_USER:return{
            ...state,
            msg:action.payload
        }
        case UPDATE_USER:return{
            ...state,
            msg:action.payload,
            isLoggedIn:action.isLoggedIn
        }
        case DELETE_USER:return{
            ...state,
            userDetails:action.payload,
            isLoggedIn:true
        }
        
        default:return state;
    }
}

export default userReducer;