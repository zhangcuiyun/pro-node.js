const express=require('express');
const swig=require('swig');
const multiparty=require('multiparty');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const Cookies=require('cookies');
//引入模块
const Buyer=require('./models/buyer');
const Seller=require('./models/seller');
const buyerApiRouter=require('./routers/api/buyerApiRouter');
const sellerApiRouter=require('./routers/api/sellerApiRouter');
const buyerViewRouter=require('./routers/views/buyerViewRouter');
const sellerViewRouter=require('./routers/views/sellerViewRouter');
//创建服务器
const server=express();
//处理静态资源
server.use('/public',express.static(__dirname+'/static'));
//引入模板引擎 swig
server.engine('html',swig.renderFile);
server.set('views','./views');
server.set('view engine','html');
swig.setDefaults({cache:false});
//对所有请求,使用请求body 中的参数   req.body
server.use(bodyParser.urlencoded());
//对所有请求处理cookie
server.use((req,res,next)=>{
    req.cookies=new Cookies(req,res);
    next();
});
//对所有页面的买家信息进行处理
server.use((req,res,next)=>{
    let buyerId=req.cookies.get('BUYERID');
    req.buyerInfo={};
    if(!buyerId){
        next();
        return;
    }
    Buyer.findById(buyerId).then((buyerInfo)=>{
        if(buyerInfo){
            req.buyerInfo=buyerInfo;
        }
        next();
    })
});
//对所有页面的卖家信息进行处理
// server.use((req,res,next)=>{
//     req.sellerInfo={};
//     let sellerId=req.cookies.get('SELLERID');
//     if(!sellerId){
//         next();
//         return;
//     }
//     Seller.findById(sellerId).then((sellerInfo)=>{
//         if(sellerInfo){
//             req.sellerInfo=sellerInfo;
//         }
//         next();
//     })
// });
server.use((req,res,next)=>{
    let sellerId=req.cookies.get('SELLERID');
    req.sellerInfo={};
    if(!sellerId){
        next();
        return;
    }
    Seller.findById(sellerId).then((sellerInfo)=>{
        if(sellerInfo){
            req.sellerInfo=sellerInfo;
        }
        next();
    })
});
//买家页面请求
server.use('/',buyerViewRouter);
//买家ajax请求
server.use('/api',buyerApiRouter);
//卖家页面请求
server.use('/seller',sellerViewRouter);
//卖家ajax请求
server.use('/seller/api',sellerApiRouter);
mongoose.connect('mongodb://localhost:27022',(error)=>{
    if(error){
       console.log('连接失败');
    }else{
        console.log('连接成功');
        server.listen(8080,'localhost',(error)=>{
            if(error){
                console.log('服务器启动失败')
            }else{
                console.log('服务器启动成功, http://localhost:8080 ')
            }
        })
    }
});
