function Game(canvasID) {
	//Take out body spacing and silly side bars
	document.body.style.margin = 0;
	document.body.style.padding = 0;
	document.body.style.overflow = "hidden";
	document.body.style.cursor = "none";
	
	//Allows you to set the cursor type or turn it off
	this.cursor = function(bool, type) {
		if(bool) {
			document.body.style.cursor = type;
		} else {
			document.body.style.cursor = "none";
		}
	}
	
	//Importing the Game object for function use
	var self = this;
	
	this.canvasElement = document.getElementById(canvasID);
	
	this.screen = new Object;
	this.screen.adjust=function (){
		self.screen.width = window.innerWidth;
		self.screen.height = window.innerHeight;
		self.canvasElement.width = self.screen.width;
		self.canvasElement.height = self.screen.height;
	}

	this.canvasElement.style.backgroundColor = "black";

	//Canvas size updates when window size changes
	window.onresize = function(){self.screen.adjust()};
	this.screen.adjust();
	
	this.context = this.canvasElement.getContext("2d");
	
	var clearScreen = function(){
		self.context.clearRect(0, 0, self.screen.width, self.screen.height);
	};

	//Export FPS
	this.fps = 0;
	
	//FPS Private stuff
	var fps = {};
	fps.currentTime = new Number();
	fps.lastTime = 0;
	fps.timePerTick = 17;
	fps.updateTime = Date.now(); //This sets a time stamp every second to update the Game.fps
	fps.get = function(currentTime, lastTime) {
		var fps = 1000 / (currentTime - lastTime);
		return fps.toFixed();
	};
	fps.update = function() {
		fps.currentTime = Date.now();
		if(fps.currentTime - fps.updateTime >= 1000) {
			self.fps = fps.get(fps.currentTime, fps.lastTime);
			fps.updateTime = fps.currentTime;
		}
		fps.timePerTick = fps.currentTime - fps.lastTime;
		fps.lastTime = fps.currentTime;
		
	};
	
	//Other function
	this.speedPerSecond = function(speed) {
		return speed / fps.timePerTick;
	};
	
	//This starts the main game loop
	this.loop = function (custom){
		requestAnimationFrame(function(){
			fps.update();
			clearScreen();
			custom();
			self.loop(custom);
		})
 	};
}