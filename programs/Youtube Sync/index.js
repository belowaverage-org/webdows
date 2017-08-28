var main = new explorer.window()
.title('Youtube Sync - Playback')
.icon('programs/Youtube Sync/icon.png')
.resize(500, 360)
.center('', -100, -100);
var sat = {};
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
			}
		]
	}, {
		title: 'View',
		context: [
			{
				title: 'Fullscreen',
				callback: function() {
					video.webkitEnterFullscreen();
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
		.window[windowid=`+main.id+`] video {
			width:100%;
			height:100%;
			position:absolute;
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
var video = $('<video controls></video>').appendTo(main.body)[0];
//video.src = 'https://r19---sn-p5qlsnes.googlevideo.com/videoplayback?ei=jdugWee_HZeJYPnKtJAN&itag=22&ratebypass=yes&pl=32&signature=10CF1BA2867BFFDDB850BE51FAF1F980677B1F4A.98DF7F7F03037CA74F8C164AE85C091FC6F50699&mime=video%2Fmp4&key=yt6&source=youtube&initcwndbps=1097500&requiressl=yes&expire=1503735789&id=o-AMB7_U_I56yOaqUdUXkgFW_VfOGRCBL_65a5HCoo86gK&ipbits=0&mm=31&mn=sn-p5qlsnes&dur=188.592&ms=au&mt=1503714047&mv=m&sparams=dur%2Cei%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmime%2Cmm%2Cmn%2Cms%2Cmv%2Cpl%2Cratebypass%2Crequiressl%2Csource%2Cexpire&lmt=1483593667503233&ip=2607%3Afcc8%3A6805%3A8b01%3A%3A1%3A0';
window.vid = video;