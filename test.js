window.explorer.replacedWindow = window.explorer.window;
window.explorer.window = function() {
	var extwin = window.open('', '_blank', 'resizable=yes, status=no, scrollbars=yes, menubar=no, titlebar=no, width=200, height=200, top=10, left=10');
	var expwin = new window.explorer.replacedWindow();
	expwin.jq.remove();
	expwin.body = $(extwin.document.body);
	return expwin;
};