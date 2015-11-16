var explorer = {
    changeThemeName : function(themeName) {
        $('#theme').attr('href','webdows/resources/explorer/'+themeName+'/index.css');
    },
    changeTheme : function(theme) {
        $('#theme').attr('href',themeName);
    },
    initiate : function() {
        $('body').attr('style','background-color:black;');
        $('body').html('');
        $('body').hide().show(0);
        $('.explorer').remove();
        $('head').append('<link class="explorer" href="webdows/resources/explorer/explorer.css" rel="stylesheet" type="text/css">');
        $('head').append('<link class="explorer" id="theme" href="" rel="stylesheet" type="text/css">');
        $('body').html('');
        $('body').append('<div class="explorer" id="desktop"></div>');
        $('#desktop').append('<div id="taskbar"></div>');
        explorer.start.initiate();
        $('#taskbar').append('<span id="leftframe"></span>');
        $('#taskbar #leftframe').append('<div id="start"></div>');
        $('#taskbar').append('<span id="rightframe"></span>');
        $('#taskbar #rightframe').append('<span id="time"></span>');
        $("#taskbar").sortable({
            revert: true,
            axis: "x",
            items: ".button",
            distance: 5,
            helper : 'clone'
        });
        var timeService = setInterval(function() { //Start clock
            var date = new Date();
            $('#taskbar #time').html(formatAMPM(date));
        }, 500);
    },
    start : {
        toggle : function() {
        },
        initiate : function() {
            $('#desktop').append('<div id="startmenu"><div class="lllist"></div><div class="rllist"></div></div>');
            $('#startmenu .lllist').append('<span class="button icon">Welcome to Webdows</span>');
            $('#startmenu .lllist').append('<span class="button icon icon-cmd">CMD</span>');
            $('#startmenu .lllist').append('<span class="button icon">Explorer</span>');
            $('#startmenu .lllist').append('<span class="button icon">Program.js</span>');
            $('#startmenu .lllist').append('<span class="button icon">Wow</span>');
        }
    },
    window : {
        open : function() {
            var windowID = guid();
            var winid = '.window[windowID='+windowID+']';
            $('#desktop').append('<div class="window" windowID="'+windowID+'"><span class="ttl icon icon-explorer">'+windowID+'</span><span class="minmaxclose"></span><div class="body"></div></div>');
            $('#taskbar').append('<span class="button icon icon-explorer" windowID="'+windowID+'">'+windowID+'</span>');
            $('#taskbar').sortable("refresh");
            $(winid).mousedown(function() {
                explorer.window.front(windowID);
            });
            $('#taskbar .button[windowID='+windowID+']').click(function() {
                explorer.window.toggle(windowID);
            });
            explorer.window.front(windowID);
            $(winid).draggable({handle: '.ttl', addClasses: false, iframeFix: true}).resizable({handles: "n, e, s, w, ne, se, sw, nw"});
            return windowID;
        },
        close : function(windowID) {
            
        },
        toggle : function(windowID) {
            var winid = '.window[windowID='+windowID+']';
            if($(winid).hasClass('active') || $(winid).hasClass('minimized')) {
                if($(winid).hasClass('minimized')) {
                    $(winid).removeClass('minimized').addClass('restored');
                } else {
                    $(winid).removeClass('restored').addClass('minimized');
                }
                
            }
            explorer.window.front(windowID);
            var topZ = -1;
            var topID = winid;
            $('.window').each(function() {
                if($(this).css('z-index') > topZ && !$(this).hasClass('minimized')) {
                    topZ = $(this).css('z-index');
                    topID = this;
                }
            });
            explorer.window.front($(topID).attr('windowID'));
        },
        resize : function(windowID, width, height) {
        
        },
        icon : function(windowID, idkyetlol) {
        
        },
        title : function(windowID, title) {
        
        },
        front : function(windowID) {
            var winid = '.window[windowID='+windowID+']';
            var count = $('.window').length;
            var fronte = $(winid).css('z-index');
            $(winid).css('z-index', count);
            $(".window").each(function(index) {
                var looped = $(this).css('z-index');
                $(this).removeClass('active');
                if(looped >= fronte) {
                    var minzin = $(this).css('z-index') - 1;
                    $(this).css('z-index', minzin);
                }
            });
            $(winid).addClass('active');
        }
    }
};
$(document).ready(function() {
    explorer.initiate();
    explorer.changeThemeName('aero');
})