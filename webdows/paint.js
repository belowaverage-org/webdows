var win = new explorer.window()
.title('Paint')
.resize(800, 500)
.center();
win.on.close = function() {
	clearInterval(resizeInterval);
};
var bod = win.body;
var canvas = $('<canvas style="width:100%;height:100%;top:0px;left:0px;position:absolute;"></canvas>').appendTo(win.body)[0];
var resizeInterval = 0;
window.canvas = canvas;
window.ctx = ctx;
window.bod = bod;

bod[0].onresize = function() {
	console.log('asdf');
	canvas.width = bod.width();
	canvas.height = bod.height();
};
var lastWidth = 0;
var lastHeight = 0;
resizeInterval = setInterval(function() {
	var width = bod.outerWidth();
	if(width !== lastWidth) {
		lastWidth = width;
		canvas.width = width;
	}
	var height = bod.outerHeight();
	if(height !== lastHeight) {
		lastHeight = height;
		canvas.height = height;
	}
	
}, 60);

var ctx = canvas.getContext('2d');
ctx.fillStyle = 'rgb(0, 0, 0)';
ctx.beginPath();
ctx.lineTo(100, 100);
ctx.lineTo(200, 200);
ctx.stroke();