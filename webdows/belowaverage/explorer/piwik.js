var interval = setInterval(function() {
	if(typeof system.belowaverage.piwik !== 'undefined') {
		var track = system.belowaverage.piwik;
		clearInterval(interval);
		window.explorer.replacedWindow = window.explorer.window;
		window.explorer.window = function() {
			var win = new window.explorer.replacedWindow();
			setTimeout(function() {
				if(win.properties.title !== '') {
					track.trackEvent('Window', 'Opened: '+win.properties.title);
				}
			});
			return win;
		};
	}
}, 100);