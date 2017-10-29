window.explorer.replacedWindow = window.explorer.window;
window.explorer.window = function() {
	var extwin = window.open('', '_blank', 'resizable=yes, status=no, scrollbars=yes, menubar=no, titlebar=no, width=1, height=1, top=100, left=100');
	
	var expwin = new window.explorer.replacedWindow();
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
	expwin.jq.remove();
	$(extwin.document.body).append(`
		<!DOCTYPE html>
		<html>
			<head>
				<title>Webdows Window External</title>
				<link class="explorer" href="`+document.URL+`webdows/resources/explorer/explorer.css" rel="stylesheet" type="text/css">
				<link class="explorer" id="theme" href="`+document.URL+`webdows/resources/explorer/webdows/index.css" rel="stylesheet" type="text/css">
				<style>
					body {
						margin:0px !important;
					}
					div.window {
						width:100% !important;
						height:100% !important;
						position:fixed !important;
						top:0px !important;
						left:0px !important;
					}
					div.window.maximized {
						height:100% !important;
					}
				</style>
			</head>
			<body>
				<div class="window maximized" windowid="`+expwin.id+`">
					<div class="body"></div>
				</div>
			</body>
		</html>
	`);
	expwin.body = $(extwin.document.body).find('div.window div.body');
	return expwin;
};