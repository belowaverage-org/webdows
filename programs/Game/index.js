system.legacyLoader('programs/Game/Build/UnityLoader.js', function() {
	new explorer.window()
	.title('Test Game')
	.resize(500,400)
	.center()
	.callback(function() {
		var id = system.guid();
		var body = this.body;
		body.attr('id', id);
		body.attr('style', 'overflow:hidden;');
		gameInstance = UnityLoader.instantiate(id, "programs/Game/Build/New Folder.json");
		body.parent().find('.ui-resizable-handle, span.max').mouseup(function() {
			body.find('canvas').attr('style', 'width:100%;height:100%;');
		});
	});
});