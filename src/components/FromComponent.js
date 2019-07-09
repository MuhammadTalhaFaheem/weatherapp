import React, {Component} from "react";
import './css/style.css';

class FormComponent extends Component {
  city;
  type;
  formSubmit = () =>{

    this.props.getWeatherApi(this.city,this.type);
    //city = this.
  }
  handleTypeChange=(e)=>{
    this.city = e.target.value;
    /* console.log(this.city); */
    return this.city

  }
  handleCityChange=(e)=>{
    this.type =e.target.value;
    /* console.log(this.type); */
    return this.type
  }
  render(){
    return (
      <div>
        <center>
      <div className="form-container">
        <select className="input-select" name="type" onChange={this.handleTypeChange.bind(this)} required>
          <option value="">Select Type</option>
          <option value="city">City</option>
          <option value="zipcode">ZipCode</option>
        </select>
        <input
          className="input-group"
          type="text"
          name="location"
          placeholder="Enter Value"
          onChange={this.handleCityChange.bind(this)}
          required
        />
        <button className="button-getweather" onClick={this.formSubmit}>Get Weather</button>
      </div>
      </center>
    </div>
    );
  }
  
};
export default FormComponent;
