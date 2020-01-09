const express = require('express');
const router = express.Router();

const controller = require('../cotroller/index')

router.get('/', (req, res)=>{
    res.render('index', { title: 'IO Chat'});
})
router.get('/IO%20Chat/API',controller.GetAll_IOChatAPI);//GetAll IOChat API

router.get('/IO%20Chat/API/:id',controller.GetOne_IOChatAPI);//GetOne IOChat API
  
router.post('/IO%20Chat/API',controller.Post_IOChatAPI);//Post IOChat API

router.patch('/IO%20Chat/API/:id',controller.Patch_IOChatAPI);//Patch IOChat API

router.delete('/IO%20Chat/API/:id',controller.Delete_IOChatAPI);//Delete IOChat API

module.exports = router;