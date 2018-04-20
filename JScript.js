 // <script src="https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='64129')&format=json&callback=callbackFunction"></script>
'use strict'
function Display_Results(element_ids, weather) {
  console.dir(weather);
  var str;
  var forecast;

try{
    str = "<p class=\"date_time_display\">#DATE_TIME</p>";
    //str = str.replace("#DATE_TIME", tempdatestring);
    str = str.replace("#DATE_TIME", (weather.get_current_weather_timestamp("#MONTH #DATE, #TIME")));

    str += "<p class=\"dropmargin\" >High: #HIGH - Low: #LOW</p>";
    str = str.replace("#HIGH", weather.Forecasted_HIGH);
    str = str.replace("#LOW", weather.Forecasted_LOW);

    str += "<p class=\"temperature\">#TEMPERATURE<sup><small>#UNIT</small></sup></p>";
    str = str.replace("#TEMPERATURE", weather.Condition.Temperature);
    str = str.replace("#UNIT", weather.Units.Temperature_units);

    str += "#CURRENT_PICTURE_GIF";
    str = str.replace("#CURRENT_PICTURE_GIF", weather.Card_Pic);

    str += "<p class=\"remMar\">Location:</p><hr/><p class=\"date_time_display\">#LOCATION</p>";
    str = str.replace("#LOCATION", weather.Location.get_Location());

   str += "<p class=\"opinion\"><strong>Drake's Thoughts!:</strong>#OPINION</p>";
   str = str.replace("#OPINION", Drake_opinion_basedon_temperature(weather.Condition.Temperature));

    forecast = "<p>#TITLE</p>";
    forecast = forecast.replace("#TITLE", weather.Title);

    forecast += weather.Description_HTML;

    forecast += "<p><a href=\"#IMGLINK\" target=\"_blank\"><img src=#SRC class=\"test\"></a></p>";
    forecast = forecast.replace("#SRC", weather.Tag[0]);
    forecast = forecast.replace("#IMGLINK", weather.Tag[1]);

  // set background color
  var backcolor = background_color_basedon_SunRise_SunDown(weather.Sunrise, weather.Sunset, weather.Current_Date_Time.Time);
  
  set_background_color('bbb', backcolor);
  //set_background_Pic('id_main','images/Sky/te00006_sky.png');
 
  document.getElementById(element_ids[0]).value = weather.Location.City + ", "+ weather.Location.Region;
  document.getElementById(element_ids[1]).innerHTML = str;
  document.getElementById(element_ids[2]).innerHTML = forecast;
  // Get the element with id="defaultOpen" and click on it
  document.getElementById("defaultOpen").click();
}
catch(err){
console.error(err.message);
}
}

function set_background(element_id, background_color)
{   //rgba(201, 76, 76, 0.3)
    document.getElementById(element_id).style.backgroundColor =  "rgba(201, 76, 76, 0.3)";
    document.getElementById('bb').style.backgroundColor =  "rgba(201, 76, 76, 0.3)";

}

function set_background_color(element_id, background_color)
{   //rgba(201, 76, 76, 0.3)
    document.getElementById(element_id).style.backgroundColor = background_color; //"rgba(201, 76, 76, 0.3)";// background_color;
    document.getElementById('bb').style.backgroundColor =  background_color;
}

function set_background_Pic(element_id, background_image)
{ 
    document.getElementById(element_id).style.backgroundImage = "url("+background_image+")";
    document.getElementById(element_id).style.backgroundSize = 'cover';
    //document.getElementById(element_id).style.backgroundAttachment  = 'fixed';
}

// Just in case I need to set it to Synchronous
//https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Synchronous_and_Asynchronous_Requests
function On_Submit(element_id) {
  var zipcode = document.getElementById(element_id).value;
  var str = "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='#ZIPCODE')&format=json";
  var url = str.replace('#ZIPCODE', zipcode);

  Api_Call(url);

}

// Remember to remove console.dir for optimization.
var callbackFunction = function(data) {
  var readableData = JSON.parse(data);
  if (readableData.query.count > 0) {
       console.dir(readableData);
       Display_Results(['idZipcode', 'id_results', 'id_forecast_results'], ParseWeatherYahoo(readableData));
  }
  else
  {
       document.getElementById('id_results').innerHTML = "<h2>Search Found Nothing!</h2>";
  }
}

var callbackFunctionOnError = function(error) {
  console.error(error.message);
}

function on_enter_pressed(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    On_Submit(event.target.id);
  }
}

function reminder(theBody, theIcon, theTitle, theTag, theDate, theTime) {
  this.body = theBody;
  this.icon_pic = theIcon;
  this.title = theTitle;
  this.tag = theTag;
  this.date_set = theDate;
  this.time_set = theTime;
}﻿﻿﻿

reminder.prototype.Display_Notification = function() {
  spawnNotification(this.body, this.icon_pic, this.title, this.tag);
}

function spawnNotification(theBody, theIcon, theTitle, theTag) {
  var options = {
    body: theBody,
    icon: theIcon,
    tag: theTag
  }

  var n = new Notification(theTitle, options);

  setTimeout(n.close.bind(n), 5000);
  //setTimeout(function() {    alert(theTitle);  }, 3000);
}

function On_Notify(element_id) {
  var element = document.getElementById(element_id);

  if (element.checked == true) {
    //spawnNotification("Hi", "images/cloud.jpg", "Checking that Notification works!", "Weather_API");
    if (!notifyMe()) {
      element.checked = false;
    }
  }
  else {
    spawnNotification("Notification is now turned off", "images/cloud.jpg", "Weather API Notification", "Weather_API_Started");
  }
}

var background_Worker;

function startWorker() {
  if (typeof(Worker) !== "undefined") {
    if (typeof(background_Worker) == "undefined") {
      background_Worker = new Worker("JScriptWorker.js");
    }
    background_Worker.onmessage = first_run(event);
  }
  else {
    document.getElementById("result").innerHTML = "Sorry! No Web Worker support.";
  }
}

function stopWorker() {
  background_Worker.terminate();
  background_Worker = undefined;
}

function on_SendMessage() {
  var r = new reminder("Hi", "images/cloud.jpg", "Checking that Notification works!", "Weather_API", Date.now(), "3:00 pm");
  var myJSON = JSON.stringify(r);
  background_Worker.postMessage(myJSON);
  console.log(r);
  console.log(myJSON);
}﻿﻿﻿

function first_run(event) {
  //spawnNotification("Hi", "images/cloud.jpg", "Checking that Notification works!", "Weather_API");
  document.getElementById("result").innerHTML = event.data;
};

function notifyMe() {

  var successful;
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support notifications.");

    successful = false;
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    spawnNotification("Notification is now Enabled", "images/cloud.jpg", "Weather API Notification", "Weather_API_Started");
    successful = true;

  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function(permission) {
      //       Notification.permission = permission;
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        spawnNotification("Notification is now Enabled to be turned on.", "images/cloud.jpg", "Weather API Notification", "Weather_API_Started");
        successful = true;
      }
      else { successful = false; }
    });
  }
  else {
    successful = false;
  }

  // Finally, if the user has denied notifications and you 
  // want to be respectful there is no need to bother them any more.

  Notification.requestPermission().then(function(result) {
    console.log(result);
  });

  return successful;
}﻿﻿﻿﻿﻿
﻿ 