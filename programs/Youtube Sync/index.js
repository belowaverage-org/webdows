var main = new explorer.window()
.title('YouTube Sync - Playback')
.icon('programs/Youtube Sync/icon.png')
.resize(500, 360)
.center('', -100, -100);
var sat = {};
var player = {};
function openSat() {
	sat = new explorer.window()
	.title('YouTube Sync - Queue')
	.icon('programs/Youtube Sync/icon.png')
	.resize(200, 360)
	.center('', 264, -100)
	.closeWith(main)
	.controls([]);
}
openSat();
main.front();
main.mBar = [
	{
		title: 'File',
		context: [
			{
				title: 'Exit',
				callback: function() {
					main.close();
				}
			}, {
				title: 'Test',
				callback: function() {
					player.source({
						type: 'video',
						sources: [{
							src: 'E1iwrfgNOUU',
							type: 'youtube'
						}]
					});
					player.on('ready', function() {
						player.play();
						console.log('asdf');
					});
				}
			}
		]
	}, {
		title: 'View',
		context: [
			{
				title: 'Show queue...',
				icon: 'programs/Youtube Sync/que.png',
				callback: function() {
					if(sat.is.closed) {
						openSat();
					} else {
						sat.toggleMin();
					}
				}
			}, {
				title: 'Show logs...',
				icon: 'programs/Youtube Sync/logs.png',
				callback: function() {
					if(sat.is.closed) {
						openSat();
					} else {
						sat.toggleMin();
					}
				}
			}
		]
	}, {
		title: 'Playback',
		context: [
			{
				title: 'Quality',
				context: [
					{
						title: 'Auto',
						callback: function() {}
					}, {}, {
						title: 'High',
						callback: function() {}
					}, {
						title: 'Medium',
						callback: function() {}
					}, {
						title: 'Low',
						callback: function() {}
					}
				]
			}, {}, {
				title: 'Fullscreen...',
				icon: 'programs/Youtube Sync/full.png',
				callback: function() {
					player.toggleFullscreen();
				}
			}, {}, {
				title: 'Play/Pause',
				icon: 'programs/Youtube Sync/plpa.png',
				callback: function() {
					if(player.isPaused()) {
						player.play();
					} else {
						player.pause();
					}
				}
			}, {
				title: 'Next',
				icon: 'programs/Youtube Sync/next.png',
				callback: function() {}
			}, {
				title: 'Previous',
				icon: 'programs/Youtube Sync/prev.png',
				callback: function() {}
			}, {
				title: 'Stop',
				icon: 'programs/Youtube Sync/stop.png',
				callback: function() {}
			}, {}, {
				title: 'Mute/Unmute',
				icon: 'programs/Youtube Sync/umut.png',
				callback: function() {
					player.toggleMute();
					if(player.isMuted()) {
						main.mBar[2].context[9].icon = 'programs/Youtube Sync/mute.png';
					} else {
						main.mBar[2].context[9].icon = 'programs/Youtube Sync/umut.png';
					}
				}
			}
		]
	}, {
		title: 'Channel',
		context: [
			{
				title: 'Change channel...',
				icon: 'programs/Youtube Sync/chan.png',
				callback: function() {}
			}, {
				title: 'Hide channel',
				icon: 'programs/Youtube Sync/hide.png',
				callback: function() {}
			}
		]
	}, {
		title: 'About',
		context: [
			{
				title: 'About YouTube Sync...',
				icon: 'programs/Youtube Sync/icon.png',
				callback: function() {}
			}, {}, {
				title: 'About Webdows...',
				callback: function() {}
			}, {
				title: 'About Below Average...',
				callback: function() {}
			}
		]
	}
]
main.menuBar(main.mBar);
main.body.html(`
	<style>
		.window[windowid=`+main.id+`] iframe {
			width:100%;
			height:100%;
			position:absolute;
			border:0px;
		}
		.window[windowid=`+main.id+`] .body {
			background-image:url('programs/Youtube Sync/icon.png');
			background-position:calc(50% + 5px) 50%;
			background-repeat:no-repeat;
			background-size:100px;
			background-color:black;
		}
	</style>
`);
main.body.find('*:not(style)').remove();
var video = $('<iframe src="programs/Youtube Sync/plyr.html"></iframe>').appendTo(main.body);
video[0].allowFullscreen = true;
video[0].contentWindow.onload = function() {
	player = video[0].contentWindow.player;
	window.player = video[0].contentWindow.player;
	callback.call();
};