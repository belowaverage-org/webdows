//Explorer.js//Webdows//
var explorer = {
    theme : function(themeName, extraCSS) {
        if(typeof themeName == 'undefined') {
            if(localStorage.getItem("theme") == null) {
                var themeName = 'webdows';
            } else {
                var themeName = localStorage.getItem("theme");
            }
        }
        if(typeof extraCSS == 'undefined') {
            if(localStorage.getItem("themeCSS") == null) {
                var extraCSS = '';
            } else {
                var extraCSS = localStorage.getItem("themeCSS");
            }
        }
        localStorage.setItem("theme", themeName);
        localStorage.setItem("themeCSS", extraCSS);
        $('head style').html(extraCSS);
        $('#theme').attr('href','webdows/resources/explorer/'+themeName+'/index.css');
        return themeName;
    },
    initiate : function() {
        $(this).unbind();
        $('body').attr('style','background-color:black;');
        $('body').html('');
        $('.explorer').remove();
        $('head').append('<link class="explorer" href="webdows/resources/explorer/explorer.css" rel="stylesheet" type="text/css">');
        $('head').append('<link class="explorer" id="theme" href="" rel="stylesheet" type="text/css"><style></style>');
        $('body').html('');
        $('body').append('<div style="visibility:hidden;" id="open"></div><div class="explorer" id="desktop"><div id="taskbar"><span id="leftframe"><div id="start"></div></span><span id="middleframe"></span><span id="rightframe"><span id="time"></span></span></div></div>');
        $('#desktop').css({'opacity':'0','visibility':'hidden','cursor':'wait'});
        var open = new Audio('webdows/resources/explorer/open.ogg');
        explorer.start.initiate();
        $("#taskbar #middleframe").sortable({
            revert: true,
            axis: "x",
            items: ".button",
            distance: 5,
            helper : 'clone'
        });
        var timeService = setInterval(function() {
            var date = new Date();
            $('#taskbar #time').html(system.formatAMPM(date));
        }, 1000);
        explorer.theme();
        var timer = setInterval(function() {
            if(document.readyState == 'complete') {
                clearInterval(timer);
                $('body #open').remove();
                $('body').append('<div id="open"></div>');
                open.play();
                setTimeout(function() {
                    $('body #open').remove();
                    explorer.start.toggle();
                    $('#desktop').removeAttr('style').hide().fadeIn(500);
                }, 2000);
            }
        }, 100);
    },
    start : {
        toggle : function() {
			var start = $('#desktop #startmenu');
			if(start.hasClass('minimized')) {
				start.removeClass('minimized');
			} else {
				start.addClass('minimized');
                $('#startmenu .search input').val('');
                explorer.start.allProgramsSearch('');
			}
            if($('#startmenu .lllist').hasClass('all')) {
                explorer.start.allProgramsToggle();
            }
        },
        initiate : function() {
            $('#desktop').append('<div id="startmenu"><div class="lllist"></div><div class="apb"></div><div class="search"><input type="text"/></div><div class="rllist"></div><div class="icon"></div></div>');
            $('#startmenu .apb').click(function() {
                explorer.start.allProgramsToggle(); 
                if($('#startmenu .search input').val() !== '') {
                    $('#startmenu .search input').val('');
                    explorer.start.allProgramsSearch('');
                }
            });
            $('#startmenu .search input').on('input', function() {
                explorer.start.allProgramsSearch($(this).val());
            });
            $('#startmenu .search input').keyup(function(e) {
                if(e.keyCode == 13) {
                    explorer.start.allProgramsSearch($(this).val()).click();
                }
            });
            $('#desktop').on('mousedown', function(e) {
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
        append : function(left, right) {
            left = typeof left !== 'undefined' ? left : [];
            right = typeof right !== 'undefined' ? right : [];
            $.each(left, function(i, v){
                explorer.start.addLButton(v.title, v.icon, v.callback);
            });
            $.each(right, function(i, v){
                explorer.start.addRButton(v.title, v.icon, v.callback, v.context);
            });
        },
		addRButton : function(title, icon, callback, context) {
			var callbackID = system.guid();
            var jqid = '#startmenu .rllist .button[callbackID='+callbackID+']';
            $('#startmenu .rllist').append('<div callbackID="'+callbackID+'" icon="'+icon+'" class="button">'+title+'</div>');
            $(jqid).click(callback).click(function() {
                explorer.start.toggle();
            }).hover(function() {
                if(typeof icon !== 'undefined') {
                    $('#startmenu > .icon').css('background-image', 'url(\''+$(this).attr('icon')+'\')');
                }
            }, function() {
                $('#startmenu > .icon').css('background-image', '');
            });
            if(typeof context !== 'undefined') {
                $(jqid).contextmenu(function(e) {
                    new explorer.context().location(e.pageX, e.pageY).append(context);
                    e.preventDefault();
                });
            }
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
        allProgramsSearch : function(searchterm) {
            var searchTerm = searchterm.toLowerCase();
            if(searchTerm !== '') {
                var returned = null;
                $('#startmenu .lllist div').hide();
                if(!$('#startmenu .lllist').hasClass('all')) {
                    explorer.start.allProgramsToggle();
                }
                $.each($('#startmenu .lllist .button'), function() {
                    var str = $(this).text();
                    if(str.toLowerCase().includes(searchTerm)) {
                        if(returned == null) {
                            returned = $(this);
                        }
                        $(this).show();
                    }
                });
                return returned;
            } else {
                $('#startmenu .lllist div').show();
                if($('#startmenu .lllist').hasClass('all')) {
                    explorer.start.allProgramsToggle();
                }
            }
        }
    },
    window : function(winObj) {
        /** init **/
        if(typeof winObj == 'undefined') {
            var windowID = system.guid();
            $('#desktop').append('<div class="window" windowID="'+windowID+'"><span class="ttl"><span class="icon"></span><span class="title"></span></span><span class="minmaxclose"><span class="close"></span></span><div class="body"></div></div>');
            $('#taskbar #middleframe').append('<span class="button" windowID="'+windowID+'"><span class="icon"></span><span class="title"><span></span></span>');
            this.winid = $('.window[windowID='+windowID+']');
        } else {
            this.winid = $(winObj);
        }
        /** endINIT **/
        this.body = this.winid.find('.body');
        this.callback = function(callback) {
            callback.call(this);
            return this;
        }
		this.center = function() {
			var explorer = $('#desktop.explorer');
			var top = (explorer.height() - this.winid.outerHeight()) / 2;
			var left = (explorer.width() - this.winid.outerWidth()) / 2;
			this.winid.css({'position':'absolute', 'margin':0, 'top': (top > 0 ? top : 0)+'px', 'left': (left > 0 ? left : 0)+'px'});
            return this;
		};
        this.closeWith = function(parent) {
            var child = this;
            parent.close = (function() {
                var cache = parent.close;
                return function() {
                    cache.call(parent);
                    child.close();
                }
            })();
            return this;
        };
        this.close = function() {
            this.winid.css('z-index', '999').addClass('close');
            $('#taskbar #middleframe .button[windowID='+this.winid.attr('windowID')+']').remove();
            var topZ = -1;
            var topID = this.winid;
            $('.window:not(.close)').each(function() {
                if($(this).css('z-index') > topZ && !$(this).hasClass('minimized')) {
                    topZ = $(this).css('z-index');
                    topID = this;
                }
            });
            explorer.window(topID).front();
            var winid = this.winid;
            setTimeout(function() { //Wait for CSS animation.
                winid.remove();
            }, 1000);
            return this;
        };
        this.controls = function(array) {
            $.each(this.winid.find('.minmaxclose span'), function() {
                if(!$(this).hasClass('close')) {
                    $(this).remove();
                }
            });
            if($.inArray('max', array) !== -1) {
                this.winid.find('.minmaxclose').prepend('<span class="max"></span>');
                this.winid.resizable({handles: "n, e, s, w, ne, se, sw, nw"});
                this.winid.resizable('enable');
                this.winid.find('.ui-resizable-handle').show();
                this.winid.find('.ttl, .minmaxclose .max').off();
                $('.window[windowID='+this.winid.attr('windowID')+'] .minmaxclose .max').click({window: this}, function(e) {
                    e.data.window.toggleMax();
                });
                $('.window[windowID='+this.winid.attr('windowID')+'] .ttl').dblclick({window: this}, function(e) {
                    e.data.window.toggleMax();
                });
            } else if(typeof this.winid.resizable('instance') !== 'undefined') {
                this.winid.resizable('disable');
                this.winid.find('.ui-resizable-handle').hide();
                this.winid.find('.ttl').off();
            }
            if($.inArray('min', array) !== -1) {
                this.winid.find('.minmaxclose').prepend('<span class="min"></span>');
                $('.window[windowID='+this.winid.attr('windowID')+'] .minmaxclose .min').click({window: this}, function(e) {
                    e.data.window.toggleMin();
                });
            }
            return this;
        }
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
            var css = {'background-image':"url('"+url+"')"};
            this.winid.find('.ttl .icon').css(css);
            $('#taskbar #middleframe .button[windowID="'+this.winid.attr('windowID')+'"] .icon').css(css);
            return this;
        };
        this.title = function(title) {
            this.winid.find('.ttl .title').text(title);
            $('#taskbar #middleframe .button[windowID='+this.winid.attr('windowID')+'] .title').text(title);
            return this;
        };
        this.front = function() {
            var count = $('.window').length;
            var fronte = this.winid.css('z-index');
            if(fronte == '0' || fronte == 'auto') {
                var fronte = count;
            }
            this.winid.css('z-index', count);
            var winid = this.winid;
            $(".window").each(function(index) {
                var looped = $(this).css('z-index');
                $(this).removeClass('active');
                $('#taskbar #middleframe .button[windowID="'+$(this).attr('windowID')+'"]').removeClass('active');
                if(looped >= fronte && $(this)[0] !== winid[0]) {
                    var minzin = $(this).css('z-index') - 1;
                    $(this).css('z-index', minzin);
                }
            });
            if(!this.winid.hasClass('minimized')) {
                this.winid.addClass('active');
                $('#taskbar #middleframe .button[windowID="'+this.winid.attr('windowID')+'"]').addClass('active');
            }
            return this;
        };
        if(typeof winObj == 'undefined') {
            $('#taskbar #middleframe').sortable("refresh");
            $(this.winid).mousedown({window: this}, function(e) {
                e.data.window.front();
            });
            $('#desktop').on('mousedown', {winid: this.winid}, function(e) {
                var winid = e.data.winid.attr('windowID');
                if(!$(e.target).parents('.window[windowID='+winid+']').length && !$(e.target).is('.window[windowID='+winid+']') && !$(e.target).is('#taskbar #middleframe .button[windowID='+winid+']') && !$(e.target).parents('#taskbar #middleframe .button[windowID='+winid+']').length) {
                    var elm = $('.window[windowID='+winid+'], #taskbar #middleframe .button[windowID='+winid+']');
                    if(elm.hasClass('active')) {
                        elm.removeClass('active');
                    }
                }
            });
            $('#taskbar #middleframe .button[windowID='+windowID+']').click({window: this}, function(e) {
                e.data.window.toggleMin();
            });
            $('.window[windowID='+windowID+'] .minmaxclose .close').click({window: this}, function(e) {
                e.data.window.close();
            });
            $(this.winid).draggable({containment: "#desktop.explorer", handle: '.ttl', addClasses: false, iframeFix: true});
            this.controls(['min','max']);
            this.resize(300, 200);
            this.front();
        }
        return this;
    },
    context: function() {
        /** INIT **/
        var dis = this;
        this.id = system.guid();
        $('#desktop').append('<div contextID="'+this.id+'" class="context"></div>');
        this.jqid = $('#desktop div.context[contextID='+this.id+']');
        this.jqid.contextmenu(function(e) {
            e.stopPropagation();
            e.preventDefault();
        });
        $('#desktop').on('mousedown mouseup contextclose', {context: this}, function(e) {
            if(!$(e.target).parents('#desktop .context').length && !$(e.target).is('#desktop .context')) {
				e.data.context.jqid.remove();
			}
        });
        this.hover = false;
        this.jqid.hover(function() {
            dis.hover = true;
        }, function() {
            dis.hover = false;
        });
        /** EndINIT **/
        /** Functions **/
        this.width = function() {
            var cache = this.jqid.attr('style');
            this.jqid.attr('style', '');
            var width = this.jqid.outerWidth();
            this.jqid.attr('style', cache);
            return width;
        };
        this.height = function() {
            var cache = this.jqid.attr('style');
            this.jqid.attr('style', '');
            var height = this.jqid.outerHeight();
            this.jqid.attr('style', cache);
            return height;
        };
        /** EndFunctions **/
        /** ChainFunctions **/
        this.append = function(struc) {
            var jqid = this.jqid;
            $.each(struc, function(k, v) {
                if(typeof v.title !== 'undefined') {
                    var callid = system.guid();
                    var disabled = '';
                    var arrow = '';
                    if(typeof v.callback == 'undefined') {
                        disabled = ' disabled';
                    }
                    if(typeof v.context !== 'undefined') {
                        arrow = ' arrow ';
                        disabled = '';
                    }
                    if(typeof v.icon == 'undefined') {
                        var icon = 'none';
                    } else {
                        var icon = 'url(\''+v.icon+'\')';
                    }
                    jqid.append('<div callbackID="'+callid+'" class="button'+arrow+disabled+'"><span class="icon" style="background-image:'+icon+';"></span><span class="title">'+v.title+'</span></div>');
                    var button = jqid.find('.button[callbackID='+callid+']');
                    if(typeof v.context !== 'undefined') {
                        var sub = null;
                        var timer = null;
                        button.hover(function() {
                            if(sub == null) {
                                timer = setTimeout(function() {
                                    sub = new explorer.context().append(v.context); 
                                    var pos = button.offset(); var bx = pos.left; var by = pos.top; var bw = button.outerWidth(); var bh = button.outerHeight(); var sw = sub.jqid.outerWidth(); var sh = sub.jqid.outerHeight(); var xlim = $('#desktop.explorer').width(); var ylim = $('#desktop.explorer').height();
                                    x = bx + bw;
                                    y = by;
                                    if(xlim < bx + bw + sw) {
                                        x = x - bw - sw;
                                        y = y;
                                    }
                                    if(ylim < by + bh + sh) {
                                        x = x;
                                        y = y + bh - sh;
                                    }
                                    sub.location(x, y);
                                    button.on('unhover', function() {
                                        setTimeout(function() {
                                            if(!button.hasClass('hovered') && sub !== null) {
                                                sub.jqid.remove();
                                                sub = null;
                                                button.unbind('unhover');
                                            }
                                        }, 400);
                                    });
                                    button.parent().on('remove', function() {
                                        sub.jqid.remove();
                                        sub = null;
                                    });
                                    sub.jqid.hover(function() {
                                        button.trigger('mouseover');
                                    });
                                }, 400);
                            }
                        }, function() {
                            clearTimeout(timer);
                        });
                    } else {
                        button.click(v.callback).click(function() { $('#desktop').trigger('contextclose'); });
                    }
                    button.on('mouseover', function() {
                        var button = $(this);
                        $.each(jqid.find('.button'), function() {
                            if($(this)[0] !== button[0]) {
                                $(this).removeClass('hovered');
                                $(this).trigger('unhover');
                            }
                        });
                        if(!button.hasClass('hovered')) {
                            button.addClass('hovered');
                        }
                    });
                } else {
                    jqid.append('<div class="hr"></div>');
                }
            });
            if(typeof this.x !== 'undefined' && typeof this.y !== 'undefined') {
                this.location(this.x, this.y);
            }
            return this;
        };
        this.location = function(x, y) {
            this.x = x;
            this.y = y;
            var xlim = $('#desktop.explorer').width();
            var ylim = $('#desktop.explorer').height();
            if(xlim <= eval(x + this.width())) {
                x = 'left:'+eval(x - this.width())+'px;';
            } else {
                x = 'left:'+x+'px;';
            }
            if(ylim <= eval(y + this.height())) {
                y = 'top:'+eval(y - this.height())+'px;';
            } else {
                y = 'top:'+y+'px;';
            }
            this.jqid.attr('style', x+y);
            return this;
        };
        /** EndChainFunctions **/
        return this;
    }
};
$(document).ready(function() {
    explorer.initiate();
});