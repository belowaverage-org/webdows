/*!
Welcome to Webdows!

This file will contain all the scripts nessesary to allow webdows to communicate with your web services.
Go ahead and check out all the API functions here: (Link goes here)
Enjoy!

*/

var WINDOW = explorer.window.open();
WINDOW.css({'width':'450px','height':'400px'});
WINDOW.find('.body').css({'font-size':'12px'});
WINDOW.find('.body').html('<center><h1>Webdows 7</h1></center><hr><div>Below-Average Webdows<br>Version 1.0 (Build 0001)<br>Copyright &copy; 2009 Microsoft Corporation. All rights reserved.<br>The Webdows 7 Emulator OS and its user interface are protected by trademark and other pending or existing intellectual property rights in the United States and other countries.<br><br><br><br><br>This product is not liscensed under the <a href="#">Any Software Liscence Terms</a> to: <br>&nbsp;&nbsp;&nbsp;&nbsp;Webdows User</div><button onclick="explorer.window.open();">Ok</button>');
WINDOW.find('.body button').css({'width':'80px','height':'20px','position':'absolute','bottom':'10px','right':'10px'});
WINDOW.find('.body div').css({'padding-left':'50px','padding-right':'50px'});