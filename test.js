new explorer.window()
.controls([])
.callback(function() {
    var win = this;
    win.body.html('<button class="min">Force Min</button><button class="max">Force Max</button>');
    win.body.find('.min').click(function() {
        win.toggleMin();
    });
    win.body.find('.max').click(function() {
        win.toggleMax();
    });
});