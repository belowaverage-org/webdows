new explorer.window()
.title('Test')
.icon('webdows/resources/icons/exei.ico')
.callback(function() {
    this.body.html('<button class="all">All</button><button class="non">None</button><button class="min">Min</button><button class="max">Max</button>');
    this.body.find('.all').click({win: this}, function(e) {
        e.data.win.controls(['min', 'max']);
    });
    this.body.find('.min').click({win: this}, function(e) {
        e.data.win.controls(['min']);
    });
    this.body.find('.max').click({win: this}, function(e) {
        e.data.win.controls(['max']);
    });
    this.body.find('.non').click({win: this}, function(e) {
        e.data.win.controls([]);
    });
});