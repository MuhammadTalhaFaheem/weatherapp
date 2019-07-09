import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as R from 'ramda';
import { getWeatherApi } from '../actions'
import WeatherComponent from "../components/WeatherComponent";
import FormComponent from '../components/FromComponent';


const WeatherDataContainer = (props) => {

  const apiDataAccess =(type,city) =>{
    props.getWeatherApi(type,city)
  }
  if (R.equals(props.weatherReducer.isLoading, false)) {
    return (
      <div>
        <FormComponent getWeatherApi = {apiDataAccess} />
      </div>
    );
  }
  else if (R.equals(props.weatherReducer.isLoading, true) && R.equals(props.weatherReducer.weather, undefined)) {
    return (
      <div>
        <div> Hello Loading </div>
      </div>
    );
  }
  const dd = props.weatherReducer.weather;
  const { city,list } = dd;

  return (
    <div>
      <FormComponent getWeatherApi = {apiDataAccess} />
      <WeatherComponent city = {city} dataList = {list} />
    </div>
  );
}
function mapStateToProps(store) {
  return {
    weatherReducer: store.weatherReducer
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getWeatherApi: getWeatherApi
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(WeatherDataContainer)