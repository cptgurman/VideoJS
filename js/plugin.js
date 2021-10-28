"use strict"
let parse;
let messagesArray = [];


function chat() {

    //Создаем кнопку
    let Button = videojs.getComponent('Button');
    let MyButton = videojs.extend(Button, {

        constructor: function () {
            Button.apply(this, arguments);
            this.addClass('chatButton');
        },
        handleClick: function () {
            console.log('jopa');
        },
        buildCSSClass: function () {
            return "vjs-icon-custombutton vjs-control ";
        }
    });
    videojs.registerComponent('ChatButton', MyButton);
    let player = videojs('my-player');
    player.getChild('controlBar').addChild('ChatButton', {});
    document.querySelector('.chatButton .vjs-icon-placeholder').innerHTML = `<svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d = "M19.75 6C19.7495 5.60231 19.5914 5.22105 19.3102 4.93984C19.029 4.65864 18.6477 4.50045 18.25 4.5H15.25V1.5C15.2495 1.10231 15.0914 0.721048 14.8102 0.439842C14.529 0.158636 14.1477 0.000454817 13.75 0H1.75C1.35231 0.000454817 0.971048 0.158636 0.689842 0.439842C0.408636 0.721048 0.250455 1.10231 0.25 1.5V13.5C0.249996 13.6416 0.290079 13.7803 0.365614 13.9001C0.441148 14.0199 0.549046 14.1158 0.676829 14.1768C0.804611 14.2378 0.947055 14.2614 1.08768 14.2449C1.22831 14.2283 1.36138 14.1723 1.4715 14.0832L4.75 11.4328L4.75009 14.25C4.75055 14.6477 4.90873 15.029 5.18994 15.3102C5.47114 15.5914 5.85241 15.7495 6.25009 15.75H15.024L18.5286 18.5832C18.6387 18.6723 18.7718 18.7283 18.9124 18.7449C19.053 18.7614 19.1955 18.7378 19.3233 18.6768C19.451 18.6158 19.5589 18.5199 19.6345 18.4001C19.71 18.2803 19.7501 18.1416 19.7501 18L19.75 6ZM15.7607 14.4168C15.6272 14.3089 15.4608 14.25 15.2892 14.25H6.25009L6.25 11.25H13.75C14.1477 11.2495 14.529 11.0914 14.8102 10.8102C15.0914 10.529 15.2495 10.1477 15.25 9.75V6H18.25L18.2501 16.4292L15.7607 14.4168Z" fill = "white" />
        </svg>`;



    //Список сообщений
    parse = JSON.parse(localStorage.getItem("messagesStorage"));
    if (parse != null) {
        messagesArray = parse;
    }

    //Проверка чата
    if (document.querySelector('.vjs-chat') == null) {

        //Чат плагин
        let divPlugin = document.createElement('div');//Создаем элемент
        divPlugin.classList.add('vjs-chat');//Добавляем класс
        let vjs = document.querySelector('.video-js');
        let video = document.querySelector('.vjs-text-track-display');
        divPlugin.style.height = video.offsetHeight + 'px';//Высота чата
        vjs.prepend(divPlugin);

        //Чат
        let divChat = document.createElement('div');
        divChat.classList.add('chat');
        divPlugin.prepend(divChat);
        divChat.innerHTML = '';

        //Блок для отправки
        let divSendMsg = document.createElement('div');
        divSendMsg.classList.add('sendMsg');
        divPlugin.prepend(divSendMsg);

        //Текст сообщения
        let textArea = document.createElement('textarea');
        textArea.classList.add('message');
        divSendMsg.prepend(textArea);
        textArea.placeholder = 'message';

        //Кнопка
        let button = document.createElement('div');
        button.classList.add('send');
        button.innerHTML = 'send';
        divSendMsg.prepend(button);
        button.onclick = sendMessage;

        //Выгрузка сообщений
        if (parse != null) {
            for (let object of parse) {
                divChat.innerHTML = divChat.innerHTML + `<div class="chat_messages"> 
                <img class='avatar' src="./media/avatar.png" alt=""> 
                <p class="user__login"> User </p> 
                <p class="user__message"> ${object.message}</p> 
                <p class="user__time"> ${object.msgTime} </p> 
                </div>`;
            }
        } else {
            divChat.innerHTML = divChat.innerHTML + `<div class="chat_messages"> 
                <img class='avatar' src="./media/avatar.png" alt=""> 
                <p class="user__login"> User </p> 
                <p class="user__message"> Добро пожаловать в чат!</p> 
                <p class="user__time"> </p> 
                </div>`;
        }
    }
}


//Отправка сообщений и сохранение в localstorage
function sendMessage() {
    let message = document.querySelector('.message'), //сообщение
        chat = document.querySelector('.chat');

    let messageObjects = {};

    if (message.value != '') {
        messageObjects.message = message.value;

        let now = new Date();
        messageObjects.msgTime = `${now.getHours()}:${now.getMinutes()}`;

        //Вставка сообщения
        chat.innerHTML = chat.innerHTML + `<div class="chat_messages"> 
        <img class='avatar' src="./media/avatar.png" alt=""> 
        <p class="user__login"> User </p>  
        <p class="user__message"> ${messageObjects.message}</p> 
        <p class="user__time"> ${messageObjects.msgTime} </p> 
        </div>`;

        //Обнуление полей
        message.value = '';

        //Запись в storage
        messagesArray.push(messageObjects);
        console.log(messagesArray);
        localStorage.setItem('messagesStorage', JSON.stringify(messagesArray));

    } else {
        alert('Не все поля заполнены!');
    }
}

//очистить storage
function clearStorage() {
    localStorage.clear();
}

//изменение размеров чата
window.onresize = function resize() {
    let vjshw = document.querySelector('.vjs-chat')
    let video = document.querySelector('.vjs-text-track-display');
    vjshw.style.height = video.offsetHeight + 'px';
    document.querySelectorAll('.user__login').forEach((item, index, array) => {
        item.style.width = vjshw.offsetWidth - 50 + 'px';
    }
    );

    document.querySelectorAll('.user__message').forEach((item, index, array) => {
        item.style.width = vjshw.offsetWidth - 50 + 'px';
    }
    );

    document.querySelectorAll('.user__time').forEach((item, index, array) => {
        item.style.width = vjshw.offsetWidth - 50 + 'px';
    }
    );

}

//Регистрация плагина
videojs.registerPlugin('chat', chat);