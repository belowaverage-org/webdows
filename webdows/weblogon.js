$('title').text('Webdows Logon');
$('body').append(`
	<style>
		@font-face {
			font-family: NotoSans;
			src: url('webdows/resources/explorer/1.woff');
		}
		* {
			font-family:NotoSans;
		}
		#backImage {
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
		#logonImage {
			background:linear-gradient(to bottom, rgba(255,255,255,0.4) 0%,rgba(255,255,255,0.1) 49%,rgba(255,255,255,0) 50%,rgba(255,255,255,0) 100%), url('webdows/resources/icons/plog.png'), linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.2));
			width:125px;
			height:125px;
			background-size:100%;
			background-repeat: no-repeat;
			margin-left:auto;
			margin-right:auto;
			background-clip: padding-box;
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
		#logonCont {
			position:absolute;
			width:230px;
			height:230px;
			top:calc(40% - 115px);
			left:calc(50% - 115px);
		}
		input {
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
		#lot {
			color:white;
			text-align:center;
			margin-top:7px;
			font-size:14px;
		}
	</style>
	<div id="backImage"></div>
	<div id="logonCont">
		<div id="logonImage"></div>
		<input type="text" placeholder="Username">
		<input type="password" placeholder="Password">
		<div id="lot">Log on to: <span></span></div>
	</div>
	
	
`);
$('#lot span').text(window.location.hostname);
