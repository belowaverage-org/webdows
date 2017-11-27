$.ajax({
    url: "cordova.js",
    global: false,
	dataType: 'text',
	success: function(data) {
		eval(data);
	}
});