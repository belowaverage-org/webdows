$('head').find('title').text('Webdows');
$('#desktop.explorer').on('contextmenu', function(e) {
    e.preventDefault();
    if(e.target == this) {
        new explorer.context()
        .location(e.pageX, e.pageY)
        .append([
            {
                title: 'View'
            }, {
                title: 'Sort By'
            }, {
                title: 'Refresh'
            }, {}, {
                title: 'New',
                context: [
                    {
                        title: 'File',
                        callback: function() {}
                    }, {}, {
                        title: 'Folder',
                        context: [
                            {
                                title: 'Test',
                                callback: function() {}
                            }, {
                                title: 'LOL',
                                callback: function() {}
                            }
                        ]
                    }
                ]
            }, {}, {
                title: 'webver.js',
                icon: 'webdows/resources/icons/info.ico',
                callback: function() { system.loader('webdows/webver.js'); }
            }, {
                title: 'Personalize',
                icon: 'webdows/resources/icons/pers.ico',
                callback: function() { system.loader('webdows/personalize.js'); }
            }
        ]);
    }
});
system.loader('webdows/welcome.js');
system.loader('webdows/run.js');