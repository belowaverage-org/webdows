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
	var win = this;
	this.body
	.css({'font-size':'10px'})
	.html(`
		<center>
			<span style="font-size:33px;">
				<img style="margin-right:5px;vertical-align:-20px;width:64px;height:64px;" src="webdows/resources/explorer/webdows/so3.png">
				Webdows <span id="lv">...</span>
			</span>
		</center>
		<div>
			Below Average Webdows | Version <span id="version">...</span><span style="float:right;" id="showing">...</span>
			<pre>Loading license, Please wait...</pre>
			<span style="float:right;">Webdows is NOT affiliated with Microsoft</span>
		</div>
		<button class="credits">...</button>
		<button class="ok">Ok</button>
	`);
	this.body.find('pre').attr('style', `
		height:208px;
		background-color:white;
		padding:5px;
		overflow-y:auto;
		overflow-x:hidden;
		white-space:pre-wrap;
		font-family:consolas;
		user-select:text;
		cursor:text;
	`);
	$.get('./version.txt', function(version) {
		win.body.find('#version').text(version);
		var vp = version.split('.');
		win.body.find('#lv').text(Number(vp[0]+'.'+vp[1]).toString());
	});
	this.body.find('button.ok')
	.css({'width':'80px','height':'20px','position':'absolute','bottom':'10px','right':'10px'})
	.click({win: this}, function(e) {
		e.data.win.close();
	});
	var index = 0;
	this.body.find('button.credits')
	.css({'padding-left':'10px','padding-right':'10px','width':'auto','height':'20px','position':'absolute','bottom':'10px','left':'10px'})
	.click({win: this}, function(e) {
		var button = $(this);
		var list = [
			{
				title:'Webdows License',
				location: './license.txt'
			}, {
				title:'License Terms',
				location: './legalcode.txt'
			}, {
				title:'Credits',
				location: './credits.txt'
			}, {
				title:'Other Licenses',
				location: './otherlicenses.txt'
			}
		];
		win.body.find('#showing, pre, button.credits').text('...');
		$.get(list[index].location, function(version) {
			win.body.find('#showing').text(list[index].title);
			win.body.find('pre').text(version);
			if(index == list.length - 1) {
				index = 0;
			} else {
				index++;
			}
			button.text(list[index].title);
		});
	});
	win.body.find('button.credits').click();
	this.body.find('div')
	.css({'padding-left':'10px','padding-right':'10px'});
	this.body.find('center h1')
	.css({'font-size':'40px','margin':'5px'});
});