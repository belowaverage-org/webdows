var main = new explorer.window()
.title('YouTube Sync - Playback')
.icon('programs/Youtube Sync/icon.png')
.resize(500, 360)
.center('', -100, -100);
var sat = {};
var player = {};
var isFullScreen = false;
function openSat() {
	sat = new explorer.window()
	.title('YouTube Sync - Queue')
	.icon('programs/Youtube Sync/icon.png')
	.resize(200, 360)
	.center('', 264, -100)
	.closeWith(main)
	.controls([]);
}
function toggleFullScreen() {
	main.toggleMax();
	explorer.toggleFullScreen();
}
main.on.toggleMin = function() {
	console.log(this);
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
					toggleFullScreen();
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
			background-image:url('programs/Youtube Sync/loa1.png');
			background-position:50% 50%;
			background-repeat:no-repeat;
			background-size:100px;
			background-color:black;
		}
		.window[windowid=`+main.id+`] .body::before {
			content:'';
			display:block;
			position:absolute;
			width:100px;
			background-image:url('programs/Youtube Sync/loa2.png');
			background-size:100% 100%;
			height:100px;
			top:calc(50% - 50px);
			left:calc(50% - 50px);
			animation:spin 1s infinite linear;
		}
		@keyframes spin {
			from {
				transform:rotate(0deg);
			} to {
				transform:rotate(360deg);
			}
		}
	</style>
`);
main.body.find('*:not(style)').remove();
var iframe = $('<iframe src="programs/Youtube Sync/plyr.html"></iframe>').appendTo(main.body);
iframe[0].allowFullscreen = true;
/*
iframe[0].contentWindow.onload = function() {
	player = iframe[0].contentWindow.player;
	window.player = iframe[0].contentWindow.player;
};
*/
iframe.on('load', function() {
	player = iframe[0].contentWindow.player;
	window.player = iframe[0].contentWindow.player;
});