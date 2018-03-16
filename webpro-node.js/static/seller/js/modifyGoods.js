var styleArr=[];
var sizeArr=[];
var smallImage=document.querySelector('.small-image').getAttribute('src');
var sizeAll=document.querySelectorAll('.size-wrapper>li');
var styleAll=document.querySelectorAll('.style-wrapper>li');
for(var i=0;i<sizeAll.length;i++){
    var str=sizeAll[i].innerText;
    str=str.substring(0,str.length-1);
    sizeArr.push(str);
}
for(var j=0;j<styleAll.length;j++){
    var str2=styleAll[j].innerText;
    str2=str2.substring(0,str2.length-1);
    styleArr.push(str2);
};

$(function () {
    $('#size_confirm').on('click',function () {
        var sizeInfo=$('input[name="size"]').val();
        if(sizeArr.indexOf(sizeInfo)==-1){
            sizeArr.push(sizeInfo);
            $('.size-wrapper').html($('.size-wrapper').html()+'<li>'+sizeInfo+'<span class="size_x" onclick="del(this)">X</span></li>');
        }
        $('input[name="size"]').val("");
    });
    $('#style_confirm').on('click',function () {
        var styleInfo=$('input[name="style"]').val();
        styleArr.push(styleInfo);
        $('.style-wrapper').html($('.style-wrapper').html()+'<li><span class="one">'+styleInfo+'</span><span class="style_x" onclick="del2(this)">X</span></li>');
        $('input[name="style"]').val("");
    });
    //图片上传的处理
    $('#smallInput').on('change',function () {
        var formData=new FormData($('#smallForm')[0]);
        $.ajax({
            url: '/seller/api/upload',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success:function (res) {
                if(res.status==0){
                    document.querySelector('.small-image').src=res.data.imagesPath[0];
                    smallImage=res.data.imagesPath[0];
                }
            },
            fail:function () {
                console.log('上传失败');
            }
        })
    });
    //点击更新事件
    $('#confirm').on('click',function () {
        var title=$('input[name="title"]').val();
        var price=$('input[name="price"]').val();
        var goodsid=$(this).data('info');
        console.log(goodsid);
        if(title&&smallImage&&sizeArr&&styleArr&&price){
            $.ajax({
                url:'/seller/api/modify-goods',
                type:'POST',
                data:{
                    title:title,
                    smallImage:smallImage,
                    price:price,
                    style:styleArr,
                    size:sizeArr,
                    goodsid:goodsid
                },
                success:function (res) {
                    if(res.status==0){
                        window.location.href='/seller/goodsList';
                    }else{
                        alert(res.message);
                    }
                }
            })
        }else{
            alert('请先输入完整信息');
        }
    });




});






//size 与 style x 点击删除
function del(obj){
    var str= $(obj).parent('li').text();
    str=str.substring(0,str.length-1);
    for(var i=0;i<sizeArr.length;i++){
        if(sizeArr[i]==str){
            sizeArr.splice(i,1);
            break;
        }
    }
    $(obj).parent('li').remove();
}
function del2(obj){
    var str= $(obj).parent('li').text();
    str=str.substring(0,str.length-1);
    for(var i=0;i<styleArr.length;i++){
        if(styleArr[i]==str){
            styleArr.splice(i,1);
            break;
        }
    }
    $(obj).parent('li').remove();
}