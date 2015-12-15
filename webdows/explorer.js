//Explorer.js//Webdows//
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
    window : function(winObj) {
        /** init **/
        if(typeof winObj == 'undefined') {
            var windowID = system.guid();
            $('#desktop').append('<div class="window" windowID="'+windowID+'"><span class="ttl"><span class="icon"></span><span class="title"></span></span><span class="minmaxclose"><span class="min"></span><span class="max"></span><span class="close"></span></span><div class="body"></div></div>');
            $('#taskbar').append('<span class="button" windowID="'+windowID+'"><span class="icon"></span><span class="title"><span></span></span>');
            this.winid = $('.window[windowID='+windowID+']');
        } else {
            this.winid = $(winObj);
        }
        this.body = this.winid.find('.body');
        this.callback = function(callback) {
            callback(this);
            return this;
        }
        /** NS functs **/
		this.center = function() {
			var explorer = $('#desktop.explorer');
			var top = (explorer.height() - this.winid.outerHeight()) / 2;
			var left = (explorer.width() - this.winid.outerWidth()) / 2;
			this.winid.css({'position':'absolute', 'margin':0, 'top': (top > 0 ? top : 0)+'px', 'left': (left > 0 ? left : 0)+'px'});
            return this;
		};
        this.close = function() {
            var windowID = this.winid.attr('windowID');
            this.winid.remove();
            $('#taskbar .button[windowID='+windowID+']').remove();
            var topZ = -1;
            var topID = this.winid;
            $('.window').each(function() {
                if($(this).css('z-index') > topZ && !$(this).hasClass('minimized')) {
                    topZ = $(this).css('z-index');
                    topID = this;
                }
            });
            explorer.window(topID).front();
            return this;
        };
        this.toggleMin = function() {
            if(this.winid.hasClass('active') || this.winid.hasClass('minimized')) {
                if(this.winid.hasClass('minimized')) {
                    this.winid.removeClass('minimized');
                } else {
                    this.winid.addClass('minimized');
                }
            }
            this.front();
            var topZ = -1;
            var topID = this.winid;
            $('.window').each(function() {
                if($(this).css('z-index') > topZ && !$(this).hasClass('minimized')) {
                    topZ = $(this).css('z-index');
                    topID = this;
                }
            });
            this.front();
            return this;
        };
        this.toggleMax = function() {
            if(this.winid.hasClass('active') || this.winid.hasClass('maximized')) {
                if(this.winid.hasClass('maximized')) {
                    this.winid.removeClass('maximized');
                } else {
                    this.winid.addClass('maximized');
                }
            }
            return this;
        };
        this.resize = function(width, height) {
            this.winid.css({'width':width+'px','height':height+'px'});
            return this;
        };
        this.icon = function(url) {
            var windowID = this.winid.attr('windowID');
            var css = {'background-image':"url('"+url+"')"};
            this.winid.find('.ttl .icon').css(css);
            $('#taskbar .button[windowID="'+windowID+'"] .icon').css(css);
            return this;
        };
        this.title = function(title) {
            var windowID = this.winid.attr('windowID');
            this.winid.find('.ttl .title').text(title);
            $('#taskbar .button[windowID='+windowID+'] .title').text(title);
            return this;
        };
        this.front = function() {
            var count = $('.window').length;
            var fronte = this.winid.css('z-index');
            this.winid.css('z-index', count);
            var winid = this.winid;
            $(".window").each(function(index) {
                var looped = $(this).css('z-index');
                $(this).removeClass('active');
                $('#taskbar .button[windowID="'+$(this).attr('windowID')+'"]').removeClass('active');
                if(looped >= fronte && $(this)[0] !== winid[0]) {
                    var minzin = $(this).css('z-index') - 1;
                    $(this).css('z-index', minzin);
                }
            });
            if(!this.winid.hasClass('minimized')) {
                this.winid.addClass('active');
                $('#taskbar .button[windowID="'+this.winid.attr('windowID')+'"]').addClass('active');
            }
            return this;
        };
        /**Window INIT ajustments**/
        if(typeof winObj == 'undefined') {
            $('#taskbar').sortable("refresh");
            $(this.winid).mousedown({window: this}, function(e) {
                e.data.window.front();
            });
            $('#taskbar .button[windowID='+windowID+'], .window[windowID='+windowID+'] .minmaxclose .min').click({window: this}, function(e) {
                e.data.window.toggleMin();
            });
            $('.window[windowID='+windowID+'] .minmaxclose .max').click({window: this}, function(e) {
                e.data.window.toggleMax();
            });
            $('.window[windowID='+windowID+'] .ttl').dblclick({window: this}, function(e) {
                e.data.window.toggleMax();
            });
            $('.window[windowID='+windowID+'] .minmaxclose .close').click({window: this}, function(e) {
                e.data.window.close();
            });
            $(this.winid).draggable({handle: '.ttl', addClasses: false, iframeFix: true}).resizable({handles: "n, e, s, w, ne, se, sw, nw"});
            this.resize(300, 200);
            this.front();
        }
        return this;
    }
};
$(document).ready(function() {
    explorer.initiate();
    explorer.changeThemeName('aero');
});