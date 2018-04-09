
var finn;
var api = 'https://api.giphy.com/v1/gifs/search?q=';
var apiKey = '&api_key=NbkeYA73vYawk4C1tichQzt1eDDBlX6d';
var units = '&limit=20';
var img;

var input;

function setup(){
	noCanvas();
	//createCanvas(800, 600);
  	var button = select('#submit');
  	button.mousePressed(searchStart); 

  	input = select('#startSearch')
}

function searchStart(){
	var url = api + input.value() + apiKey + units;
  	loadJSON(url, gotData);
}

function gotData(data){
	finn = data;
	for (var i = 1; i < finn.data.length; i ++){
		createImg(finn.data[i].images.original.url);
		//console.log(finn.data[i].images.original.url);
	}
}

// function draw(){
// 	background(255);
// 	if (finn){
// 		randomSeed(4);
// 		// fill(random(255), 0, 0);
// 		fill(0);
// 		for (var i = 0; i < 25; i ++){
// 			var w = finn.data[i].images.original_still.width/3;
// 			var h = finn.data[i].images.original_still.height/3;
// 			noStroke();
// 			fill(random(255), random(255), random(255));
// 			rect(random(width), random(height), w, h);
// 			//createImg(finn.data[1].images.original.url);
// 	    }
// 	}
// }