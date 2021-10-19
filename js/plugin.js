function chat() {
    let vjs = document.querySelector('.video-js');
    let video = document.querySelector('.vjs-text-track-display');

    //Чат плагин
    if (document.querySelector('.vjs-chat') == null) {

        let divPlugin = document.createElement('div');
        divPlugin.classList.add('vjs-chat');
        divPlugin.style.height = video.offsetHeight + 'px';
        vjs.prepend(divPlugin);


        //Чат
        let divChat = document.createElement('div');
        divChat.classList.add('chat');
        divPlugin.prepend(divChat);


        //Блок для отправки
        let divSendMsg = document.createElement('div');
        divSendMsg.classList.add('sendMsg');
        divPlugin.prepend(divSendMsg);

        //Текст сообщения
        let textArea = document.createElement('textarea');
        textArea.classList.add('message');
        divSendMsg.prepend(textArea);

        //Кнопка
        let button = document.createElement('button');
        button.classList.add('send');
        button.innerHTML = 'send';
        divSendMsg.prepend(button);
        divSendMsg.onclick = function () {
            alert("Вы нажали на кнопку");
        }
    } else {
        console.log('Чат уже открыт');
    }

}


videojs.registerPlugin('chat', chat);