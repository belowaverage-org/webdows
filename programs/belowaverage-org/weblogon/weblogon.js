/*
Below Average

This component is NOT nessesary for the functionality of Webdows.

To remove this script, remove the path from HKEY_LOCAL_WEBDOWS/system/startup/0
*/
(function() {
	$('title').text('Webdows Logon');
	var id = system.guid();
	$('body').append(`
		<div id="`+id+`">
			<style>
				@font-face {
					font-family: NotoSans;
					src: url('webdows/resources/explorer/1.woff');
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
					background-image:url('webdows/resources/explorer/webdows/bg.jpg');
					background-size:cover;
					background-position:center;
					filter:blur(10px);
					opacity:.5;
					z-index:-1;
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
					background:linear-gradient(to bottom, rgba(255,255,255,0.4) 0%,rgba(255,255,255,0.1) 49%,rgba(255,255,255,0) 50%,rgba(255,255,255,0) 100%), url('webdows/resources/icons/plog.png'), linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.2));
					width:125px;
					height:125px;
					background-size:100%;
					background-repeat:no-repeat;
					margin-left:auto;
					margin-right:auto;
					background-clip:padding-box;
					border:5px solid rgba(202,232,255,.3);
					box-shadow:
						1px 0px 0px rgba(26,224,255,.77),
						-1px -0px 0px rgba(255,255,255,.95),
						0px 1px 0px rgba(26,224,255,.77),
						-0px -1px 0px rgba(255,255,255,.95),
						inset 1px 0px 0px rgba(255,255,255,.61),
						inset -1px -0px 0px rgba(255,255,255,.61),
						inset 0px 1px 0px rgba(255,255,255,.61),
						inset -0px -1px 0px rgba(255,255,255,.61)
					;
					border-radius:16px;
					margin-bottom:40px;
				}
				#`+id+` #logonCont {
					position:absolute;
					width:230px;
					height:230px;
					top:calc(40% - 115px);
					left:calc(50% - 115px);
				}
				#`+id+` input {
					outline:none;
					border:1px solid #666666;
					margin-top:8px;
					border-radius:3px;
					box-shadow:
						0px 1px 0px rgba(255,255,255,.3),
						1px 0px 0px rgba(255,255,255,.3),
						-1px 0px 0px rgba(255,255,255,.3),
						0px -1px 0px rgba(255,255,255,.3)
					;
					height:15px;
					width:215px;
					padding:3px;
					font-size:12px;
				}
				#`+id+` #lot {
					color:white;
					text-align:center;
					margin-top:7px;
					font-size:14px;
				}
				#`+id+` #go {
					background:linear-gradient(to bottom, rgba(255,255,255,0.8) 0%,rgba(255,255,255,0.2) 49%,rgba(156,176,190,.1) 50%,rgba(255,255,255,0) 100%);
					width:25px;
					height:25px;
					color:rgba(255,255,255,.7);
					border:1px solid rgba(20,25,43,.65);
					box-shadow:inset 0px 1px 0px rgba(255,255,255,.8), inset 0px -1px 0px rgba(255,255,255,.43);
					border-radius:13px;
					background-repeat:no-repeat;
					background-clip:padding-box;
					font-weight:bolder;
					text-align:center;
					position:absolute;
					top:213px;
					left:234px;
					cursor:pointer;
					line-height:25px;
					transition:.1s;
				}
				#`+id+` #go:hover {
					opacity:1;
					color:white;
					background:linear-gradient(to bottom, rgba(204,212,233,1) 0%,rgba(48,102,177,1) 49%,rgba(1,29,99,1) 50%,rgba(64,199,251,1) 100%);
					border:1px solid rgba(1,22,117,1);
					box-shadow:inset 0px 1px 0px rgba(204,212,233,1), inset 0px -1px 0px rgba(134,255,255,1);
				}
				#`+id+` #go:active {
					opacity:.5;
					transition:0s;
				}
			</style>
			<div id="backImage"></div>
			<div id="logonCont">
				<div id="logonImage"></div>
				<input type="text" placeholder="Username">
				<input type="password" placeholder="Password">
				<div id="go">></div>
				<div id="lot">Log on to: <span></span></div>
			</div>
		</div>
	`);
	var jq = $('#'+id);
	jq.find('#lot span').text(system.registry.get('HKEY_LOCAL_WEBDOWS/software/belowaverage-org/weblogon/domain'));
	jq.find('#go').click(function() {
		jq.addClass('animation');
		setTimeout(function() {
			jq.remove();
			system.legacyLoader('webdows/explorer.js');
		}, 500);
	});
})();