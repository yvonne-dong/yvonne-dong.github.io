
var exhibition; //store data
var introData; //store data for introduction
var exhibitionNum; //exhibition id
var buttonElement; //for generating random exhibition
var exhibitionImg; //exhibition image
var page = 0; //what page of the record
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
  	introduction = createP("DATE: 2018-02-07 to 2018-04-23");
  	textStyle();
  	url = createA("https://www.harvardartmuseums.org/visit/exhibitions/5664", 
		      "https://www.harvardartmuseums.org/visit/exhibitions/5664");
    // url = createP("https://www.harvardartmuseums.org/visit/exhibitions/5664");
  	url.style('font-size', '15px');
  	url.style('text-decoration', 'underline');
  	url.mouseOver(highlight);
  	url.mouseOut(unhighlight);
    url.mousePressed(urlPressed);
	  createElement('br');
    createElement('br');
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

function urlPressed() {
	loadJSON('https://api.harvardartmuseums.org/exhibition?hasimage=1&page='
		+page+'&apikey=506b01a0-40d2-11e8-9ec4-7fae965d6296', gotoPage);
}

function gotoPage(data){
    var gotoLink = data.records[exhibitionNum].url
    window.open(gotoLink, '_blank');
}
