// <script src="https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='64129')&format=json&callback=callbackFunction"></script>

function Display_Results(element_id, readableData) {
  var str;
  if (readableData.query.count > 0) {
    var title = readableData.query.results.channel.item.title;
    var location = readableData.query.results.channel.location;
    var description = readableData.query.results.channel.item.description;
    var temperature = readableData.query.results.channel.item.condition.temp;
    var date = readableData.query.results.channel.item.condition.temp;
    var yahoo_pic = readableData.query.results.channel.image.url;
    var yahoo_link = readableData.query.results.channel.image.link;

    str = "<p>Location: #CITY, #REGION #COUNTRY </p>";
    str = str.replace("#CITY", location.city);
    str = str.replace("#REGION", location.region);
    str = str.replace("#COUNTRY", location.country);

    str += "<p>Temperature: #TEMPERATURE</p>";
    str = str.replace("#TEMPERATURE", temperature);

    str += "<p>Tilte: #TITLE</p>";
    str = str.replace("#TITLE", title);

    str += description;
    str = str.replace("<![CDATA[", "");
    str = str.replace("]]>", "");

    //str += "<p>Date and Time: #DATE</p>"; 
    //str = str.replace("#DATE", date);

    str += "<p><strong>Drake's Thoughts!:</strong> #OPINION</p>";
    str = str.replace("#OPINION", Analyzed_Results(temperature));

    str += "<p><a href=\"#IMGLINK\" target=\"_blank\">img:<img src=#SRC class=\"test\"></a></p>";
    str = str.replace("#SRC", yahoo_pic);
    str = str.replace("#IMGLINK", yahoo_link);
  } else {
    str = "<h2>Search Found Nothing!</h2>"
  }
  document.getElementById(element_id).innerHTML = str;
}

function Analyzed_Results(temperature) {
  var text;

  if (Number(temperature) < 40) {
    text = "You should wear a coat; because it's " + temperature + " degress right now.";
  } else if (Number(temperature) < 80) {
    text = "You should wear a jacket; because it's " + temperature + " degress right now.";
  } else {
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
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

var callbackFunction = function(data) {
  var readableData = JSON.parse(data);
  Display_Results('id_results', readableData);
}

function on_enter_pressed(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    On_Submit(event.target.id);
  }
}

function spawnNotification(theBody, theIcon, theTitle, theTag) {
  var options = {
    body: theBody,
    icon: theIcon,
    tag: theTag
  }
  var n = new Notification(theTitle, options);

  //setTimeout(n.close.bind(n), 5000); 
  setTimeout(function() {
    alert(theTitle);
  }, 3000);
}

function On_Notify(element_id) {
  var element = document.getElementById(element_id);

  if (element.checked == true) {
    //Push.create('Hi there!', {
    //    body: 'This is a notification.',
    //    icon: 'icon.png',
    //    timeout: 8000,               // Timeout before notification closes automatically.
    //    vibrate: [100, 100, 100],    // An array of vibration pulses for mobile devices.
    //    onClick: function() {
    //        // Callback for when the notification is clicked. 
    //        console.log(this);
    //    }  
    //});

    spawnNotification("Hi", "images\cloud.jpg", "Checking that Notification works!");
  } else {}
}

var background_Worker;

function startWorker() {
  if (typeof(Worker) !== "undefined") {
    if (typeof(background_Worker) == "undefined") {
      background_Worker = new Worker("JScriptWorker.js");
    }
    background_Worker.onmessage = function(event) {
      document.getElementById("result").innerHTML = event.data;
    };
  } else {
    document.getElementById("result").innerHTML = "Sorry! No Web Worker support.";
  }
}

function stopWorker() {
  background_Worker.terminate();
  background_Worker = undefined;
}
//var i = 0;

//function timedCount() {
//    i = i + 1;
//    postMessage(i);
//    setTimeout("timedCount()",500);
//}

//timedCount();


// var notification;
//    
//  function notifyMe() {
//  // Let's check if the browser supports notifications
//  if (!("Notification" in window)) {
//    alert("This browser does not support system notifications");
//  }

//  // Let's check whether notification permissions have already been granted
//  else if (Notification.permission === "granted") {
//    // If it's okay let's create a notification
//     notification = new Notification("Hi there!");
//  }

//  // Otherwise, we need to ask the user for permission
//  else if (Notification.permission !== 'denied') {
//    Notification.requestPermission(function (permission) {
//       Notification.permission = permission;
//       // If the user accepts, let's create a notification
//      if (permission === "granted") {
//         notification = new Notification("Hi there!");
//      }
//    });
//  }

//  // Finally, if the user has denied notifications and you 
//  // want to be respectful there is no need to bother them any more.
//}  
//    
//    Notification.requestPermission().then(function(result) {
//  console.log(result);
//});


//function spawnNotification(theBody,theIcon,theTitle) {
//  var options = {
//      body: theBody,
//      icon: theIcon
//  }
//  var n = new Notification(theTitle,options);
//  setTimeout(n.close.bind(n), 5000); 
//}

//function randomNotification() {
//  var randomQuote = quoteChooser();
//  var options = {
//      body: randomQuote,
//      icon: 'img/sad_head.png',
//  }

//  var n = new Notification('Emogotchi says',options);
//  setTimeout(n.close.bind(n), 5000); 
//}