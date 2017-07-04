/*!
Project: Webdows
Liscense: MIT
Author: krisdb2009
Date: 03/14/16
File: programs/Youtube Extractor/index.js
*/
new explorer.window()
.title('Youtube Extractor')
.controls(['min'])
.resize(500, 420)
.icon('programs/Youtube Extractor/logo.png')
.center()
.callback(function() {
	var bod = this.body;
	var dis = this;
	dis.menuBar([
		{
			'title': 'View',
			context: [
				{
					title: 'Minimize',
					callback: function() { dis.front().toggleMin(); }
				}, {}, {
					title: 'Exit',
					callback: function() { dis.close(); }
				}
			]
		}, {
			'title': 'Help',
			context: [
				{
					title: 'Help',
					callback: function() { system.loader('webdows/welcome.js') }
				}, {}, {
					title: 'About Extractor',
					callback: function() { new explorer.window().title('About Extractor').body.html('krisdb2009 2017, Using api.belowaverage.org/v1/youtube-dl/. Youtube-DL created by https://github.com/rg3.'); }
				}
			]
		}
	]);
	function download(href) {
		var id = system.guid();
		var win = new explorer.window();
		win.jq.hide();
		win.body.append('<a id="'+id+'" style="" download="'+href+'" href="'+href+'">.</a>');
		$('#'+id)[0].click();
		win.close();
	}
	bod.html('<div class="wrapper"><img class="logo" src="programs/Youtube Extractor/logo.png"/><label for="title">Title </label><input class="stat" id="title" type="text" disabled/><br><label for="upl">Uploader </label><input class="stat" id="upl" type="text" disabled/><br><label for="views">Views </label><input class="stat" id="views" type="text" disabled/><br><label for="date">Upload Date </label><input class="stat" id="date" type="text" disabled/><br><input class="extract" placeholder="Paste YouTube URL" type="text"/><div class="results"></div></div>');
	bod.css({'display':'flex', 'justify-content':'center', 'align-items':'center'});
	bod.find('div.wrapper').attr('style', 'position:relative;width:470px;margin-left:auto;margin-right:auto;');
	bod.find('input.extract').attr('style', 'margin-left:auto;margin-right:auto;width:466px;text-align:center;margin-top:20px;display:block;');
	bod.find('input.stat').attr('style', 'float:right;width:250px;');
	bod.find('label').attr('style', 'font-size:14px;line-height: 25px;');
	bod.find('img.logo').attr('style', 'margin-right:10px;float:left;width:100px;height:100px;display:inline-block;');
	bod.find('div.results').attr('style', 'margin-top:10px;width:100%;height:205px;overflow:auto;font-size:14px;');
	bod.find('input.extract').on('input', function() {
		if(bod.find('input.extract').val() !== '') {
			bod.find('#title.stat').val('Checking URL...');
			dis.icon('programs/Youtube Extractor/hourglass.gif');
			var url = bod.find('input.extract').val();
			$.get('https://api.belowaverage.org/v1/youtube-dl/?token='+url, function(token) {
				if(token == 'Please enter a youtube ID') {
					dis.icon('programs/Youtube Extractor/logo.png')
					bod.find('img.logo').attr('src', 'programs/Youtube Extractor/logo.png');
					bod.find('#title.stat').val('Youtube URL not valid.');
					bod.find('#upl.stat').val('');
					bod.find('#views.stat').val('');
					bod.find('#date.stat').val(''); 
					bod.find('div.results').html('');
					bod.find('input.extract').attr('disabled', false);
				} else {
					bod.find('#title.stat').val('Loading info...');
					bod.find('input.extract').attr('disabled', true);
					$.getJSON('https://api.belowaverage.org/v1/youtube-dl/?json='+token, function(data) {
						dis.icon('programs/Youtube Extractor/logo.png');
						bod.find('img.logo').attr('src', data.thumbnail);
						bod.find('#title.stat').val(data.title);
						bod.find('#upl.stat').val(data.uploader);
						bod.find('#views.stat').val(data.view_count);
						bod.find('#date.stat').val(data.upload_date);
						bod.find('div.results').html('');
						bod.find('input.extract').attr('disabled', false);
						bod.find('div.results').append('<div class="result mp3"><span>MP3</span><span class="mid">High Quality MP3</span><button style="width:116px;">Convert</button></div>');
						bod.find('div.result.mp3 button').click(function(e) {
							e.stopImmediatePropagation();
							new explorer.window()
							.title('Youtube Extractor')
							.closeWith(dis)
							.resize(200, 130)
							.center()
							.controls([])
							.front()
							.icon('programs/Youtube Extractor/logo.png')
							.callback(function() {
								var body = this.body;
								var win = this;
								body.html('<button class="b">Best Quality</button><br><button class="g">Good Quality</button><br><button class="w">Worst Quality</button><br><button class="t">Embed Thumbnail<input style="right:5px;position:absolute;pointer-events:none;margin-top:2px;" checked type="checkbox"></button>')
								body.find('button').attr('style','width:calc(100% - 10px);margin-left:5px;line-height:16px;');
								body.find('.t').click(function() {
									if($(this).find('input').attr('checked')) {
										$(this).find('input').removeAttr('checked');
									} else {
										$(this).find('input').attr('checked', true);
									}
								});
								body.find('.b, .g, .w').click(function() {
									win.close();
									var additions = '';
									if($(this).hasClass('b')) {
										additions = 'quality=0';
									}
									if($(this).hasClass('g')) {
										additions = 'quality=5';
									}
									if($(this).hasClass('w')) {
										additions = 'quality=9';
									}
									if(body.find('input').attr('checked')) {
										additions = additions + '&thumbnail';
									}
									new explorer.window()
									.title('Youtube Extractor - Converter')
									.resize(500, 410)
									.center('', 20, 20)
									.front()
									.controls([])
									.callback(function() {
										var win = this;
										var log = this.body;
										$.get('https://api.belowaverage.org/v1/youtube-dl/?token='+url, function(token) {
											download('https://api.belowaverage.org/v1/youtube-dl/?mp3='+token+'&'+additions);
											var interval = setInterval(function() {
												$.get('https://api.belowaverage.org/v1/youtube-dl/?mp3='+token+'&log', function(resp) {
													if(resp == 'Finished.') {
														clearInterval(interval);
														win.close();
													}
													log.html('<pre style="white-space:pre-wrap;font-size:10px;">'+resp+'</pre>');
													log.scrollTop(log[0].scrollHeight);
												});
											}, 500);
										});
									});
								});
							});
						});
						var count = 0;
						$.each(data.formats, function(k, v) {
							v.note = '';
							var style = '';
							if(typeof v.height !== 'undefined') {
								v.height = v.height+'p';
							}
							if(count % 2 === 0 ) {
								style = ' style="background-color:rgba(0,0,0,.1);"';
							}
							bod.find('div.results').append('<div'+style+' content="'+v.url+'" class="result"><span>'+v.ext+'</span><span class="mid">'+v.format+'</span><button>Download</button><button>Play</button></div>');
							count = count + 1;
						});
						bod.find('div.results div.result span').attr('style', 'margin-right:5px;line-height:25px');
						bod.find('div.results div.result span.mid').css('color', 'gray');
						bod.find('div.results div.result button').css({'float':'right','margin-right':'3px'}).click(function() {
							var vlink = $(this).parent().attr('content');
							if($(this).text() == 'Play') {
								new explorer.window()
								.callback(function() {
									this.body.html('<video controls style="width:100%;height:100%;position:absolute;" src="'+vlink+'"></video>');
								});
							} else {
								download(vlink);
							}
						});
					}).fail(function() {
						dis.icon('programs/Youtube Extractor/logo.png');
						bod.find('img.logo').attr('src', 'programs/Youtube Extractor/logo.png');
						bod.find('#title.stat').val('Video does not exist!');
						bod.find('#upl.stat').val('');
						bod.find('#views.stat').val('');
						bod.find('#date.stat').val(''); 
						bod.find('div.results').html('');
						bod.find('input.extract').attr('disabled', false);
					});
				}
			});
		}
	});
});