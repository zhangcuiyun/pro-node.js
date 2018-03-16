$(function () {
   $('#confirm').on('click',function () {
     var username=$('input[name="user"]').val();
     var password=$('input[name="psd"]').val();
     if(username!='' && password!=''){
        $.ajax({
            type:'post',
            url:'/seller/api/login',
            data:{
                username:username,
                password:password,
            },
            success:function (res) {
               if(res.status==0){
                   window.location.href='/seller';
               }else{
                   alert(res.message);
               }
            }
        })
     }else{
         alert('输入不能为空');
     }
   })
})