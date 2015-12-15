new explorer.window()
.resize(164, 57)
.center()
.title('Personalize')
.icon('webdows/resources/icons/imageres_27.ico')
.callback(function(w) {
    w.body
    .css({'font-size':'11px'})
    .html('<button onclick="explorer.changeThemeName(\'aero\');">Aero</button><button onclick="explorer.changeThemeName(\'classic\');">Classic</button><button onclick="explorer.changeThemeName(\'none\');">None</button>');
});
