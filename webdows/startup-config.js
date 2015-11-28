/*!
Welcome to Webdows!

This file will contain all the scripts nessesary to allow webdows to communicate with your web services.
Go ahead and check out all the API functions here: (Link goes here)
Enjoy!

*/
system.loader('webdows/winver.js');
explorer.start.addLButton('winver.js', 'webdows/resources/icons/DxpTaskSync_60.ico', function() {
   system.loader('webdows/winver.js');
});
explorer.start.addLButton('Personalize', 'webdows/resources/icons/imageres_27.ico', function() {
   system.loader('webdows/personalize.js');
});

explorer.start.addRButton('THis');
explorer.start.addRButton('Tasdf');
explorer.start.addRButton('Computer');
explorer.start.addRButton('Control Panel');
explorer.start.addRButton('Settings');
explorer.start.addRButton('Network');
explorer.start.addRButton('Test Thing');