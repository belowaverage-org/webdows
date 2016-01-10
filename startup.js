explorer.start.append([
    {
        title: 'webver.js',
        icon: 'webdows/resources/icons/info.ico',
        callback: function() { system.loader('webdows/webver.js'); }
    }, {
        title: 'Personalize',
        icon: 'webdows/resources/icons/pers.ico',
        callback: function() { system.loader('webdows/personalize.js'); }
    }, {
        title: 'CMD',
        icon: 'webdows/resources/icons/scre.ico',
        callback: function() { system.loader('webdows/cmd.js'); }
    }, {
        title: 'Calculator',
        icon: 'webdows/resources/icons/calc.ico',
        callback: function() { system.loader('webdows/calc.js'); }
    }, {
        title: 'Notepad',
        icon: 'webdows/resources/icons/note.ico',
        callback: function() { system.loader('webdows/notepad.js'); }
    }, {
        title: 'Browser Properties',
        icon: 'webdows/resources/icons/driv.ico',
        callback: function() { system.loader('webdows/properties.js'); }
    }
], [
    {
        title: 'Webdows',
        icon: 'webdows/resources/icons/ques.ico',
        callback: function() { system.loader('webdows/webver.js'); }
    }, {
        title: 'Settings',
        icon: 'webdows/resources/icons/scre.ico',
        callback: function() {  }
    }, {
        title: 'This Browser',
        icon: 'webdows/resources/icons/info.ico',
        callback: function() { system.loader('webdows/properties.js'); }
    }, {
        title: 'Personalize',
        icon: 'webdows/resources/icons/pers.ico',
        callback: function() { system.loader('webdows/personalize.js'); }
    }
]);