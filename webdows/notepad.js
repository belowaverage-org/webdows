/*!
Project: Webdows
Liscense: MIT
Author: krisdb2009
Date: 03/14/16
File: webdows/notepad.js
*/
new explorer.window()
.title('Notepad')
.icon('webdows/resources/icons/note.ico')
.resize(500, 300)
.center()
.callback(function() {
	this.body.html('<textarea></textarea>');
	this.body.find('textarea').attr('style', 'top:0px;left:0px;position:absolute;border:0;margin:0;width:100%;height:100%;margin:0;padding:0;resize:none;');
});