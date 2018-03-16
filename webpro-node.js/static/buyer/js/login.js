$(function () {
    $('#confirm').on('click',function () {
        var username=$('input[name="user"]').val() ;
        var password=$('input[name="psd"]').val() ;
        console.log(username);
        console.log(password);
        if(username && password){
           $.ajax({
               type:'post',
               dataType:'json',
               url:'/api/login',
               data:{
                   username,
                   password
               },
               success:function (res) {
                   if(res.status==0){
                       console.log('登录成功');
                       window.location.href = '/';
                   }else{
                       alert(res.message);
                   }
               }
           })
        }
        else{
            alert('用户名,密码不能为空')
        }
    })
})