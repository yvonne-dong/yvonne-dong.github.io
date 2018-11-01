
//https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.objects.getAlbers&access_token=<TOKEN>&id=<ID>
//https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.objects.getRandom&access_token=<TOKEN>&has_image=1

var api = 'https://api.collection.cooperhewitt.org/rest/';
var method = '?method=cooperhewitt.cafe.isOpen';
var getImage = '?method=cooperhewitt.objects.getRandom';
var getColors = '?method=cooperhewitt.objects.getAlbers';
var imageID = 0;
var accessToken = '&access_token=d5bde7650bddb48bc82ae646dcbe98c1';
var colorsId = '&id='+ imageID;
var hasImage = '&has_image=1';

//setting color palette
var color1 = 0;
var color2 = 0;
var color3 = 0;

var objectImg; //random object image
var imgUrl = 0; //url to get the image

var buttonElement; //for generating random object

var PaintSquare = [];

function placeCanvas() {
  var x = 650;
  var y = 190;
  cnv.position(x, y);
}

function setup(){
	cnv = createCanvas(300, 300);
	cnv.style('padding', '10px');
	cnv.style('border', '5px solid #383838');
  	placeCanvas();
	rectMode(CENTER);

	title = createElement('h2', 'RANDOM OBJECT EXPLORER');
	titleStyle();
	description = createElement('p', 'Draw here');
	descriptionStyle();

  	buttonElement = createButton('find another object!');
  	buttonElement.mouseOver(highlight);
  	buttonElement.mouseOut(unhighlight);
  	buttonElement.mousePressed(startAPI);
  	buttonStyle();

  	objectImg = createImg('https://images.collection.cooperhewitt.org/310152_17848d2f4b32ff79_sq.jpg');
  	imgStyle();
}

function draw(){
	background(245);
	noStroke();
	if (imgUrl != 0 && color1 != 0) {
		// textSize(32);
		// text(test, 10, 30);
		for (var i = 0; i < PaintSquare.length; i++) {
    		PaintSquare[i].display();
  		}
		push();
		translate(width/2, height/2);
		rotate(frameCount/50.0);
		var c1 = color(color1);
		fill(c1);
		rect(0, 0, 50, 50);
		var c2 = color(color2);
		fill(c2);
		rect(0, 0, 30, 30);
		var c3 = color(color3);
		fill(c3);
		rect(0, 0, 20, 20);
		pop();
	} else {
		fill(0);
		rect(width/2, height/2, 50, 50);
		rect(width/2, height/2, 30, 30);
		rect(width/2, height/2, 20, 20);
	}	
}

function paintSquare(position, size, setColor){
	this.position = position;
	this.size = size;
	this.setColor = setColor;
	this.display = function(){
		fillC = color(setColor);
		fill(fillC);
		push();
		translate(this.position.x, this.position.y);
		rect(0,0,this.size.x,this.size.y);
		pop();
		push();
		translate(width-this.position.x, this.position.y);
		rect(0,0,this.size.x,this.size.y);
		pop();
		push();
		translate(this.position.x, height-this.position.y);
		rect(0,0,this.size.x,this.size.y);
		pop();
		push();
		translate(width-this.position.x, height-this.position.y);
		rect(0,0,this.size.x,this.size.y);
		pop();
	}
}

function mouseDragged(){
	var colorPalette = [color1, color2, color3];
	PaintSquare.push(new paintSquare(createVector(mouseX,mouseY),createVector(int(mouseX/15), int(mouseY/15)), colorPalette[int(random(0,3))]));
}

function startAPI(){
	PaintSquare.splice(0,PaintSquare.length);
	imageStart();
	if (imageID != 0) {
		colorStart();

	}
	if (imgUrl != 0) {
		//console.log(imgUrl);	
	}
	
}

//https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.objects.getRandom&access_token=<TOKEN>&has_image=1
function imageStart(){
	var url = api + getImage + accessToken;
  	loadJSON(url, gotImageData);
  	//console.log(imageID);
}
function gotImageData(data){	
	imageID = data.object.id;
	imgUrl = data.object.images[0].sq.url;
	objectImg.remove();	
	objectImg = createImg(imgUrl);
	imgStyle();
}

//https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.objects.getAlbers&access_token=<TOKEN>&id=<ID>
function colorStart(){
	colorsId = '&id='+ imageID;
	var url = api + getColors + accessToken + colorsId + hasImage;
  	loadJSON(url, gotColorData);
}
function gotColorData(data){	
	//test = data.rings[0].hex_color;
	color1 = data.rings[0].hex_color;
	color2 = data.rings[1].hex_color;
	color3 = data.rings[2].hex_color;
	console.log(color1);
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