import {API_FAILURE, INITIAL_REQUEST,API_SUCCESS} from '../constants';

const getFailure = (error)=>{
  return{
    type: API_FAILURE,
    payload: error
  }
}
const getSuccess = (data) =>{
  return{
    type : API_SUCCESS,
    payload: data
  }
}
const initialRequest = ()=> {
  return{
    type : INITIAL_REQUEST
  }
}

export const getWeatherApi = (type,city) =>{
  return async (dispatch)=>{

    dispatch(initialRequest())

    let key = "c73aa228bfba692462f96e89080aa39a";
    let url = type ==="city" ?
    `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${key}` :
    `http://api.openweathermap.org/data/2.5/forecast?zip=${city},uk&appid=${key}&units=metric`;
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        dispatch( getSuccess(data) )
      })
      .catch(err =>{
        console.log(err);
        dispatch(getFailure(err))
      })
  }
}