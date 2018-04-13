// JScript File
"use strict"

// The way to implement the array.
//this. days = [];
//days.push(forecasts.map(create_forecast));
//console.dir(days);
function Weather_Forecast() {
  this.date = {};
  this.day = {};
  this.high = {};
  this.low = {};
  this.text = {}
}

function Weather_Condition(temperature, text, pic) {
  this.Temperature = temperature;
  this.Description_Text = text;
  this.Description_Pic = pic;
}
// current wind
function Wind(chill, direction, speed) {
  this.Chill = chill;
  this.Direction = direction;
  this.Speed = speed;
}

// units of measurement in used in local area
function Units(distance, pressure, speed, temperature) {
  this.Distance_units = distance;
  this.Pressure_units = pressure;
  this.Speed_units = speed;
  this.Temperature_units = get_temperature_unit(temperature);
}

function get_temperature_unit(units_used) {
  var temp_unit;
  if (units_used === 'F') {
    temp_unit = "&#8457";
  }
  else {
    temp_unit = units_used;
  }
  return temp_unit;
}

// Exaction Location
function ExactLocation(latitude, longitude) {
  this.Latitude = latitude;
  this.Longitude = longitude;
}

// Location Object
function Location(city, region, country) {
  this.City = city;
  this.Region = region;
  this.Country = country;
  this.ExactLocation = {};
}

Location.prototype.add_ExactLocation = function(latitude, longitude) {
  this.ExactLocation = new ExactLocation(latitude, longitude);
}

Location.prototype.get_Location = function() {
  var str = "#CITY, #REGION #COUNTRY";
  str = str.replace("#CITY", this.City);
  str = str.replace("#REGION", this.Region);
  str = str.replace("#COUNTRY", this.Country);

  return str;
}

function Weather(title, ISO_DateFormat) {

  this.Current_Date_Time = new Date_Time(ISO_DateFormat);
  this.Forecasts = {};
  this.Card_Pic = {};
  // Location
  this.Location = {};
  // units of measurement in local area
  this.Units = {};
  // astronomy
  this.Sunrise = {};
  this.Sunset = {};
  this.Wind = {};

  // atmoshphere
  this.Humidity = {};
  this.Pressure = {};
  this.Rising = {};
  this.Visibility = {};
  this.Forecasted_HIGH = {};
  this.Forecasted_LOW = {};

  // title
  this.Title = title;

  // Current Conditions 
  this.Condition = {};

  // description (Summary)
  // speacial attention
  this.Description = "";
  this.Description_HTML = "";
  this.Forecasts = [typeof(Weather_Forecast)];

  // Tag
  this.Tag = {};

}

Weather.prototype.Create_Location = function(city, region, country) {
  this.Location = new Location(city, region, country);
}

Weather.prototype.Create_Condition = function(temperature, text, pic) {
  this.Condition = new Weather_Condition(temperature, text, pic);
}

Weather.prototype.Create_HIGH_LOW = function(high, low) {
  this.Forecasted_HIGH = high;
  this.Forecasted_LOW = low;
}

Weather.prototype.Create_Units = function(distance, pressure, speed, temperature) {
  this.Units = new Units(distance, pressure, speed, temperature);
}

Weather.prototype.Create_Astronomy = function(sunrise, sunset) {
  this.Sunrise = sunrise;
  this.Sunset = sunset;
}

Weather.prototype.Create_Wind = function(chill, direction, speed) {
  this.Wind = new Wind(chill, direction, speed);
}

Weather.prototype.Create_Atmoshphere = function(humidity, pressure, rising, visibility) {
  this.Humidity = humidity;
  this.Pressure = pressure;
  this.Rising = rising;
  this.Visibility = visibility;
}

 // Timestamep eg: "#MONTH #DATE, #TIME"
Weather.prototype.get_current_weather_timestamp =  function(timestamp_key){
return this.Current_Date_Time.get_Formated_timestamp(timestamp_key);
}
