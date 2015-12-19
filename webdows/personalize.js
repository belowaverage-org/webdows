new explorer.window()
.resize(330, 285)
.center()
.controls(['min'])
.title('Personalization')
.icon('webdows/resources/icons/imageres_27.ico')
.callback(function() {
    var theme = explorer.theme();
    this.body
    .attr('style', 'text-align:center;padding-top:5px;')
    .html('Aero: <input value="aero" type="radio" name="theme"> | Classic: <input value="classic" type="radio" name="theme"> | None: <input value="none" type="radio" name="theme"><img class="aero" src="webdows/resources/explorer/aero/thumbnail.png"><img class="classic" src="webdows/resources/explorer/classic/thumbnail.png"><img class="none" src="webdows/resources/explorer/none/thumbnail.png"><button class="sav">Save</button><button class="app">Apply</button><button class="can">Cancel</button>')
    .find('img')
    .attr('style', 'margin:3px;display:inline-block;display:none;border-radius:5px;box-shadow:0px 0px 5px black;');
    this.body.find('button')
    .attr('style', 'float:right;margin-right:5px;')
    .click({win: this}, function(e) {
        var win = e.data.win;
        if($(this).hasClass('sav')) {
            explorer.theme(theme);
            win.close();
        }
        if($(this).hasClass('app')) {
            explorer.theme(theme);
        }
        if($(this).hasClass('can')) {
            win.close();
        }
    });
    this.body.find('img.'+theme).show();
    this.body.find('input[value='+theme+']').click();
    this.body.find('input[name=theme]').change({win: this}, function(e) {
        var win = e.data.win;
        theme = $(this).val();
        win.body.find('img').hide();
        win.body.find('img.'+theme).show();
    });
});
