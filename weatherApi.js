function Api_Call(url) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            callbackFunction(this.responseText);
        }
        if (this.readyState == 4 && this.status >= 400) {
            var code = this.status;
            this.abort(); // this line might not be needed.
            //Status Code Error
            callbackFunctionOnError(new Error("There was an error getting the weather for you. ( status code: " + code + ")"));
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
