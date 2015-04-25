var 

game = new Game("canvas"),
penTip = 2,
drawSpeed = 0.5,
radius = 100,
xOffset = 0.87,
i = 0,
rings = 2;
flower = [
	{x: 0, y:0},

	{x: 0, y: -radius},
	{x: radius * xOffset, y: -radius / 2},
	{x: radius * xOffset, y: radius / 2},
	{x: 0, y: radius},
	{x: -radius * xOffset, y: radius / 2},
	{x: -radius * xOffset, y: -radius / 2},
	
	{x: 0, y: -radius * 2},
	{x: radius * 2 * xOffset, y: -radius * 2 / 2},
	{x:  radius * 2 * xOffset, y:  radius * 2 / 2},
	{x: 0 , y:  radius * 2},
	{x:  -radius * 2 * xOffset, y:  radius * 2 / 2},
	{x:  -radius * 2 * xOffset, y:  -radius * 2 / 2},
	
	{x: 0, y: -radius * 3},
	{x: radius * 3 * xOffset, y: -radius * 3 / 2},
	{x:  radius * 3 * xOffset, y:  radius * 3 / 2},
	{x: 0 , y:  radius * 2},
	{x:  -radius * 3 * xOffset, y:  radius * 3 / 2},
	{x:  -radius * 3 * xOffset, y:  -radius * 3 / 2}
],
circles = new Array(),
drawTimer = Date.now();

game.cursor(true, "pointer");
var drawCircle = function(x, y, penTip) {
	var context = game.context;
	context.beginPath();
	context.arc(x, y, radius, 0, penTip * Math.PI, false);
	context.lineWidth = 1;
	context.strokeStyle = 'white';
	context.stroke();
	context.closePath();
};
function Circle(x,y) {
	this.x = x + game.screen.width / 2;
	this.y = y + game.screen.height / 2;
	this.drawn = false;
	this.penTip = 0;
}
var createCircles = function () {
	for(var i = 0; i < rings; i++) {
		var 
		x = 0, y = 0,
		ring = i + 1,
		offsetRing = radius * ring;
		
		for(var j = 0; j < 6; j++) {
			//circles.push(new Circle(game.screen.width / 2 + flower[i].x, game.screen.height / 2 + flower[i].y));
			if(i > 0) {
			switch(j) {
				case 0:
					x += 0;
					y += -radius * ring;
					break;
				case 1:
					x += radius * ring * xOffset;
					y += -radius * ring / 2;
					break;
				case 2:
					x += radius * ring * xOffset;
					y += radius * ring / 2;
					break;
				case 3:
					x += 0;
					y += radius * ring;
					break
				case 4:
					x += -radius * ring * xOffset;
					y += offsetRing / 2;
					break;
				case 5:
					x += -offsetRing * xOffset;
					y += -offsetRing / 2;
					break;
			}
			} else {
				switch(j) {
					case 0:
						x += 0; 
						y += -radius;
						break;
					case 1:
						x += radius * xOffset; 
						y += -radius / 2;
						break;
					case 2:
						x += radius * xOffset;
						y += radius / 2;
						break;
					case 3:
						x += 0; 
						y += radius;
						break;
					case 4:
						x += -radius * xOffset;
						y += radius / 2;
						break;
					case 5:
						x += -radius * xOffset; 
						y += -radius / 2;
						break;
				}
			}
			circles.push(new Circle(x, y));
			
		}
	}
};

var createCircles = function() {
	for(var i = 0; i < flower.length; i++) {
		circles.push(new Circle(flower[i].x, flower[i].y))
	}
};
var drawRing = function() {
	for(var i = 0; i < rings; i++) {
		for(var j = 0; j < 6; j++){
			
		}
	}
};


var tick = function() {
	if(Date.now() - drawTimer >= 1000 && i < circles.length) {
		circles[i].drawn = true;
		i++;
		drawTimer = Date.now();
	}
	for(var j = 0; j < circles.length; j++){
		if(circles[j].drawn === true) {
			drawCircle(circles[j].x, circles[j].y, circles[j].penTip);
			if(circles[j].penTip >= 2) {
				circles[j].penTip = 2;
			} else {
				circles[j].penTip += game.speedPerSecond(drawSpeed);
			}
			
		}
	}
	
};

createCircles();

game.loop(tick);
