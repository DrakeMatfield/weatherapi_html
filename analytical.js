function Drake_opinion_basedon_temperature(temperature) {
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

function hasAM(value) {
  //console.log("Does sunRise has am: "+ (value.match(/am/i) != null));
  return (value.match(/am/gi) != null);
}

function hasPM(value) {
  // console.log("Does sunRise has am: "+ (value.match(/pm/i) != null));
  return (value.match(/pm/gi) != null);
}

function time_conversion(time) {
  var hour_24;

  if (hasAM(time)) {
    hour_24 = time.replace(/am/gi, "").trim();
    var index = hour_24.indexOf(":");

    var num = Number(hour_24.substring(0, index));
    if (num == 12) {
      num = 0;
    }
    hour_24 = num + hour_24.substring(index);
  } else if (hasPM(time)) {
    hour_24 = time.replace(/pm/gi, "").trim();
    var index = hour_24.indexOf(":");

    var num = Number(hour_24.substring(0, index));
    if (num != 12) {
      num = num + 12;
    }
    hour_24 = num + hour_24.substring(index);

  }

  return hour_24;
}

function is_V1_greater_Than_v2(value1, value2) {
  // console.log("Does sunRise has am: "+ (value.match(/pm/i) != null));
  var bool;

  var index_colon_1 = value1.indexOf(":");
  var index_colon_2 = value2.indexOf(":");

  var hh1 = Number(value1.substring(0, index_colon_1));
  var hh2 = Number(value2.substring(0, index_colon_2));

  if (hh1 == hh2) {

    var mm1 = Number(value1.substring(index_colon_1+1));
    var mm2 = Number(value2.substring(index_colon_2+1));

    if (mm1 == mm2) {
      bool = true;
    } else if (mm1 > mm2) {
      bool = true;
    } else if (mm1 < mm2) {
      bool = false;
    }
  } else if (hh1 > hh2) {
    bool = true;
  } else if (hh1 < hh2) {
    bool = false;
  }

  return bool;
}

function background_color_basedon_SunRise_SunDown(sunRise, sunDown, time) {
  var regex3 = RegExp("/\b[0-1]?[0-9]:[0-5][0-9]\s+[AP]M/gi");

  var color;

  console.log(sunRise);
  var sUP = time_conversion(sunRise);
  console.log(sUP);
  console.log(sunDown);
  var sDOWN = time_conversion(sunDown);

  console.log(sDOWN);
  console.log(time);
  var cTIME = time_conversion(time);

  console.log(cTIME);

  if (is_V1_greater_Than_v2(cTIME ,sUP) && is_V1_greater_Than_v2(sDOWN,cTIME)) {
    //color = 'skyblue';
   // background: rgb(174,203,238);
   color = 'rgb(174,203,238)';//"radial-gradient(circle, rgba(174,203,238,1) 0%, rgba(148,214,233,1) 92%)";

//color = 'radial-gradient(circle, rgba(174,203,238,1) 0%, rgba(148,214,233,1) 92%)';
    
    console.log("yes it has am");
  } else if (is_V1_greater_Than_v2(sUP, cTIME) || is_V1_greater_Than_v2(cTIME , sDOWN)) {

    //color = 'midnightblue';
    color = 'rgb(45,107,182)'; //background: radial-gradient(circle, rgba(174,203,238,1) 0%, rgba(20,37,42,1) 100%);
    console.log("yes it has pm");
  }

  console.log(time_conversion(time));

  return color;

}

function background_color_basedon_temperature(temperature) {
  var text;

  return 'white';
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
