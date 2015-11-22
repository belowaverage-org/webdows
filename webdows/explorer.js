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
                $('.window').each(function() {
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
				start.removeClass('minimized').addClass('restored');
			} else {
				start.removeClass('restored').addClass('minimized');
			}
        },
        initiate : function() {
            $('#desktop').append('<div id="startmenu"><div class="lllist"></div><div class="rllist"></div></div>');
			explorer.start.toggle();
        },
		appendRightButton : function() {
			
		},
		appendLeftButton : function() {
			
		}
    },
    window : {
        open : function() {
            var windowID = system.guid();
            var winid = '.window[windowID='+windowID+']';
            $('#desktop').append('<div class="window" windowID="'+windowID+'"><span class="ttl icon icon-explorer">'+windowID+'</span><span class="minmaxclose"><span class="min"></span><span class="max"></span><span class="close"></span></span><div class="body"></div></div>');
            $('#taskbar').append('<span class="button icon icon-explorer" windowID="'+windowID+'">'+windowID+'</span>');
            $('#taskbar').sortable("refresh");
            $(winid).mousedown(function() {
                explorer.window.front(winid);
            });
            $('#taskbar .button[windowID='+windowID+'], '+winid+' .minmaxclose .min').click(function() {
                explorer.window.toggle(winid);
            });
            explorer.window.front(winid);
            $(winid).draggable({handle: '.ttl', addClasses: false, iframeFix: true}).resizable({handles: "n, e, s, w, ne, se, sw, nw"});
            return $(winid);
        },
        close : function(window) {
            
        },
        toggle : function(window) {
            var winid = $(window);
            if(winid.hasClass('active') || winid.hasClass('minimized')) {
                if(winid.hasClass('minimized')) {
                    winid.removeClass('minimized').addClass('restored');
                } else {
                    winid.removeClass('restored').addClass('minimized');
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
        resize : function(window, width, height) {
        
        },
        icon : function(window, idkyetlol) {
        
        },
        title : function(window, title) {
        
        },
        front : function(window) {
            var winid = $(window);
            var count = $('.window').length;
            var fronte = winid.css('z-index');
            winid.css('z-index', count);
            $(".window").each(function(index) {
                var looped = $(this).css('z-index');
                $(this).removeClass('active');
                if(looped >= fronte) {
                    var minzin = $(this).css('z-index') - 1;
                    $(this).css('z-index', minzin);
                }
            });
            winid.addClass('active');
        }
    }
};
$(document).ready(function() {
    explorer.initiate();
    explorer.changeThemeName('aero');
    
    
	
    
});