const express=require('express');

const router=express.Router();
const Goods=require('../../models/goods');
const Seller=require('../../models/seller');
const Cart=require('../../models/cart');
const Order=require('../../models/order');
router.get('/',(req,res)=>{
    res.render('buyer/index',{
        indexActive:'active',
        buyername:req.buyerInfo.username
    })
});
router.get('/goodslist',(req,res)=>{
    let sortNum=req.query;
    let page=Number(sortNum.page||1);
    let count=Number(sortNum.count||6);
    let inp=sortNum.inp;
    if(inp!=undefined){
        if(sortNum.sort==1){
            Goods.find({title:eval("/"+inp+"/i")}).count().then(sum=>{
                let pages=Math.ceil(sum/count); //总共多少页,得传回客户端
                if(page<=0){
                    page=1;
                }
                if(page>=pages){
                    page=pages;
                }
                let skip=(page-1)*count;
                let limit=count;
                let pageArr=[];
                for(let i=1;i<=pages;i++){
                    pageArr.push(i);
                };
                //分页
                Goods.find({title:eval("/"+inp+"/i")}).sort({'price':1}).skip(skip).limit(limit).then(result=>{
                    res.render('buyer/goodslist',{
                        goodsActive:'active',
                        buyername:req.buyerInfo.username,
                        goodsList:result,
                        sort:sortNum.sort,
                        pageArr,
                        currentPage: page,
                        count: count,
                        isPre: page > 1,
                        isNext: page < pages,
                        inp:inp
                    })
                });
            })
        }
        else{
            Goods.find({title:eval("/"+inp+"/i")}).count().then(sum=>{
                let pages=Math.ceil(sum/count);//总共多少页,得传回客户端
                if(page<=0){
                    page=1;
                }
                if(page>=pages){
                    page=pages;
                }
                let skip=(page-1)*count;
                console.log(skip);
                let limit=count;
                let pageArr=[];
                for(let i=1;i<=pages;i++){
                    pageArr.push(i);
                };
                //分页
                Goods.find({title:eval("/"+inp+"/i")}).skip(skip).limit(limit).then(result=>{
                    res.render('buyer/goodslist',{
                        goodsActive:'active',
                        buyername:req.buyerInfo.username,
                        goodsList:result,
                        sort:sortNum.sort,
                        pageArr,
                        currentPage: page,
                        count: count,
                        isPre: page > 1,
                        isNext: page < pages,
                        inp:inp
                    })
                });
            })
        }
    }else{
        if(sortNum.sort==1){
            Goods.count().then(sum=>{
                let pages=Math.ceil(sum/count); //总共多少页,得传回客户端
                if(page<=0){
                    page=1;
                }
                if(page>=pages){
                    page=pages;
                }
                let skip=(page-1)*count;

                let limit=count;
                let pageArr=[];
                for(let i=1;i<=pages;i++){
                    pageArr.push(i);
                };
                //分页
                Goods.find().sort({'price':1}).skip(skip).limit(limit).then(result=>{
                    res.render('buyer/goodslist',{
                        goodsActive:'active',
                        buyername:req.buyerInfo.username,
                        goodsList:result,
                        sort:sortNum.sort,
                        pageArr,
                        currentPage: page,
                        count: count,
                        isPre: page > 1,
                        isNext: page < pages,

                    })
                });
            })
        }
        else{
            Goods.count().then(sum=>{
                let pages=Math.ceil(sum/count);//总共多少页,得传回客户端
                if(page<=0){
                    page=1;
                }
                if(page>=pages){
                    page=pages;
                }
                let skip=(page-1)*count;
                let limit=count;
                let pageArr=[];
                for(let i=1;i<=pages;i++){
                    pageArr.push(i);
                };
                //分页
                Goods.find().skip(skip).limit(limit).then(result=>{
                    res.render('buyer/goodslist',{
                        goodsActive:'active',
                        buyername:req.buyerInfo.username,
                        goodsList:result,
                        sort:sortNum.sort,
                        pageArr,
                        currentPage: page,
                        count: count,
                        isPre: page > 1,
                        isNext: page < pages
                    })
                });
            })
        }
    }
});
router.get('/sellerlist',(req,res)=>{
    let query=req.query;
    let inp=query.inp;
    let page=Number(query.page||1);
    let count=Number(query.count||4);
    if(inp!=undefined){
        Seller.find({username:eval("/"+inp+"/i")}).count().then(sum=>{
            let pages=Math.ceil(sum/count);//总共多少页,得传回客户端
            if(page<=0){
                page=1;
            }
            if(page>=pages){
                page=pages;
            }
            let skip=(page-1)*count;
            let limit=count;
            let pageArr=[];
            for(let i=1;i<=pages;i++){
                pageArr.push(i);
            };
            //分页
            Seller.find({username:eval("/"+inp+"/i")}).skip(skip).limit(limit).then(result=>{
                res.render('buyer/sellerlist',{
                    sellerActive:'active',
                    buyername:req.buyerInfo.username,
                    sellerList:result,
                    pageArr,
                    currentPage: page,
                    count: count,
                    isPre: page > 1,
                    isNext: page < pages,
                    inp:inp
                })
            });
        })

    }else{
        Seller.count().then(sum=>{
            let pages=Math.ceil(sum/count);//总共多少页,得传回客户端
            if(page<=0){
                page=1;
            }
            if(page>=pages){
                page=pages;
            }
            let skip=(page-1)*count;
            let limit=count;
            let pageArr=[];
            for(let i=1;i<=pages;i++){
                pageArr.push(i);
            };
            //分页
            Seller.find().skip(skip).limit(limit).then(result=>{
                res.render('buyer/sellerlist',{
                    sellerActive:'active',
                    buyername:req.buyerInfo.username,
                    sellerList:result,
                    pageArr,
                    currentPage: page,
                    count: count,
                    isPre: page > 1,
                    isNext: page < pages
                })
            });
        })
    }

    // Seller.find().then(result=>{
    //     res.render('buyer/sellerlist',{
    //         sellerActive:'active',
    //         buyername:req.buyerInfo.username,
    //         sellerList:result
    //     })
    // })
});
router.get('/goodsDetail',(req,res)=>{
    //获得商品id
    let goodsId=req.query.id;
    //做到这里
    Goods.findById(goodsId).populate(['seller']).then((result)=>{
        console.log(result);
        res.render('buyer/goodsDetail',{
            goodsActive:'active',
            buyername:req.buyerInfo.username,
            goodsInfo:result
        })
    });
});
router.get('/sellerDetail',(req,res)=>{
    //获得商品id
    let sellerId=req.query.id;
    Seller.findById(sellerId).then(sellerInfo=>{
        Goods.where({seller:sellerId}).find().then(result=>{
            res.render('buyer/sellerDetail',{
                sellerActive: 'active',
                buyername: req.buyerInfo.username,
                goodsList: result,
                sellerInfo
            });
        })
    })
    });
router.get('/login',(req,res)=>{
    res.render('buyer/login')
});
router.get('/register',(req,res)=>{
    res.render('buyer/register')
});
router.get('/user',(req,res)=>{
    let buyerId=req.buyerInfo._id;
    Cart.find({buyer:buyerId}).populate(['buyer','goods']).then(result=>{
       // Seller.where(goods:result.)
        Order.where({buyer:buyerId}).find().populate(['buyer','goods']).then((ress)=>{
            console.log(result);
            console.log(ress);
            res.render('buyer/user',{
                buyername:req.buyerInfo.username,
                cartInfo:result,
                orderInfo:ress
            })
        })
    })
});
router.get('/logout',(req,res)=>{
    req.cookies.set('BUYERID','');
    res.redirect('/');
});
module.exports=router;


















