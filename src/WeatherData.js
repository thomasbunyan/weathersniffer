import React, { Component } from 'react';
import DogInterface from './DogInterface/DogInterface.js';
import WeatherBar from './WeatherBar/WeatherBar.js';
import {GeoUpdateWeather, UpdateDay, UpdateHourly10Day} from './WeatherAPI.js';
import Loader from './Loader/Loader.js';


class WeatherData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            today: [],
            hourly: [],
            daysimple: {},
            viewday: 0,
            updates: 0
        };

    }

    callBack(data){
        this.setState(data);
        this.setState(prevState => {
          return {updates: prevState.updates + 1}
        });
        //console.log(this.state.updates);
        //console.log(data);
    }

    componentDidMount(){
        if(this.props.csettings.City != null){
          UpdateDay(this.props.csettings.City, this.callBack.bind(this));
          UpdateHourly10Day(this.props.csettings.City, this.callBack.bind(this));
        } else if(this.props.csettings.GeoEnabled === true) {
          GeoUpdateWeather(this.props.csettings.latitude, this.props.csettings.longitude, this.callBack.bind(this));
        }

    }

    componentWillUpdate(nextProps, nextState){
      if(this.props.csettings.City != null){
        // Settings Changed
        if(nextProps.csettings.City != this.props.csettings.City){
          //this.setState({updates: 0});
          UpdateDay(nextProps.csettings.City, this.callBack.bind(this));
          UpdateHourly10Day(nextProps.csettings.City, this.callBack.bind(this));
          }
      } else if(this.props.csettings.GeoEnabled == true) {
        if(nextProps.csettings.latitude != this.props.csettings.latitude && nextProps.csettings.longitude != this.props.csettings.longitude){
          GeoUpdateWeather(this.props.csettings.latitude, this.props.csettings.longitude, this.callBack.bind(this));
        }
      }
    }

    child(percentage){
        return(
            <div style={{position: "absolute", top: 10, left: 10, backgroundColor: "white"}}>
            {percentage}% scroll
            </div>
        )
    }

    render(){
       console.log(this.state);

        var element = document.getElementById("data");
        if(element){
            var percentage = Math.round(Math.max(0,Math.min(1,-element.getBoundingClientRect().top/(element.clientHeight/2)))*100);
            // console.log(Math.round(percentage));
        }

        if(this.state.updates > 1 && this.state.today.length != 0){
          return (
              <div>
                <div>
                  <div className="doginterface" >
                    <DogInterface weatherInfo={this.state.today} daysimple={this.state.daysimple[this.state.viewday]}/>
                  </div>
                  <div className="weatherbar">
                    <WeatherBar hourly={this.state.hourly[this.state.viewday]} />
                  </div>
                </div>
              </div>
          );
      } else {
        return (
          <Loader />
        );
      }
    }

}

export  default WeatherData;
