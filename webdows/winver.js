function winver() {
    var WINDOW = explorer.window.open();
    explorer.window.resize(WINDOW, 450, 400);
    explorer.window.title(WINDOW, 'About Webdows');
    explorer.window.icon(WINDOW, 'webdows/resources/icons/DxpTaskSync_60.ico');
    WINDOW.find('.body').css({'font-size':'11px'});
    WINDOW.find('.body').html('<center><h1>&nbsp;Webdows 7</h1></center><hr><div>Below-Average Webdows<br>Version 1.0 (Build 0001)<br>Copyright &copy; 2009 Microsoft Corporation. All rights reserved.<br>The Webdows 7 Emulator OS and its user interface are protected by trademark and other pending or existing intellectual property rights in the United States and other countries.<br><br><br><br><br>This product is not liscensed or affiliated with Microsoft <a href="http://microsoft.com/" target="_TOP">All Rights Reserved</a> to: <br>&nbsp;&nbsp;&nbsp;&nbsp;Microsoft</div><button>Ok</button>');
    WINDOW.find('.body button').css({'width':'80px','height':'20px','position':'absolute','bottom':'10px','right':'10px'});
    WINDOW.find('.body div').css({'padding-left':'50px','padding-right':'50px','padding-top':'20px'});
    WINDOW.find('.body center h1').css({'font-size':'40px','margin':'5px'});
    WINDOW.find('.body button').click(function() {
        explorer.window.close(WINDOW);
    });
}
winver();