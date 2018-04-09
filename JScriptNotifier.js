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
