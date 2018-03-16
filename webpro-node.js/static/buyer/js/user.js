$(function () {
    $('.delete_cart').on('click',function () {
       // 5a4dd45a842c069ff0ae5c92
        var cartid=$(this).data('cart');
        $.ajax({
            url:'/api/deletecart',
            type:'POST',
            data:{
                cartid:cartid
            },
            success:function (res) {
              if(res.status==0){
              }
            }
        });
        //删除成功   然后删除页面的数据
        $(this).parents('tr').remove();
        window.location.href='/user';
    });
    $('.buy').on('click',function () {
        var cart=$(this).data('cart');
        var size=$(this).parents('tr').children('.size').text();
        var style=$(this).parents('tr').children('.style').text();
        var count=$(this).parents('tr').find('.cartNumber').val();
        var goods=$(this).data('goods');
        var seller=$(this).data('seller');
        //加入订单列表
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
                if(res.status==0){
                    //成功下单,跳转到订单页面
                    // alert('加入订单成功');
                }
            }
        });
        $.ajax({
            url:'/api/deletecart',
            type:'POST',
            data:{
                cartid:cart
            },
            success:function (res) {
                if(res.status==0){
                    // alert('删除购物车成功');
                }
            }
        });
        //删除成功   然后删除页面的数据
        $(this).parents('tr').remove();
        window.location.href='/user';
        // let{size,style,count,goods,seller}=req.body;
    });
    $('.delete_order').on('click',function () {
        // 5a4dd45a842c069ff0ae5c92
        var orderid=$(this).data('cart');
        $.ajax({
            url:'/api/deleteorder',
            type:'POST',
            data:{
                orderid:orderid
            },
            success:function (res) {
                if(res.status==0){
                }
            }
        });
        //删除成功   然后删除页面的数据
        $(this).parents('tr').remove();
        window.location.href='/user';
    });


})