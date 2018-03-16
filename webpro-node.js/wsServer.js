// const express=require('express');
const mongoose=require('mongoose');
const Chat=require('./models/chatData');
const webSocketServer=require('ws').Server;
// 创建并启动服务器
const wsServer = new webSocketServer({
    port: 9090,
    host: '127.0.0.1'
});
let wsArr=[];
wsServer.on('connection',function (ws) {
    ws.on('message',(msg)=>{
        if(!ws.name){
            //新连接的用户，设置名字
            ws.name = msg.split(',')[0];
            ws.id=msg.split(',')[1];
            wsArr.push(ws);
            // 通知其他的连接用户这个用户上线了
            wsArr.map(item=>{
               // console.log(item.name,ws.name);
                if(item.name != ws.name){
                    item.send(ws.name+'上线了');
                    Chat.find({receivename:ws.name}).then(res=>{
                            for(var i=0;i<res.length;i++){
                                ws.send(ws.name+'：'+res[i].chatInfo);
                                Chat.remove({_id:res[i]._id}).then(result=>{});
                            };
                        })
                }
            });
        }
        else{
            //已经连接过的用户在说话
            //判断对方是否在线~
            // console.log(wsArr);
            let flag=true;
            wsArr.map(item=>{
                    if(item.name == ws.id){
                        //队友登录的情况
                        item.send(ws.name+'：'+msg);
                        flag=false;
                        return;
                        }
            });
                    if(flag){
                        let chat=new Chat({
                            sendname:ws.name,
                            receivename:ws.id,
                            chatInfo:msg
                        });
                        chat.save().then(result=>{
                            if(result){
                                console.log('保存成功');
                            }
                        })
                    }

        }
    });
    ws.on('close',()=>{
        console.log('下线了');
        //把这条移出数组
        for(let i=0;i<wsArr.length;i++){
            if(wsArr[i].name==ws.name){
                wsArr.splice(i,1);
            }
        }
    });
    ws.on('error',()=>{
        console.log('连接出错了');
    })
});
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