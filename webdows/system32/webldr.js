/*!
Project: Webdows
Liscense: MIT
Author: krisdb2009
File: webdows/system32/webldr.js
*/
$('#bootlog').append('<pre>Checking SYSTEM.FILES.WEBDOWS...</pre>');
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
list(system.files.webdows, 'webdows/');
function wfsLoad(list, i) {
    if(typeof list[i] == 'string') {
        $('#bootlog').append('<pre>'+list[i]+'. . .</pre> ');
        $(document).scrollTop($(document).height());
        var loadint = setInterval(function() {
            $('#bootlog pre').last().append(' .');
            $(document).scrollTop($(document).height());
        }, 100);
        $.ajax({
            dataType: "text",
            async: true,
            cache: true,
            url: list[i],
            success: function() {
                clearInterval(loadint);
                $('#bootlog pre').last().append('GOOD');
                $(document).scrollTop($(document).height());
                wfsLoad(list, i + 1);
            },
            error: function(jq) {
                clearInterval(loadint);
                system.error('WEBLDR.JS Cannot find the file specified: '+jq.status, list[i]);
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
        $('#bootlog').remove();
    }
}, 100);
