
"use strict"
let messagesArray = [
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

//Список сообщений
let parse = JSON.parse(localStorage.getItem("messages"));
if (parse != null) messagesArray = parse;

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
                    document.querySelector('.svg-like').style.fill = 'white';
                } else {
                    chat.style.visibility = 'visible';
                    document.querySelector('.svg-like').style.fill = 'dodgerBlue';
                }
            },
        });

        //регистрируем кнопку
        videojs.registerComponent('ChatButton', MyButton);
        let player = videojs('my-player');
        player.getChild('controlBar').addChild('ChatButton', {});

        //Иконка
        document.querySelector('.chatButton .vjs-icon-placeholder').innerHTML =
            `<svg class="svg-like" width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d = "M19.75 6C19.7495 5.60231 19.5914 5.22105 19.3102 4.93984C19.029 4.65864 18.6477 4.50045 18.25 4.5H15.25V1.5C15.2495 1.10231 15.0914 0.721048 14.8102 0.439842C14.529 0.158636 14.1477 0.000454817 13.75 0H1.75C1.35231 0.000454817 0.971048 0.158636 0.689842 0.439842C0.408636 0.721048 0.250455 1.10231 0.25 1.5V13.5C0.249996 13.6416 0.290079 13.7803 0.365614 13.9001C0.441148 14.0199 0.549046 14.1158 0.676829 14.1768C0.804611 14.2378 0.947055 14.2614 1.08768 14.2449C1.22831 14.2283 1.36138 14.1723 1.4715 14.0832L4.75 11.4328L4.75009 14.25C4.75055 14.6477 4.90873 15.029 5.18994 15.3102C5.47114 15.5914 5.85241 15.7495 6.25009 15.75H15.024L18.5286 18.5832C18.6387 18.6723 18.7718 18.7283 18.9124 18.7449C19.053 18.7614 19.1955 18.7378 19.3233 18.6768C19.451 18.6158 19.5589 18.5199 19.6345 18.4001C19.71 18.2803 19.7501 18.1416 19.7501 18L19.75 6ZM15.7607 14.4168C15.6272 14.3089 15.4608 14.25 15.2892 14.25H6.25009L6.25 11.25H13.75C14.1477 11.2495 14.529 11.0914 14.8102 10.8102C15.0914 10.529 15.2495 10.1477 15.25 9.75V6H18.25L18.2501 16.4292L15.7607 14.4168Z"/>
            </svg>`;
    }

    //Проверка чата
    if (document.querySelector('.vjs-chat') == null) {

        // Чат плагин
        let video = document.querySelector('.vjs-text-track-display');
        let vjs = document.querySelector('.video-js');
        let vjsChat =
            `<div class="vjs-chat" style="height:${video.offsetHeight}px"> 
            <div class="sendMsg">
                <img class="like" src="./media/like.png">
                <div class="msgWrapper">
                    <textarea class="message" placeholder="Добавить комментарий"></textarea>
                    <img class="avatarIco" src="./media/avatar1.png">
                </div>
            </div>
            <div class="chat"></div> 
            <div class="pinned"> 
                <div class="pinnedLine"></div>
                <img class="pinnedIco" src="./media/pin.png"> 
                <div class="pinnedMess">
                    <div class="pinnedName"></div>
                    <div class="pinnedText"></div>
                </div>
            </div>  
        </div>`;
        vjs.insertAdjacentHTML("beforeEnd", vjsChat);

        //Отправка по Enter
        let chat = document.querySelector('.vjs-chat')
        let textArea = document.querySelector('.message')
        textArea.addEventListener('keydown', e => {
            if (e.keyCode == 13) {
                sendMessage(textArea, chat);
            }
        });
        //Изменение высоты сообщения
        textArea.addEventListener('keyup', e => {
            textArea.style.height = 'auto';
            let txtheight = e.target.scrollHeight;
            textArea.style.height = `${txtheight}px`;
            chat.style.gridTemplate = `auto 1fr ${txtheight + 25}px / 1fr`;
        });


        //Выгрузка сообщений
        let messagePlace = document.querySelector('.chat')
        for (let message of messagesArray) {
            if (message.isPinned) {
                document.querySelector('.pinnedText').innerHTML = message.message;
                document.querySelector('.pinnedName').innerHTML = message.userName;
            } else {
                if (message.answerTo == null) {
                    if (message.isAdmin == true) {
                        let html = `<div class="chat_messages "> 
                            <img class='avatar' src="${message.avatar != null ? message.avatar : "./media/avatar.png"}" alt="">
                            <div class="message__wrapper admin" style="max-width:${chat.offsetWidth - 90}px"> 
                            <p class="user__login admin"> ${message.userName} </p> 
                            <p class="user__message admin" style="max-width:${chat.offsetWidth - 90}px"> ${message.message}</p>
                            </div>
                            </div>`
                        messagePlace.insertAdjacentHTML("beforeEnd", html);
                    } else {
                        let html = `<div class="chat_messages"> 
                            <img class='avatar' src="${message.avatar != null ? message.avatar : "./media/avatar.png"}" alt="">  
                            <div class="message__wrapper" style="max-width:${chat.offsetWidth - 90}px">
                            <p class="user__login"> ${message.userName} </p> 
                            <p class="user__message" style="max-width:${chat.offsetWidth - 90}px"> ${message.message}</p> 
                            </div>
                            </div>`;
                        messagePlace.insertAdjacentHTML("beforeEnd", html);
                    }
                } else {
                    let answerMsg = messagesArray[message.answerTo];
                    let html = `<div class="chat_messages"> 
                                <img class="avatar" src="${message.avatar}" alt="">
                                <div class="message__wrapper admin" style="max-width:${chat.offsetWidth - 90}px"> 
                                <div class="answer">
                                    <div class="leftLine"></div>
                                    <p class="answer_user admin"> ${answerMsg.userName} </p> 
                                    <p class="answer_msg admin"> ${answerMsg.message} </p> 
                                </div>
                                <p class="user__login admin"> ${message.userName} </p> 
                                <p class="user__message admin"> ${message.message}</p>
                                </div>
                            </div>`
                    messagePlace.insertAdjacentHTML("beforeEnd", html);
                }
            }
        }


    }
}

//Отправка сообщений и сохранение в localstorage
function sendMessage(textArea) {
    let message = document.querySelector('.message'), //сообщение
        chat = document.querySelector('.chat');

    let messageObject = {
        "id": null,
        "userName": "Герман Креханов",
        "isPinned": false,
        "isAdmin": false,
        "message": null,
        "avatar": "./media/avatar1.png",
        "answerTo": null
    };

    if (message.value === '') {
        return alert('Не все поля заполнены!');
    }
    messageObject.message = message.value;
    messageObject.id = `${messagesArray.length}`;
    let divChat = document.querySelector(".chat")

    //Вставка сообщения
    chat.innerHTML = chat.innerHTML + `<div class="chat_messages" > 
        <img class='avatar' src="${messageObject.avatar}" alt=""> 
        <div class="message__wrapper" style="max-width:${divChat.offsetWidth - 90}px">
        <p class="user__login"> ${messageObject.userName} </p>  
        <p class="user__message" > ${messageObject.message}</p> 
        </div>
        </div>`;

    //Обнуление полей и возврат рамера
    message.value = '';
    message.blur();
    textArea.style.height = 'auto';
    chat.style.gridTemplate = `auto 1fr auto / 1fr`;


    //Запись в storage
    messagesArray.push(messageObject);
    localStorage.setItem('messages', JSON.stringify(messagesArray));
}

//изменение размеров чата
window.onresize = function resize() {
    let chatSize = document.querySelector('.vjs-chat');
    let video = document.querySelector('.vjs-text-track-display');
    chatSize.style.height = video.offsetHeight + 'px';
    let wrapperWidth = document.querySelectorAll('.message__wrapper');
    wrapperWidth.forEach(function (item) {
        item.style.maxWidth = `${chatSize.offsetWidth - 90}px`;
    });
}


//Регистрация плагина
videojs.registerPlugin('chat', chat);
