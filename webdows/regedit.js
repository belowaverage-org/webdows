new explorer.window()
.title('Registry Editor')
.resize(600, 400)
.center()
.icon('webdows/resources/icons/rege.ico')
.callback(function() {
	var win = this;
	function drawReg(path, jq) {
		if(jq[0] == win.body.find('#RSideBar')[0]) {
			jq.html('');
			jq.removeClass('open');
		}
		if(!jq.hasClass('open')) {
			jq.addClass('open');
			$.each(system.registry.get(path), function(key) {
				if(typeof this.valueOf() == 'object') {
					var name = key;
					if(path !== '') {
						key = '/'+key;
					}
					var reg = $('<div path="'+path+key+'"><span>'+name+'</span></div>').appendTo(jq);
					if(!reg.parent().is(':last-child')) {
						reg.addClass('border');
					}
				}
			});
		} else {
			jq.removeClass('open').find('div').remove();
		}
	}
	function drawVal(path) {
		win.body.find('#LSide div.c').remove();
		$.each(system.registry.get(path), function(key) {
			if(typeof this.valueOf() !== 'object') {
				$('<div class="c" path="'+path+'/'+key+'"><span title="'+key+'">'+key+'</span><span>'+(typeof this.valueOf())+'</span><span title="'+this+'">'+this+'</span></div>').appendTo(win.body.find('#LSide'));
			}
		});
	}
	function editKey(path, isNew) {
		new explorer.window()
		.title('Edit Value')
		.resize(300, 165)
		.controls([])
		.center()
		.icon('webdows/resources/icons/rege.ico')
		.closeWith(win)
		.callback(function() {
			var win2 = this;
			var disabled = '';
			var key = '';
			var value = '';
			if(!isNew) {
				disabled = 'disabled';
				key = path.split('/').pop();
				value = system.registry.get(path);
			}
			win2.body.html(`
			<style>
				.window[windowid=`+win2.id+`] button {
					width:60px;
					height:20px;
				}
				.window[windowid=`+win2.id+`] #butts {
					position:absolute;
					bottom:5px;
					right:5px;
				}
				.window[windowid=`+win2.id+`] #form {
					font-size:12px;
					padding:8px;
				}
				.window[windowid=`+win2.id+`] input {
					width:100%;
					height:16px;
					font-size:14px;
					line-height:16px;
				}
			</style>
			<div id="form">
				Value name:<br>
				<input `+disabled+` type="text" value="`+key+`" id="key"><br><br>
				Value data:<br>
				<input type="text" value="`+value+`" id="val">
			</div>
			<div id="butts">
				<button id="ok">OK</button>
				<button id="can">Cancel</button>
			</div>
			`);
			win2.body.find('#can').click(function() { win2.close(); });
			win2.body.find('#ok').click(function() {
				win2.close();
				var key = win2.body.find('#key').val();
				var val = win2.body.find('#val').val();
				if(isNew) {
					system.registry.set(path+'/'+key, val);
				} else {
					system.registry.set(path, val);
				}
				drawVal(win.body.find('#TSide').val());
			});
		});
	}
	var bar = [
		{
			title: 'File',
			context: [
				{
					title: 'Import/Export...',
					callback: function() {
						new explorer.window()
						.title('Import/Export...')
						.icon('webdows/resources/icons/rege.ico')
						.resize(300, 190)
						.closeWith(win)
						.controls([])
						.callback(function() {
							var imp = this;
							imp.body.html('<textarea style="resize:none;padding:0px;border:none;width:100%;height:120px"></textarea><br><button style="float:right;margin-right:10px;">Save Changes</button>');
							imp.body.find('textarea').text(JSON.stringify(system.registry.get()));
							imp.body.find('button').click(function() {
								system.registry.set('', JSON.parse(imp.body.find('textarea').val()));
								drawReg('', win.body.find('#RSideBar'));
								drawReg('', win.body.find('#RSideBar'));
								imp.close();
							});
						});
					}
				}, {}, {
					title: 'Print...',
					callback: function() {
						//Do print
					}
				}, {}, {
					title: 'Exit',
					callback: function() { win.close(); }
				}
			]
		}, {
			title: 'Edit',
			context: [
				{
					title: 'New Value',
					callback: function() {
						editKey(win.body.find('#TSide').val(), true);
					}
				}, {
					title: 'Edit'
				}, {}, {
					title: 'Delete',
					callback: function() {
						system.registry.set(win.body.find('#LSide div.selected, #RSideBar div.selected').attr('path'));
						drawVal(win.body.find('#TSide').val());
					}
				}
			]
		}, {
			title: 'View',
			context: [
				{
					title: 'Refresh',
					callback: function() {
						
					}
				}
			]
		}, {
			title: 'Help',
			context: [
				{
					title: 'About Registry Editor...',
					callback: function() { system.loader('webdows/webver.js'); }
				}
			]
		}
	];
	win.menuBar(bar);
	win.body.html(`
	<style>
	.window[windowid=`+win.id+`] #RSideBar {
		padding-top:5px;
		position:absolute;
		left:0px;
		top:21px;
		height:calc(100% - 26px);
		width:200px;
		overflow:auto;
		background-color:white;
	}
	.window[windowid=`+win.id+`] #RSideBar div {
		padding-left:15px;
		border-left:1px solid transparent;
		font-size:13px;
		line-height:18px;
		margin-left:-1px;
	}
	.window[windowid=`+win.id+`] #RSideBar div.border {
		border-left:1px dotted gray;
	}
	.window[windowid=`+win.id+`] #LSide div.selected, .window[windowid=`+win.id+`] #RSideBar div.selected > span{
		border: 1px solid #7da2ce;
		border-radius: 3px;
		box-shadow: inset 1px 0px 0px rgba(255,255,255,.3), inset 0px -1px 0px rgba(255,255,255,.3), inset -1px 0px 0px rgba(255,255,255,.3), inset 0px 1px 0px rgba(255,255,255,.3);
		background: linear-gradient(to bottom, rgba(221,236,253,1) 0%,rgba(194,220,253,1) 100%);
	}
	.window[windowid=`+win.id+`] #RSideBar span {
		position:relative;
		padding-left:12px;
		padding-right:3px;
		border: 1px solid transparent;
	}
	.window[windowid=`+win.id+`] #RSideBar span::before {
		content:'';
		width:18px;
		height:18px;
		background-image:url('webdows/resources/icons/fold.ico');
		background-size:16px 16px;
		background-repeat:no-repeat;
		background-position:center;
		position:absolute;
		left:-8px;
	}
	.window[windowid=`+win.id+`] #LSide {
		position:absolute;
		top:21px;
		left:202px;
		height:calc(100% - 31px);
		width:calc(100% - 212px);
		min-width:300px;
		background-color:white;
		overflow:auto;
		padding:5px;
	}
	.window[windowid=`+win.id+`] #LSide div {
		width:100%;
		font-size:12px;
		border: 1px solid transparent;
	}
	.window[windowid=`+win.id+`] #LSide span {
		width:50px;
		display:inline-block;
		overflow:hidden; 
		text-overflow:ellipsis;
		white-space:nowrap;
	}
	.window[windowid=`+win.id+`] #LSide span:last-child {
		width:calc(100% - 210px);
	}
	.window[windowid=`+win.id+`] #LSide span:first-child {
		width:160px;
	}
	.window[windowid=`+win.id+`] input {
		width:calc(100% - 2px);
		height:16px;
		position:absolute;
		top:0px;
		left:0px;
		font-size:12px;
		line-height:16px;
		min-width:510px;
	}
	.window[windowid=`+win.id+`] #LSide b span:not(:first-child) {
		border-left:1px solid lightgray;
		padding-left:4px;
		margin-left:-4px;
	}
	.window[windowid=`+win.id+`] #LSide b span:last-child {
		width:calc(100% - 212px);
	}
	</style>
	<input id="TSide" type="text">
	<div id="RSideBar"></div>
	<div id="LSide">
		<div><b><span>Name</span><span>Type</span><span>Data</span></b></div>
	</div>
	`);
	win.body.on('contextmenu', function(e) {
		new explorer.context()
		.append(bar[1].context)
		.location(e.pageX, e.pageY);
		e.stopImmediatePropagation();
		e.preventDefault();
	});
	win.body.find('#LSide').on('click dblclick', 'div:first-child', function(e) {
		e.stopImmediatePropagation();
	});
	win.body.find('input').on('keyup', function (e) {
		if(e.keyCode == 13) {
			drawVal($(this).val());
		}
	});
	win.body.find('#LSide').on('dblclick', 'div', function() {
		bar[1].context[1].callback();
	});
	win.body.find('#LSide, #RSideBar').on('click', 'div', function() {
		win.body.find('#LSide div, #RSideBar div').removeClass('selected');
		$(this).addClass('selected');
	});
	win.body.find('#RSideBar').on('click', 'div', function(e) {
		win.body.find('input').val($(this).attr('path'));
		drawReg($(this).attr('path'), $(this));
		drawVal($(this).attr('path'));
		bar[1].context[1].callback = undefined;
		e.stopPropagation();
	});
	win.body.find('#LSide').on('click', 'div', function() {
		bar[1].context[1].callback = function() {
			editKey(win.body.find('#LSide .selected').attr('path'), false);
		};
	});
	drawReg('', win.body.find('#RSideBar'));
	win.body.find('#RSideBar div').trigger('click');
});