function brodiesprogram() {
    var WINDOW = explorer.window.open();
    explorer.window.resize(WINDOW, 520, 222);
	explorer.window.center(WINDOW);
    explorer.window.title(WINDOW, 'Do It Bitch');
    explorer.window.icon(WINDOW, 'webdows/resources/icons/shell32_153.ico');
    WINDOW.find('.body').html('<h3>I would like it if you pushed all my buttons...</h3><button>1</button><button>2</button><button>3</button><button>4</button><button>5</button><button>6</button><button>7</button><button>8</button><button>9</button><button>10</button><button>11</button><button>12</button><button>13</button><button>14</button>');
    WINDOW.find('.body button').click(function() {
		system.loader('//hi.kickassapp.com/kickass.js');
    });
}
brodiesprogram();