/*!
Project: Webdows
Liscense: MIT
Author: krisdb2009
Date: 03/14/16
File: webdows/system.js
*/
new explorer.window()
.title('System')
.icon('webdows/resources/icons/scre.ico')
.resize(500, 300)
.center()
.callback(function() {
	var win = this;
	function test() {
		var i = 0;
		try {
			for(i = 100; i <= 50000; i += 100) {
				localStorage.setItem('test', new Array((i * 1024) + 1).join('a'));
			}
		} catch(e) {
			localStorage.removeItem('test');
			i = i - 100;
		}
		return i;
	}
	this.body.html('Local Storage:<br><span class="1"></span>&nbsp;<progress value="" max=""></progress>&nbsp;<button class="lst">Test</button><br><br>Browser UA:<br>'+navigator.userAgent);
	this.body.find('button.lst').click(function() {
		if(localStorage && !localStorage.getItem('capacity')) {
			var CACHE = JSON.parse(JSON.stringify(localStorage));
			localStorage.clear();
			var i = test();
			$.each(CACHE, function(i, v) {
				localStorage.setItem(i, v);
			});
			localStorage.setItem('capacity', i)
		} else if(localStorage) {
			var i = localStorage.getItem('capacity');
		}
		if(localStorage) {
			var j = test();
		}
		h = i - j;
		g = h / 1000;
		f = i / 1000;
		win.body.find('span.1').text(g+'/'+f+'MB');
		win.body.find('progress').attr('value', h).attr('max', i);
	});
});