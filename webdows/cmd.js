/*!
Project: Webdows
Liscense: MIT
Author: krisdb2009
Date: 04/12/16
File: webdows/cmd.js
*/
new explorer.window()
.title('Command Prompt')
.resize(500, 300)
.icon('webdows/resources/icons/scre.ico')
.center()
.callback(function() {
    var body = this.body;
    body.css({'background-color':'#000','color':'white','padding-bottom':'20px'});
    body.html('<div>Below Average Webdows [Version 0.0.00001]<br>(c) 2015 Below Average. All Rights Reserved.<br><br></div><span>$></span><input>');
    body.find('div').attr('style', 'position:absolute;top:0px;left:0px;width:100%;overflow-y:auto;overflow-x:hidden;');
    body.find('span').attr('style', 'position:absolute;bottom:0px;left:0px;');
    body.find('input').css({'position':'absolute','bottom':'0px','left':'20px','height':'20px','width':'calc(100% - 20px)','border':'none','box-shadow':'none','background-color':'black','color':'white'});
    var history = [];
    body.find('input').keydown(function(event) {
        var dis = $(event.target);
        if(event.which == 38) { 
            event.preventDefault();
            history.unshift(history.pop());
            dis.val(history[0]);
        }
        if(event.which == 40) {
            event.preventDefault();
            history.push(history.shift());
            dis.val(history[0]);
        }
        if(event.which == 13) {
            event.preventDefault();
            var command = dis.val();
            history.push(command);
            body.children('div').append('<div>$>'+command+'</div>');
            try {
                var ret = eval(command);
            } catch(error) {
                body.children('div').append('<div style="color:red;">'+error+'</div>');
            }
            if(typeof ret !== 'undefined') {
                body.children('div').append('<div style="color:gray;">'+ret+'</div>');
            }
            body.scrollTop(body[0].scrollHeight);
            dis.val('');
        }
    });
    body.click(function() {
        body.find('input').focus();
    });
});