new explorer.window()
.title('Run')
.icon('webdows/resources/icons/runi.ico')
.resize(400,200)
.controls([])
.center('bottom left', 25, -50)
.callback(function() {
	function run() {
		system.loader(body.find('input').val(), function() {
			if(this == true) {
				window.close();
			}
		});
	}
	var body = this.body;
	var window = this;
	body.html('<div style="display:flex;"><img src="webdows/resources/icons/runi.ico" style="height:32px;width:32px;margin:16px;display:inline-block;"><span class="instruct" style="margin-top:16px;">Type the name of a program or resource and Webdows will open it for you.</span></div><span style="margin-left:16px;">Open:</span><input type="text" style="margin-left:14px;width:310px;"><div style="position:absolute;left:0px;bottom:0px;background-color:rgba(0,0,0,.05);width:100%;height:64px;"><button class="can">Cancel</button><button class="ok">OK</button></div>');
	body.css('font-size', '12px');
	body.find('button').attr('style','float:right;width:84px;height:24px;margin-top:20px;margin-right:8px;');
	body.find('.can').click(function() {
		window.close();
	});
	body.find('.ok').click(run);
	body.find('input').keyup(function(e) {
		if(e.keyCode == 13) {
			run();
		}
	});
	if(!system.is.mobile()) {
		body.find('input').focus();
	}
});