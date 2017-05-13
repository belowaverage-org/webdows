/*!
Project: Webdows
Liscense: MIT
Author: krisdb2009
Date: 05/05/16
File: programs/Web Explorer/we.js
*/
//Create a new window object
new explorer.window()
.title('Web Explorer') //set the title
.resize(400, 300) //set the dimentions
.icon('programs/Web Explorer/1.png') //set the icon
.toggleMax() //make the window maximized
.callback(function() {
	//Variable rename for convienience and access later on.
	var win = this;
	
	//Variable rename for convienience and access later on.
	var bod = this.body;
	
	//Function to change the iframe to the givin URL.
	function changeUrl(url) {
		//Change the iframe
		bod.find('input.i1').val(url);
		
		//Change the window title
		win.title('Web Explorer - '+url)
	};
	
	//Create the starting HTML
	bod.html('<button class="b1"><-</button><button class="b2">-></button><input class="i1"></input><button class="b3">Go</button><iframe class="if1"></iframe>');
	
	//Give the button its position via the style (CSS) and piggyback a click event if it is clicked.
	bod.find('button.b1').attr('style', 'position:absolute;left:1px;top:1px;width:24px;height:21px;').click(function() {
		//If button is clicked find the iframe and go back 1 page in its history.
		bod.find('iframe.if1')[0].contentWindow.history.go(-1);
	});
	
	//Give the button its position via the style (CSS) and piggyback a click event if it is clicked.
	bod.find('button.b2').attr('style', 'position:absolute;left:24px;top:1px;width:24px;height:21px;').click(function() {
		//If button is clicked find the iframe and go forward 1 page in its history.
		bod.find('iframe.if1')[0].contentWindow.history.go(1);
	});
	
	//Give the third button its position and click event.
	bod.find('button.b3').attr('style', 'position:absolute;right:1px;top:1px;').click(function() {
		//On click get the text inside the input form
		var url = bod.find('input.i1').val();
		
		//Put the text (URL) into the iframe
		bod.find('iframe.if1').attr('src', url);
		
		//Start the tracker service in case it has stopped in the past.
		startTracker();
	});
	
	//Find the input form and give it its style and position. And keypress event
	bod.find('input.i1').attr('style', 'position:absolute;top:1px;left:49px;width:calc(100% - 84px);').keypress(function(event) {
		//If the enter key is pressed inside the input tag
		if(event.keyCode == 13){
			//Initiate a click event for button 3 to execute its click event code (see line 46)
			bod.find('button.b3').click();
		}
	});
	
	//Find iframe and set its style and position
	bod.find('iframe.if1').attr('style', 'position:absolute;top:23px;left:0px;width:100%;height:calc(100% - 23px);border:none;background-color:white;');
	
	//Set some variables that are accesible outside of the service
	var url1 = null;
	var url2 = null;
	
	//Create function that starts an interval to test if the url inside the iframe has changed
	function startTracker() {
		//Set the placeholder in the input
		bod.find('input.i1').attr('placeholder', 'http(s)://');
		
		//Create an interval that repeats every 100 milliseconds
		var interval = setInterval(function() {
			//Set url2 to url1
			url2 = url1;
			
			try {
				//try to set url1 to the actual current url
				url1 = bod.find('iframe.if1')[0].contentDocument.URL;
			} catch(e) {
				//if failed to get url stop the interval
				clearInterval(interval);
				
				//Set the input to blank
				bod.find('input.i1').val('');
				
				//Set the window title
				win.title('Web Explorer');
				
				//Change the input placeholder
				bod.find('input.i1').attr('placeholder', 'The tracker service has been stopped due to security reasons...');
			}
			
			//If url1 has changed since last time change the input text and window title
			if(url1 !== url2) {
				changeUrl(url1);
			}
			
		}, 100);
	};
	
	//Start the tracker service
	startTracker();
});