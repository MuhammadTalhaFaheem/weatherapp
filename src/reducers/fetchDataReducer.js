import { API_SUCCESS, API_FAILURE,INITIAL_REQUEST } from "../constants";

const initialState = {
  data : {},
  isLoading : false
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type){
    case INITIAL_REQUEST :
      return {
        ...state, isLoading: true
      }
    case API_FAILURE :
      return {
        ...state, isLoading : false
      }
    case API_SUCCESS :
      return {
        ...state, weather : action.payload
      }
    default :
      return state      
  }
} 

export default weatherReducer;