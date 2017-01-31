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
.resize(500, 410)
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
    bod.html('<div class="wrapper"><img class="logo" src="programs/Youtube Extractor/logo.png"/><label for="title">Title </label><input class="stat" id="title" type="text" disabled/><br><label for="upl">Uploader </label><input class="stat" id="upl" type="text" disabled/><br><label for="views">Views </label><input class="stat" id="views" type="text" disabled/><br><label for="date">Upload Date </label><input class="stat" id="date" type="text" disabled/><br><input class="extract" placeholder="Paste YouTube URL" type="text"/><div class="results"></div></div>');
    bod.css({'display':'flex', 'justify-content':'center', 'align-items':'center'});
    bod.find('div.wrapper').attr('style', 'position:relative;width:470px;margin-left:auto;margin-right:auto;');
    bod.find('input.extract').attr('style', 'margin-left:auto;margin-right:auto;width:466px;text-align:center;margin-top:20px;display:block;');
    bod.find('input.stat').attr('style', 'float:right;width:250px;');
    bod.find('img.logo').attr('style', 'margin-right:10px;float:left;width:100px;height:100px;display:inline-block;');
    bod.find('div.results').attr('style', 'margin-top:10px;width:100%;height:205px;overflow:auto;')
    bod.find('input.extract').on('input', function() {
        bod.find('#title.stat').val('Checking URL');
        dis.icon('programs/Youtube Extractor/hourglass.gif');
        $.get('https://api.belowaverage.org/v1/youtube-dl/?token='+bod.find('input.extract').val(), function(token) {
            if(token == 'Please enter a youtube ID') {
                dis.icon('programs/Youtube Extractor/logo.png')
                bod.find('img.logo').attr('src', 'programs/Youtube Extractor/logo.png');
                bod.find('#title.stat').val('Youtube URL not valid.');
                bod.find('#upl.stat').val('');
                bod.find('#views.stat').val('');
                bod.find('#date.stat').val(''); 
                bod.find('div.results').html('');
            } else {
                bod.find('#title.stat').val('Loading info...');
                $.getJSON('https://api.belowaverage.org/v1/youtube-dl/?json='+token, function(data) {
                    dis.icon('programs/Youtube Extractor/logo.png');
                    bod.find('img.logo').attr('src', data.thumbnail);
                    bod.find('#title.stat').val(data.title);
                    bod.find('#upl.stat').val(data.uploader);
                    bod.find('#views.stat').val(data.view_count);
                    bod.find('#date.stat').val(data.upload_date);
                    bod.find('div.results').html('');
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
                    bod.find('div.results div.result span').attr('style', 'margin-right:5px;');
                    bod.find('div.results div.result span.mid').css('color', 'gray');
                    bod.find('div.results div.result button').attr('style', 'float:right;margin-right:3px;').click(function() {
                        var dlthis = new explorer.window()
                        .title('Youtube Player')
                        .icon('programs/Youtube Extractor/logo.png')
                        .center();
                        var dlwin = dlthis.body;
                        if($(this).text() == 'Play') {
                            dlwin.html('<video style="border:0px;position:absolute;top:0px;left:0px;width:100%;height:100%;" controls src="'+$(this).parent().attr('content')+'" autoplay></video>');
                            dlwin.css('background-color', 'black');
                        } else {
                            dlwin.css('text-align', 'center');
                            dlwin.html('<br><br><a class="dl" href="'+$(this).parent().attr('content')+'" download>Downloading...</a>');
                            dlwin.find('a.dl').click(function() {
                                dlthis.close();
                            });
                            dlwin.find('a.dl')[0].click();
                        }
                    });
                }).fail(function() {
                    dis.icon('programs/Youtube Extractor/logo.png');
                    bod.find('img.logo').attr('src', 'programs/Youtube Extractor/logo.png');
                    bod.find('#title.stat').val('');
                    bod.find('#upl.stat').val('');
                    bod.find('#views.stat').val('');
                    bod.find('#date.stat').val(''); 
                    bod.find('div.results').html('');
                });
            }
        });
    });
});