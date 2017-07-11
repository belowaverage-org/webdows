/*!
Project: Webdows
Liscense: MIT
Author: krisdb2009
Date: 05/01/16
File: webdows/webver.js
*/
new explorer.window()
.resize(450, 400)
.center()
.controls([])
.title('About Webdows')
.icon('webdows/resources/icons/info.ico')
.callback(function() {
	this.body
	.css({'font-size':'10px'})
	.html('<center><span style="font-size:33px;"><img style="margin-right:5px;vertical-align:-20px;width:64px;height:64px;" src="webdows/resources/explorer/webdows/so3.png">Webdows 6</span></center><hr><div>Below Average Webdows | Version 6.0 (Build 0002)<br> The MIT License (MIT) Copyright (c) 2016 krisdb2009 <br> Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.<br><span style="float:right;">Webdows is NOT affiliated with Microsoft</span></div><button class="credits">Credits</button><button class="ok">Ok</button>');
	this.body.find('button.ok')
	.css({'width':'80px','height':'20px','position':'absolute','bottom':'10px','right':'10px'})
	.click({win: this}, function(e) {
		e.data.win.close();
	});
	this.body.find('button.credits')
	.css({'width':'80px','height':'20px','position':'absolute','bottom':'10px','left':'10px'})
	.click({win: this}, function(e) {
		new explorer.window()
		.closeWith(e.data.win)
		.controls([])
		.title('Credits')
		.resize(450, 400)
		.center()
		.icon('webdows/resources/icons/info.ico')
		.callback(function() {
			this.body
			.html('<pre style="user-select:text;margin:0px;top:0px;left:0px;border:0px;position:absolute;width:100%;height:100%;word-wrap:break-word;white-space:pre-wrap;"></pre>')
			.find('pre')
			.load('credits.txt');
		});
	});
	this.body.find('div')
	.css({'padding-left':'20px','padding-right':'20px','padding-top':'10px'});
	this.body.find('center h1')
	.css({'font-size':'40px','margin':'5px'});
});