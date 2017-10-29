window.explorer.replacedWindow = window.explorer.window;
window.explorer.window = function() {
	var extwin = window.open(document.URL+'blank.html', '_blank', 'resizable=yes, status=no, scrollbars=yes, menubar=no, titlebar=no, width=1, height=1, top=100, left=100');
	var expwin = new window.explorer.replacedWindow();
	expwin.jq.hide();
	
	extwin.onload = function() {
		expwin.jq.show();
		var initWidth = expwin.jq.width();
		var initHeight = expwin.jq.height();
		expwin.center('top left');
		extwin.onunload = function() {
			expwin.close();
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
		expwin.resize(initWidth + 10, initHeight + 35);
		expwin.jq.appendTo(extwin.document.body);
	};
	
	return expwin;
};