import React, {Component} from 'react'
import './css/style.css';
import * as R from 'ramda';
import ReactHighcharts from "react-highcharts";
class WeatherComponent extends Component{
  constructor(){
    super();
    this.state = {
      index : 0,
      degree : 'c'
    }
  }
  WeatherDateConversion =(dateString)=> {
    
    var cnvtDate = dateString.split(" ");
    return cnvtDate;
  }
  getDaysArray =(fullDate) => {
    let splitDate = fullDate.split("-");
    let year = splitDate[0];
    let month = splitDate[1];
    let daySet = splitDate[2];
    var numDaysInMonth, daysInWeek, daysIndex, index, i, l, daysArray;
    var date = new Date();
    numDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    daysIndex = { 'Sun': 0, 'Mon': 1, 'Tue': 2, 'Wed': 3, 'Thu': 4, 'Fri': 5, 'Sat': 6 };
    index = daysIndex[(new Date(year, month - 1, 1)).toString().split(' ')[0]];
    daysArray = [];
  
    for (i = 0, l = numDaysInMonth[month - 1]; i < l; i++) {
      daysArray.push(daysInWeek[index++]);
      if (index == 7) index = 0;
    }
    /* console.log(date.getDate()); */
    let myDay = daysArray[daySet - 1];
  
    return myDay;
  }
  changeTemperatureDegree = (temperatureDegree) =>{
    if(R.equals(temperatureDegree,'c')){
      this.setState({
        degree : 'c'
      })
    }
    else if(R.equals(temperatureDegree,'f')){
      this.setState({
        degree : 'f'
      })
    }
  }
  todayWeather = () =>{
    let minTemperatureDegree;
    let mixTemperatureDegree;
    /* getDaysArray() */
      let dateNow = this.WeatherDateConversion( this.props.dataList[0].dt_txt );
      let dayIndex = this.getDaysArray(dateNow[0]);
      minTemperatureDegree = R.equals(this.state.degree,'c')? Math.floor(this.props.dataList[0].main.temp_min) :Math.round(this.props.dataList[0].main.temp_min * 9 / 5 + 32) ;
      mixTemperatureDegree = R.equals(this.state.degree,'c')? Math.floor(this.props.dataList[0].main.temp_max) :Math.round(this.props.dataList[0].main.temp_max * 9 / 5 + 32) ;
      return (
          <div key ={0}  onClick={this.flexIndexData.bind(this,0)}>
            <p>{dayIndex.substr(0,3)}</p>
            <img src={`http://openweathermap.org/img/w/${this.props.dataList[0].weather[0].icon}.png`} alt=""></img>
            <p> { minTemperatureDegree}° {mixTemperatureDegree}°</p>
          </div>
      );
  }
  flexIndexData =(i)=>{
    console.log("I : -", i)
    this.setState({
      index : i
    })
  }
  fullWeekWeather = () =>{     
    return this.props.dataList.map((item , index) =>{
      let minTemperatureDegree;
      let mixTemperatureDegree;
      let dateNow = this.WeatherDateConversion( item.dt_txt );
      let dayIndex = this.getDaysArray(dateNow[0]);  
      if(R.equals(dateNow[1],"03:00:00"))
      {
   
       minTemperatureDegree = R.equals(this.state.degree,'c')? Math.floor(item.main.temp_min) :Math.round(item.main.temp_min * 9 / 5 + 32) ;
       mixTemperatureDegree = R.equals(this.state.degree,'c')? Math.floor(item.main.temp_max) :Math.round(item.main.temp_max * 9 / 5 + 32) ;
        return (
            <div key={index} onClick={this.flexIndexData.bind(this,index)}>
              <p>{dayIndex.substr(0,3)}</p>
              <img src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`} alt=""></img>
              <p> { minTemperatureDegree }° { mixTemperatureDegree }°</p>
            </div>
        );
      }
    })
  }
  render(){
    let data = [];
    let category = [];

    let dateNow = this.WeatherDateConversion( this.props.dataList[this.state.index].dt_txt );
    
    this.props.dataList.map((item,index) => {
      let filterDate = this.WeatherDateConversion( item.dt_txt );
      let TemperatureMain;
      if(R.equals(filterDate[0],dateNow[0]))
      {
        TemperatureMain = R.equals(this.state.degree,'c')?Math.floor(item.main.temp) :Math.round(Math.floor(item.main.temp) * 9 / 5 + 32) ;
        data.push(TemperatureMain);
        category.push(filterDate[1]);
      }
    })
    


    const config = {
      chart: {
        type: 'line',
        
        height: 170
      },
      title: {
        text: ''
      },
      subtitle: {
        text: ''
      },
      xAxis: {
        title: {
          text: ''
        },
        categories: category
      },
      yAxis: {
        title: {
          text: ''
        }
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: true
          },
          enableMouseTracking: false
        }
      },
      series: [{
        title: {
          text: ''
        },
        name: '',
        data: data
      }, ]
    };
    let dateBy = this.WeatherDateConversion( this.props.dataList[0].dt_txt );
    let dayIndex = this.getDaysArray(dateBy[0]);
    let TemperatureMain;
    TemperatureMain = R.equals(this.state.degree,'c')?Math.floor(this.props.dataList[this.state.index].main.temp) :Math.round(Math.floor(this.props.dataList[this.state.index].main.temp) * 9 / 5 + 32) ;
    return(
      
      <div className="main-component" >
        
        <div className="weather-detail-div" >
          <div className="inner-div-text">
            <h2 id="city">{this.props.city.name}</h2>
            <p id="day-time">{dayIndex} {dateNow[1]}</p>
            <p id="atmosphere">{this.props.dataList[this.state.index].weather[0].main}</p>
          </div>
        </div>

        <div className="weather-temperature-div">
          <div className="inner-div">
            <div className="inner-div-left">
              <img src={`http://openweathermap.org/img/w/${this.props.dataList[this.state.index].weather[0].icon}.png`} alt=""/>
              <span className="inner-div-left-text">{TemperatureMain}</span> <span><sup><span className="degree-span" onClick={this.changeTemperatureDegree.bind(this,'c')}>&#8451;</span> | <span className="degree-span" onClick={this.changeTemperatureDegree.bind(this,'f')}>&#8457;</span></sup></span>  
               
            </div>
            <div className="inner-div-right">
              <p>Precipitation: 38%</p>
              <p>Humidity: {this.props.dataList[this.state.index].main.humidity}%</p>
              <p>Wind: {this.props.dataList[this.state.index].wind.speed} km/h</p>
              <button className="button-temperature">Temperature</button>
              <button className="button-temperature">Precipitation</button>
              <button className="button-temperature">Wind</button>
            </div>
          </div>
        </div>

        <div className="weather-graph-div">
        <ReactHighcharts config={config} />
        </div>

        <div className="weather-flex-div">
          <div  className="weather-flex" >
            {this.todayWeather()}
            {this.fullWeekWeather()}
          </div>
          
        </div>
      </div>
    );
  }
}
export default WeatherComponent