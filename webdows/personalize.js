/*!
Project: Webdows
Liscense: MIT
Author: krisdb2009
Date: 03/14/16
File: webdows/personalize.js
*/
new explorer.window()
.resize(350, 285)
.center()
.controls(['min'])
.title('Personalization')
.icon('webdows/resources/icons/pers.ico')
.callback(function() {
	hexToRGB = function(h, o){
		function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}
		var r = parseInt((cutHex(h)).substring(0,2),16), g = parseInt((cutHex(h)).substring(2,4),16), b = parseInt((cutHex(h)).substring(4,6),16);
		return 'rgba('+r+','+g+','+b+','+o+')';
	}
	var theme = explorer.theme();
	var color = '';
	var background = '';
	this.body
	.attr('style', 'text-align:center;padding-top:5px;')
	.html('Webdows: <input value="webdows" type="radio" name="theme"> | Basic: <input value="basic" type="radio" name="theme"> | Classic: <input value="classic" type="radio" name="theme"><img class="webdows" src="webdows/resources/explorer/webdows/thumbnail.png"><img class="bg"><img class="classic" src="webdows/resources/explorer/classic/thumbnail.png"><img class="basic" src="webdows/resources/explorer/basic/thumbnail.png"><br><input type="color" title="Pick a theme color"><button class="bac" title="Pick a background">Background</button><button class="sav">Save</button><button class="app">Apply</button><button class="can">Cancel</button>')
	.find('img')
	.attr('style', 'width:310px;height:180px;margin:3px;display:inline-block;display:none;padding:2px;');
	this.body.find('.sav, .app, .can')
	.attr('style', 'float:right;margin-right:5px;')
	.click({win: this}, function(e) {
		var win = e.data.win;
		if(theme !== 'webdows') {
			color = '';
		} else {
			var c = win.body.find('input[type=color]').val();
			if(c !== '#000000') {
				color = ' #taskbar, #startmenu, .window {background-color:'+hexToRGB(c, .4)+' !important;} .window.active {background-color:'+hexToRGB(c, .5)+' !important;} ';
			} else {
				color = '';
			}
		}
		if(background !== '') {
			var bg = ' #desktop.explorer {background-image:url('+background+') !important;} ';
		} else {
			var bg = '';
		}
		if($(this).hasClass('sav')) {
			explorer.theme(theme, color+bg);
			win.close();
		}
		if($(this).hasClass('app')) {
			explorer.theme(theme, color+bg);
			elmeval(win);
		}
		if($(this).hasClass('can')) {
			win.close();
		}
	});
	this.body.find('input[type=color]').attr('style', 'height:16px;float:left;margin-left:5px;');
	var bac = {};
	this.body.find('.bac').attr('style', 'float:left;margin-left:5px;').click({win: this}, function(e) {
		var win = e.data.win;
		if(typeof bac.winid !== 'undefined') {
			bac.close();
		}
		background = '';
		bac = new explorer.window()
		.title('Pick a background...')
		.icon('webdows/resources/icons/pers.ico')
		.resize(300,100)
		.controls([])
		.closeWith(win)
		.center()
		.callback(function() {
			var cbt = this;
			this.body.html('<br><input style="display:block;margin-left:auto;margin-right:auto;" type="file">');
			function selectImg() {
				if(this.files && this.files[0]) {
					var FR = new FileReader();
					FR.onload = function(e) {
						background = e.target.result;
						win.body.find('img').hide();
						win.body.find('img.bg').show().attr('src', background);
						cbt.close();
					};	   
					FR.readAsDataURL(this.files[0]);
				}
			}
			this.body.find('input[type=file]').change(selectImg);
		});
	});
	function elmeval(win) {
		win.body.find('img').hide();
		win.body.find('img.'+theme).show();
		if(theme == 'webdows') {
			win.body.find('input[type=color]').show();
			win.body.attr('style', 'text-align:center;color:white;background-color:transparent;border:none;box-shadow:none;');
		} else {
			win.body.find('input[type=color]').hide();
			win.body.attr('style', 'text-align:center;');
		}
	}
	elmeval(this);
	this.body.find('img.'+theme).show();
	this.body.find('input[value='+theme+']').click();
	this.body.find('input[name=theme]').change({win: this}, function(e) {
		var win = e.data.win;
		background = '';
		color = '';
		win.body.find('input[type=color]').val('#000000');
		theme = $(this).val();
		win.body.find('img').hide();
		win.body.find('img.'+theme).show();
		if(theme == 'webdows') {
			win.body.find('input[type=color]').show();
		} else {
			win.body.find('input[type=color]').hide();
		}
	});
});
