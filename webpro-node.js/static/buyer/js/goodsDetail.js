$(function () {
    $('.spinnerExample').spinner({defaults:{value:1, min:1}});
$('.size-wrapper li').on('click',function () {
    $(this).addClass('red').siblings().removeClass('red');
});
if($('.size-wrapper li').length==1){
    $('.size-wrapper li').addClass('red');
};
if($('.style-wrapper li').length==1){
        $('.style-wrapper li').addClass('red');
    }
$('.style-wrapper li').on('click',function () {
        $(this).addClass('red').siblings().removeClass('red');
});
$('#buy_now').on('click',function () {
        var size=$('.size-wrapper li[class="red"]').text();
        var style=$('.style-wrapper li[class="red"]').text();
        var count=$('.spinnerExample').val();
        var goods=$(this).data('goods');
        var seller=$(this).data('seller');
       if(size&&style&&count){
           $.ajax({
               url:'/api/buygoods',
               type:'POST',
               data:{
                   size:size,
                   style:style,
                   count:count,
                   goods:goods,
                   seller:seller
               },
               success:function (res) {
                   //如果订单成功,跳转到订单页面
                   if(res.status==1){
                       alert(res.message);
                       window.location.href='/login';
                   }
                   if(res.status==0){
                       //成功下单,跳转到订单页面
                       alert(res.data.orderid);

                   }
               }
           })
       }else{
           alert('请补全信息')
       }

        
        
    });
$('#add_now').on('click',function () {
        var size=$('.size-wrapper li[class="red"]').text();
        var style=$('.style-wrapper li[class="red"]').text();
        var count=$('.spinnerExample').val();
        var goods=$(this).data('goods');
        var seller=$(this).data('seller');
        if(size&&style&&count){
            $.ajax({
                url:'/api/addgoods',
                type:'POST',
                data:{
                    size:size,
                    style:style,
                    count:count,
                    goods:goods,
                    seller:seller
                },
                success:function (res) {
                    //如果订单成功,跳转到订单页面
                    if(res.status==1){
                        alert(res.message);
                        window.location.href='/login';
                    }
                    if(res.status==0){
                        //成功下单,跳转到订单页面
                        alert(res.message);
                    }
                    if(res.status==2){
                        //成功下单,跳转到订单页面
                        alert('更新购物车成功');
                    }
                }
            })
        }else{
            alert('请补全信息');
        }



    });
//点击x 关闭room
    $('.room .x').on('click',function () {
        $(this).parents('.room').hide();
    });
//如果用户已经登录再显示room\
    var buyername=$('.room').data('info');
   if(buyername!=''){
       $('.room').show();
   }
    //聊天室
   var ws=new WebSocket('ws://127.0.0.1:9090');
   //买家名字
   var name=$('.room').data('info');
   var id=$('.room').data('sel');
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
    };
    document.onkeyup = function(event){
        if(event.keyCode == 13){
            sendMessage();
        }
    }
})