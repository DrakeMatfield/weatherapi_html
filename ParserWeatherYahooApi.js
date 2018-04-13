// JScript File
"use strict"

function ParseWeatherYahoo(yahoo_Weather_Object)
{  
var weatherObject = {};

//try
//{
    var title = yahoo_Weather_Object.query.results.channel.item.title;
    var current_date = yahoo_Weather_Object.query.results.channel.lastBuildDate;

    weatherObject = new Weather(title, current_date);

    weatherObject.Create_Location(yahoo_Weather_Object.query.results.channel.location.city, yahoo_Weather_Object.query.results.channel.location.region, yahoo_Weather_Object.query.results.channel.location.country);
    weatherObject.Location.add_ExactLocation(yahoo_Weather_Object.query.results.channel.item.lat, yahoo_Weather_Object.query.results.channel.item.long);
    weatherObject.Create_Astronomy(yahoo_Weather_Object.query.results.channel.astronomy.sunrise, yahoo_Weather_Object.query.results.channel.astronomy.sunset);
    weatherObject.Create_Wind(yahoo_Weather_Object.query.results.channel.wind.chill, yahoo_Weather_Object.query.results.channel.wind.direction, yahoo_Weather_Object.query.results.channel.wind.speed);
    weatherObject.Create_Units(yahoo_Weather_Object.query.results.channel.units.distance, yahoo_Weather_Object.query.results.channel.units.pressure, yahoo_Weather_Object.query.results.channel.units.speed, yahoo_Weather_Object.query.results.channel.units.temperature);
    weatherObject.Create_HIGH_LOW(yahoo_Weather_Object.query.results.channel.item.forecast[0].high, yahoo_Weather_Object.query.results.channel.item.forecast[0].low);
    weatherObject.Create_Condition(yahoo_Weather_Object.query.results.channel.item.condition.temp, yahoo_Weather_Object.query.results.channel.item.condition.text, parse_picture(yahoo_Weather_Object.query.results.channel.item.description, yahoo_Weather_Object.query.results.channel.item.condition.text));
    weatherObject.Card_Pic = picture_card;
    
    weatherObject.Create_Atmoshphere(yahoo_Weather_Object.query.results.channel.atmosphere.humidity, yahoo_Weather_Object.query.results.channel.atmosphere.pressure, yahoo_Weather_Object.query.results.channel.atmosphere.rising, yahoo_Weather_Object.query.results.channel.atmosphere.visibility);
    weatherObject.Description_HTML = remove_CDATA(yahoo_Weather_Object.query.results.channel.item.description);
    
    // Tag
    weatherObject.Tag = [yahoo_Weather_Object.query.results.channel.image.url, yahoo_Weather_Object.query.results.channel.image.link];
    
    weatherObject.Forecasts = [];
    weatherObject.Forecasts.push(yahoo_Weather_Object.query.results.channel.item.forecast.map(create_forecast));
//}
//catch (err)
//{
//    console.error(err.message);
//}

return weatherObject;
}

// The way to implement the array.
//this. days = [];
//days.push(forecasts.map(create_forecast));
//console.dir(days);

function create_forecast(currentValue, index, arr){
    
    var day = new Weather_Forecast();
   
    day.date = currentValue.date;
    day.day = currentValue.day;
    day.high= currentValue.high;
    day.low = currentValue.low;
    day.text = currentValue.text;
   
    return day;
}

function remove_CDATA(str) {
  str = str.replace("<![CDATA[", "");
  str = str.replace("]]>", "");
  return str;
}

var picture_card;
function parse_picture(description_PARSE, current_Condition_text) {
    
  description_PARSE = remove_CDATA(description_PARSE);

  var start;
  var end;
  var res;

  if (description_PARSE.startsWith('<img')) {
    start = 0;
    end = description_PARSE.indexOf('>');
    res = description_PARSE.substring(start, end + 1);

    res = res.replace("<img ", "<img id=\"id_condition_pic\" class=\"imgcondition\"");
    
    var img_tag = res.toString();
    picture_card = "<div id=\"id_condition_fig\" class=\"fig\">" +
        img_tag + "<p><span>" + current_Condition_text + "</span></p></div>";
  }
  else {
    res = "Couldn't find the picture.";
    console.log(res);
  }

  return res;
}