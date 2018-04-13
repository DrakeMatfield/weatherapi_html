function Drake_opinion_basedon_temperature(temperature) {
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

function background_color_basedon_SunRise_SunDown(sunRise, sunDown, time) {
 var regex3 = RegExp("/\b[0-1]?[0-9]:[0-5][0-9]\s+[AP]M/gi");
 
 if ((regex3.test(sunRise)) && (regex3.test(sunDown)) && (regex3.test(time))) {
   console.log("All Match");
   }
 else
 {
   console.log("one of the value doesn't match");
 }
var point1;
 var regexAM = RegExp('/AM/gi');

if(regexAM.test(sunRise))
{
var index_colon = sunRise.indexOf(":");

var HH = sunRise.subString(0, index_colon);
console.log(HH);
}




}

function background_color_basedon_temperature(temperature) {
  var text;

  return white;
}

function background_color_basedon_season(season) {
  var color;

  switch (season) {
    case "spring":
      color = "green";
      break;
    case "summer":
      color = "blue";
      break;
    case "fall":
      color = "orange";
      break;
    case "winter":
      color = "white";
      break;
    default:
      return "white";
  }

  return color;

}

function background_pic_basedon_season(season) {
  var color;

  switch (season) {
    case "spring":
      color = "green";
      break;
    case "summer":
      color = "blue";
      break;
    case "fall":
      color = "orange";
      break;
    case "winter":
      color = "white";
      break;
    default:
      return "white";
  }

  return undefined;

}
