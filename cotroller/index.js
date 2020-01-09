const model =require('../model/index');

let controller={};

controller.GetAll_IOChatAPI= async(req,res)=>{//GetAll IOChat API
    try{
        let result = await model.GetAll_IOChatAPI();
        res.json(result);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
};

controller.GetOne_IOChatAPI= async(req,res)=>{//GetOne IOChat API
    let id = {
        id: req.params.id
    };
    try{
        let result = await model.GetOne_IOChatAPI(id);
        res.json(result);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
};

controller.Post_IOChatAPI= async(req,res)=>{//Post IOChat API
    let sql = {
        username: req.body.username,
        message: req.body.message
    };
    try{
        let result = await model.Post_IOChatAPI(sql);
        res.json(result);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
};

controller.Patch_IOChatAPI= async(req,res)=>{//Patch IOChat API
    let id={
        id: req.params.id
    };
    let sql = {
        message: req.body.message
    };
    try{
        let result = await model.Patch_IOChatAPI(id ,sql);
        res.json(result);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
};

controller.Delete_IOChatAPI= async(req,res)=>{//Delete IOChat API
    let id={
        id: req.params.id
    };
    try{
        let result = await model.Delete_IOChatAPI(id);
        res.json(result);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
};


module.exports = controller;