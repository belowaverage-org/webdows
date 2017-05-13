new explorer.window()
.title('Task Manager')
.icon('webdows/resources/icons/task.ico')
.callback(function() {
	var b = this.body;
	var count = 0;
	setIntasderval(function() {
		b.html(count++);
	}, 100);
	console.log(script.path);
});