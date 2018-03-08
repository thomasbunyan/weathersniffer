
export function UpdateHourly10Day(type, sdata, callBack){

  let dataurl = '';
  if(type === 'WUID'){
    dataurl = 'http://13.72.104.16/apicache.php?url=http://api.wunderground.com/api/d36721c0718840e5/hourly10day/q/zmw:'+sdata.wuid+'.json';
  } else if(type === 'GEO'){
    dataurl = 'http://13.72.104.16/apicache.php?url=http://api.wunderground.com/api/d36721c0718840e5/hourly10day/q/'+sdata.latitude+','+sdata.longitude+'.json';
  } else {
    console.log('Incorrect type supplied')
    return;
  }

  let datam = {0 : [], 1 : [], 2 : [], 3 : [], 4 : [], 5 : [], 6 : [], 7 : [], 8 : [], 9 : [], 10 : []};
  var currentdate = new Date();
    fetch(dataurl)
    .then(results => {
        return results.json();
    }).then( data => {
        let weatherdata = data.hourly_forecast.map(function(item, i){
            return(
                {
                  debug: item.FCTTIME.pretty,
                  time: item.FCTTIME.civil,
                  weather: item.condition,
                  temp: parseInt(item.temp.metric),
                  wind: parseInt(item.wspd.metric),
                  feelslike: item.feelslike
                }
            )
        })
        let daycount = 0;
        for (let i = 0; i < weatherdata.length; i++) {

          if(weatherdata[i].time == "12:00 AM"){
            daycount++;
          }

          if(daycount != 0){
            if(i % 2 == 0){
              datam[daycount].push(weatherdata[i]);
            }

          } else {
            //console.log(currentdate.getHours());
            if(currentdate.getHours() >= 0 && currentdate.getHours() <= 5){
              if(i % 2 == 0){
                datam[daycount].push(weatherdata[i]);
              }
            } else {
            datam[daycount].push(weatherdata[i]);
            }
          }
        }

        if(datam[0].length < 12){
          for(let i=0; i<= (datam[daycount].length - 5); i++){
            datam[0].push(datam[1][i]);
          }
        }

        let today = datam[0].splice(0,1)[0];
        //console.log(data);
        today.city = sdata.wuname;
        today.pol = 'High';
        callBack({today: today, hourly : datam});
    });
  return true;
}

export function UpdateDay(type, sdata, callBack){
  let dataurl = '';
  if(type === 'WUID'){
    dataurl = 'http://13.72.104.16/apicache.php?url=http://api.wunderground.com/api/d36721c0718840e5/forecast10day/q/zmw:'+sdata.wuid+'.json';
  } else if(type === 'GEO'){
    dataurl = 'http://13.72.104.16/apicache.php?url=http://api.wunderground.com/api/d36721c0718840e5/forecast10day/q/'+sdata.latitude+','+sdata.longitude+'.json';
  } else {
    console.log('Incorrect type supplied')
    return;
  }

  var datam = {};
    fetch(dataurl)
    .then(forecast => {
        return forecast.json();
    }).then( data => {
        let weatherdata = data.forecast.simpleforecast.forecastday.map(function(item, i){
            return(
                {
                    weather: item.conditions,
                    tHigh: parseInt(item.high.celsius),
                    tLow: parseInt(item.low.celsius)
                }
            )
        })
        callBack({daysimple: weatherdata});
    });
  return datam;
}

export function GeoUpdateWeather(latitude, longitude, callBack){
  var datam = {};
  var fetchurl = 'http://13.72.104.16/apicache.php?url=https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key=AIzaSyCNxJtlpcNknGc-T_vEvkVWT_kCqdd0x9Y';
    fetch(fetchurl)
    .then(results => {
        return results.json();
    }).then( data => {
        let geodata = data.results[0].address_components.map(function(item, i){
            return(
                {
                    name: item.long_name,
                }
            )
        })
        if(geodata[2].name != null){
          UpdateDay(geodata[2].name, callBack);
          UpdateHourly10Day(geodata[2].name, callBack);
        }
        //console.log(geodata[0].name);
        //callBack({daysimple: weatherdata});
    });
  return true;
}
