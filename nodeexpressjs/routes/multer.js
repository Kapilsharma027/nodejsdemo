var express = require('express');
var multer = require('multer');
var fs = require('fs');
var mongoose = require('mongoose');
var router = express.Router();
var multerScma =  mongoose.Schema({
    imageName: String,
  });
  var empModel = mongoose.model('multerCls', multerScma) ;
  var allFiles = empModel.find({});
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/uploads')
    }, 
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    }
});
var upload = multer({storage: storage});
router.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
    if (!req.file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
var savingData =new empModel({
  imageName: req.file.originalname
})
savingData.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
  })
  router.get('/getfile', (req, res, next) => {
    allFiles.exec(function(err,data){
      if(err) throw err;
      console.log(data);
      res.render('upload-file', {title: "Saved Images", records:data}); 
      });
    });
    
module.exports = router;