new explorer.window()
.resize(300, 300)
.menuBar([
	{
		title: 'File',
		context: [
			{
				title: 'Save'
			},{
				title: 'Test2'
			},{
				title: 'Test3',
				context: [
					{
						title: 'Test'
					}
				]
			},{
				title: 'Exit'
			}
		]
	}, {
		title: 'test2',
		context: [
			{
				title: 'test2'
			}
		]
	}
])
.callback(function() {
})
.body
.html(`
	<button>Button</button>
	
	<input name="asdf" type="radio">
	<input name="asdf" type="radio">|
	<input name="asd" type="radio">
	<input name="asd" type="radio">|
	<input name="as" type="radio">|
	<input type="radio">
	<input type="radio">
	
	<input type="checkbox">
	<progress value="50" max="100"></progress>
	<input type="range">
	<input type="number" min="1" max="5">
	<select>
		<option>Volvo</option>
		<option>Saab</option>
		<option>Mercedes</option>
		<option>Audi</option>
	</select>
	<div style="width:500px;height:10px;"></div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
`);