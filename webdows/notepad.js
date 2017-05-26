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
	this.menuBar([
		{
			title: 'File',
			context: [
				{
					title: 'New'
				}, {
					title: 'Open...'
				}, {
					title: 'Save'
				}, {}, {
					title: 'Print...'
				}, {}, {
					title: 'Exit'
				}
			]
		}, {
			title: 'Edit',
			context: [
				{
					title: 'Undo'
				}, {}, {
					title: 'Cut'
				}, {
					title: 'Copy'
				}, {
					title: 'Paste'
				}, {
					title: 'Delete'
				}, {}, {
					title: 'Find...'
				}, {}, {
					title: 'Select All'
				}, {
					title: 'Time/Date'
				}
			]
		}, {
			title: 'Format',
			context: [
				{
					title: 'Word Wrap'
				}
			]
		}, {
			title: 'Help',
			context: [
				{
					title: 'About Notepad'
				}
			]
		}
	]);
	this.body.html('<textarea></textarea>');
	this.body.find('textarea').attr('style', 'overflow:scroll;top:0px;left:0px;position:absolute;border:0;margin:0;width:100%;height:100%;margin:0;padding:0;resize:none;');
});