var win = new explorer.window()
.resize(500, 500)
.toggleMax()
.title('gravity');
var bod = win.body;

bod.css({
	overflow: 'hidden'
});

var ball = $('<div class="ball"></div>')
.css({
	width: 50,
	height: 50,
	position: 'absolute',
	'border-radius': '50px',
	'background-color': 'red'
})
.appendTo(bod);

var time = 0; //Time in seconds
var initialVelocity = 200; //Initial velocity
var initialAngle = 60; //Angle
var xStart = 0;
var yStart = 0;
var xReverse = false;

//Constants
var g = 9.81; //Gravity, earth = 9.81

var interval = setInterval(function() {
	time += .1;
	
	var ballHeight = ball.height();
	var bodyHeight = bod.height();
	var bodyWidth = bod.width();
	
	var radian = initialAngle * Math.PI / 180;
	
	var vx = initialVelocity * Math.cos(radian);
	var vy = (initialVelocity * Math.sin(radian)) - (g * time);
	
	var x = xStart + (vx * time * Math.cos(radian));
	
	var y = yStart + (vy * time * Math.sin(radian)) - (.5 * g * Math.pow(time, 2));
	
	
	
	
	//Detect Collisions
	if(y <= 0) {
		time = 0;
		xStart = x;
		yStart = y;
		/*if(initialVelocity > 0) {
			initialVelocity -= 20;
		}*/
	}
	if(x <= 0) {
		xReverse = !xReverse;
	}
	if(x >= bodyWidth) {
		xReverse = !xReverse;
	}
	if(xReverse) {
		x = (bodyWidth * 2) + (x * -1);
	}
	
	//Update ball...
	ball.css({
		top: bodyHeight - ballHeight + (y * -1),
		left: x
	});
}, 10);

win.on.close = function() {
	clearInterval(interval);
};