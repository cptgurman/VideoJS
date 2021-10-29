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

    //chat по кнопке play
    player.on('play', chat);

    //параллакс
    let parallax = document.querySelector('.parallax');

    if (parallax) {
        let content = document.querySelector('.parallax_container');
        let clouds = document.querySelector('.images-parallax__clouds');
        let mountains = document.querySelector('.images-parallax__mountains');
        let human = document.querySelector('.images-parallax__human');

        let forClouds = 40;
        let forMountains = 20;
        let forHuman = 10;

        let speed = 0.05;

        let positionX = 0,
            positionY = 0,
            coordXprocent = 0,
            coordYprocent = 0;

        function setMouseParallaxStyle() {

            let distX = coordXprocent - positionX;
            let distY = coordYprocent - positionY;

            positionX = positionX + (distX * speed);
            positionY = positionY + (distY * speed);

            // Передача стилей
            clouds.style.cssText = `transform: translate(${positionX / forClouds}%, ${positionY / forClouds}%);`;
            mountains.style.cssText = `transform: translate(${positionX / forMountains}%, ${positionY / forMountains}%);`;
            human.style.cssText = `transform: translate(${positionX / forHuman}%, ${positionY / forHuman}%);`;

            requestAnimationFrame(setMouseParallaxStyle);
        }

        setMouseParallaxStyle();

        parallax.addEventListener('mousemove', function (e) {
            //Получение ширины и высоты блока
            let parallaxWidth = parallax.offsetWidth;
            let parallaxHeight = parallax.offsetHeight;

            // Ноль по середине
            let coordX = e.pageX - parallaxWidth / 2;
            let coordY = e.pageY - parallaxHeight / 2;

            // Получаем проценты
            coordXprocent = coordX / parallaxWidth * 100;
            coordYprocent = coordY / parallaxHeight * 100;
        });
    }
}













