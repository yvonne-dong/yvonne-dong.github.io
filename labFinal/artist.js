
/*
visual representation of an artist in the museum collection
user input artist name/select artist name?

1. get artist
2. return a list of the techniques that this artist uses (map to a timeline) 
3. return the most viewed artwork by this artist
*/


var buttonElement;
var homeButtonElement;
var inp;

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
var imgId, imgUrl, img;

var bgColor;

function dataReset(){
	artistId = 0;
	techAndDate = [];
	testTech = [];
	testDate = [];
	storeTech = [];
	storeDate = [];
	mostActiveData = 0;
	mostActiveUrl = 0;
	imgId = 0;
	imgUrl = 0;
}


function placeCanvas() {
  var x = 530;
  var y = 180;
  cnv.position(x, y);
}

function setup(){
	cnv = createCanvas(695, 300);
	placeCanvas();
	bgColor = color(232,232,232);
	title = createElement('h2', 'ARTIST EXPLORER');
	// title = createElement('h2', 'Peter Paul Rubens');
	titleStyle();

	// buttonElement = createButton('search artist');
	// buttonElement.mousePressed(buttonPressed);
	// buttonStyle();
	homeButtonElement = createButton('homepage');
	homeButtonElement.mousePressed(returnToHome);	
	homeButtonStyle();

	img = createImg('assets/notFound.png');
	imgStyle();

	mostActivetitle = createP("- Title of this artwork: ");
	// mostActiveUrl = createP('http://p5js.org/');
	mostActivetitleStyle();

	document.body.style.backgroundColor = color(232);
	
	inp = createInput('');
    inputStyle();
}

function draw(){
	//preset 232
	background(bgColor);
	var dateRectW = width/2+130;
	var rectH = height-3;
	var techRectW = 196;

	
	for (var i = 0; i < storeTech.length; i ++) {
		techniqueTypes(storeTech[i].value, storeTech[i].count, i*40);
	}
	for (var j = 0; j < storeDate.length; j ++) {
		dateGraph(storeDate[j].value, storeDate[j].count, j*40+30);
	}

	//setup two graphs
	textAlign(LEFT);
	textSize(20);
	textFont('Helvetica');
	textStyle(BOLD);
	fill(56);
	rect(3,1,230,28);
	rect(dateRectW+20,1,130,28);
	fill(bgColor);
	noStroke();
	text('Works in the collection', 8, 23);
	text('Techniques', dateRectW+28, 23);


	//bounding box for the two graphs
	noFill();
	stroke(56);
	strokeWeight(3);	
	rect(1,1,dateRectW,rectH);
	rect(dateRectW+20,1,techRectW,rectH);
}

function returnToHome(){

}

function keyPressed() {
  if (keyCode === ENTER) {
    enterPressed();
  } 
}

function enterPressed(){
	dataReset();
	var searchInput = inp.value();
	searchInput = searchInput.split(' ').join('+');
	var searchUrl = 'https://api.harvardartmuseums.org/object?person='+searchInput+'&size=100&apikey=506b01a0-40d2-11e8-9ec4-7fae965d6296';
	// var searchUrl = 'https://api.harvardartmuseums.org/person?q='+inp.value()+'&apikey=506b01a0-40d2-11e8-9ec4-7fae965d6296';
	loadJSON(searchUrl, getPersonObj);
	console.log('result for '+searchInput);
}


//--------------------return random artist--------------------
// function buttonPressed(){
// 	dataReset();
// 	// var url = method + techniqueNum + apiKey;
// 	var randomPage = int(random(388));
// 	var personUrl = 'https://api.harvardartmuseums.org/person?size=100&page='+randomPage+'&apikey=506b01a0-40d2-11e8-9ec4-7fae965d6296';
// 	//var personUrl = 'https://api.harvardartmuseums.org/object?person=28402&size=100&apikey=506b01a0-40d2-11e8-9ec4-7fae965d6296';
//   	loadJSON(personUrl, getRandomPerson);
//   	//loadJSON(personUrl, getPersonObj);
//   	console.log('api call');
// }

// function getRandomPerson(data){
// 	var randomPerson = int(random(100));
// 	var countLoop = 0;
// 	while (data.records[randomPerson].objectcount <= 5) {
// 		if (countLoop > 500) {
// 			console.log('not found');
// 			break;
// 		} else {
// 			randomPerson = int(random(100));
// 			console.log('change');
// 			countLoop++;
// 		}
			
// 	}
	
// 	artistId = data.records[randomPerson].id;
// 	// title.remove();
// 	// title = createElement('h2', data.records[randomPerson].displayname);
// 	// titleStyle();
// 	title.html(data.records[randomPerson].displayname);
// 	console.log(data.records[randomPerson].displayname);

// 	var artistUrl = 'https://api.harvardartmuseums.org/object?person='+artistId+'&size=100&apikey=506b01a0-40d2-11e8-9ec4-7fae965d6296';
// 	loadJSON(artistUrl, getPersonObj);
// 	console.log('api call');
// }

// function getSearchPerson(data){
// 	artistId = data.records[0].id;
// 	// title.remove();
// 	// title = createElement('h2', data.records[randomPerson].displayname);
// 	// titleStyle();
// 	title.html(data.records[0].displayname);
// 	console.log(data.records[0].displayname);

// 	var artistUrl = 'https://api.harvardartmuseums.org/object?person='+artistId+'&size=100&apikey=506b01a0-40d2-11e8-9ec4-7fae965d6296';
// 	loadJSON(artistUrl, getPersonObj);
	
// 	console.log('api call');
// }

function getObjImage(data){
	//create image for most viewed work
	imgUrl = data.baseimageurl;
	if (imgUrl == null){
		img.remove();
		img = createImg('assets/notFound.png');
		imgStyle();
		bgColor = color(232);
		console.log('no image found');
		console.log('no color found');
	} else {
		img.remove();
		img = createImg(imgId);
		imgStyle();
		document.body.style.backgroundColor = color(bgColor);
		background(bgColor);
		// console.log(bgColor);		
	}
}

function getPersonObj(data){

	// console.log(data.records[0]);

	// artistId = data.records[0].id;
	title.html(data.records[0].people[0].displayname);
	console.log(data.records[0].people[0].displayname);

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
			// testDate.push(this.intDate);
			testDate.push(data.records[i].dated);
		}

		//get the most active work
		if (this.rankMost < data.records[i].rank){
			//store the comparing rank number
			this.rankMost = data.records[i].rank;
			//store the info - complete record + title + website link + image
			mostActiveData = data.records[i];
			// mostActivetitle = data.records[i].title;
			mostActiveUrl = data.records[i].url;
			imgId = data.records[i].id;
			mostActivetitle.html('- '+data.records[i].title);
			//document.body.style.backgroundColor = data.records[i].colors[0].css3;
			bgColor = data.records[i].colors[0].css3;
			// console.log(data.records[i].colors);
		}
	}	
	console.log(imgId);
 	var searchImgUrl = 'https://api.harvardartmuseums.org/image/'+imgId+'?apikey=506b01a0-40d2-11e8-9ec4-7fae965d6296';
 	loadJSON(searchImgUrl, getObjImage);

//--------------------reference: https://gist.github.com/ralphcrisostomo/3141412--------------------
	//count the sum of used techniques and dates
	storeTech = countElements(testTech);
  	// console.log(storeTech);
  	storeDate = countElements(testDate);
  	// console.log(storeDate);
//--------------------------------------------------------------------------------------------------	
}

//draw graph for used techniques
function techniqueTypes(techName, techNameCount, posAdd){
	noStroke();
	this.technique = techName;
	this.techNameCount = techNameCount;
	this.posAdd = posAdd;
	// var techTextSize = map(this.techNameCount, 0, 100, 8, 30);
	textSize(15);
	// textAlign(LEFT);
	fill(56);
	text(this.techNameCount+' pieces of '+this.technique, width/2+158, height/2-20+this.posAdd, 180,50);
}

//draw graph for artwork dates
function dateGraph(date, dateCount, posX){
	var timelineDate;
	this.objDate = date;
	this.dateCount = dateCount*10;
	this.posX = posX;
	this.posY = height/2+sin(this.posX/10)*10;
	this.datePosY = this.posY+this.dateCount/2+5;
	this.countPosY = this.datePosY+20;
	
	stroke(56);
	strokeWeight(1);
	line(this.posX,this.posY,this.posX,this.datePosY);
	fill(56,80);
	noStroke();
	ellipse(this.posX,this.posY,this.dateCount,this.dateCount);
	textSize(10);
	textStyle(NORMAL);
	fill(56);
	text(dateCount +' works', this.posX, this.datePosY+10);
	text('in ' + this.objDate, this.posX, this.countPosY);
	
	//fill(100);
	// line(10, height/2-50, width/2-10, height/2-50);
	// rect(timelineDate, height/2-50, 30, this.dateCount*2);

	// textSize(10);
	// fill(56, 56, 56);
	// text(this.objDate, timelineDate, height/2-60);
	// text(this.dateCount, timelineDate, height/2-50+this.dateCount*2+10);
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
