// JScript File
"use strict"
// This object only parse this format: Wed, 11 Apr 2018 11:46 AM CDT
function Date_Time(ISO_DateFormat) {
  
  this.Month = get_month_name_by_abv(ISO_DateFormat);
  this.Day = get_date(ISO_DateFormat);
  this.Time = get_time(ISO_DateFormat);
  this.Year = get_year(ISO_DateFormat);
}

// Timestamep eg: "#MONTH #DATE, #TIME"
Date_Time.prototype.get_Formated_timestamp = function(timestamp_key) {

  var timestamp = timestamp_key;
  try {
    var regex1 = RegExp('#MONTH');
    var regex2 = RegExp('#TIME');
    var regex3 = RegExp('#DATE');

    if ((regex1.test(timestamp)) || (regex2.test(timestamp)) || (regex3.test(timestamp))) {
      timestamp = timestamp.replace("#MONTH", this.Month);
      timestamp = timestamp.replace("#TIME", this.Time);
      timestamp = timestamp.replace("#DATE", this.Day);
    } else {
      timestamp = "#MONTH #DATE, #TIME"
      timestamp = timestamp.replace("#MONTH", this.Month);
      timestamp = timestamp.replace("#TIME", this.Time);
      timestamp = timestamp.replace("#DATE", this.Day);
    }
  } catch (err) {
    timestamp = "#MONTH #DATE, #TIME"
    timestamp = timestamp.replace("#MONTH", this.Month);
    timestamp = timestamp.replace("#TIME", this.Time);
    timestamp = timestamp.replace("#DATE", this.Day);
  }

  return timestamp;
}



// It only parse this format: Wed, 11 Apr 2018 11:46 AM CDT
// and return this format HH:MM AM|PM
function get_time(dateORtime) {
  var current_time = dateORtime.match(/\b[0-1][0-9]:[0-5][0-9]\s+[AP]M/g);
  var formated_time;

  if (current_time[0].indexOf(0) == '0') {

    formated_time = current_time[0].substr(1);
  } else {
    formated_time = current_time[0];
  }

  return formated_time;

}

function get_month_name_by_abv(dateORtime) {
  var current_timestamp = dateORtime.match(/\b[0-3][0-9]\s\w{3}\s\d{4}\b\b/g);

  var month_abv = current_timestamp[0].substr(3, 3);

  switch (month_abv) {
    case 'Jan':
      month_abv = "January";
      break;
    case 'Feb':
      month_abv = "February";
      break;
    case 'Mar':
      month_abv = "March";
      break;
    case 'Apr':
      month_abv = "April";
      break;
    case 'May':
      month_abv = "May";
      break;
    case 'Jun':
      month_abv = "June";
      break;
    case 'Jul':
      month_abv = "July";
      break;
    case 'Aug':
      month_abv = "August";
      break;
    case 'Sep':
      month_abv = "September";
      break;
    case 'Oct':
      month_abv = "October";
      break;
    case 'Nov':
      month_abv = "November";
      break;
    case 'Dec':
      month_abv = "December";
      break;
    default:
      month_abv = null;
  }

  return month_abv;

}

//function get_time(date_object) {

//  var hours = Number(date_object.getUTCHours());
//  var minutes = Number(date_object.getUTCMinutes());
//  var sun = {};

//  if (hours > 12) {
//    sun = "PM";
//    hours = hours - 12;
//  } else if (hours === 0) {
//    sun = "AM";
//    hours = 12;
//  } else {
//    sun = "AM";
//  }

//  var time_string = "#HOUR : #MINUTES #AM_PM";
//  time_string = time_string.replace("#HOUR", hours);
//  time_string = time_string.replace("#MINUTES", minutes);
//  time_string = time_string.replace("#AM_PM", sun);

//  return time_string;
//}

function get_month_name(month_number) {
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

// It only parse this format: Wed, 11 Apr 2018 11:46 AM CDT
// And return the date format eg: (11)
function get_date(dateORtime) {
  var current_timestamp = dateORtime.match(/\b[0-3][0-9]\s\w{3}\s\d{4}\b\b/g);
  var current_date = current_timestamp[0].substring(0, 2);

  return current_date;
}

function get_year(dateORtime) {
  return "This function have not been implemented.";
}
