var req = new XMLHttpRequest();
var CNYf, USDf;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

req.onload = function(){
  //console.log(JSON.parse(this.responseText));
  var jsonResponse = JSON.parse(this.responseText);
  console.log(jsonResponse['time'].updated);
  USDf = jsonResponse['bpi'].USD.rate_float;
  CNYf = jsonResponse['bpi'].CNY.rate_float;
  document.getElementById("p1").innerHTML = jsonResponse['time'].updated;
  document.getElementById("p2").innerHTML = "USD rate: " + USDf;
  document.getElementById("p3").innerHTML = "CNY rate: " + CNYf;
  ctx.fillStyle = 'rgb(' + Math.floor(255 - USDf * 0.001) + ', ' + Math.floor(255 - USDf * 0.001) + ', 0)';
  ctx.fillRect(10, 10, 100, 100);
  ctx.fillStyle = 'rgb(' + Math.floor(255 - CNYf * 0.001) + ', ' + Math.floor(255 - CNYf * 0.001) + ', 0)';
  ctx.fillRect(10, 100, 100, 100);
};

function render(){
  req.open('GET', 'https://api.coindesk.com/v1/bpi/currentprice/CNY.json');
  req.send();
}



// var time = 0;
// function draw() {
//   time ;           
//   requestAnimationFrame(draw);
//   console.log(time);
// }

// draw();

//https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript
    // var sec = 0;
    // function pad ( val ) { 
    // 	return val > 9 ? val : "0" + val; 
    // }

    // setInterval( function(){
    //     document.getElementById("seconds").innerHTML=pad(++sec%60);
    //     document.getElementById("minutes").innerHTML=pad(parseInt(sec/60,10));
    // }, 1000);


var timerVar = setInterval(countTimer, 1000);
var totalSeconds = 0;
function countTimer() {
   totalSeconds ++;
   var hour = Math.floor(totalSeconds /3600);
   var minute = Math.floor((totalSeconds - hour*3600)/60);
   var seconds = totalSeconds - (hour*3600 + minute*60);
}   
  //document.getElementById("timer").innerHTML = minute + ":" + seconds;
  //console.log(seconds);



