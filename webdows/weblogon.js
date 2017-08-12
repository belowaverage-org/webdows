$('title').text('Webdows Logon');
$('body').append(`
	<style>
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
			background-image:url('webdows/resources/icons/plog.png');
			width:125px;
			height:125px;
			background-size:100%;
			margin-left:auto;
			margin-right:auto;
		}
		#logonCont {
			position:absolute;
			width:230px;
			height:230px;
			top:calc(50% - 115px);
			left:calc(50% - 115px);
		}
	</style>
	<div id="backImage"></div>
	<div id="logonCont">
		<div id="logonImage"></div>
	</div>
	
	
`);