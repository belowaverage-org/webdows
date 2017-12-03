$('head').find('title').text('Webdows');
explorer.start.append([], [
	{
		title: 'Webdows',
		icon: 'webdows/resources/icons/ques.ico',
		callback: function() { system.loader('webdows/webver.js'); }
	}, {
		title: 'Settings',
		icon: 'webdows/resources/icons/cont.ico'
	}, {
		title: 'This Browser',
		icon: 'webdows/resources/icons/scre.ico',
		callback: function() { explorer.file_explorer(); },
		context: [
			{
				title: '<b>Open</b>',
				icon: 'webdows/resources/icons/driv.ico',
				callback: function() { explorer.file_explorer(); }
			}, {}, {
				title: 'Properties',
				callback: function() { system.loader('webdows/system.js'); }
			}
		]
	}, {
		title: 'Personalize',
		icon: 'webdows/resources/icons/pers.ico',
		callback: function() { system.loader('webdows/personalize.js'); }
	}, {
		title: 'Welcome',
		icon: 'webdows/resources/icons/logo.png',
		callback: function() { system.loader('webdows/welcome.js'); }
	}, {
		title: 'Restart',
		callback: function() { location.reload(true); }
	}
]);
$('#desktop.explorer').on('contextmenu', function(e) {
	e.preventDefault();
	if(e.target == this) {
		new explorer.context()
		.location(e.pageX, e.pageY)
		.append([
			{
				title: 'View'
			}, {
				title: 'Sort By'
			}, {
				title: 'Refresh'
			}, {}, {
				title: 'New',
				context: [
					{
						title: 'File',
						callback: function() {}
					}, {}, {
						title: 'Folder',
						callback: function() {}
					}
				]
			}, {}, {
				title: 'webver.js',
				icon: 'webdows/resources/icons/info.ico',
				callback: function() { system.loader('webdows/webver.js'); }
			}, {
				title: 'Personalize',
				icon: 'webdows/resources/icons/pers.ico',
				callback: function() { system.loader('webdows/personalize.js'); }
			}
		]);
	}
});
