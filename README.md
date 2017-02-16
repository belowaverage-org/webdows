<img src="https://raw.githubusercontent.com/belowaverage-org/webdows/master/Public/Pictures/banner.png">
<hr>
<p align="center">
<img src="https://raw.githubusercontent.com/belowaverage-org/webdows/master/Public/Pictures/dev.png">
<img src="https://raw.githubusercontent.com/belowaverage-org/webdows/master/Public/Pictures/docs.png">
<img src="https://raw.githubusercontent.com/belowaverage-org/webdows/master/Public/Pictures/demo.png">
<img src="https://raw.githubusercontent.com/belowaverage-org/webdows/master/Public/Pictures/website.png">
</p>
<hr>
<h2 align="center">Webdows is a dynamic window API for the web browser designed to look and feel like Microsoft Windows</h2>
<hr>
<h1>Features</h1>
* Simple API
* Built in preloader
* Well documented (Comming soon)
* Supported by Chrome, Safari, Firefox, Edge, and IE 10+
* Utilizes jQuery
* 99% CSS vector design. *Bitmaps rarely used for styling*
* Customizable themes

<h1>Simple API</h1>
<h3>Making a window</h3>
```javascript
new explorer.window()
.title('Hello World')
.resize(200, 200)
.callback(function() {
  this.body.html('Test 123');
});
```
<img src="https://raw.githubusercontent.com/belowaverage-org/webdows/master/Public/Pictures/simpleapi1.PNG">

<h3>Creating a context menu</h3>
```javascript
new explorer.context()
.append([
  {
    title: 'Hello'
  }, {}, 
  {
    title: 'World',
    callback: function() { console.log('World Clicked'); }
  }
]);
```
<img src="https://github.com/belowaverage-org/webdows/blob/master/Public/Pictures/context.png">
