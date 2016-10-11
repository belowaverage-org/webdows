new explorer.window()
.title('Run')
.icon('webdows/resources/icons/runi.ico')
.resize(400,200)
.controls([])
.callback(function() {
    var body = this.body;
    var window = this;
    body.html('<div style="display:flex;"><img src="webdows/resources/icons/runi.ico" style="height:32px;width:32px;margin:16px;display:inline-block;"><span class="instruct" style="margin-top:16px;font-size:12px;">Type the name of a program or resource and Webdows will open it for you.</span></div>')
});