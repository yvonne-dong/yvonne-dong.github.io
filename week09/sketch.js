
var exhibition; //store data
var introData; //store data for introduction
var exhibitionNum; //exhibition id
var buttonElement; //for generating random exhibition
var exhibitionImg; //exhibition image
var pageNum; //what page of the record
var text; //exhibition name
var title; //heading
var introduction; //intro text
var url; //url to exhibition page

function setup(){
	noCanvas();

  	title = createElement('h2', 'RANDOM EXHIBITION EXPLORER');
  	buttonElement = createButton('find exhibition!');
  	buttonElement.mouseOver(highlight);
  	buttonElement.mouseOut(unhighlight);
  	buttonElement.mousePressed(buttonPressed);
  	buttonStyle();
	  titleStyle();
  	text = createP("JODI: OXO");
  	introduction = createP("DATE: 1998-06-04 to 1998-08-16");
  	textStyle();
  	url = createP("https://www.harvardartmuseums.org/visit/exhibitions/5664");
  	url.style('font-size', '15px');
  	url.style('text-decoration', 'underline');
  	url.mouseOver(highlight);
  	url.mouseOut(unhighlight);
    // url.mousePressed(getExhibition.greet);
  	exhibitionImg = createImg('https://ids.lib.harvard.edu/ids/view/437010373?height=675');
  	imgStyle();
  	
}

function highlight() {
  this.style('background-color', 'blue');
  this.style('color', 'white');
  this.style('cursor', 'pointer');
  this.style('transition-duration', '0.4s');
}

function unhighlight() {
  this.style('background-color', '#FFF');
  this.style('color', '#383838');
  this.style('transition-duration', '0.4s');
}

function buttonPressed() {
	page = int(random(1,42));
	var loading = loadJSON('https://api.harvardartmuseums.org/exhibition?hasimage=1&page='
		+page+'&apikey=506b01a0-40d2-11e8-9ec4-7fae965d6296', getExhibition);
	console.log(exhibitionNum);
	console.log(loading);
}


function getExhibition(data) {
	exhibition = data;
	exhibitionNum = int(random(9));
	exhibitionImg.remove();
	exhibitionImg = createImg(exhibition.records[exhibitionNum].primaryimageurl);
	imgStyle();
  text.html(exhibition.records[exhibitionNum].title);
  introduction.html("DATE: " + exhibition.records[exhibitionNum].begindate + " to " + exhibition.records[exhibitionNum].enddate);
  url.html(exhibition.records[exhibitionNum].url);

}
