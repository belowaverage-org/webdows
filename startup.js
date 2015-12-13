explorer.changeThemeName('classic');
explorer.start.addLButton('winver.js', 'webdows/resources/icons/DxpTaskSync_60.ico', function() {
   system.loader('webdows/winver.js');
});
explorer.start.addLButton('Personalize', 'webdows/resources/icons/imageres_27.ico', function() {
   system.loader('webdows/personalize.js');
});
explorer.start.addRButton('Webdows');
explorer.start.addRButton('Documents');
explorer.start.addRButton('Pictures');
explorer.start.addRButton('Music');
explorer.start.addRButton('This PC');
explorer.start.addRButton('Network');
explorer.start.addRButton('Control Panel');
explorer.start.addRButton('Settings');