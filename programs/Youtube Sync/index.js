var main = new explorer.window()
.title('Youtube Sync - Playback')
.icon('programs/Youtube Sync/icon.png')
.resize(500, 360)
.center('', -100, -100);
var sat = new explorer.window()
.title('Youtube Sync - Queue')
.icon('programs/Youtube Sync/icon.png')
.resize(200, 360)
.center('', 264, -100)
.closeWith(main)
.controls([]);
main.front();
window.sat = sat;