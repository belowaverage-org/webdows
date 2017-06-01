/*!
Project: Webdows
Liscense: MIT
Author: krisdb2009
File: webdows/system32/webldr.js
*/
$('#bootlog').append('<pre>Checking registry...</pre>');
if(typeof system.registry.get('HKEY_LOCAL_WEBDOWS') == 'undefined') {
	$('#bootlog').append('<pre>Registry missing data! Downloading new registry...</pre>');
	$.ajax({
		url: 'webdows/config/registry.json',
		dataType: 'json',
		async: true,
		success: function(data) {
			$('#bootlog').append('<pre>Download finished, applying new registry...</pre>');
			system.registry.set('HKEY_LOCAL_WEBDOWS', data);
		}
	});
}
$('#bootlog').append('<pre>Good<br>---------------------------</pre>');
$.getJSON('webdows/config/wfs.json', function(files) {
	system.files = files;
	$('#bootlog').append('<pre>Loading and checking SYSTEM.FILES.WEBDOWS...</pre>');
	system.bootLoader = {
		loadList: [],
		total: 0,
		current: 0,
		loaded: false
	};
	system.loader('webdows/system32/loadscrn.js');
	function list(obj, path) {
		$.each(obj, function(k) {
			if(typeof this.valueOf() == 'string') {
				system.bootLoader.loadList[system.bootLoader.total++] = path+this;
			} else if(typeof this.valueOf() == 'object') {
				list(this.valueOf(), path+k+'/');
			}
		});
	}
	list(system.files.webdows, 'webdows/');
	function wfsLoad(list, i) {
		if(typeof list[i] == 'string') {
			$('#bootlog').append('<pre>'+list[i]+'...</pre> ');
			$(document).scrollTop($(document).height());
			var loadint = setInterval(function() {
				$('#bootlog pre').last().append('.');
				$(document).scrollTop($(document).height());
			}, 100);
			$.ajax({
				dataType: "text",
				async: true,
				cache: true,
				url: list[i],
				success: function() {
					clearInterval(loadint);
					$('#bootlog pre').last().append('GOOD');
					$(document).scrollTop($(document).height());
					system.bootLoader.current++;
					wfsLoad(list, i + 1);
				},
				error: function(jq) {
					clearInterval(loadint);
					system.error('WEBLDR.JS Cannot find the file specified: '+jq.status, list[i]);
				}
			});
		} else {
			system.bootLoader.loaded = true;
			return;
		}
	}
	wfsLoad(system.bootLoader.loadList, 0);
	var timer = setInterval(function() {
		if(system.bootLoader.loaded) {
			clearInterval(timer);
			$.each(system.registry.get('HKEY_LOCAL_WEBDOWS/system/startup'), function() {
				$.ajax({
					url: this,
					dataType: 'script',
					async: true
				});
			});
			$('#bootlog').remove();
		}
	}, 100);
});
