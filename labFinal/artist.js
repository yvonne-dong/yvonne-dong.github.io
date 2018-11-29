
/*
visual representation of an artist in the museum collection
user input artist name/select artist name?

1. get artist
2. return a list of the techniques that this artist uses (map to a timeline) 
3. return the most viewed artwork by this artist
*/


var buttonElement;

//store random artist id
var artistId;

//an array to store the technique of this artwork and dated time
var techAndDate = [];

//--------------------reference: https://gist.github.com/ralphcrisostomo/3141412--------------------
var testTech = []; //store all the techniques that this artist had used
var testDate = []; //store all the artwork dates of this artist
var storeTech = []; //count the sum of repeated techniques
var storeDate = []; //count the sum of repeated dates
//--------------------------------------------------------------------------------------------------

//store data of most active work
var mostActiveData, mostActivetitle, mostActiveUrl;
var imgUrl, img;

function dataReset(){
	artistId = 0;
	techAndDate = [];
	testTech = [];
	testDate = [];
	storeTech = [];
	storeDate = [];
	mostActiveData = 0;
	// mostActivetitle = 0;
	mostActiveUrl = 0;
	imgUrl = 0;
}


function placeCanvas() {
  var x = 330;
  var y = 200;
  cnv.position(x, y);
}

function setup(){
	cnv = createCanvas(580, 200);
	placeCanvas();

	title = createElement('h2', 'RANDOM ARTIST EXPLORER');
	titleStyle();

	buttonElement = createButton('search for another artist');
	buttonElement.mousePressed(buttonPressed);
	buttonStyle();

	img = createImg('assets/noImg.png');
	imgStyle();

	mostActivetitle = createP("Title of the artwork: ");
	// mostActiveUrl = createP('http://p5js.org/');
	mostActivetitleStyle();

	// colorMode(HSB, 100);
	// rectMode(CENTER);
}

function draw(){
	background(255);
	for (var i = 0; i < storeTech.length; i ++) {
		techniqueTypes(storeTech[i].value, storeTech[i].count, i*20);
	}
	for (var j = 0; j < storeDate.length; j ++) {
		dateGraph(storeDate[j].value, storeDate[j].count, width/2);
	}
}

function buttonPressed(){
	dataReset();
	// var url = method + techniqueNum + apiKey;
	var randomPage = int(random(388));
	var personUrl = 'https://api.harvardartmuseums.org/person?size=100&page='+randomPage+'&apikey=506b01a0-40d2-11e8-9ec4-7fae965d6296';
	//var personUrl = 'https://api.harvardartmuseums.org/object?person=28402&size=100&apikey=506b01a0-40d2-11e8-9ec4-7fae965d6296';
  	loadJSON(personUrl, getRandomPerson);
  	//loadJSON(personUrl, getPersonObj);
  	console.log('api call');
}

function getRandomPerson(data){
	var randomPerson = int(random(100));
	var countLoop = 0;
	while (data.records[randomPerson].objectcount <= 5) {
		if (countLoop > 500) {
			console.log('not found');
			break;
		} else {
			randomPerson = int(random(100));
			console.log('change');
			countLoop++;
		}
			
	}
	
	artistId = data.records[randomPerson].id;
	// title.remove();
	// title = createElement('h2', data.records[randomPerson].displayname);
	// titleStyle();
	title.html(data.records[randomPerson].displayname);
	console.log(data.records[randomPerson].displayname);

	var artistUrl = 'https://api.harvardartmuseums.org/object?person='+artistId+'&size=100&apikey=506b01a0-40d2-11e8-9ec4-7fae965d6296';
	loadJSON(artistUrl, getPersonObj);
	console.log('api call');
}

function getPersonObj(data){
	var countUpTo;
	this.rankMost = 0;
	if (data.info.totalrecordsperquery < data.info.totalrecords) {
		countUpTo = data.info.totalrecordsperquery;
	} else if (data.info.totalrecordsperquery >= data.info.totalrecords){
		countUpTo = data.info.totalrecords;
	}
	
	for (var i = 0; i < countUpTo; i ++) {
		if (data.records[i].technique != null && data.records[i].dated != null){
			this.intDate = parseInt(data.records[i].dated); 
			//change century into years
			if (this.intDate < 22){
				this.intDate =  (this.intDate-1)*100;
			}
			//save data for techniques and dates
			testTech.push(data.records[i].technique);
			testDate.push(this.intDate);
		}

		//get the most active work
		if (this.rankMost < data.records[i].rank){
			//store the comparing rank number
			this.rankMost = data.records[i].rank;
			//store the info - complete record + title + website link + image
			mostActiveData = data.records[i];
			// mostActivetitle = data.records[i].title;
			mostActiveUrl = data.records[i].url;
			imgUrl = data.records[i].primaryimageurl;
			mostActivetitle.html(data.records[i].title);
		}
		// console.log(data.records[i]);
	}	

	//create image for most viewed work
	if (imgUrl == null){
		img.remove();
		img = createImg('assets/noImg.png');
		imgStyle();
		console.log('no image found');
	} else {
		img.remove();
		img = createImg(imgUrl);
		imgStyle();		
	}

	
	//display title and website of the most viewed work
	console.log(mostActivetitle);
 	console.log(mostActiveUrl);	

//--------------------reference: https://gist.github.com/ralphcrisostomo/3141412--------------------
	//count the sum of used techniques and dates
	storeTech = countElements(testTech);
  	console.log(storeTech);
  	storeDate = countElements(testDate);
  	console.log(storeDate);
//--------------------------------------------------------------------------------------------------	
}

//draw graph for used techniques
function techniqueTypes(techName, techNameCount, posAdd){
	this.technique = techName;
	this.techNameCount = techNameCount;
	this.posAdd = posAdd;
	var techTextSize = map(this.techNameCount, 0, 100, 8, 30);
	textSize(techTextSize);
	// textAlign(LEFT);
	fill(56, 56, 56);
	text(this.techNameCount+' Pieces of '+this.technique, width/2+10, height/2+this.posAdd);
}

//draw graph for artwork dates
function dateGraph(date, dateCount, posX){
	var timelineDate;
	this.objDate = date;
	this.dateCount = dateCount;
	this.posX = posX;
	if(this.objDate < 1000){
		timelineDate = map(this.objDate, 100, 1000, 10, width/2-10);
	} else if (this.objDate >= 1000 && this.objDate < 1500) {
		timelineDate = map(this.objDate, 1000, 1500, 10, width/2-10);
	} else if (this.objDate >= 1500 && this.objDate < 2000) {
		timelineDate = map(this.objDate, 1500, 2000, 10, width/2-10);
	} else if (this.objDate >= 2000) {
		timelineDate = map(this.objDate, 2000, 2020, 10, width/2-10);
	}

	fill(100);
	line(10, height/2-50, width/2-10, height/2-50);
	rect(timelineDate, height/2-50, 30, this.dateCount*2);
	textSize(10);
	// textAlign(CENTER);
	fill(56, 56, 56);
	text(this.objDate, timelineDate, height/2-60);
	text(this.dateCount, timelineDate, height/2-50+this.dateCount*2+10);
}

//--------------------reference: https://gist.github.com/ralphcrisostomo/3141412--------------------
function countElements(original){
	var compressed = [];
	var copy = original.slice(0);
 
	for (var i = 0; i < original.length; i++) {
		var myCount = 0;	
		// loop over every element in the copy and see if it's the same
		for (var w = 0; w < copy.length; w++) {
			if (original[i] == copy[w]) {
				// increase amount of times duplicate is found
				myCount++;
				// sets item to undefined
				delete copy[w];
			}
		}
 
		if (myCount > 0) {
			var a = new Object();
			a.value = original[i];
			a.count = myCount;
			compressed.push(a);
		}
	}
	return compressed;
}
//--------------------------------------------------------------------------------------------------
