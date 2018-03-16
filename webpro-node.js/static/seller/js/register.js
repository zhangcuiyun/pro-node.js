$(function () {
    //上传图片 ajax
    var logoPath='';
    var bannerPath='';
    $('#logoInput').on('change',function () {
        var formData=new FormData($('#logo-form')[0]);
        $.ajax({
            url:'/seller/api/upload',
            type:'POST',
            data:formData,
            processData:false,//不按照jq方式处理
            contentType:false,//识别到form的enctype值,
            success:function (res) {
                if(res.status==0){
                    document.querySelector('.logo').src=res.data.imagesPath[0];
                    logoPath=res.data.imagesPath;
                }else{
                    alert(res.message);
                }
            },
            fail:function () {
                console.log('上传失败');
            }

        });
    });
    $('#bannerInput').on('change',function () {
        var formData=new FormData($('#banner-form')[0]);
        $.ajax({
            url:'/seller/api/upload',
            type:'POST',
            data:formData,
            processData:false,//不按照jq方式处理
            contentType:false,//识别到form的enctype值,
            success:function (res) {
                if(res.status==0){
                    document.querySelector('.banner').src=res.data.imagesPath[0];
                    bannerPath=res.data.imagesPath;
                }else{
                    alert(res.message);
                }
            },
            fail:function () {
                console.log('上传失败');
            }

        });
    });


    $("#confirm").on('click',function () {
        var username=$('input[name="user"]').val();
        var password=$('input[name="psd"]').val();
        var repassword=$('input[name="repsd"]').val();
        if(username!='' && password!='' && repassword!=''){
            if(password==repassword){
                $.ajax({
                    type:'post',
                    url:'/seller/api/register',
                    data:{
                        username:username,
                        password:password,
                        repassword:repassword,
                        logo:logoPath,
                        banner:bannerPath
                    },
                    success:function (res) {
                        if(res.status==0){
                             window.location.href='/seller/login'
                        }else{
                            alert(res.message);
                        }
                    }
                });
            }else{
                alert('两次输入的密码不一致');
            }
        }else{
            alert('请补全信息');
        }
    });

})