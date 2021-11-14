const { response } = require('express');
var express = require('express');
var router = express.Router();
const productHelpers = require('../helpers/product-helpers')
const userHelpers = require('../helpers/user-helper')
const verifyLogin=(req,res)=>{
  if (req.session.loggedIn) {
    next()

  } else {
    res.redirect('/login')
  }
}

/* GET home page. */
router.get('/', function (req, res, next) {
  let user = req.session.user
  //console.log(user);
  productHelpers.getAllProducts().then((products) => {
    //console.log(products);
    res.render('user/view-product', { products, user });
  })
});
router.get('/login', (req, res, next) => {
  //console.log('clicked login');
  if (req.session.loggedIn) {
    res.redirect('/')
  } else {

    res.render('user/login', { "loginError": req.session.loginError })
    req.session.loginError = false
  }
})
router.get('/signup', (req, res) => {
  res.render('user/signup')
})

router.post('/signup', (req, res) => {
  userHelpers.doSignup(req.body).then((response) => {
    //console.log(response);

  })
})

router.post('/login', (req, res) => {
  userHelpers.doLogin(req.body).then((response) => {
    if (response.status) {
      req.session.loggedIn = true
      req.session.user = response.user
      res.redirect('/')
    } else {
      req.session.loginError = "invalid username or password"
      res.redirect('/login')
    }
  })
})

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

router.get( '/cart',verifyLogin, (req, res) => {
    res.render('user/cart')
})


module.exports = router;
