
function spawnNotification(theBody, theIcon, theTitle, theTag) {
  var options = {
    body: theBody,
    icon: theIcon,
    tag: theTag
  }

  var n = new Notification(theTitle, options);

  setTimeout(n.close.bind(n), 5000);
  console.log(theTitle);
}﻿﻿
var i = 0;

function timedCount() {
  i = i + 1;
  //spawnNotification("Hi", "images/cloud.jpg", "Checking that Notification works!","Weather_API");  
  postMessage(i);
  setTimeout("timedCount()", 500);

}

timedCount();

onmessage = function(e) {
  console.log('Message received from main script');
  var myObj = JSON.parse(e.data);
  console.log(myObj);
  console.log('Posting message back to main script');
  postMessage(myObj);
}﻿
﻿
﻿