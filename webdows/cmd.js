new explorer.window()
.title('Command Prompt')
.resize(500, 300)
.icon('webdows/resources/icons/cmd_IDI_APPICON.ico')
.center()
.callback(function(cmd, win) {
    win.css({'background-color':'#000','color':'white','padding-bottom':'20px'});
    win.html('<div>Below Average Webdows [Version 0.0.00001]<br>(c) 2015 Below Average. All Rights Reserved.<br><br></div><span>$></span><input>');
    win.find('div').attr('style', 'position:absolute;top:0px;left:0px;width:100%;height:calc(100% - 20px);overflow-y:auto;overflow-x:hidden;');
    win.find('span').attr('style', 'position:absolute;bottom:0px;left:0px;');
    win.find('input').css({'position':'absolute','bottom':'0px','left':'20px','height':'20px','width':'calc(100% - 20px)','border':'none','box-shadow':'none','background-color':'black','color':'white'});
    win.find('input').on("keypress", function(event) {
        if (event.which == 13 && !event.shiftKey) {
            event.preventDefault();
            var dis = $(event.target);
            var command = dis.val();
            win.children('div').append('<div>$>'+command+'</div>');
            try {
                var ret = eval(command);
            } catch(error) {
                win.children('div').append('<div style="color:red;">'+error+'</div>');
            }
            if(typeof ret !== 'undefined') {
                win.children('div').append('<div style="color:gray;">'+ret+'</div>');
            }
            win.children('div').scrollTop(win.children('div')[0].scrollHeight)
            dis.val('');
        }
    });
    win.click(function() {
        win.find('input').focus();
    });
});