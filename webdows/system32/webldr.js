/*!
Project: Webdows
Liscense: MIT
Author: krisdb2009
File: webdows/system32/webldr.js
*/
var loadList = [];
var li = 0;
var loaded = false;
function list(obj, path) {
    $.each(obj, function(k) {
        if(typeof this.valueOf() == 'string') {
            loadList[li++] = path+this;
        } else if(typeof this.valueOf() == 'object') {
            list(this.valueOf(), path+k+'/');
        }
    });
}
list(system.files, './');
function wfsLoad(list, i) {
    if(typeof list[i] == 'string') {
        $.ajax({
            dataType: "text",
            async: true,
            cache: true,
            url: list[i],
            success: function() {
                $('#bootlog div').last().append('<div>'+list[i]+'</div>');
                wfsLoad(list, i + 1);
            }
        });
    } else {
        loaded = true;
        return;
    }
}
wfsLoad(loadList, 0);
var timer = setInterval(function() {
    if(loaded) {
        clearInterval(timer);
        system.force_load('webdows/explorer.js');
    }
}, 100);
