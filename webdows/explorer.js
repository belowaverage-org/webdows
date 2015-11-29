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
        var timeService = setInterval(function() { //Start clock service
            var date = new Date();
            $('#taskbar #time').html(system.formatAMPM(date));
        }, 500);
        $('#desktop').on('mousedown', function(e) { //Start active listener service
            if(!$(e.target).parents('.window').length && !$(e.target).is('.window') && !$(e.target).is('#taskbar .button') && !$(e.target).parents('#taskbar .button').length) {
                $('.window, #taskbar .button').each(function() {
                    if($(this).hasClass('active')) {
                        $(this).removeClass('active');
                    }
                });
            }
			if(!$(e.target).parents('#desktop #startmenu').length && !$(e.target).is('#desktop #startmenu') && !$(e.target).parents('#taskbar #start').length && !$(e.target).is('#taskbar #start')) {
				if(!$('#desktop #startmenu').hasClass('minimized')) {
					explorer.start.toggle();
				}
			}
        });
		$('#taskbar #start').click(function() {
			explorer.start.toggle();
		});
    },
    start : {
        toggle : function() {
			var start = $('#desktop #startmenu');
			if(start.hasClass('minimized')) {
				start.removeClass('minimized');
			} else {
				start.addClass('minimized');
			}
        },
        initiate : function() {
            $('#desktop').append('<div id="startmenu"><div class="lllist"></div><div class="apb"></div><div class="search"><input></div><div class="rllist"></div></div>');
			explorer.start.toggle();
            $('#startmenu .apb').click(function() {
               explorer.start.allProgramsToggle(); 
            });
        },
		addRButton : function(title, callback) {
			var callbackID = system.guid();
            $('#startmenu .rllist').append('<div callbackID="'+callbackID+'" class="button">'+title+'</div>');
            $('#startmenu .rllist .button[callbackID='+callbackID+']').click(callback).click(function() {
                explorer.start.toggle();
                if($('#startmenu .lllist').hasClass('all')) {
                    explorer.start.allProgramsToggle(); 
                }
            });
            return $('#startmenu .rllist .button[callbackID='+callbackID+']');
		},
		addLButton : function(title, icon, callback) {
            var callbackID = system.guid();
            $('#startmenu .lllist').append('<div callbackID="'+callbackID+'" class="button"><span class="icon"></span>'+title+'</div>');
            if(typeof icon !== 'undefined') {
                $('#startmenu .lllist .button[callbackID='+callbackID+'] .icon').css("background-image","url('"+icon+"')");
            }
            $('#startmenu .lllist .button[callbackID='+callbackID+']').click(callback).click(function() {
                explorer.start.toggle();
                $(this).prependTo('#startmenu .lllist');
                if($('#startmenu .lllist').hasClass('all')) {
                    explorer.start.allProgramsToggle(); 
                }
            });
            return $('#startmenu .lllist .button[callbackID='+callbackID+']');
		},
        allProgramsToggle : function() {
            var start = $('#startmenu .lllist');
            if(start.hasClass('all')) {
                start.removeClass('all');
            } else {
                start.addClass('all');
            }
            start.scrollTop(0);
        },
		searchProgramsToggle : function() {
			//This
		}
    },
    window : {
        open : function() {
            var windowID = system.guid();
            var winid = '.window[windowID='+windowID+']';
            $('#desktop').append('<div class="window" windowID="'+windowID+'"><span class="ttl"><span class="icon"></span><span class="title"></span></span><span class="minmaxclose"><span class="min"></span><span class="max"></span><span class="close"></span></span><div class="body"></div></div>');
            $('#taskbar').append('<span class="button" windowID="'+windowID+'"><span class="icon"></span><span class="title"><span></span></span>');
            $('#taskbar').sortable("refresh");
            $(winid).mousedown(function() {
                explorer.window.front(winid);
            });
            $('#taskbar .button[windowID='+windowID+'], '+winid+' .minmaxclose .min').click(function() {
                explorer.window.toggleMin(winid);
            });
            $(winid+' .minmaxclose .max').click(function() {
                explorer.window.toggleMax(winid);
            });
            $(winid+' .minmaxclose .close').click(function() {
                explorer.window.close(winid);
            });
            $(winid).draggable({handle: '.ttl', addClasses: false, iframeFix: true}).resizable({handles: "n, e, s, w, ne, se, sw, nw"});
			explorer.window.resize(winid, 300, 200);
			explorer.window.front(winid);
            return $(winid);
        },
		center : function(window) {
			var winid = $(window);
			var explorer = $('#desktop.explorer');
			var top = (explorer.height() - winid.outerHeight()) / 2;
			var left = (explorer.width() - winid.outerWidth()) / 2;
			winid.css({'position':'absolute', 'margin':0, 'top': (top > 0 ? top : 0)+'px', 'left': (left > 0 ? left : 0)+'px'});
		},
        close : function(window) {
            var winid = $(window);
            var windowID = winid.attr('windowID');
            winid.remove();
            $('#taskbar .button[windowID='+windowID+']').remove();
            var topZ = -1;
            var topID = winid;
            $('.window').each(function() {
                if($(this).css('z-index') > topZ && !$(this).hasClass('minimized')) {
                    topZ = $(this).css('z-index');
                    topID = this;
                }
            });
            explorer.window.front(topID);
        },
        toggleMin : function(window) {
            var winid = $(window);
            if(winid.hasClass('active') || winid.hasClass('minimized')) {
                if(winid.hasClass('minimized')) {
                    winid.removeClass('minimized');
                } else {
                    winid.addClass('minimized');
                }
            }
            explorer.window.front(winid);
            var topZ = -1;
            var topID = winid;
            $('.window').each(function() {
                if($(this).css('z-index') > topZ && !$(this).hasClass('minimized')) {
                    topZ = $(this).css('z-index');
                    topID = this;
                }
            });
            explorer.window.front(topID);
        },
        toggleMax : function(window) {
            var winid = $(window);
            if(winid.hasClass('active') || winid.hasClass('maximized')) {
                if(winid.hasClass('maximized')) {
                    winid.removeClass('maximized');
                } else {
                    winid.addClass('maximized');
                }
            }
        },
        resize : function(window, width, height) {
            var winid = $(window);
            winid.css({'width':width+'px','height':height+'px'});
        },
        icon : function(window, url) {
            var winid = $(window);
            var windowid = winid.attr('WindowID');
            var css = {'background-image':"url('"+url+"')"};
            winid.find('.ttl .icon').css(css);
            $('#taskbar .button[windowID="'+windowid+'"] .icon').css(css);
        },
        title : function(window, title) {
            var winid = $(window);
            var windowID = winid.attr('windowID');
            winid.find('.ttl .title').text(title);
            $('#taskbar .button[windowID='+windowID+'] .title').text(title);
        },
        front : function(window) {
            var winid = $(window);
            var count = $('.window').length;
            var fronte = winid.css('z-index');
            winid.css('z-index', count);
            $(".window").each(function(index) {
                var looped = $(this).css('z-index');
                $(this).removeClass('active');
                $('#taskbar .button[windowID="'+$(this).attr('windowID')+'"]').removeClass('active');
                if(looped >= fronte && $(this)[0] !== winid[0]) {
                    var minzin = $(this).css('z-index') - 1;
                    $(this).css('z-index', minzin);
                }
            });
            if(!winid.hasClass('minimized')) {
                winid.addClass('active');
                $('#taskbar .button[windowID="'+winid.attr('windowID')+'"]').addClass('active');
            }
        }
    }
};
$(document).ready(function() {
    explorer.initiate();
    explorer.changeThemeName('aero');
});