var win = loader.args.win;
var queue = loader.args.queue;
var menuBar = {
	
};
queue.open = function() {
	queue.window = new explorer.window()
	.title('YouTube Sync - Queue')
	.icon(loader.folder+'icon.png')
	.resize(200, 360)
	.center('', 264, -100)
	.closeWith(win)
	.controls([]);
	queue.window.menuBar(menuBar);
}