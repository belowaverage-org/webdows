/*!
Project: Webdows
Liscense: MIT
Author: krisdb2009
File: webdows/explorer.js
*/
var explorer = {
	theme : function(themeName, extraCSS) {
		if(typeof themeName == 'undefined') {
			var themeName = system.registry.get('HKEY_LOCAL_WEBDOWS/explorer/theme/default');
		}
		if(typeof extraCSS == 'undefined') {
			var extraCSS = system.registry.get('HKEY_LOCAL_WEBDOWS/explorer/theme/extraCSS');
		}
		system.registry.set('HKEY_LOCAL_WEBDOWS/explorer/theme/default', themeName);
		system.registry.set('HKEY_LOCAL_WEBDOWS/explorer/theme/extraCSS', extraCSS);
		$('head style').html(extraCSS);
		$('#theme').attr('href','webdows/resources/explorer/'+themeName+'/index.css');
		return themeName;
	},
	drag : function(target, handle, callback) {
		var mouseDown = false;
		var offsetX = 0;
		var offsetY = 0;
		if(typeof handle == 'undefined') {
			handl = null;
		} else if(typeof handle == 'function') {
			callback = handle;
			handl = null;
		} else {
			handl = handle;
		}
		$(target).on('mousedown touchstart', handl, function(e) {
			if((e.which == 0 || e.which == 1)) {
				mouseDown = true;
				var targPos = $(target).position();
				if(typeof e.touches == 'undefined') {
					offsetX = e.clientX - targPos.left;
					offsetY = e.clientY - targPos.top;
				} else {
					offsetX = e.touches[0].clientX - targPos.left;
					offsetY = e.touches[0].clientY - targPos.top;
				}
			}
		}).on('mouseup touchend', function(e) {
			if(e.which == 0 || e.which == 1) {
				mouseDown = false;
			}
		});
		$(target).parent().on('mousemove touchmove', function(e) {
			if(mouseDown) {
				e.preventDefault();
				if(typeof e.touches == 'undefined') {
					var x = e.clientX - offsetX;
					var y = e.clientY - offsetY;
				} else {
					var x = e.touches[0].clientX - offsetX;
					var y = e.touches[0].clientY - offsetY;
				}
				if(typeof callback == 'undefined') {
					$(target).css({'left':x,'top':y});
				} else {
					callback.call({'x':x,'y':y});
				}
			}
		});
	},
	initiate : function() {
		$('#desktop.explorer').remove();
		$('head').append('<link class="explorer" href="webdows/resources/explorer/explorer.css" rel="stylesheet" type="text/css"><link class="explorer" id="theme" href="" rel="stylesheet" type="text/css"><style></style>');
		$('body').append('<div class="explorer" id="desktop"><div id="taskbar"><span id="leftframe"><div id="start"></div></span><span id="middleframe"></span><span id="rightframe"><span id="time"></span></span></div></div>');
		$('#desktop.explorer').attr('style', 'visibility:hidden;');
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
		setTimeout(function() {
			var theme = explorer.theme();
		}, 100);
		setTimeout(function() {
			$('#desktop.explorer').removeAttr('style');
		}, 1000);
		$('#desktop.explorer').on('DOMSubtreeModified', '.window .body', function() {
			var bod = $(this);
			setTimeout(function() {
				$.each(bod.find('input'), function() {
					if($(this).attr('type') == 'radio' && !$(this).hasClass('replaced')) {
						var rad = $(this);
						var name = rad.attr('name');
						var rep = $('<span class="input radio"></span>');
						rep.attr('name', name).click(function() {
							rad.click();
						});
						if(rad[0].checked) {
							rep.addClass('checked');
						}
						rad.addClass('replaced').change(function() {
							bod.find('.input.radio[name='+name+']').removeClass('checked');
							rep.addClass('checked');
						}).after(rep);
					}
				});
			});
		});
		system.loader('webdows/explorer_ext.js', function() {
			$.each(system.registry.get('HKEY_LOCAL_WEBDOWS/explorer/startup'), function() {
				system.loader(this);
			});
		});
	},
	start : {
		toggle : function() {
			var start = $('#desktop #startmenu');
			if(start.hasClass('minimized')) {
				start.removeClass('minimized');
				if(!system.is.mobile()) {
					$('#startmenu .search input').focus();
				}
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
			$('#startmenu .rllist').on('mouseleave', function() {
				$('#startmenu > .icon').css('background-image', '');
			});
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
			explorer.start.toggle();
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
			}).on('contextmenu', function(e) {
				new explorer.context()
				.location(e.pageX, e.pageY)
				.append([
					{
						title: '<b>Open<b>',
						callback: callback
					}, {}, {
						title: 'Close All'
					}
				]);
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
		this.id = system.guid();
		this.is = {
			closed: false,
			minimized: false
		};
		if(typeof winObj == 'undefined') {
			$('#desktop').append('<div class="window" windowID="'+this.id+'"><span class="ttl"><span class="icon"></span><span class="title"></span></span><span class="minmaxclose"><span class="close"></span></span><div class="body"></div></div>');
			$('#taskbar #middleframe').append('<span class="button" windowID="'+this.id+'"><span class="icon"></span><span class="title"><span></span></span>');
			this.jq = $('.window[windowID='+this.id+']');
		} else {
			this.jq = $(winObj);
		}
		var win = this;
		/** endINIT **/
		this.body = this.jq.find('.body');
		this.callback = function(callback) {
			callback.call(this);
			return this;
		}
		this.center = function(position, offsetX, offsetY) {
			var explorer = $('#desktop.explorer');
			var top = (explorer.height() - this.jq.outerHeight()) / 2;
			var left = (explorer.width() - this.jq.outerWidth()) / 2;
			if(typeof position !== 'undefined') {
				pchar = position.split(' ');
				if($.inArray('top', pchar) !== -1) {
					top = 0;
				}
				if($.inArray('bottom', pchar) !== -1) {
					top = explorer.height() - this.jq.outerHeight();
				}
				if($.inArray('left', pchar) !== -1) {
					left = 0;
				}
				if($.inArray('right', pchar) !== -1) {
					left = explorer.width() - this.jq.outerWidth();
				}
			}
			if(typeof offsetX !== 'undefined') {
				left = left + offsetX;
			}
			if(typeof offsetY !== 'undefined') {
				top = top + offsetY;
			}
			this.jq.css({'position':'absolute', 'margin':0, 'top': top+'px', 'left': left+'px'});
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
		this.menuBar = function(buttArr) {
			this.jq.children('.menuBar').remove();
			var con = null;
			var clicked = false;
			var men = $('<div class="menuBar"></div>').insertBefore(this.jq.find('.body'));
			this.jq.addClass('menuBar');
			$('body').on('mousedown', function(e) {
				if(!$(e.target).parents('#desktop .context').length && !$(e.target).is('#desktop .context')) {
					$(men).find('span').removeClass('clicked');
					clicked = false;
				}
			});
			function show(button, content) {
				if(con !== null) {
					con.close();
				}
				con = new explorer.context()
				.append(content.context)
				.location($(button).offset().left, $(button).offset().top + $(button).outerHeight());
			}
			$.each(buttArr, function(k) {
				var content = this;
				$('<span>'+content.title+'</span>').appendTo(men).on('mousedown', function(e) {
					var butt = this;
					if(!$(butt).hasClass('clicked')) {
						setTimeout(function() {
							clicked = true;
							$(butt).addClass('clicked');
							show(butt, content);
						});
					}
				}).mouseover(function() {
					if(clicked && !$(this).hasClass('clicked')) {
						$(men).find('span').removeClass('clicked');
						$(this).addClass('clicked');
						show(this, content);
					}
				});
			});
			return this;
		};
		this.close = function() {
			this.jq.css('z-index', '999').addClass('close');
			$('#taskbar #middleframe .button[windowID='+this.jq.attr('windowID')+']').remove();
			var topZ = -1;
			var topID = this.jq;
			$('.window:not(.close)').each(function() {
				if($(this).css('z-index') > topZ && !$(this).hasClass('minimized')) {
					topZ = $(this).css('z-index');
					topID = this;
				}
			});
			explorer.window(topID).front();
			var jq = this.jq;
			setTimeout(function() { //Wait for CSS animation.
				jq.remove();
			}, 1000);
			this.is.closed = true;
			return this;
		};
		this.controlsArr = [];
		this.controls = function(array) {
			this.controlsArr = array;
			$.each(this.jq.find('.minmaxclose span'), function() {
				if(!$(this).hasClass('close')) {
					$(this).remove();
				}
			});
			if($.inArray('max', array) !== -1) {
				this.jq.find('.minmaxclose').prepend('<span class="max"></span>');
				this.jq.resizable({handles: "n, e, s, w, ne, se, sw, nw"});
				this.jq.resizable('enable');
				this.jq.find('.ui-resizable-handle').show();
				this.jq.find('.ttl, .minmaxclose .max').off();
				$('.window[windowID='+this.jq.attr('windowID')+'] .minmaxclose .max').click({window: this}, function(e) {
					e.data.window.toggleMax();
				});
				$('.window[windowID='+this.jq.attr('windowID')+'] .ttl').dblclick({window: this}, function(e) {
					if(!$(e.target).is('.icon')) {
						e.data.window.toggleMax();
					}
				});
			} else if(typeof this.jq.resizable('instance') !== 'undefined') {
				this.jq.resizable('disable');
				this.jq.find('.ui-resizable-handle').hide();
				this.jq.find('.ttl').off();
			}
			if($.inArray('min', array) !== -1) {
				this.jq.find('.minmaxclose').prepend('<span class="min"></span>');
				$('.window[windowID='+this.jq.attr('windowID')+'] .minmaxclose .min').click({window: this}, function(e) {
					e.data.window.toggleMin();
				});
			}
			return this;
		};
		this.toggleMin = function() {
			if(this.jq.hasClass('active') || this.jq.hasClass('minimized')) {
				if(this.jq.hasClass('minimized')) {
					this.jq.removeClass('minimized');
					this.is.minimized = false;
				} else {
					this.jq.addClass('minimized');
					this.is.minimized = true;
				}
			}
			this.front();
			var topZ = -1;
			var topID = this.jq;
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
			if(this.jq.hasClass('active') || this.jq.hasClass('maximized')) {
				if(this.jq.hasClass('maximized')) {
					this.jq.removeClass('maximized');
				} else {
					this.jq.addClass('maximized');
				}
			}
			return this;
		};
		this.resize = function(width, height) {
			this.jq.css({'width':width+'px','height':height+'px'});
			return this;
		};
		this.icon = function(url) {
			var css = {'background-image':"url('"+url+"')"};
			this.jq.find('.ttl .icon').css(css);
			$('#taskbar #middleframe .button[windowID="'+this.jq.attr('windowID')+'"] .icon').css(css);
			return this;
		};
		this.title = function(title) {
			this.jq.find('.ttl .title').text(title);
			$('#taskbar #middleframe .button[windowID='+this.jq.attr('windowID')+'] .title').text(title);
			return this;
		};
		this.front = function() {
			var count = $('.window').length;
			var fronte = this.jq.css('z-index');
			if(fronte == '0' || fronte == 'auto') {
				var fronte = count;
			}
			this.jq.css('z-index', count);
			var jq = this.jq;
			$(".window").each(function(index) {
				var looped = $(this).css('z-index');
				$(this).removeClass('active');
				$('#taskbar #middleframe .button[windowID="'+$(this).attr('windowID')+'"]').removeClass('active');
				if(looped >= fronte && $(this)[0] !== jq[0]) {
					var minzin = $(this).css('z-index') - 1;
					$(this).css('z-index', minzin);
				}
			});
			if(!this.jq.hasClass('minimized')) {
				this.jq.addClass('active');
				$('#taskbar #middleframe .button[windowID="'+this.jq.attr('windowID')+'"]').addClass('active');
			}
			return this;
		};
		if(typeof winObj == 'undefined') {
			$('#taskbar #middleframe').sortable("refresh");
			$(this.jq).mousedown({window: this}, function(e) {
				e.data.window.front();
			});
			$('#desktop').on('mousedown', {id: this.id}, function(e) {
				var id = e.data.id;
				if(!$(e.target).parents('.window[windowID='+id+']').length && !$(e.target).is('.window[windowID='+id+']') && !$(e.target).is('#taskbar #middleframe .button[windowID='+id+']') && !$(e.target).parents('#taskbar #middleframe .button[windowID='+id+']').length) {
					var elm = $('.window[windowID='+id+'], #taskbar #middleframe .button[windowID='+id+']');
					if(elm.hasClass('active')) {
						elm.removeClass('active');
					}
				}
			});
			function menu() {
			   var menu = [
					{
						title: 'Restore',
						icon: 'webdows/resources/icons/rest.png'
					}, {
						title: 'Minimize',
						icon: 'webdows/resources/icons/mini.png'
					}, {
						title: 'Maximize',
						icon: 'webdows/resources/icons/maxi.png'
					}, {}, {
						title: 'Close',
						icon: 'webdows/resources/icons/clos.png',
						callback: function() { win.close(); }
					}
				];
				if($.inArray('max', win.controlsArr) !== -1) {
					if(win.jq.hasClass('maximized')) {
						menu[0].callback = function() { win.front().toggleMax(); };
					} else {
						menu[2].callback = function() { win.front().toggleMax(); };
					}
				}
				if($.inArray('min', win.controlsArr) !== -1) {
					if(win.jq.hasClass('minimized')) {
						menu[0].callback = function() { win.front().toggleMin(); };
						menu[2].callback = undefined;
					} else {
						menu[1].callback = function() { win.front().toggleMin(); };
					}
				}
				return menu;				
			}
			$('.window[windowID='+this.id+'] .ttl .icon').click({window: this}, function(e) {
				var men = new explorer.context().append(menu());
				men.location($(this).offset().left, $(this).offset().top + $(this).height());
			}).dblclick({window: this}, function(e) {
				e.data.window.jq.trigger('contextclose');
				e.data.window.close();
			});
			$('#taskbar #middleframe .button[windowID='+this.id+']').contextmenu({window: this}, function(e) {
				e.stopPropagation();
				e.preventDefault();
				new explorer.context()
				.location(e.pageX, e.pageY)
				.append(menu());
			});
			$('#taskbar #middleframe .button[windowID='+this.id+']').click({window: this}, function(e) {
				e.data.window.toggleMin();
			});
			$('.window[windowID='+this.id+'] .minmaxclose .close').click({window: this}, function(e) {
				e.data.window.close();
			});
			explorer.drag(this.jq, '.ttl');
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
		this.jq = $('#desktop div.context[contextID='+this.id+']');
		this.jq.contextmenu(function(e) {
			e.stopPropagation();
			e.preventDefault();
		});
		$('#desktop').on('mousedown contextclose contextmenu', {context: this}, function(e) {
			if(!$(e.target).parents('#desktop .context').length && !$(e.target).is('#desktop .context')) {
				e.data.context.jq.remove();
			}
		});
		this.hover = false;
		this.jq.hover(function() {
			dis.hover = true;
		}, function() {
			dis.hover = false;
		});
		/** EndINIT **/
		/** Functions **/
		this.width = function() {
			var cache = this.jq.attr('style');
			this.jq.attr('style', '');
			var width = this.jq.outerWidth();
			this.jq.attr('style', cache);
			return width;
		};
		this.height = function() {
			var cache = this.jq.attr('style');
			this.jq.attr('style', '');
			var height = this.jq.outerHeight();
			this.jq.attr('style', cache);
			return height;
		};
		/** EndFunctions **/
		/** ChainFunctions **/
		this.append = function(struc) {
			var jq = this.jq;
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
					jq.append('<div callbackID="'+callid+'" class="button'+arrow+disabled+'"><span class="icon" style="background-image:'+icon+';"></span><span class="title">'+v.title+'</span></div>');
					var button = jq.find('.button[callbackID='+callid+']');
					if(typeof v.context !== 'undefined') {
						var sub = null;
						button.on('mouseup', function() {
							sub = new explorer.context().append(v.context); 
							var pos = button.offset(); var bx = pos.left; var by = pos.top; var bw = button.outerWidth(); var bh = button.outerHeight(); var sw = sub.jq.outerWidth(); var sh = sub.jq.outerHeight(); var xlim = $('#desktop.explorer').width(); var ylim = $('#desktop.explorer').height();
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
										sub.jq.remove();
										sub = null;
										button.unbind('unhover');
									}
								}, 400);
							});
							button.parent().on('remove', function() {
								sub.jq.remove();
								sub = null;
							});
							sub.jq.hover(function() {
								button.trigger('mouseover');
							});
						});
						var timer = null;
						button.hover(function() {
							if(sub == null) {
								timer = setTimeout(function() {
									button.trigger('mouseup');
								}, 400);
							}
						}, function() {
							clearTimeout(timer);
						});
					} else {
						button.on('mouseup', v.callback).on('mouseup', function() { $('#desktop').trigger('contextclose'); });
					}
					button.on('mouseover', function() {
						var button = $(this);
						$.each(jq.find('.button'), function() {
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
					jq.append('<div class="hr"></div>');
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
				x = eval(x - this.width());
			} else {
				x = x;
			}
			if(0 >= x) {
				x = 1;
			} else {
				x = x;
			}
			if(ylim <= eval(y + this.height())) {
				y = eval(y - this.height());
			} else {
				y = y;
			}
			if(0 >= y) {
				y = 1;
			} else {
				y = y;
			}
			this.jq.attr('style', 'left:'+x+'px;top:'+y+'px;');
			return this;
		};
		this.close = function() {
			this.jq.remove();
			return this;
		};
		/** EndChainFunctions **/
		return this;
	}
};
explorer.initiate();