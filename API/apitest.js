function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

// Helper method to parse the title tag from the response.
function getTitle(text) {
  return text.match('<title>(.*)?</title>')[1];
}

// Make the actual CORS request.
function makeCorsRequest() {
  // This is a sample server that supports CORS.
  var url = 'https://www.worldcoinindex.com/apiservice/json?key=d7vGJQ7ho5Xl790ZPBpegjWfBGPntU';

  var xhr = createCORSRequest('GET', url);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Response handlers.
  xhr.onload = function() {
    var text = xhr.responseText;
    var title = getTitle(text);
    alert('Response from CORS request to ' + url + ': ' + title);
    console.log("hello");
  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  xhr.send();
}



function setup() {
  noCanvas();
  // var url = 'http://cors.io/?u=https://www.worldcoinindex.com/apiservice/json?key=d7vGJQ7ho5Xl790ZPBpegjWfBGPntU';
  //var url = 'https://crossorigin.me/https://www.worldcoinindex.com/apiservice/json?key=d7vGJQ7ho5Xl790ZPBpegjWfBGPntU';
  // loadJSON(url, gotData);
}

function gotData(data) {
  console.log(data);
}

