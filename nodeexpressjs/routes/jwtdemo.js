var express = require('express');
var userModel = require('../model/user')
var router = express.Router();
var bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var ejs = require('ejs');

// settings for nodemailer
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kapil123jpr@gmail.com',
    pass: 'Password'
  }
});
// mail contant
var mailOptions = {
  from: 'kapil123jpr@gmail.com',
  to: 'kapil1234jpr@gmail.com',
  subject: 'Sending Email using Node.js',
  html:`<h1> That was easy!'</h1>`
};

/** middle ware function for all request
 * @param  {} function(req
 * @param  {} res
 * @param  {} next
 */
router.use('/',function(req, res, next) {
    console.log("middle ware called");
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
        if (err) req.user = undefined;
        req.user = decode;
        next();
      });
    } else {
      console.log("middle ware called");
      req.user = undefined;
      next();
    }
  });

  loginRequired = function(req, res, next) {
      console.log("req.user", req.user)
    if (req.user) {
      next();
    } else {
      return res.status(401).json({ message: 'Unauthorized user!' });
    }
  };
  // mail sender code

router.get('/getUser', loginRequired, function(req, res){ 
    userModel.find().then(notes => {
    res.send(notes);
}).catch(err => {
    res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes."
    });
})
}); 
// send mail
router.get('/sendMail', loginRequired, function(req, res){ 
  userModel.find().then(notes => {
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        res.send("Mail Not Sent"+ error);
      } else {
        console.log('Email sent: ' + info.response);
        res.send("Mail Sent"+ info.response);
      }
    });

  
}).catch(err => {
  res.status(500).send({
      message: err.message || "Some error occurred while retrieving notes."
  });
})
}); 
// ejs templet in mail
router.get('/sendMailByejs', loginRequired, function(req, res){
ejs.renderFile("./views/index.ejs", { title: 'Mail Sent ' }, function (err, data) {
  if (err) {
    console.log(err);
    res.send("Mail Not Sent"+ err);
  } else {
    console.log("data", data)
  //   var mainOptions = {
  //     from: 'kapil123jpr@gmail.com',
  //     to: "kapil1234jpr@gmail.com",
  //     subject: 'Hello, world',
  //     html: data
  // };
    mailOptions.html = data;
      transporter.sendMail(mailOptions, function (err, info) {
          if (err) {
              console.log(err);
          } else {
            res.send("Mail Sent"+ info.response);
          }
      });
  }
  
  });
}); 
router.post('/login', function(req, res){ 
    userModel.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;
    if (!user) {
      res.status(401).json({ message: 'Authentication failed. User not found.' });
    } else if (user) {
      if (!user.comparePassword(req.body.hash_password)) {
        res.status(401).json({ message: 'Authentication failed. Wrong password.' });
      } else {
        return res.json({token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id}, 'RESTFULAPIs')});
      }
    }
  });
});

router.post('/register',function(req, res){
    var newUser = new userModel(req.body);
    bcrypt.hash(req.body.hash_password, saltRounds).then(function(hash){
        newUser.hash_password = hash;
        console.log("newuser" , hash);
        newUser.save(function(err, user) {
            if (err) {
              return res.status(400).send({
                message: err
              });
            } else {
              user.hash_password = undefined;
              return res.json(user);
            }
          });
    });
});

module.exports = router;