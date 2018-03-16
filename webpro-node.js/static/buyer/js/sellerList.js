$(function () {
    //点击search
    $('#search').on('click',function () {
        var inp=$('#search_inp').val();
        console.log(inp);
        window.location.href='/sellerlist?inp='+inp;
    })
});