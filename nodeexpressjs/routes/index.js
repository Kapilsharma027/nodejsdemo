var express = require('express');
var router = express();

 

router.get('/ejs', function(req, res){ 
  res.render('index',{title:"John Smith"}) 
}); 

router.post('/login', function(req, res){ 
  res.render('saved',{title:"Saved Date" , data: req.body}) 
}); 



router.post('/secret', function (req, res, next) {  
  // res.send('Accessing the secret section ...1');
  console.log(req.body);
  res.status(200).json({
    message: "Order created successfully",
    data: req.body
  });
}
);
router.get('/secret', function (req, res, next) {
  console.log('Accessing the secret section ...', router.get('view engine'))
  // res.send('Accessing the secret section ...1');
  res.status(200).send('Accessing the secret section ...');
})
// router.param('wer', function (req, res, next, wer) {
// if(wer == 1){
//   console.log('CALLED FOR 1', wer);
//   next();
// }else{
//   console.log('CALLED FOR OTHER 1', wer);
//   next();
// }
 
// })

// router.get('/demo/:wer', function (req, res, next) {
//   console.log('demo')
//   res.send('demo');
 
// })
// router.get('/secret1', function (req, res, next) {
//   console.log('Accessing the secret section ...')
//   res.send('Accessing the secret section ...2');

// })


// router.get('/:id', function(req, res, next) {
//   console.log(req.params.id);
//   res.send('req.params.id' +req.params.id );
//   // res.redirect('/44')
//   // res.status(406).send('Not Acceptagcfhble')
//   // res.status(404).end()
//   // res.render('index', { title: 'Express' });
// });

module.exports = router;
