import React, { Component } from 'react';
import DogInterface from './DogInterface/DogInterface.js'
import WeatherBar from './WeatherBar/WeatherBar.js'
import Settings from './Settings/Settings.js'
import './App.css';

class App extends Component {
    render() {

        // Some data that will update the GUI, right now just for testing.
        // WeaterInfo corrosponds to the top-center weather display.
        // FiveHour and fiveday info corrosponds to the weather bar at the bottom.
        let weatherInfo = {city: "London", temp: 18, wind: 100, pol: "High", weather: "snow"};
        let fiveHourInfo = [
            {time: "+1", weather: "sunny", temp: 0},
            {time: "+2", weather: "sunny", temp: 0},
            {time: "+3", weather: "cloud", temp: 0},
            {time: "+4", weather: "snow", temp: 0},
            {time: "+5", weather: "snow", temp: 0}
        ];
        let fiveDayInfo = [
            {day: "+1", weather: "sunny", tHigh: 0, tAvg:0, tLow:0},
            {day: "+2", weather: "sunny", tHigh: 0, tAvg:0, tLow:0},
            {day: "+3", weather: "sunny", tHigh: 0, tAvg:0, tLow:0},
            {day: "+4", weather: "sunny", tHigh: 0, tAvg:0, tLow:0},
            {day: "+5", weather: "sunny", tHigh: 0, tAvg:0, tLow:0}
        ];

        return (
            <div className="App">
                <div className="doginterface">
                    <DogInterface weatherInfo={weatherInfo}/>
                </div>
                <div className="weatherbar">
                    <WeatherBar fiveHourInfo={fiveHourInfo}/>
                </div>
                <div className="settings">
                    <Settings/>
                </div>
            </div>
            );
        }
    }

    export default App;
