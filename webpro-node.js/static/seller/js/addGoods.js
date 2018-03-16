var smallImage='';
var bigImages=[];
var sizeArr=[];
var styleArr=[];
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
    //上传详情图
    $('#bigInput').on('change',function () {
        var formData=new FormData($('#bigForm')[0]);
        $.ajax({
            url: '/seller/api/upload',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success:function (res) {
                if(res.status==0){
                    //遍历
                    var html='';
                    for(var i=0;i<res.data.imagesPath.length;i++){
                        var path=res.data.imagesPath[i];
                        html+='<img src="'+path+'" />';
                    }
                    document.querySelector('.big-image-list').innerHTML = html;
                    bigImages=res.data.imagesPath;
                }
            },
            fail:function () {
                console.log('上传失败');
            }
        })
    });

    //点击添加事件
    $('#confirm').on('click',function () {
        var title=$('input[name="title"]').val();
        var des=$('#des').val();
        var price=$('input[name="price"]').val();
        if(title&&smallImage&&bigImages&&sizeArr&&styleArr&&price){
            $.ajax({
                url:'/seller/api/add-goods',
                type:'POST',
                data:{
                    title:title,
                    description:des,
                    smallImage:smallImage,
                    bigImages:bigImages,
                    price:price,
                    style:styleArr,
                    size:sizeArr
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