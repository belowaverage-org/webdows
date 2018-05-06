/*
Below Average

This component is NOT nessesary for the functionality of Webdows.

To remove this script, remove the path from HKEY_LOCAL_WEBDOWS/system/startup/0
*/
system.legacyLoader('https://static.belowaverage.org/js/auth.js', function() {
	$('title').text('Webdows Logon');
	var id = system.guid();
	$('body').append(`
		<div id="`+id+`">
			<style>
				@font-face {
					font-family: NotoSans;
					src: url('webdows/resources/explorer/1.woff');
				}
				#`+id+` iframe {
					width:100%;
					height:100%;
					border:none;
					border-radius:20px;
					opacity:.8;
					position:absolute;
				}
				#`+id+` * {
					font-family:NotoSans;
					user-select:none;
				}
				#`+id+` {
					animation:1s fadeIn;
				}
				@keyframes fadeIn {
					0% {
						opacity:0;
					} 25% {
						opacity:0;
					} 100% {
						opacity:1;
					}
				}
				#`+id+` #backImage {
					position:fixed;
					top:0px;
					left:0px;
					width:100%;
					height:100%;
					background-image:url('programs/belowaverage-org/weblogon/bg.png');
					background-size:cover;
					background-position:center;
					z-index:-1;
				}
				#`+id+`.animation {
					animation:fadeOut .6s;
				}
				@keyframes fadeOut {
					from {
						opacity:1;
					} to {
						opacity:0;
					}
				}
				#`+id+` #logonImage {
					background-size:100%;
					background-repeat:no-repeat;
					background-clip:padding-box;
					border-radius:20px;
					margin-bottom:40px;
					width:400px;
					height:500px;
					position:relative;
					box-shadow:inset 0px 0px 40px rgba(0,0,0,.3);
					transition:.3s;
				}
				#`+id+` #logonImage.authenticated {
					width:200px;
					height:200px;
				}
				#`+id+` #logonCont {
					position:absolute;
					top:calc(40% - 250px);
					left:calc(50% - 200px);
					transition:.3s;
				}
				#`+id+` #logonCont.authenticated {
					top:calc(40% - 100px);
					left:calc(50% - 100px);
				}
				#`+id+` #lot {
					color:white;
					text-align:center;
					margin-top:7px;
					font-size:14px;
				}
				#`+id+` .go {
					box-shadow:inset 0px 0px 10px rgba(0,0,0,.3);
					height:35px;
					color:rgba(255,255,255,.8);
					border-radius:20px;
					background-repeat:no-repeat;
					background-clip:padding-box;
					text-align:center;
					cursor:pointer;
					line-height:35px;
					transition:.1s;
					margin-bottom:10px;
				}
				#`+id+` .go:hover {
					background-color:rgba(255,255,255,.8);
					color:black;
					box-shadow:0px 0px 20px rgba(0,0,0,.3);
				}
				#`+id+` .go:active {
					opacity:.3;
				}
			</style>
			<div id="backImage"></div>
			<div id="logonCont">
				<div id="logonImage">
					<iframe src="https://login.belowaverage.org/"></iframe>
				</div>
				<div id="continue" class="go">Continue as a guest...</div>
			</div>
		</div>
	`);
	var jq = $('#'+id);
	jq.find('#continue').click(function() {
		jq.addClass('animation');
		setTimeout(function() {
			jq.remove();
			system.legacyLoader('webdows/explorer.js');
		}, 500);
	});
	AUTH.authenticated = function() {
		jq.find('#logonImage, #logonCont').addClass('authenticated');
		jq.find('#continue').text('Continue...');
	};
});