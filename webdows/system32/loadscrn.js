var id = system.guid();
$('#bootlog').append(`
<style>
	#`+id+` {
		background-color:black;
		position:fixed;
		top:0px;
		left:0px;
		width:100%;
		height:100%;
		z-index:100000;
		cursor:none;
	}
	#`+id+` #logo {
		position:absolute;
		top:calc(50% - 140px);
		left:calc(50% - 80px);
		width:160px;
		height:160px;
		background-image:url('webdows/resources/icons/bvlg.svg');
		background-size:100% 100%;
		background-color:white;
		border-radius:80px;
	}
	#`+id+` #progress {
		position:absolute;
		top:calc(50% + 50px);
		left:calc(50% - 100px);
		width:200px;
		height:16px;
		background-color:#212121;
		border-radius:10px;
	}
	#`+id+` #progress::before {
		content:'';
		position:absolute;
		width:calc(100% - 10px);
		height:8px;
		margin-top:4px;
		margin-left:5px;
		background-color:#363636;
		border-radius:5px;
	}
	#`+id+` #progressFill {
		position:absolute;
		max-width:calc(100% - 10px);
		min-width:10px;
		height:8px;
		border-radius:5px;
		margin-top:4px;
		margin-left:5px;
		background-color:#e0e0e0;
		animation:1s mov infinite linear;
	}
	@keyframes mov {
		0% {
			background-position:0px 0px;
		}
		100% {
			background-position:16px 0px;
		}
	}
</style>
<div id="`+id+`">
	<div id="logo"></div>
	<div id="progress">
		<div id="progressFill"></div>
	</div>
</div>
`);
function cleanup () {
	$('#'+id).remove();
}
$(document).bind('mousedown.bload', '#'+id, function() {
	cleanup();
	$(document).unbind('mousedown.bload');
});
var timer = setInterval(function() {
	$('#'+id+' #progress #progressFill').css('width', (system.bootLoader.current / system.bootLoader.total * 100)+'%');
	if(system.bootLoader.loaded) {
		clearInterval(timer);
		cleanup();
	}
}, 100);