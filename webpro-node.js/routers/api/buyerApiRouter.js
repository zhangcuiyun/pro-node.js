const express=require('express');
const router=express.Router();
const Buyer=require('../../models/buyer');
const Order=require('../../models/order');
const Cart=require('../../models/cart');
router.post('/register',(req,res)=>{
    //传过来的参数   req.body
    let{username,password,repassword}=req.body;
    if(username==''||password==''||repassword==''|| username == undefined || password == undefined || repassword == undefined){
        res.json({
            status:1,
            message:'参数不能为空'
        });
        return;
    }
    if(password!=repassword){
        res.json({
            status:2,
            message:'两次输入的密码不一致'
        });
        return;
    }
    Buyer.findOne({username}).then((result)=>{
        //如果存在
        //如果不存在,存入数据库
        if(result){
            res.json({
                status:3,
                message:'该用户已经存在'
            });
        }else{
            let buyer=new Buyer({
                username,
                password
            });
            buyer.save().then(()=>{
                res.json({
                    status:0,
                    message:'注册成功'
                })
            })
        }
    })
});
router.post('/login',(req,res)=>{
    let{username,password}=req.body;
    if(username==''||password==''){
        res.json({
            status:1,
            message:'参数不能为空'
        });
        return;
    }
    Buyer.findOne({username}).then((result)=>{
        if(result){
            if(result.password==password){
                //存cookie
                req.cookies.set('BUYERID',result._id);
                res.json({
                    status:0,
                    message:'登录成功'
                });
                return;
            }else{
               res.json({
                   status:1,
                   message:'密码不正确'
               });
               return;
            }
        }else{
            res.json({
                status:3,
                message:'用户名不存在'
            })
        }
    })
});
router.post('/buygoods',(req,res)=>{
    if(req.buyerInfo._id){
        let{size,style,count,goods,seller}=req.body;
        let order=new Order({
            size,
            style,
            count,
            goods,
            seller,
            buyer:req.buyerInfo._id
        });
        order.save().then(result=>{
            if(result){
                res.json({
                    status:0,
                    message:'成功下订单',
                    data:{
                        orderid:result._id
                    }
                })
            }else{
                res.json({
                    status:2,
                    message:'购买失败,请重新购买'
                })
            }
        })
    }else{
        res.json({
            status:1,
            message:'请先登录'
        })
    }
});
router.post('/addgoods',(req,res)=>{
    if(req.buyerInfo._id){
        let{size,style,count,goods,seller}=req.body;
        let buyer=req.buyerInfo._id;
        Cart.where({goods,style,size,seller,buyer}).find().then(result=>{
            console.log(result);
            if(result.length>0){
                Cart.findByIdAndUpdate(result[0]._id,{count:Number(count)+Number(result[0].count)},(ress)=>{
                        res.json({
                            status:2,
                            message:'更新购物车成功'
                        })
                })
            }else{
                let cart=new Cart({
                    size,
                    style,
                    count,
                    goods,
                    seller,
                    buyer:req.buyerInfo._id
                });
                cart.save().then(result=>{
                    if(result){
                        res.json({
                            status:0,
                            message:'成功加入购物车',
                            data:{
                                cartid:result._id
                            }
                        })
                    }else{
                        res.json({
                            status:2,
                            message:'加入购物车失败,请重新购买'
                        })
                    }
                })
            }
        });
    }else{
        res.json({
            status:1,
            message:'请先登录'
        })
    }
});
router.post('/deletecart',(req,res)=>{
    let{cartid}=req.body;
    Cart.remove({_id:cartid}).then(result=>{
        if(result){
            res.json({
                status:0,
                message:'删除成功'
            })
        }else{
            res.json({
                status:1,
                message:'删除失败'
            })
        }
    })
});
router.post('/deleteorder',(req,res)=>{
    let{orderid}=req.body;
    Order.remove({_id:orderid}).then(result=>{
        if(result){
            res.json({
                status:0,
                message:'删除成功'
            })
        }else{
            res.json({
                status:1,
                message:'删除失败'
            })
        }
    })
});






module.exports = router;