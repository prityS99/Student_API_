const express=require('express');
const Upload= require('../utils/studentImageUpload');
const studentApiController = require('../controller/studentApiController');


const router=express.Router();

router.post('/create/student',Upload.single('image'),studentApiController.createStudent)
router.get('/',studentApiController.getStudent)
router.get('/edit/:id',studentApiController.getEditStudent)
router.put('/update/:id',studentApiController.updateStudent)
router.delete('/delete/:id',studentApiController.deleteStudent)
// router.delete('/delete-image/:id/:imageIndex', StudentApiController.deleteSingleImage)

module.exports=router

