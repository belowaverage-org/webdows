$('#bootlog').append(`
<style>
    #bootloader {
        background-color:rgba(0,0,0,.9);
        position:fixed;
        top:0px;
        left:0px;
        width:100%;
        height:100%;
        z-index:100000;
    }
    #bootloader #logo {
        position:absolute;
        top:calc(50% - 150px);
        left:calc(50% - 100px);
        width:200px;
        height:200px;
        background-image:url('webdows/resources/explorer/1.png');
        animation:ani 5s infinite ease-in-out;
    }
    #bootloader #progress {
        box-shadow:inset 0px 1px 0px #363636;
        position:absolute;
        top:calc(50% + 50px);
        left:calc(50% - 100px);
        width:200px;
        height:16px;
        background-color:#212121;
        border-radius:10px;
    }
    #bootloader #progress::before {
        content:'';
        position:absolute;
        width:calc(100% - 10px);
        height:8px;
        margin-top:4px;
        margin-left:5px;
        background-color:#363636;
        border-radius:5px;
    }
    #bootloader #progressFill {
        position:absolute;
        max-width:calc(100% - 10px);
        min-width:10px;
        height:8px;
        border-radius:5px;
        margin-top:4px;
        margin-left:5px;
        background-color:#e0e0e0;
        background-image:linear-gradient(to bottom, rgba(0,0,0,.1) 0%,rgba(0,0,0,.5) 100%), url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QMQEiAWeIepJQAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAR0lEQVQY02NgQAL///+3/o8KNjOgKdiPpsAUWdIGTXIjuu4DSJL/0HU7oelej677IJpuA2RJFzTda9F1H0GS/Pv//389ZHkA6/+W9gk5rDIAAAAASUVORK5CYII=');
        animation:1s mov infinite linear;
    }
    @keyframes mov {
        0% {
            background-position:0px 0px;
        }
        100% {
            background-position:16px 0px;
        }
    }
    @keyframes ani {
        50% {
            opacity:.5;
            filter:grayscale(50%);
        }
    }
</style>
<div id="bootloader">
    <div id="logo"></div>
    <div id="progress">
        <div id="progressFill"></div>
    </div>
</div>
`);
var timer = setInterval(function() {
    $('#bootloader #progress #progressFill').css('width', (system.bootLoader.current / system.bootLoader.total * 100)+'%');
    if(system.bootLoader.loaded) {
        clearInterval(timer);
    }
}, 10);