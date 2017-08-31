<img src="https://raw.githubusercontent.com/krisdb2009/webdows-docs/master/images/banner.png">
<hr>
<p align="center">
<a href="https://github.com/belowaverage-org/webdows/wiki"><img src="https://raw.githubusercontent.com/krisdb2009/webdows-docs/master/images/docs.png"></a>
<a href="http://belowaverage.org/webdows/"><img src="https://raw.githubusercontent.com/krisdb2009/webdows-docs/master/images/demo.png"></a>
<a href="https://belowaverage.org/"><img src="https://raw.githubusercontent.com/krisdb2009/webdows-docs/master/images/website.png"></a>
</p>
<hr>
<h2 align="center">Webdows is a dynamic window API for the web browser designed to look and feel like Microsoft Windows</h2>
<hr>
<h1>Features</h1>

* Simple API

* Built in preloader

* Well documented (Comming soon)

* Supported by Chrome, Safari, Firefox, and Opera.

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

<img src="https://raw.githubusercontent.com/krisdb2009/webdows-docs/master/images/simpleapi1.PNG">

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
<img src="https://raw.githubusercontent.com/krisdb2009/webdows-docs/master/images/context.png">
