"use strict"
let parse;
let messagesArray = [];


function chat() {

    //Создаем кнопку
    let Button = videojs.getComponent('Button');
    let MyButton = videojs.extend(Button, {


        innerHTML: 'asdasdasd',
        constructor: function () {
            Button.apply(this, arguments);
            this.addClass('chatButton');

        },

        handleClick: function () {
            console.log('jopa');
        }


    });
    videojs.registerComponent('ChatButton', MyButton);
    let player = videojs('my-player');
    player.getChild('controlBar').addChild('ChatButton', {
        innerHTML: 'asdasdasd',
    });




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