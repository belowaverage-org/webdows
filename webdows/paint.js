var newImage = new Image();
var oldImage = newImage;
$(newImage).ready(function() {
	
});
var win = new explorer.window()
.title('Paint')
.resize(800, 500)
.center();
win.on.close = function() {
	clearInterval(mainInterval);
};
var bod = win.body;
var canvas = $('<canvas style="width:100%;height:100%;top:0px;left:0px;position:absolute;" width="1000" height="1000"></canvas>').appendTo(win.body)[0];
var ctx = canvas.getContext('2d');
ctx.fillStyle = 'rgb(0, 0, 0)';
var mainInterval = 0;
var lastWidth = 0;
var lastHeight = 0;
var mouseDown = false;
var lastTracePointX = 0;
var lastTracePointY = 0;
var currentTracePointX = 0;
var currentTracePointY = 0;
window.canvas = canvas;
window.ctx = ctx;
window.bod = bod;
function save() {
	newImage.src = canvas.toDataURL("image/png");
};
function restore() {
	ctx.drawImage(newImage, 0, 0);
};
bod[0].onresize = function() {
	canvas.width = bod.width();
	canvas.height = bod.height();
};
mainInterval = setInterval(function() {
	var width = bod.outerWidth();
	var height = bod.outerHeight();
	if(width !== lastWidth || height !== lastHeight) {
		lastWidth = width;
		lastHeight = height;
		save();
		setTimeout(function() {
			canvas.width = width;
			canvas.height = height;
			restore();
		});
	}
	if(mouseDown) {
		ctx.beginPath();
		ctx.lineTo(lastTracePointX, lastTracePointY);
		ctx.lineTo(currentTracePointX, currentTracePointY);
		ctx.stroke();
		lastTracePointX = currentTracePointX;
		lastTracePointY = currentTracePointY;
	}
}, 16.666);
function mouseUp(e) {
	mouseDown = false;
	$('#desktop').off('mouseup', mouseUp);
};
$(canvas).on('mousedown', function(e) {
	$('#desktop').on('mouseup', mouseUp);
	lastTracePointX = e.pageX - $(e.target).offset().left;
	lastTracePointY = e.pageY - $(e.target).offset().top;
	mouseDown = true;
});
$(canvas).on('mousemove', function(e) {
	currentTracePointX = e.pageX - $(e.target).offset().left;
	currentTracePointY = e.pageY - $(e.target).offset().top;
});
