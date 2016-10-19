new explorer.window()
.callback(function() {
    win = this;
    win.menuBar([
        {
            title: 'File',
            context: [
                {
                    title: 'Close',
                    callback: function() {
                        win.close();
                    }
                }, {}, {
                    title: 'Do Some Things',
                    context: [
                        {
                            title: 'Thing 1',
                            callback: function() {
                                win.body.append('FUCK');
                            }
                        }, {
                            title: 'Thing 2',
                            callback: function() {
                                win.body.append('ME');
                            }
                        }
                    ]
                }
            ]
        }, {
            title: 'test2',
            context: [
                {
                    title: 'test',
                    callback: win.close
                }
            ]
        }
    ]);
})
