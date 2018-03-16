$(function () {
    //点击search
    $('#search').on('click',function () {
        var inp=$('#search_inp').val();
        window.location.href='/goodslist?inp='+inp;
    });
    $('.goods-wrapper .goods-all li').on('mouseenter',function () {
        $(this).stop().animate({"top":'-4px'}).addClass('active').siblings().removeClass('active').stop().animate({"top":'0px'});
    })
});