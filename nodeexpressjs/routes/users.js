var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/abc', function (req, res, next) {
  console.log(res);
  res.requ = new Date();
  console.log('Accessing the secret section ...')
  res.send('abc' +res.requ );
  // next() // pass control to the next handler
})

// router.get(/a/, function(req, res, next) {
//   console.log(req.params);
//   res.send('respond with a resource' + req.params.id);
// });
var cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}

var cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}

var cb2 = function (req, res) {
  res.send('Hello from C!')
}

router.get('/example/c', [cb0, cb1, cb2])

router.route('/book')
  .get(function (req, res) {
    res.send('Get a random book')
  })
  .post(function (req, res) {
    console.log('post');
    res.send('Add a book')
  })
  .put(function (req, res) {
    console.log('put');
    res.send('Update the book')
  })

module.exports = router;
