var _paq = _paq || [];
_paq.push(['trackPageView']);
_paq.push(['enableLinkTracking']);
(function() {
	var u="https://api.belowaverage.org/v3/piwik/";
	_paq.push(['setTrackerUrl', u+'piwik.php']);
	_paq.push(['setSiteId', '1']);
	var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
	g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);
})();
system.belowaverage = {};
var interval = setInterval(function() {
	if(typeof Piwik !== 'undefined') {
		clearInterval(interval);
		system.belowaverage.piwik = Piwik.getAsyncTracker();
		system.errorReplaced = system.error;
		system.error = function(errorMessage, filePath) {
			system.belowaverage.piwik.trackEvent('System', 'Error: '+filePath, errorMessage);
			system.errorReplaced(errorMessage, filePath);
		};
	}
}, 100);

