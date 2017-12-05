new explorer.window()
.title('System Configuration')
.resize(580, 320)
.icon('webdows/resources/icons/msconfig.png')
.controls(['min'])
.callback(function() {
	var body = this.body;
	var win = this;
	var tabset = new explorer.tabset(body);
	var tabGeneral = new tabset.tab('General');
	var tabServices = new tabset.tab('Services');
	var tabStartup = new tabset.tab('Startup');
	var tabTools = new tabset.tab('Tools');
	tabset.jq.css({"height":"250px","margin":"5px"});
	this.center()

win.body.append(`
		<div style="float:right; margin-right:5px;"><button id="Ok">OK</button> <button id="Cancel">Cancel</button> <button id="Apply">Apply</button> <button id="Help">Help</button></div>
	`);
	
tabGeneral.body.html(`
		<fieldset><legend>Startup Selection</legend>
			<form>
				<input name="startupType" id="normalStart "style="float:left;" type="radio" value="Normal Startup"> Normal Startup
				<p style="margin: 0;margin-left:4%;">Load all drivers and services</p>
				<input name="startupType" id="DiagnosticStart" style="float:left;" type="radio" value="Diagnostic Startup"> Diagnostic Startup
				<p style="margin: 0;margin-left:4%;">Load basic devices and services only</p>
				<input name="startupType" style="float:left;" type="radio" value="Selective Startup"> Selective Startup</br>
				<input type="checkbox" style="margin: 0;margin-left:4%;">Load system services </br>
				<input type="checkbox" style="margin: 0;margin-left:4%;">Load startup items</br>
				<input type="checkbox" style="margin: 0;margin-left:4%;" disabled>Use original boot configuration
			</form>
			
		
		</fieldset>
	`);
	
tabServices.body.html(`
		<div style="">
			
		</div>
		<div style="margin-top:32px; margin-left:350px; position: absolute;float:right;">
			<button id="enable">Enable all</button><button id="disable">Disable All</button>
		</div>
	`);

	body.find('#Cancel').click(function () {
		win.close(); 
	});
	body.find('#Help').click(function () {
		system.loader('webdows/welcome.js');
	});
	body.find('#Ok').click(function () {
		win.close(); 
	});
	body.find('#Apply').click( function () {
		console.log(body.find('form'))
		if (body.find('form')[0].elements.startupType.value == 'Diagnostic Startup')
		
		{
			system.registry.set("HKEY_LOCAL_WEBDOWS/explorer/startup/2");
			system.registry.set("HKEY_LOCAL_WEBDOWS/explorer/startup/1");
			system.registry.set("HKEY_LOCAL_WEBDOWS/system/startup/0", "./webdows/explorer.js");
			system.registry.set("HKEY_LOCAL_WEBDOWS/system/startup/0", "./webdows/baconfig.js");
		
		}
		if (body.find('form')[0].elements.startupType.value == 'Normal Startup')
		{
			system.registry.set("HKEY_LOCAL_WEBDOWS/explorer/startup/2", "./webdows/welcome.js");
			system.registry.set("HKEY_LOCAL_WEBDOWS/explorer/startup/1", "./webdows/resources/explorer/animation.js");
			system.registry.set("HKEY_LOCAL_WEBDOWS/system/startup/0", "./programs/belowaverage-org/weblogon/weblogon.js");
			system.registry.set("HKEY_LOCAL_WEBDOWS/system/startup/0", "./webdows/baconfig.js");
			
		}
		
		
		
	});

});