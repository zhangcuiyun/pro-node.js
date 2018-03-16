$(function () {
    $('#confirm').on('click',function () {
        var username=$('input[name="user"]').val();
        var password=$('input[name="psd"]').val();
        var repassword=$('input[name="repsd"]').val();
        if(username!=''&&password!=''&&repassword!=''){
            if(password==repassword){
                $.ajax({
                    type:'post',
                    url:'/api/register',
                    data:{
                        username:username,
                        password:password,
                        repassword:repassword
                    },
                    dataType:'json',
                    success:function (res) {

                        if(res.status==0){
                            //注册成功，去登录页面
                            window.location.href = '/login';
                        }
                        else{
                            console.log(res);
                            alert(res.message);
                        }
                    }
                })
            }

        }else{
            alert('请补全信息!')
        }

    })
});