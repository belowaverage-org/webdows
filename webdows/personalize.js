function personalize() {
    var WINDOW = explorer.window.open();
    explorer.window.resize(WINDOW, 164, 57);
    //explorer.window.toggleMax(WINDOW);
    explorer.window.title(WINDOW, 'Personalize');
    explorer.window.icon(WINDOW, 'webdows/resources/icons/imageres_27.ico');
    WINDOW.find('.body').css({'font-size':'11px'});
    WINDOW.find('.body').html('<button onclick="explorer.changeThemeName(\'aero\');">Aero</button><button onclick="explorer.changeThemeName(\'classic\');">Classic</button><button onclick="explorer.changeThemeName(\'none\');">None</button>');
}
personalize();