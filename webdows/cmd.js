new explorer.window()
.title('Command Prompt')
.resize(500, 300)
.icon('webdows/resources/icons/cmd_IDI_APPICON.ico')
.center()
.callback(function(cmd, win) {
    win.css({'background-color':'#000','color':'white'});
    win.html('<input>');
    win.find('input').css({'position':'absolute','bottom':'0px','left':'0px','width':'100%','border':'none','box-shadow':'none','background-color':'black','color':'white'});
    win.find('input').on("keypress", function(event) {
        if (event.which == 13 && !event.shiftKey) {
            event.preventDefault();
            var dis = $(event.target);
            var command = dis.val();
            var ret = new Function(command)();
            dis.append(ret+'<br>');
            dis.val('');
        }
    });
});