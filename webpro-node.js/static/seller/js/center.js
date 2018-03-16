$(function () {
    //聊天室
    var ws=new WebSocket('ws://127.0.0.1:9090');
    //卖家名字
    var name=$('.room').data('info');
    var id=$('.room').data('buyer');
    ws.onopen=function () {
        ws.send([name,id]);
    };
    ws.onmessage = function(event){
        document.querySelector('.chat-list').innerHTML +=
            '<li class="left">'+event.data+'</li>';
    };
    ws.onclose = function(){
        console.log('下线了');
    };
    ws.onerror = function(){
        console.log('出错了');
    };
    // 发送信息的事件
    function sendMessage(){
        //向通信通道发送信息
        var message = document.querySelector('.input').value;
        ws.send(message);
        //将说的话写到list中
        document.querySelector('.chat-list').innerHTML +=
            '<li class="right">我：'+message+'</li>';
        document.querySelector('.input').value = '';
    }
    // 完成页面事件
    document.querySelector('#send').onclick = function(){
        sendMessage();
    }
    document.onkeyup = function(event){
        if(event.keyCode == 13){
            sendMessage();
        }
    }
})