/*!
Project: Webdows
Liscense: MIT
Author: krisdb2009
Date: 05/2/16
File: programs/Web Explorer/we.js
*/
new explorer.window()
.title('Web Explorer')
.resize(400, 300)
.icon('programs/Web Explorer/1.png')
.toggleMax()
.callback(function() {
    var win = this;
    var bod = this.body;
    function changeUrl(url) {
        bod.find('.i1').val(url);
        win.title('Web Explorer - '+url)
    };
    bod.html('<button class="b1"><-</button><button class="b2">-></button><input class="i1"></input><button class="b3">Go</button><iframe class="if1"></iframe>');
    bod.find('.b1').attr('style', 'position:absolute;left:1px;top:1px;width:24px;height:21px;').click(function() {
        bod.find('.if1')[0].contentWindow.history.go(-1);
    });
    bod.find('.b2').attr('style', 'position:absolute;left:24px;top:1px;width:24px;height:21px;').click(function() {
        bod.find('.if1')[0].contentWindow.history.go(1);
    });
    bod.find('.b3').attr('style', 'position:absolute;right:1px;top:1px;').click(function() {
        var url = bod.find('.i1').val();
        bod.find('.if1').attr('src', url);
        startTracker();
    });
    bod.find('.i1').attr('style', 'position:absolute;top:1px;left:49px;width:calc(100% - 84px);').keypress(function(e) {
        if(e.keyCode == 13){
            bod.find('.b3').click();
        }
    });
    bod.find('.if1').attr('style', 'position:absolute;top:23px;left:0px;width:100%;height:calc(100% - 23px);border:none;background-color:white;');
    var url1 = null;
    var url2 = null;
    function startTracker() {
        bod.find('.i1').attr('placeholder', 'http(s)://');
        var interval = setInterval(function() {
            url2 = url1;
            try {
                url1 = bod.find('.if1')[0].contentDocument.URL;
            } catch(e) {
                clearInterval(interval);
                bod.find('.i1').val('');
                win.title('Web Explorer');
                bod.find('.i1').attr('placeholder', 'The tracker service has been stopped due to security reasons...');
            }
            if(url1 !== url2) {
                changeUrl(url1);
            }
        }, 100);
    };
    startTracker();
});