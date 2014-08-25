var candles = 6;
var candleWidth = 50;
var candleHeight = 200;
var candleMargin = 30;
var colorArray = ["#b7121a","#ff9900","#fecc2e","#ff6600","#298658","#1788a3"];
var candleLoc = Array();
var newArray = Array();

var c = document.getElementById('candles');
var ctx = c.getContext("2d");

var W = window.innerWidth, H = window.innerHeight;
c.width = W;
c.height = H;

/*
//Make the canvas occupy the full page
	var W = window.innerWidth, H = window.innerHeight;
	canvas.width = W;
	canvas.height = H;
*/

var particles = [];
//var mouse = {};

var particle_count = 100;


function drawCandle(whatX, whatY, whatColor){
	var oX = whatX;
	var oY = whatY - candleHeight
	//candleLoc.push([whatColor,[oX,oY]]);
	
	newArray = [oX, oY];
	candleLoc.push(newArray);
	
	var newColor = colorArray[whatColor];
	ctx.strokeStyle = newColor;
	ctx.lineWidth = candleWidth;
	ctx.lineCap = 'square';
	ctx.beginPath();
	ctx.moveTo(whatX,whatY);
	ctx.lineTo(oX, oY);
	ctx.closePath();
	ctx.stroke();
}


function drawCandles(howMany){

	for (var i = 0; i < candles; i++){
		var newX = (200+(candleWidth * i))+(candleMargin*i);
		drawCandle(newX, 800, i);
	}
	
	
	for(var i = 0; i < particle_count; i++){
		particles.push(new fire_particle());
	}


}

function fire_particle(){
	//speed, life, location, life, colors
	//speed.x range = -2.5 to 2.5 
	//speed.y range = -15 to -5 to make it move upwards
	//lets change the Y speed to make it look like a flame
	this.speed = {x: -2.5+Math.random()*5, y: -15+Math.random()*10};
	//this.location = {x: W/2, y: H/2};
	console.log(candleLoc);
	var flameX = candleLoc[0][0];
	var flameY = candleLoc[0][1];
	this.location = {x: flameX, y: flameY};
	//radius range = 10-30
	this.radius = 10+Math.random()*20;
	//life range = 20-30
	this.life = 20+Math.random()*10;
	this.remaining_life = this.life;
	//colors
	this.r = Math.round(Math.random()*255);
	this.g = Math.round(Math.random()*255);
	this.b = Math.round(Math.random()*255);
}

function draw(){
	//Painting the canvas black
	//Time for lighting magic
	//particles are painted with "lighter"
	//In the next frame the background is painted normally without blending to the 
	//previous frame
	ctx.globalCompositeOperation = "source-over";
	//ctx.fillStyle = "black";
	//ctx.fillRect(0, 0, W, H);
	ctx.globalCompositeOperation = "darker";
	
	for(var i = 0; i < particles.length; i++){
		var p = particles[i];
		ctx.beginPath();
		//changing opacity according to the life.
		//opacity goes to 0 at the end of life of a particle
		p.opacity = Math.round(p.remaining_life/p.life*100)/100
		//a gradient instead of white fill
		var gradient = ctx.createRadialGradient(p.location.x, p.location.y, 0, p.location.x, p.location.y, p.radius);
		gradient.addColorStop(0, "rgba("+p.r+", "+p.g+", "+p.b+", "+p.opacity+")");
		gradient.addColorStop(0.5, "rgba("+p.r+", "+p.g+", "+p.b+", "+p.opacity+")");
		gradient.addColorStop(1, "rgba("+p.r+", "+p.g+", "+p.b+", 0)");
		ctx.fillStyle = gradient;
		ctx.arc(p.location.x, p.location.y, p.radius, Math.PI*2, false);
		ctx.fill();
		
		//lets move the particles
		p.remaining_life--;
		p.radius--;
		p.location.x += p.speed.x;
		p.location.y += p.speed.y;
		
		//regenerate particles
		if(p.remaining_life < 0 || p.radius < 0){
			//a brand new particle replacing the dead one
			particles[i] = new fire_particle();
		}
	}
}

	
drawCandles(candles);


//console.log(candleLoc);
setInterval(draw, 33);


