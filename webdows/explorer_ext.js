/* 
explorer.file.draw(selector) //Draws a directory in the selected JQ selector.
.path(path) //Moves to path.
.forward() //Moves forward: Returns false if cant move any farther, True if more is avalible
.back() //Moves backwords: Returns false if cant move any farther, True if more is avalible
.up() //Moves up a directory: Returns false if cant move any farther, True if more is avalible
.callback(function() {
	//Called back after creation.
});

explorer.file.select(path, function() { //Function that returns a callback of the path that is selected.
	
});

explorer.file.explore(path); //Opens explorer window.

*/
$.extend(explorer, {
	explorer: function (location) {
		var win = new explorer.window()
		.resize(600, 400)
		.center()
		.title('Explorer')
		.icon('webdows/resources/icons/fold.ico')
		.menuBar([
		{
			title: "File",
			context: [
				{
					title: "Close",
					callback: function() {
						win.close();
					}
				}
			]
		}
		]);
		$(`
		<style>
			.window[windowid=`+win.id+`] .ttl * {
				opacity:0;
			}
			.window[windowid=`+win.id+`] input.explorer_input:hover, .window[windowid=`+win.id+`] input.explorer_input:focus {
				background-color:white !important;
			}
			.window[windowid=`+win.id+`] .navbutts span {
				display:inline-block;				
				width:25px;
				height:25px;
				position:absolute;
				top:1px;
			}
		</style>
		<div class="navbar" style="
			position:relative;
			height:32px;
		">
			<span class="navbutts" style="
				image-rendering:pixelated;
				width:57px;
				height:27px;
				background-image:url('webdows/resources/explorer/4.png');
				position:absolute;
				top:0px;
				left:0px;
			">
				<span style="
					left:3px;
					background-image:url(\'webdows/resources/explorer/6.png\');
				"></span>
				<span style="
					right:2px;
					background-image:url(\'webdows/resources/explorer/7.png\');
				"></span>
			</span>
			<input value="" class="explorer_input" type="text" style="
				width:calc(100% - 70px);
				position:absolute;
				top:3px;left:64px;
				background-color:rgba(255,255,255,0.6);
				border:1px solid rgba(0,0,0,0.2);
				border-top:1px solid rgba(0,0,0,0.5);
				box-shadow:inset 1px 1px 0px rgba(255,255,255,0.3),inset -1px -1px 0px rgba(255,255,255,0.3);
			"/>
		</div>
		`).insertAfter(win.jq.find('.minmaxclose'));
	}
});