$(function () {
    $('.delete').on('click',function () {
        //发送ajax,删除数据库,
        var goodsInfo=$(this).data("info");

        $.ajax({
            url:'/seller/api/delete-goods',
            type:'POST',
            //发送商品的
            data:{
                goodsid:goodsInfo._id
            },
            success:function (res) {
                if(res.status==0){
                    console.log(res.message);
                    window.location.href='/seller/goodsList';
                }
            }
        });
        //删除页面的数据
        $(this).parents('tr').remove();
    });
    $('.modify').on('click',function () {
        //发送ajax,删除数据库,
        var goodsId=$(this).data("info")._id;
        window.location.href='/seller/modifyGoods?goodsId='+goodsId;
 })
})