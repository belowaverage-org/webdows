new explorer.window()
.title('Boot Animation')
.toggleMin()
.front()
.callback(function() {
	var body = this.body;
	var win = this;
	var open = 'ani'+system.guid();
	setTimeout(function() {
		$('body #'+open).remove();
		win.close();
	}, 3000);
	var audio = new Audio('webdows/resources/explorer/1.ogg');
	audio.play();
	$('body').append('<div id="'+open+'"><span class="a"></span><span class="b"></span><span class="c"></span><span class="d"></span><span class="f"></span><span class="e"></span></div>');
	body.html(`<style>
	#`+open+` {
		position:fixed;
		width:100%;
		height:100%;
		left:0px;
		top:0px;
		overflow:hidden;
		background-color:black;
		z-index:1005;
		cursor:none;
		animation:es6 3s ease-in-out;
		animation-fill-mode:forwards;
	}
	#`+open+` .a, #`+open+` .a::after {
		content:'';
		position:absolute;
		width:400px;
		height:100px;
		background-image:url('webdows/resources/explorer/1.png');
		background-repeat:no-repeat;
		background-size:100px 100px;
	}
	#`+open+` .a {
		animation:es1 3s ease-in-out;
		animation-fill-mode:forwards;
		opacity:0;
		left:calc(50% - 200px);
		top:calc(50% - 50px);
	}
	#`+open+` .d, #`+open+` .f {
		position:absolute;
		left:calc(50% - 200px);
		top:calc(50% - 50px);
		width:400px;
		height:100px;
		animation:es1 3s ease-in-out;
		font-family:NotoSans;
		animation-fill-mode:forwards;
	}
	#`+open+` .d::before, #`+open+` .f::before {
		position:absolute;
		line-height:95px;
		color:white;
		content:'Below Average';
		font-size:25px;
		margin-left:100px;
		animation:es3 3s ease-in-out;
		animation-fill-mode:forwards;
	}
	#`+open+` .d::after, #`+open+` .f::after  {
		position:absolute;
		line-height:95px;
		color:white;
		content:'Webdows';
		font-size:25px;
		margin-left:280px;
		animation:es5 3s ease-in-out;
		animation-fill-mode:forwards;
	}
	#`+open+` .f::before, #`+open+` .f::after, #`+open+` .a::after {
		top:100px;
		transform:rotateX(180deg);
		opacity:.2;
		color:rgba(255,255,255,.2);
		filter:blur(2px);
	}
	#`+open+` .a::before {
		position:absolute;
		content:'';
		left:-110px;
		top:-110px;
		width:300px;
		height:300px;
		background-image:url('webdows/resources/explorer/2.png');
		animation:es2 3s ease;
		animation-fill-mode:forwards;
		opacity:0;
		background-repeat:no-repeat;
		background-size:100%;
	}
	#`+open+` .c {
		position:absolute;
		left:calc(50% - 280px);
		top:calc(50% - 250px);
		background-image:url('webdows/resources/explorer/10.png');
		width:600px;
		height:550px;
		opacity:0;
		background-repeat:no-repeat;
		background-size:100% 100%;
		animation:es4 3s ease-in-out;
		animation-fill-mode:forwards;
	}
	@keyframes es1 {
		0% {
			opacity:0;
			transform:scale(.99);
		} 20% {
			transform:scale(1);
		} 40% {
			opacity:1;
		} 65% {
			opacity:0;
		} 100% {
			opacity:0;
			transform:scale(0);
		}
	}
	@keyframes es3 {
		0% {
			opacity:0;
		} 30% {
			opacity:1;
		}
	}
	@keyframes es5 {
		0% {
			opacity:0;
		} 40% {
			opacity:1;
		}
	}
	@keyframes es4 {
		0% {
			opacity:0;
		} 30% {
			opacity:1;
		} 60% {
			transform:scale(1.1);
			opacity:0;
		}
	}@keyframes es2 {
		0% {
			opacity:0;
			transform:rotate(0deg);
		} 25% {
			opacity:1;
		} 50% {
			opacity:0;
		} 100% {
			opacity:0;
			transform:rotate(15deg);
		}
	}
	@keyframes es6 {
		0% {
			opacity:1;
		} 55% {
			opacity:1;
		} 100% {
			opacity:0;
		}
	}
</style>`);
});