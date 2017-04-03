$('head').find('title').text('Webdows');
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
        title: 'System',
        icon: 'webdows/resources/icons/scre.ico',
        callback: function() { system.loader('webdows/system.js'); }
    }, {
        title: 'Youtube Extractor',
        icon: 'programs/Youtube Extractor/logo.png',
        callback: function() { system.loader('programs/Youtube Extractor/index.js'); }
    }, {
        title: 'Run',
        icon: 'webdows/resources/icons/runi.ico',
        callback: function() { system.loader('webdows/run.js'); }
    }, {
        title: 'Web Explorer',
        icon: 'programs/Web Explorer/1.png',
        callback: function() { system.loader('programs/Web Explorer/we.js'); }
    }, {
        title: 'Task Manager',
        callback: function() { system.loader('webdows/taskmgr.js'); }
    }
], [
    {
        title: 'Webdows',
        icon: 'webdows/resources/icons/ques.ico',
        callback: function() { system.loader('webdows/webver.js'); }
    }, {
        title: 'Settings',
        icon: 'webdows/resources/icons/cont.ico'
    }, {
        title: 'This Browser',
        icon: 'webdows/resources/icons/scre.ico',
        callback: function() { explorer.file_explorer(); },
        context: [
            {
                title: '<b>Open</b>',
                icon: 'webdows/resources/icons/driv.ico',
                callback: function() { explorer.file_explorer(); }
            }, {}, {
                title: 'Properties',
                callback: function() { system.loader('webdows/system.js'); }
            }
        ]
    }, {
        title: 'Personalize',
        icon: 'webdows/resources/icons/pers.ico',
        callback: function() { system.loader('webdows/personalize.js'); }
    }, {
        title: 'Welcome',
        icon: 'webdows/resources/icons/logo.png',
        callback: function() { system.loader('webdows/welcome.js'); }
    }, {
        title: 'Restart',
        callback: function() { location.reload(true); }
    }
]);
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
new explorer.window().resize(160, 100).title('Animation Button').controls([]).center('bottom left', 20, -50).callback(function() {
    this.body.html('<button class="a" style="width:100px;height:calc(100% - 20px);margin:10px;">Play boot animation</button><button class="b" style="width:100px;height:calc(100% - 20px);margin:10px;">Test Elements</button><button class="c" style="width:100px;height:calc(100% - 20px);margin:10px;">Reload Theme</button>');
    this.body.find('button.a').click(function() {
        system.loader('webdows/resources/explorer/animation.js');
    });
    this.body.find('button.b').click(function() {
        system.loader('test.js');
    });
    this.body.find('button.c').click(function() {
        explorer.theme();
    });
});
//system.loader('webdows/welcome.js');
system.loader('programs/ForkMe/index.js');
//system.loader('webdows/run.js');
//system.loader('webdows/resources/explorer/animation.js');
//explorer.file_explorer();
