window.explorer.replacedWindow = window.explorer.window;
window.explorer.window = function() {
	var expwin = new window.explorer.replacedWindow();
	var extwin = window.open(document.URL+'popup.html', expwin.id, 'resizable=yes, status=no, scrollbars=yes, menubar=no, titlebar=no, width=1, height=1, top=100, left=100');
	expwin.jq.hide();
	function replace() {
		expwin.jq.show();
		var initWidth = expwin.jq.width();
		var initHeight = expwin.jq.height();
		expwin.center('top left');
		expwin.toggleMax();
		extwin.onunload = function() {
			expwin.close();
		};
		expwin.replacedToggleMin = expwin.toggleMin;
		expwin.toggleMin = function() {
			expwin.front();
		};
		expwin.replacedClose = expwin.close;
		expwin.close = function() {
			expwin.replacedClose();
			extwin.close();
			return this;
		};
		expwin.replacedCenter = expwin.center;
		expwin.center = function(ignored, x, y) {
			extwin.moveTo(x, y);
			return this;
		};
		expwin.replacedResize = expwin.resize;
		expwin.resize = function(x, y) {
			extwin.resizeTo(x + 10, y + 35);
			return this;
		};
		expwin.replacedFront = expwin.front;
		expwin.front = function() {
			extwin.focus();
			return this;
		};
		expwin.resize(initWidth, initHeight);
		$(extwin.document.body).append(expwin.jq);
	};
	var interval = setInterval(function() {
		if($(extwin.document.head).find('title').text() == 'Webdows') {
			clearInterval(interval);
			delete interval;
			replace();
		}
	}, 5);
	return expwin;
};