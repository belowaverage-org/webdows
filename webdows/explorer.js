var explorer = {
    changeThemeName : function(themeName) {
        $('#theme').attr('href','webdows/resources/explorer/'+themeName+'/index.css');
    },
    changeTheme : function(theme) {
        $('#theme').attr('href',themeName);
    },
    initiate : function() {
        $('body').hide().show(0); //Redraw screen
        $('.explorer').remove();
        $('head').append('<link class="explorer" href="webdows/resources/explorer/explorer.css" rel="stylesheet" type="text/css">');
        $('head').append('<link class="explorer" id="theme" href="webdows/resources/explorer/classic/index.css" rel="stylesheet" type="text/css">');
        $('body').html('');
        $('body').append('<div class="explorer" id="desktop"></div>');
        $('#desktop').append('<div id="taskbar"></div>');
        $('#taskbar').append('<div id="leftframe"></div>');
        $('#taskbar #leftframe').append('<div id="start"></div>');
        $('#taskbar').append('<div id="rightframe"></div>');
        $('#taskbar #rightframe').append('<div id="time"></div>');
        var timeService = setInterval(function() { //Start clock
            var date = new Date();
            $('#taskbar #time').html(formatAMPM(date));
        }, 500);
    },
};
$(document).ready(function() {
    explorer.initiate();
    explorer.changeThemeName('aero');
    $('#taskbar').append('<div class="button icon icon-explorer">Explorer</div>');
    $('#taskbar').append('<div class="button icon icon-notepad">Notepad</div>');
    $('#taskbar').append('<div class="button icon icon-cmd">Command Prompt</div>');
})