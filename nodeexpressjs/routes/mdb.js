
var mongoose = require('mongoose');
var express = require('express');

var router = express.Router();

var empSchema = new mongoose.Schema({
  name:  String
});

var empModel = mongoose.model('newcls', empSchema) ;
  

router.get('/getEmp', function(req, res){ 
    console.log('called',);
 empModel.find().then(notes => {
    res.send(notes);
}).catch(err => {
    res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes."
    });
})
}); 

router.post('/saveEmp', function(req, res){ 
    console.log('called',);
    var model = new empModel({name : "new user in new table"});
    model.save().then(notes => {
    res.send("saved successfully");
}).catch(err => {
    res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes."
    });
})
}); 


module.exports = router;