"use strict"

let parse;
let chatView = document.querySelector('.content__chat');
let messagesArray = [];

window.onload = function () {

    let player = videojs('my-player');
    let videoHeight = document.querySelector('.vjs-tech');
    player.on('play', loadChat);

    window.onresize = function resize() {
        let video = document.querySelector('.vjs-tech');
        console.log(video.offsetHeight);
        document.querySelector('.chat').style.height = video.offsetHeight - 35 + 'px';

    }


    parse = JSON.parse(localStorage.getItem("messagesStorage"));
    if (parse != null) {
        messagesArray = parse;
    }

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




function clearChat() {

    chat.innerHTML = `<div class="chat_messages">
        <img class='avatar' src="./media/avatar.png" alt=""> 
        <p class="user__login">Admin</p> 
        <p class="user__message"> Добро пожаловать в чат </p> 
        <p class="user__time"></p> 
        </div>`;
    messagesArray.shift();
}


function loadChat() {
    let video = document.querySelector('.vjs-tech');
    if (document.querySelector('.chat') == null) {
        if (parse != null) {
            chatView.innerHTML = '<div class="chat"></div>' + chatView.innerHTML;
            document.querySelector('.chat').style.height = video.offsetHeight - 35 + 'px';
            let chat = document.querySelector('.chat');
            chat.innerHTML = '';
            for (let object of parse) {
                chat.innerHTML = chat.innerHTML + `<div class="chat_messages"> 
                <img class='avatar' src="./media/avatar.png" alt=""> 
                <p class="user__login"> ${object.login} </p> 
                <p class="user__message"> ${object.message}</p> 
                <p class="user__time"> ${object.msgTime} </p> 
                </div>`;
            }

        } else {
            chatView.innerHTML = '<div class="chat"></div>' + chatView.innerHTML;
            document.querySelector('.chat').style.height = video.offsetHeight - 35 + 'px';
            let chat = document.querySelector('.chat');
            chat.innerHTML = `<div class="chat_messages"> 
        <img class='avatar' src="./media/avatar.png" alt=""> 
        <p class="user__login"> Admin </p> 
        <p class="user__message"> Добро пожаловать в чат</p> 
        <p class="user__time">  </p> 
        </div>`;
        }
    }
}

//Отправка сообщений и сохранение в localstorage
function sendMessage() {
    let message = document.querySelector('.message'), //сообщение
        chatLogin = document.querySelector('.chat__login'),
        userMessage = document.querySelector('.user__message'),
        login = document.querySelector('.login'),
        chatMessages = document.querySelector('.chat_messages'),
        chat = document.querySelector('.chat');


    let messageObjects = {};

    if ((message.value != '') & (login.value != '')) {
        messageObjects.message = message.value;
        messageObjects.login = login.value;
        let now = new Date();
        messageObjects.msgTime = `${now.getHours()}:${now.getMinutes()}`;

        chat.innerHTML = chat.innerHTML + `<div class="chat_messages"> 
        <img class='avatar' src="./media/avatar.png" alt=""> 
        <p class="user__login"> ${messageObjects.login} </p>  
        <p class="user__message"> ${messageObjects.message}</p> 
        <p class="user__time"> ${messageObjects.msgTime} </p> 
        </div>`;

        //Обнуление полей
        message.value = '';
        login.value = '';

        //Запись в storage
        messagesArray.push(messageObjects);
        console.log(messagesArray);
        localStorage.setItem('messagesStorage', JSON.stringify(messagesArray));

    } else {
        alert('Не все поля заполнены!');
        message.value = '';
        login.value = '';
    }
}


//очистить storage
function clearStorage() {
    localStorage.clear();
}





