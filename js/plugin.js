"use strict"
let parse;
let messagesArray = [];


//Список сообщений
parse = JSON.parse(localStorage.getItem("messagesStorage"));
if (parse != null) {
    messagesArray = parse;
} else {
    messagesArray = [
        {
            "id": "0",
            "userName": "Admin",
            "isPinned": true,
            "isAdmin": true,
            "message": "Дополнительная скидка 15% по промокоду ВЕСНА15",
            "avatar": "https://cdn-icons-png.flaticon.com/512/194/194938.png",
            "answerTo": null
        }, {
            "id": "1",
            "userName": "Костя Морозов",
            "isPinned": false,
            "isAdmin": false,
            "message": "Надюша начинай",
            "avatar": "https://www.pngarts.com/files/5/User-Avatar-PNG-Free-Download.png",
            "answerTo": null
        }, {
            "id": "2",
            "userName": "Рузанна Комиссарова",
            "isPinned": false,
            "isAdmin": false,
            "message": "Здравствуйте, как купить туфли?",
            "avatar": null,
            "answerTo": null
        }, {
            "id": "3",
            "userName": "Admin",
            "isPinned": false,
            "isAdmin": true,
            "message": "Здравствуйте! Можно перейти по ссылке на наш сайт и оформить заказ. Ссылки на товары под видео",
            "avatar": "https://cdn-icons-png.flaticon.com/512/194/194938.png",
            "answerTo": "2"
        }
    ];
}


function chat() {
    //Создаем кнопку если ее нет
    if (document.querySelector('.chatButton') == null) {

        let Button = videojs.getComponent('Button');
        let MyButton = videojs.extend(Button, {
            //инициализируем кнопку
            constructor: function () {
                Button.apply(this, arguments);
                this.addClass('chatButton');
            },
            // открыть/закрыть чат по клику
            handleClick: function () {
                chat = document.querySelector('.vjs-chat');
                if (chat.style.visibility == 'visible') {
                    chat.style.visibility = 'hidden';
                    document.querySelector('.chatButton .vjs-icon-placeholder').innerHTML = `<svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d = "M19.75 6C19.7495 5.60231 19.5914 5.22105 19.3102 4.93984C19.029 4.65864 18.6477 4.50045 18.25 4.5H15.25V1.5C15.2495 1.10231 15.0914 0.721048 14.8102 0.439842C14.529 0.158636 14.1477 0.000454817 13.75 0H1.75C1.35231 0.000454817 0.971048 0.158636 0.689842 0.439842C0.408636 0.721048 0.250455 1.10231 0.25 1.5V13.5C0.249996 13.6416 0.290079 13.7803 0.365614 13.9001C0.441148 14.0199 0.549046 14.1158 0.676829 14.1768C0.804611 14.2378 0.947055 14.2614 1.08768 14.2449C1.22831 14.2283 1.36138 14.1723 1.4715 14.0832L4.75 11.4328L4.75009 14.25C4.75055 14.6477 4.90873 15.029 5.18994 15.3102C5.47114 15.5914 5.85241 15.7495 6.25009 15.75H15.024L18.5286 18.5832C18.6387 18.6723 18.7718 18.7283 18.9124 18.7449C19.053 18.7614 19.1955 18.7378 19.3233 18.6768C19.451 18.6158 19.5589 18.5199 19.6345 18.4001C19.71 18.2803 19.7501 18.1416 19.7501 18L19.75 6ZM15.7607 14.4168C15.6272 14.3089 15.4608 14.25 15.2892 14.25H6.25009L6.25 11.25H13.75C14.1477 11.2495 14.529 11.0914 14.8102 10.8102C15.0914 10.529 15.2495 10.1477 15.25 9.75V6H18.25L18.2501 16.4292L15.7607 14.4168Z" fill = "white" />
                    </svg>`;
                } else {
                    chat.style.visibility = 'visible';
                    document.querySelector('.chatButton .vjs-icon-placeholder').innerHTML = `<svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d = "M19.75 6C19.7495 5.60231 19.5914 5.22105 19.3102 4.93984C19.029 4.65864 18.6477 4.50045 18.25 4.5H15.25V1.5C15.2495 1.10231 15.0914 0.721048 14.8102 0.439842C14.529 0.158636 14.1477 0.000454817 13.75 0H1.75C1.35231 0.000454817 0.971048 0.158636 0.689842 0.439842C0.408636 0.721048 0.250455 1.10231 0.25 1.5V13.5C0.249996 13.6416 0.290079 13.7803 0.365614 13.9001C0.441148 14.0199 0.549046 14.1158 0.676829 14.1768C0.804611 14.2378 0.947055 14.2614 1.08768 14.2449C1.22831 14.2283 1.36138 14.1723 1.4715 14.0832L4.75 11.4328L4.75009 14.25C4.75055 14.6477 4.90873 15.029 5.18994 15.3102C5.47114 15.5914 5.85241 15.7495 6.25009 15.75H15.024L18.5286 18.5832C18.6387 18.6723 18.7718 18.7283 18.9124 18.7449C19.053 18.7614 19.1955 18.7378 19.3233 18.6768C19.451 18.6158 19.5589 18.5199 19.6345 18.4001C19.71 18.2803 19.7501 18.1416 19.7501 18L19.75 6ZM15.7607 14.4168C15.6272 14.3089 15.4608 14.25 15.2892 14.25H6.25009L6.25 11.25H13.75C14.1477 11.2495 14.529 11.0914 14.8102 10.8102C15.0914 10.529 15.2495 10.1477 15.25 9.75V6H18.25L18.2501 16.4292L15.7607 14.4168Z" fill = "DodgerBlue" />
                    </svg>`;
                }
            },
        });
        //регистрируем кнопку
        videojs.registerComponent('ChatButton', MyButton);
        let player = videojs('my-player');
        player.getChild('controlBar').addChild('ChatButton', {});

        //Иконка
        document.querySelector('.chatButton .vjs-icon-placeholder').innerHTML = `<svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d = "M19.75 6C19.7495 5.60231 19.5914 5.22105 19.3102 4.93984C19.029 4.65864 18.6477 4.50045 18.25 4.5H15.25V1.5C15.2495 1.10231 15.0914 0.721048 14.8102 0.439842C14.529 0.158636 14.1477 0.000454817 13.75 0H1.75C1.35231 0.000454817 0.971048 0.158636 0.689842 0.439842C0.408636 0.721048 0.250455 1.10231 0.25 1.5V13.5C0.249996 13.6416 0.290079 13.7803 0.365614 13.9001C0.441148 14.0199 0.549046 14.1158 0.676829 14.1768C0.804611 14.2378 0.947055 14.2614 1.08768 14.2449C1.22831 14.2283 1.36138 14.1723 1.4715 14.0832L4.75 11.4328L4.75009 14.25C4.75055 14.6477 4.90873 15.029 5.18994 15.3102C5.47114 15.5914 5.85241 15.7495 6.25009 15.75H15.024L18.5286 18.5832C18.6387 18.6723 18.7718 18.7283 18.9124 18.7449C19.053 18.7614 19.1955 18.7378 19.3233 18.6768C19.451 18.6158 19.5589 18.5199 19.6345 18.4001C19.71 18.2803 19.7501 18.1416 19.7501 18L19.75 6ZM15.7607 14.4168C15.6272 14.3089 15.4608 14.25 15.2892 14.25H6.25009L6.25 11.25H13.75C14.1477 11.2495 14.529 11.0914 14.8102 10.8102C15.0914 10.529 15.2495 10.1477 15.25 9.75V6H18.25L18.2501 16.4292L15.7607 14.4168Z" fill = "DodgerBlue" />
                                                                                </svg>`;
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

        //Закрепленное сообщение (каркас)
        let divPinned = document.createElement('div');
        divPinned.classList.add('pinned');
        divPlugin.prepend(divPinned);
        divPinned.innerHTML = '';

        //Закрепленное сообщение (каркас для сообщения)
        let divPinnedMess = document.createElement('div');
        divPinnedMess.classList.add('pinnedMess');
        divPinned.prepend(divPinnedMess);
        divPinnedMess.innerHTML = '';


        //Закрепленное сообщение (текст)
        let divPinnedText = document.createElement('div');
        divPinnedText.classList.add('pinnedText');
        divPinnedMess.prepend(divPinnedText);
        divPinnedText.innerHTML = '';

        //Закрепленное сообщение (имя)
        let divPinnedName = document.createElement('div');
        divPinnedName.classList.add('pinnedName');
        divPinnedMess.prepend(divPinnedName);
        divPinnedName.innerHTML = '';

        //Закрепленное сообщение (иконка)
        let divPinnedIco = document.createElement('img');
        divPinnedIco.classList.add('pinnedIco');
        divPinnedIco.src = "./media/pin.png";
        divPinned.prepend(divPinnedIco);

        //Закрепленное сообщение (линия)
        let divPinnedLine = document.createElement('div');
        divPinnedLine.classList.add('pinnedLine');
        divPinned.prepend(divPinnedLine);
       

        //Блок для отправки
        let divSendMsg = document.createElement('div');
        divSendMsg.classList.add('sendMsg');
        divPlugin.prepend(divSendMsg);

        //Блок сообщение + аватарка
        let divMes = document.createElement('div');
        divMes.classList.add('msgWrapper');
        divSendMsg.prepend(divMes);

        //аватарка
        let avatarIco = document.createElement('img');
        avatarIco.classList.add('avatarIco');
        avatarIco.src = "./media/avatar1.png";
        divMes.prepend(avatarIco);

        //Текст сообщения
        let textArea = document.createElement('textarea');
        textArea.classList.add('message');
        divMes.prepend(textArea);
        textArea.placeholder = 'Добавить комментарий';
        //Отправка по Enter
        textArea.addEventListener('keydown', e => {
            if (e.keyCode == 13) {
                sendMessage(textArea, divPlugin);
            }
        });
        //Изменение высоты сообщения
        textArea.addEventListener('keyup', e => {
            textArea.style.height = 'auto';
            let txtheight = e.target.scrollHeight;
            console.log(txtheight);
            textArea.style.height = `${txtheight}px`;
            divPlugin.style.gridTemplate = `1fr ${txtheight + 25}px / 1fr`;
        });

        //Кнопка лайк
        let likeButton = document.createElement('img');
        likeButton.classList.add('like');
        likeButton.src = './media/like.png'
        divSendMsg.prepend(likeButton);


        //Выгрузка сообщений
        for (let object of messagesArray) {
            if (object.isPinned == true) {
                divPinnedText.innerHTML = object.message;
                divPinnedName.innerHTML = object.userName;

            }
            if(object.answerTo == null){
                if (object.isAdmin == true) {
                    if (object.avatar == null) {
                        divChat.innerHTML = divChat.innerHTML + `<div class="chat_messages "> 
                        <img class="avatar" src="./media/avatar.png" alt="">
                        <div class="message__wrapper admin"> 
                        <p class="user__login admin"> ${object.userName} </p> 
                        <p class="user__message admin"> ${object.message}</p>
                        </div>
                        </div>`;
                    } else {
                        divChat.innerHTML = divChat.innerHTML + `<div class="chat_messages "> 
                        <img class='avatar' src="${object.avatar}" alt=""> 
                        <div class="message__wrapper admin"> 
                        <p class="user__login admin"> ${object.userName} </p> 
                        <p class="user__message admin"> ${object.message}</p> 
                        </div>
                        </div>`;
                    }
                } else {
                    if (object.avatar == null) {
                        divChat.innerHTML = divChat.innerHTML + `<div class="chat_messages"> 
                        <img class='avatar' src="./media/avatar.png" alt=""> 
                        <div class="message__wrapper">
                        <p class="user__login"> ${object.userName} </p> 
                        <p class="user__message"> ${object.message}</p> 
                        </div>
                        </div>`;
                    } else {
                        divChat.innerHTML = divChat.innerHTML + `<div class="chat_messages"> 
                        <img class='avatar' src="${object.avatar}" alt=""> 
                        <div class="message__wrapper">
                        <p class="user__login"> ${object.userName} </p> 
                        <p class="user__message"> ${object.message}</p> 
                        </div>
                        </div>`;
                    }
                }
            }else{
                let answerMsg = messagesArray[object.answerTo];
                divChat.innerHTML = divChat.innerHTML + `<div class="chat_messages"> 
                <img class="avatar" src="${object.avatar}" alt="">
                <div class="message__wrapper admin "> 
                <div class="answer">
                    <div class="leftLine">
                    </div>
                    <p class="answer_user admin"> ${answerMsg.userName} </p> 
                    <p class="answer_msg admin"> ${answerMsg.message} </p> 
                </div>
                    <p class="user__login admin"> ${object.userName} </p> 
                    <p class="user__message admin"> ${object.message}</p>
                </div>
                </div>`;                     
            }
        }

        //Ширина сообщений
        let wrapperWidth = document.querySelectorAll('.message__wrapper');
        console.log(wrapperWidth);
        wrapperWidth.forEach(element => {
            if(element.offsetWidth >= divChat.offsetWidth){
                element.style.width = `${divChat.offsetWidth - 100}px`;}
            
        });
    }
}

//Отправка сообщений и сохранение в localstorage
function sendMessage(textArea, divPlugin) {
    let message = document.querySelector('.message'), //сообщение
        chat = document.querySelector('.chat');

    let messageObjects = {
        "id": null,
        "userName": "Герман Креханов",
        "isPinned": false,
        "isAdmin": false,
        "message": null,
        "avatar": "./media/avatar1.png",
        "answerTo": null
    };

    if (message.value != '') {
        messageObjects.message = message.value;
        messageObjects.id = `${messagesArray.length}`;


        //Вставка сообщения
        let size = document.querySelector('.user__message');
        chat.innerHTML = chat.innerHTML + `<div class="chat_messages" > 
        <img class='avatar' src="${messageObjects.avatar}" alt=""> 
        <div class="message__wrapper">
        <p class="user__login"> ${messageObjects.userName} </p>  
        <p class="user__message" style="width: ${size.offsetWidth}px"> ${messageObjects.message}</p> 
        </div>
        </div>`;

        //Обнуление полей и возврат рамера
        message.value = '';
        message.blur();
        textArea.style.height = 'auto';
        divPlugin.style.gridTemplate = `1fr auto / 1fr`;


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
    let vjshw = document.querySelector('.vjs-chat');
    let video = document.querySelector('.vjs-text-track-display');
    vjshw.style.height = video.offsetHeight + 'px';
    let divChat = document.querySelector('.vjs-chat')
    let userMessage = document.querySelectorAll('.user__message');
    userMessage.forEach(element => {
        element.style.width = `${divChat.offsetWidth - 100}px`;
    });

}

//Регистрация плагина
videojs.registerPlugin('chat', chat);