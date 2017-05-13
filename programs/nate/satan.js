		
new explorer.window().callback(function() {
	dis = this;
	bod = this.body;
	bod.html('<button class="asdf hi">1</button>');
	bod.find('.asdf').click(function() {
		var count = parseInt($(this).text()) + 42;
		$(this).text(count);
		dis.title(count);
	}).attr('style', 'width:100px;height:100px;background-image:url("programs/nate/1.png");background-size:100%;');
	
});