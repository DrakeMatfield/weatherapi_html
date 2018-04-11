 // <script src="https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='64129')&format=json&callback=callbackFunction"></script>

function Display_Results(element_ids, readableData) {
  console.dir(readableData);
  var str;
  var forcast;
  if (readableData.query.count > 0) {
  
  var current_date  = readableData.query.results.channel.lastBuildDate;
  var current_creation_date = new Date(current_date);
  var current_hi = readableData.query.results.channel.item.forecast[0].high;
  var current_lo = readableData.query.results.channel.item.forecast[0].low;
  var current_temp = readableData.query.results.channel.item.condition.temp;
  var current_temp_unit = readableData.query.results.channel.units.temperature;
  var current_condition_pic = parse_picture(readableData.query.results.channel.item.description); 
  var location = readableData.query.results.channel.location;
  
  //temp logs
  console.log(current_date);
  console.log(current_creation_date);
  console.log(current_creation_date.getUTCHours());
  console.log(current_creation_date.getHours());
  
  
  var tempdatestring = "#MONTH #DATE, #TIME";
  
  tempdatestring = tempdatestring.replace("#MONTH" , get_month_name(current_creation_date.getUTCMonth()));
  tempdatestring = tempdatestring.replace("#DATE" , current_creation_date.getUTCDate());
  tempdatestring = tempdatestring.replace("#TIME" , get_time(current_creation_date));
 
    str = "<p>#DATE_TIME</p>"; 
    //str = str.replace("#DATE_TIME", tempdatestring);
    str = str.replace("#DATE_TIME", "April 8, 2:57 AM");
    
    str += "<p class=\"dropmargin\" >High: #HIGH - Low: #LOW</p>"; 
    str = str.replace("#HIGH", current_hi);  
    str = str.replace("#LOW", current_lo);  
  
    str += "<p class=\"temperature\">#TEMPERATURE<sup><small>#UNIT</small></sup></p>";
    str = str.replace("#TEMPERATURE", current_temp);
    str = str.replace("#UNIT", get_temperture_unit(current_temp_unit));
    
    str += "#CURRENT_PICTURE_GIF";
    str = str.replace("#CURRENT_PICTURE_GIF", current_condition_pic);
         
    var title = readableData.query.results.channel.item.title;
    var description = readableData.query.results.channel.item.description;
    var temperature = readableData.query.results.channel.item.condition.temp;
    var date = readableData.query.results.channel.item.condition.date;
    var yahoo_pic = readableData.query.results.channel.image.url;
    var yahoo_link = readableData.query.results.channel.image.link;

    str += "<p>Location:<hr/> #CITY, #REGION #COUNTRY</p>";
    str = str.replace("#CITY", location.city);
    str = str.replace("#REGION", location.region);
    str = str.replace("#COUNTRY", location.country);
 
    forecast = "<p>#TITLE</p>";
    forecast = forecast.replace("#TITLE", title);

    forecast += description;
    forecast = forecast.replace("<![CDATA[", "");
    forecast = forecast.replace("]]>", "");

    forecast += "<p><strong>Drake's Thoughts!:</strong> #OPINION</p>";
    forecast = forecast.replace("#OPINION", Analyzed_Results(temperature));

    forecast += "<p><a href=\"#IMGLINK\" target=\"_blank\">img:<img src=#SRC class=\"test\"></a></p>";
    forecast = forecast.replace("#SRC", yahoo_pic);
    forecast = forecast.replace("#IMGLINK", yahoo_link);
  }
  else {
    str = "<h2>Search Found Nothing!</h2>"
  }
  
  //document.getElementById(element_ids[0]).value = location.city + ", "+ location.region;
  document.getElementById(element_ids[1]).innerHTML = str;
  document.getElementById(element_ids[2]).innerHTML = forecast;
}

function get_temperture_unit(units_used)
{
    var temp_unit;
    if(units_used === 'F')
    {
        temp_unit = "&#8457";
    }
    else
    {
        temp_unit = units_used;
    }
    return temp_unit;
}

function get_month_name(month_number){
    var month = new Array(12);
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    return month[month_number];
}

function get_time(date_object) {
console.log(date_object.getUTCHours());
console.log(date_object.getUTCMinutes());
    var hours = Number(date_object.getUTCHours());
    var minutes = Number(date_object.getUTCMinutes());
    var sun = {};
        
    if(hours > 12)
    {
        sun = "PM";
        hours =  hours - 12;
    }
    else if(hours === 0)
    {
        sun = "AM";
        hours = 12;    
    }
    else
    {
        sun = "AM";
    }
    
    var time_string = "#HOUR : #MINUTES #AM_PM";
    time_string = time_string.replace("#HOUR", hours);
    time_string = time_string.replace("#MINUTES", minutes);
    time_string = time_string.replace("#AM_PM", sun);

    return time_string;
}

function parse_current_conditions(description_PARSE)
{
    // Remove current condition from string.
    description_PARSE = description_PARSE.replace("Current Conditions:", "");

    var firstTag;
    var secondTag;
    var element;

    for(var x=0; x<4; x++)
    {
        // Remove first tag 
        firstTag = description_PARSE.indexOf('<');
        secondTag = description_PARSE.indexOf('>');

        element = description_PARSE.substring(firstTag, secondTag + 1);
        description_PARSE = description_PARSE.replace(element,"");
    }    

    // Find index of next tag.
    firstTag = description_PARSE.indexOf('<');

    var res = description_PARSE.substring(0, firstTag).trim();
    return res;
}


function parse_picture(description_PARSE)
{
   description_PARSE = description_PARSE.replace("<![CDATA[", "");
   description_PARSE = description_PARSE.replace("]]>", "");
   
   var start;
   var end;
   var res;
      
   if(description_PARSE.startsWith('<img'))
   {
       start = 0;
       end = description_PARSE.indexOf('>');
       res = description_PARSE.substring(start, end +1);
       
       res = res.replace("<img ", "<img id=\"id_condition_pic\" class=\"imgcondition\"");
       var img_tag = res.toString();
       
       var current_condition_index = description_PARSE.indexOf("Current Conditions:");
       if(current_condition_index != -1)
       {
            var current_condition; 
            // Remove img from string.
            var temp_img = description_PARSE.substring(start, end + 1);
            description_PARSE = description_PARSE.replace(temp_img, "");
            
            current_condition = parse_current_conditions(description_PARSE);

             var picture_card = "<div id=\"id_condition_fig\" class=\"fig\">" + 
                img_tag  + "<p><span>"+current_condition+"</span></p></div>";
        
            res = picture_card;
        }
   }
   else
   {
       res = "Couldn't find the picture.";
       console.log(res);
   } 
      
   return res;
}

function Analyzed_Results(temperature) {
  var text;

  if (Number(temperature) < 40) {
    text = "You should wear a coat; because it's " + temperature + " degress right now.";
  }
  else if (Number(temperature) < 80) {
    text = "You should wear a jacket; because it's " + temperature + " degress right now.";
  }
  else {
    text = "You should wear short; because it's " + temperature + " degress right now.";
  }
  return text;
}

// Just in case I need to set it to Synchronous
//https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Synchronous_and_Asynchronous_Requests
function On_Submit(element_id) {
  var zipcode = document.getElementById(element_id).value;
  var str = "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='#ZIPCODE')&format=json";
  var url = str.replace('#ZIPCODE', zipcode);

  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      callbackFunction(this.responseText);
    }
    if (this.readyState == 4 && this.status >= 400 ) {
    var code = this.status;
    this.abort();// this line might not be needed.
    //Status Code Error
    callbackFunctionOnError(new Error("There was an error getting the weather for you. ( status code: " + code + ")"));
   }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

var callbackFunction = function(data) {
  var readableData = JSON.parse(data);
  Display_Results(['idZipcode' ,'id_results', 'id_forecast_results'], readableData);
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
