export default (state,action) => {
    switch(action.type){
        case "GET_USER":
            return{
                ...state,
                isLoading: false,
                userDetails: action.payload
            }
                     
        case "USER_ERROR":
            return{
                ...state,
                error: action.payload,
                isauthenticated:action.auth
            }  
            case "ADD_USER_ERROR":
                return{
                    ...state,
                    error: action.payload,
                    registrationSuccess:action.auth
                }        
         case "VALID_TOKEN":
                return{
                    ...state,
                    currentUser: action.payload,
                    // isauthenticated:action.auth
                }        
        
         case "ADD_USER":
            return{
                ...state,
                userDetails:[...state.userDetails,action.payload],
                registrationSuccess:action.auth,
                error:''
            } 
        
        case "USER_LOGIN":
            return{
                ...state,
                Token:action.tokenload,
                error:'',
                isauthenticated:action.auth
           } 
        
        case "USER_LOGOUT":
            return{
                ...state,
                curentUser:[],
               isauthenticated:action.auth
            }        
        default:
            return state;
    }
}