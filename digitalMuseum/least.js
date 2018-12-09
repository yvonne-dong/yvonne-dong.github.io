//https://api.harvardartmuseums.org/object?q=totalpageviews:1&size=100&page=2&apikey=506b01a0-40d2-11e8-9ec4-7fae965d6296

var method = 'https://api.harvardartmuseums.org/object?q=totalpageviews:1&size=100&page=';
var apiKey = '&apikey=506b01a0-40d2-11e8-9ec4-7fae965d6296';

var titleText; //store page title text
var bgColor; //store background color
var img, imgUrl;

function setup(){
	noCanvas();
	bgColor = '#ffe589';
	titleText = 'LEAST VIEWED ARTWORKS';
	title = createElement('h2', titleText);
	titleStyle();
	title.style('left', '660px');
    title.style('top', '130px');
    title.style('width', '550px');

	homeButtonElement = createButton('<');
	homeButtonElement.mousePressed(returnToHome);	
	homeButtonStyle();
	homeButtonElement.style('left', '670px');
    homeButtonElement.style('top', '120px');
    homeButtonElement.mouseOver(highlight);
  	homeButtonElement.mouseOut(unhighlight);

  	mostActivetitle = createP("- Explore the forgotten ones in HAM collection");
	mostActivetitleStyle();
	mostActivetitle.style('left', '660px');
    mostActivetitle.style('top', '450px');
    mostActivetitle.style('width', '500px');

    buttonElement = createButton('browse');
	buttonElement.mousePressed(requestAPI);
	buttonStyle();
	buttonElement.style('left', '670px');
    buttonElement.style('top', '550px');
    buttonElement.mouseOver(bHighlight);
  	buttonElement.mouseOut(bUnhighlight);

  	img = createImg('assets/start.png');
	imgStyle();
	img.style('width', '650px');
  	img.style('height', '640px');
}

function requestAPI(){
	var num = int(random(100));
	var url = method+num+apiKey;
	loadJSON(url, function getLeastObject(data){
		var objectNum = int(random(100));
		// console.log(data.records[objectNum].title);
		imgUrl = data.records[objectNum].primaryimageurl;

		title.html(data.records[objectNum].title);
		if (imgUrl == null){
			img.remove();
			img = createImg('assets/notFound.png');
			imgStyle();
			img.style('width', '600px');
  			img.style('height', '640px');
			console.log('no image found');
		} else {
			img.remove();
			img = createImg(imgUrl);
			imgStyle();
			img.style('width', '600px');
  			img.style('height', '640px');
		}		
		if (data.records[objectNum].people.displayname == null) {
			mostActivetitle.html('Unknown Artist');
		} else {
  			mostActivetitle.html(data.records[objectNum].people.displayname + '\n'+ data.records[objectNum].url);
		}
		console.log(data.records[objectNum].title);
		console.log(data.records[objectNum].people.displayname);
	});
}



function returnToHome(){
    window.open('homepage.html','_self');
}

function bHighlight() {
  this.style('background-color', '#383838');
  this.style('color', bgColor);
  this.style('cursor', 'pointer');
  this.style('transition-duration', '0.3s'); 
}

function bUnhighlight() {
  this.style('background-color', bgColor);
  this.style('color', '#383838');
  this.style('transition-duration', '0.3s'); 
}