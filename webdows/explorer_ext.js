/*!
Project: Webdows
Liscense: MIT
Author: krisdb2009
Date: 05/02/16
File: webdows/explorer_ext.js
*/

/* 
explorer.file.draw(selector) //Draws a directory in the selected JQ selector.
.path(path) //Moves to path.
.forward() //Moves forward: Returns false if cant move any farther, True if more is avalible
.back() //Moves backwords: Returns false if cant move any farther, True if more is avalible
.up() //Moves up a directory: Returns false if cant move any farther, True if more is avalible
.callback(function() {
	//Called back after creation.
});

explorer.file.select(path, function() { //Function that returns a callback of the path that is selected.
	
});

explorer.file.explore(path); //Opens explorer window.

*/
$.extend(explorer, {
	file_explorer : function (location) {
		if(typeof location == 'undefined') {
			var location = '';
		}
		var ret = null;
		new explorer.window()
		.resize(600, 400)
		.center()
		.title('File Explorer')
		.icon('webdows/resources/icons/fold.ico')
		.menuBar([
		{
			title: 'asdf'
		}
		])
		.callback(function() {
			var win = this;
			var body = this.body;
			var id = this.id;
			win.jq.append(`
			<style>
				.window[windowid=`+id+`] input[type=text] {
					width:calc(100% - 80px);
					position:absolute;
					top:32px;left:68px;
					background-color:rgba(255,255,255,0.6);
					border:1px solid rgba(0,0,0,0.2);
					border-top:1px solid rgba(0,0,0,0.5);
					box-shadow:inset 1px 1px 0px rgba(255,255,255,0.3),inset -1px -1px 0px rgba(255,255,255,0.3);
				}
				.window[windowid=`+id+`] input[type=text]:hover, .window[windowid=`+id+`] input[type=text]:focus {
					background-color:white;
				}
				.window[windowid=`+id+`] .navbutts {
					image-rendering:pixelated;
					width:57px;
					height:27px;
					background-image:url('webdows/resources/explorer/4.png');
					position:absolute;
					top:30px;
					left:6px;
				}
				.window[windowid=`+id+`] .ttl .icon, .window[windowid=`+id+`] .ttl .title {
					opacity:0;
				}
				.window[windowid=`+id+`] .links {
					margin:10px;
					position:relative;
					display:inline-block;
					width:50px;
					height:50px;
				}
				.window[windowid=`+id+`] .links.focus {
					background-color:red;
				}
				.window[windowid=`+id+`] .links span {
					margin-left:-5px;
					top:50px;
					width:60px;
					position:absolute;
					text-align:center;
					font-size:12px;
					white-space:nowrap;
					overflow:hidden;
					text-overflow:ellipsis;
				}
				.window[windowid=`+id+`] .links.focus span {
					white-space:inherit;
					overflow:inherit;
					text-overflow:inherit;
					word-break:break-all;
				}
			</style>
			`);
			function explore(location) {
				win.jq.find('input[type=text]').val(location);
				body.html('');
				if(typeof location !== 'string') {
					var location = '';
				}
				var tree = location.split('/');
				if(tree.shift() == 'WFS:') {
					var dir = system.files;
					$.each(tree, function() {
						if(this.valueOf() !== '') {
							dir = dir[this];
						}
					});
					$.each(dir, function(folder) {
						var file = this;
						var name = '';
						var icon = '';
						var type = ''
						if(typeof file.valueOf() == 'object') {
							type = 'folder';
							name = folder;
							icon = 'webdows/resources/icons/fold.ico';
						} else if(typeof file.valueOf() == 'string') {
							type = 'file';
							name = file;
							icon = 'webdows/resources/icons/file.ico';
							switch(file.split('.').pop()) {
								case 'txt':   icon = 'webdows/resources/icons/note.ico'; break;
								case 'js' :	  icon = 'webdows/resources/icons/exei.ico'; break;
								case 'png':   icon = 'webdows/resources/icons/pngi.ico'; break;
								case 'gif':   icon = 'webdows/resources/icons/gifi.ico'; break;
								case 'jpg':   icon = 'webdows/resources/icons/jpgi.ico'; break;
								case 'ico':   icon = 'webdows/resources/icons/bmpi.ico'; break;
							}
						}
						body.append('<div title="'+name+'" class="icon links '+type+'" style="background-image:url(\''+icon+'\');"><span>'+name+'</span></div>');
					});
				}
			};
			body.on('dblclick', 'div.links.folder', function() {
				explore(win.jq.find('input[type=text]').val()+'/'+$(this).find('span').html());
			});
			body.on('dblclick', 'div.links.file', function() {
				
			});
			body.on('click', 'div.links', function(e) {
				body.find('div.links').removeClass('focus');
				$(this).addClass('focus');
				e.stopImmediatePropagation();
			});
			body.click(function() {
				body.find('div.links').removeClass('focus');
			});
			win.jq.append('<span class="navbutts"><span style="display:inline-block;width:25px;height:25px;margin:1px 3px 0px 2px;background-image:url(\'webdows/resources/explorer/6.png\');"></span><span style="display:inline-block;width:25px;height:25px;background-image:url(\'webdows/resources/explorer/7.png\');"></span></span><input value="'+location+'" type="text"/>');
			win.jq.find('input[type=text]').keyup(function(e) {
				if(e.which == 13) {
					explore($(this).val());
				}
			});
			explore(location);
			ret = this;
		}).body.css({'background-color':'white'}).parent().css('min-height','100px');
		return ret;
	}
});