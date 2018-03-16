const express=require('express');
const router=express.Router();
const Goods=require('../../models/goods');
const Seller=require('../../models/seller');
const Order=require('../../models/order');
router.get('/login',(req,res)=>{
    res.render('seller/login');
});
router.get('/register',(req,res)=>{
    res.render('seller/register');
});
router.use((req, res, next)=>{
    // 判断是否是ajax请求
    if(req.url.startsWith('/api')){
        next();
        return;
    }
    //判断卖家是否登录
    if(req.cookies.get('SELLERID')){
        //登录了，走下一个函数。响应对应的页面
        next();
    }else{
        //没有登录，跳转到登录页面
        res.redirect('/seller/login');
    }
});
router.get('/',(req,res)=>{
    res.render('seller/index',{
        sellerActive:'active',
        sellerName:req.sellerInfo.username
    });
});
router.get('/goodsList',(req,res)=>{
    let sellerId=req.sellerInfo._id;
    Goods.where({seller:sellerId}).find().sort({price:1}).then((result)=>{
        if(result){
            res.render('seller/goodsList',{
                goodActive:'active',
                goodsList:result,
                sellerName:req.sellerInfo.username
            });
        }else{
            res.render('seller/goodsList',{
                goodActive:'active',
                sellerName:req.sellerInfo.username
            });
        }
    })
});
router.get('/orderList',(req,res)=>{
    let sellerId=req.sellerInfo._id;
    Order.where({seller:sellerId}).find().populate(['buyer','goods']).then(result=>{
        res.render('seller/orderList',{
        orderActive:'active',
        sellerName:req.sellerInfo.username,
        orderList:result,
    });
    })


});
router.get('/add-goods',(req,res)=>{
    res.render('seller/addGoods');
});
router.get('/logout',(req,res)=>{
    req.cookies.set('SELLERID','');
    res.redirect('/seller')
    // res.render('seller/addGoods');
});
router.get('/modifyGoods',(req,res)=>{
    let goodsId=req.query.goodsId;
    Goods.where({_id:goodsId}).find().then((result)=>{
        if(result){
            res.render('seller/modifyGoods',{
              title:result[0].title,
              description:result[0].description,
              smallImage:result[0].smallImage,
              price:result[0].price,
              size:result[0].size,
              style:result[0].style,
              goodsid:goodsId,
            });
        }
    })
});
router.get('/center',(req,res)=>{
    let sellerInfo=req.sellerInfo;
    Goods.find({seller:sellerInfo._id}).then(result=>{
        res.render('seller/center',{
            centerActive:'active',
            sellerName:req.sellerInfo.username,
            sellerInfo:sellerInfo,
            buyername:req.buyerInfo.username,
            goodsInfo:result
        });
    })
});
module.exports=router;