/*!
Project: Webdows
Liscense: MIT
Author: krisdb2009
Date: 03/14/16
File: webdows/calc.js
*/
new explorer.window()
.resize(220, 275)
.center()
.title('Calculator')
.controls(['min'])
.icon('webdows/resources/icons/calc.ico')
.callback(function() {
	var b = this.body;
	var dis = this;
	dis.menuBar([
		{
			'title': 'View',
			context: [
				{
					title: 'Minimize',
					callback: function() { dis.front().toggleMin(); }
				}, {}, {
					title: 'Exit',
					callback: function() { dis.close(); }
				}
			]
		}, {
			'title': 'Help',
			context: [
				{
					title: 'Help',
					callback: function() { system.loader('webdows/welcome.js') }
				}, {}, {
					title: 'About Calculator',
					callback: function() { system.loader('webdows/webver.js') }
				}
			]
		}
	]);
	b.attr('style', 'background: linear-gradient(to bottom, #F5F8FE 0%,#d9e4f1 100%);text-align:center;');
	b.html('<div id="wrap"><div id="peek">0</div><button></button><button></button><button id="c">C</button><button></button><button></button><br><button>7</button><button>8</button><button>9</button><button>/</button><button></button><br><button>4</button><button>5</button><button>6</button><button>*</button><button id="easteregg"></button><br><button>1</button><button>2</button><button>3</button><button>-</button><button></button><br><button id="0">0</button><button>.</button><button>+</button><button id="eq">=</button></div>');
	var peek = b.find('#peek');
	b.find('button').attr('style', 'width:32px;height:25px;margin-right:5px;margin-top:5px;vertical-align:top;');
	b.find('#0').css('width', '69px');
	b.find('#eq').css({'height':'55px','margin-top':'-25px'});
	b.find('#wrap').attr('style', 'overflow:hidden;white-space:nowrap;width:180px;margin-left:auto;margin-right:auto;');
	peek.attr('style', 'text-align:right;height:50px;margin-top:10px;font-size:23px;line-height:50px;border:1px solid #8e9cad;border-radius:3px;background: linear-gradient(to bottom, #e5eefb 0%,white 100%);');
	b.find('button').click(function() {
		switch($(this).attr('id')) {
			case 'eq':
				try {
					var ans = eval(peek.text());
				} catch(e) {
					new explorer.window()
					.closeWith(dis)
					.title()
					.icon('webdows/resources/icons/calc.ico')
					.resize(200, 100)
					.center()
					.controls([])
					.body
					.html(e);
				}
				peek.text(ans);
				break;
			case 'c':
				peek.text('0');
				break;
			case 'easteregg':
				blueScreen('Don\'t push my buttons. -Calculator');
			default:
				if($(this).text() !== '') {
					if(peek.text() == '0') {
						peek.text($(this).text());
					} else {
						peek.append($(this).text());
					} 
				}
				break;
		}
	});
});