"use strict"
//Загрузка страницы
window.onload = function () {

    //Инициализация плеера
    videojs('my-player', {
        controlBar: {
            'liveDisplay': true,
            'pictureInPictureToggle': false,
            'fullscreenToggle': false,
        }
    });

    let player = videojs('my-player');
    player.chat()
}