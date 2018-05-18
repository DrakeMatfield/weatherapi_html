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

// It only parse this format: Wed, 11 Apr 2018 11:46 AM CDT
// And return this format eg: April 11,
function get_date(dateORtime)
{
    var current_timestamp = dateORtime.match(/\b[0-3][0-9]\s\w{3}\s\d{4}\b\b/g);
    var current_date = current_timestamp.substring(0, 1);
    
    return current_date;
}

// It only parse this format: Wed, 11 Apr 2018 11:46 AM CDT
// and return this format HH:MM AM|PM
function get_time(dateORtime)
{
  
  var current_time = dateORtime.match(/\b[0-1][0-9]:[0-5][0-9]\s+[AP]M/g);
  var formated_time;

  if(current_time.charAt(0) == '0'){
  
      formated_time = current_time.substr(1);
  }
  else
  {
      formated_time = current_time;
  }
    
    return formated_time;

}

function get_month_name_by_abv(dateORtime)
{
    var month_abv = dateORtime.substr(3,3);

    switch(month_abv) {
    case 'Jan':
       month_abv = "January";
        break;
            case 'Feb':
        month_abv ="February";
        break;
            case 'Mar':
      month_abv ="March";
        break;
            case 'Apr':
        month_abv = "April";
        break;
            case 'May':
       month_abv ="May";
        break;
                    case 'Jun':
        month_abv = "June";
        break;
            case 'Jul':
        month_abv = "July";
        break;
            case 'Aug':
         month_abv ="August";
        break;
            case 'Sep':
         month_abv = "September";
        break;
                    case 'Oct':
         month_abv = "October";
        break;
            case 'Nov':
         month_abv =  "November";
        break;
            case 'Dec':
         month_abv = "December";
        break;
    default:
          month_abv = null;
}
    
return month_abv;

}

function get_current_weather_timestamp(dateORtime){
    
    var timestamp = "#MONTH #DATE, #TIME";
    var current_month  =   get_month_name_by_abv(dateORtime);
    var current_time = get_time(dateORtime);
    var current_day = get_date(dateORtime);
    
    timestamp.replace("#MONTH", current_month );
    timestamp.replace("#TIME", current_time);
    timestamp.replace("#DATE", current_day);
}



