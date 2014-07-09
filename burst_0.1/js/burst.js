Math.degrees = function(rad){
 return rad*(180/Math.PI);
}
 
Math.radians = function(deg){
 return deg * (Math.PI/180);
}

var radius = 200;
var outerCircle = 250;
var degrees = 3.6;
var steps = 100;
var linewidth = 5;
var radians = Math.radians(degrees);
var centerX = 700;
var centerY = 700;
var c = document.getElementById('burst');
var ctx = c.getContext("2d");
var colorArray = ["#b7121a","#ff9900","#fecc2e","#ff6600","#298658","#1788a3"];




function drawLine(whatX, whatY, oX, oY){

	var newColor = colorArray[Math.floor((Math.random() * 6))];
	ctx.strokeStyle = newColor;
	ctx.lineWidth = linewidth;
	ctx.lineCap = 'square';
	ctx.beginPath();
	ctx.moveTo(whatX,whatY);
	ctx.lineTo(oX, oY);
	ctx.closePath();
	ctx.stroke();
}

function makeCircle(){
	for (var i = 0; i < steps; i++){
		var newX = radius*Math.cos(radians*i) + centerX;
		var newY = radius*Math.sin(radians*i) + centerY;
		var outerX = outerCircle*Math.cos(radians*i) + centerX;
		var outerY = outerCircle*Math.sin(radians*i) + centerY;
		drawLine(newX, newY, outerX, outerY);
	}
	
}

makeCircle();