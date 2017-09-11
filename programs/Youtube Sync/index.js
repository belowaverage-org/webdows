var main = new explorer.window()
.title('Youtube Sync - Playback')
.icon('programs/Youtube Sync/icon.png')
.resize(500, 360)
.center('', -100, -100);
var sat = {};
var player = {};
function openSat() {
	sat = new explorer.window()
	.title('Youtube Sync - Queue')
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
				title: 'Fullscreen',
				callback: function() {
					player.toggleFullscreen();
				}
			}, {}, {
				title: 'Show queue...',
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
		title: 'Channel',
		context: [
			{
				title: 'Change channel...',
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