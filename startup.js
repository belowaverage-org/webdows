
explorer.start.addLButton('webver.js', 'webdows/resources/icons/DxpTaskSync_60.ico', function() {
   system.loader('webdows/webver.js');
});
explorer.start.addLButton('Personalize', 'webdows/resources/icons/imageres_27.ico', function() {
   system.loader('webdows/personalize.js');
});
explorer.start.addLButton('CMD', 'webdows/resources/icons/cmd_IDI_APPICON.ico', function() {
   system.loader('webdows/cmd.js');
});
explorer.start.addLButton('Test', 'webdows/resources/icons/shell32_153.ico', function() {
   system.loader('programs/test.js');
});
explorer.start.addLButton('Calculator', 'webdows/resources/icons/calc.png', function() {
   system.loader('webdows/calc.js');
});
explorer.start.addRButton('Webdows');
explorer.start.addRButton('Documents');
explorer.start.addRButton('Pictures');
explorer.start.addRButton('Music');
explorer.start.addRButton('This PC');
explorer.start.addRButton('Network');
explorer.start.addRButton('Control Panel');
explorer.start.addRButton('Settings');