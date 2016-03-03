$.extend(explorer, {
    file_explorer : function (location) {
        if(typeof location == 'undefined') {
            var location = '';
        }
        new explorer.window()
        .resize(600, 400)
        .center()
        .title('File Explorer')
        .icon('webdows/resources/icons/scre.ico')
        .callback(function() {
            var body = this.body;
            function explore(location) {
                if(typeof location == 'undefined') {
                    var location = '';
                }
                system.file(location).list(function() {
                    $.each(this.data, function(k) {
                        var linkID = system.guid();
                        body.append('<div linkID="'+linkID+'" class="icon links" style="margin:10px;position:relative;display:inline-block;width:50px;height:50px;"><span style="top:100%;width:100%;position:absolute;text-align:center;font-size:12px;">'+this.name+'</span></div>');
                        if(this.type == 'folder') {
                            body.find('div.links[linkID='+linkID+']').css('background-image','url(\'webdows/resources/icons/fold.ico\')');
                        }
                    });
                });
            };
            this.winid.find('.ttl').html('');
            this.winid.append('<span class="navbutts" style="image-rendering: pixelated;width:57px;height:27px;background-image:url(\'webdows/resources/explorer/4.png\');position:absolute;top:30px;left:6px;"><span style="display:inline-block;width:25px;height:25px;margin:1px 3px 0px 2px;background-image:url(\'webdows/resources/explorer/6.png\');"></span><span style="display:inline-block;width:25px;height:25px;background-image:url(\'webdows/resources/explorer/7.png\');"></span></span><input value="'+location+'" type="text" style="width:calc(100% - 80px);position:absolute;top:32px;left:68px;background-color:rgba(255,255,255,0.6);border:1px solid rgba(0,0,0,0.2);border-top:1px solid rgba(0,0,0,0.5);box-shadow:inset 1px 1px 0px rgba(255,255,255,0.3),inset -1px -1px 0px rgba(255,255,255,0.3);"/>');
            this.winid.find('.navbutts').on('hover', function() {
                
            });
            this.winid.find('input[type=text]').on('mouseover focusin', function() {
                $(this).css('background-color', 'white');
            }).on('mouseout focusout', function() {
                if(!$(this).is(':focus')) {
                    $(this).css('background-color', 'rgba(255,255,255,.6)');
                }
            });
            explore(location);
        }).body.css({'top':'62px','background-color':'white'}).parent().css('min-height','100px');
    }
});