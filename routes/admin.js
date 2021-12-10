const { response } = require('express');
var express = require('express');
const productHelpers = require('../helpers/product-helpers');
var router = express.Router();
const verifyLogin = (req, res, next) => {
  if (req.session.adminLoggedIn) {
    next()

  } else {
    res.redirect('/admin/log-in')
  }
}

/* GET users listing. */
router.get('/',verifyLogin, function (req, res, next) {

  productHelpers.getAllProducts().then((products)=>{
    //console.log(products);
  
    res.render('admin/view-products', { admin: true, products})
  })
});

router.get('/sign-up',(req,res)=>{
  res.render('admin/sign-up')
})

router.post('/sign-up', (req, res) => {
  productHelpers.doAdminSignup(req.body).then((response) => {
    //console.log(response);
    req.session.admin = response
    req.session.adminLoggedIn = true
    res.redirect('/admin')

  })
})

router.get('/log-in', (req, res, next) => {
  //console.log('clicked login');
  if (req.session.admin) {
    res.redirect('/admin')
  } else {

    res.render('admin/log-in', { "loginError": req.session.adminLoginError })
    req.session.adminLoginError = false
  }
})

router.post('/log-in', (req, res) => {
  productHelpers.doAdminLogin(req.body).then((response) => {
    if (response.status) {
      req.session.admin = response.admin
      req.session.adminLoggedIn = true

      res.redirect('/admin')
    } else {
      req.session.adminLoginError = "invalid username or password"
      res.redirect('/log-in')
    }
  })
})

router.get('/add-product', (req, res) => {
  res.render('admin/add-product',{admin:true})

})
router.post('/add-product', (req, res) => {
  //console.log(req.body)
  //console.log(req.files.image)

  productHelpers.addProduct(req.body, (result) => {
    //res.render("admin/add-product",{admin:true})
    let image = req.files.image
    //console.log(result);
    image.mv('./public/product-images/' + result + '.jpg', (err, done) => {
      if (!err) {
        res.render("admin/add-product",{admin:true})
      }

    })

  })
})
router.get('/delete-product/:id',(req,res)=>{
      let proId=req.params.id 
      //console.log(proId);
      productHelpers.deleteProduct(proId).then((response)=>{
        res.redirect('/admin/')
      })
})
router.get('/edit-product/:id',async(req,res)=>{
  let product=await productHelpers.getProductDetails(req.params.id)
  console.log(product);
  res.render('admin/edit-product',{product, admin:true})
})
router.post('/edit-product/:id',(req,res)=>{
  productHelpers.updateProduct(req.params.id, req.body).then(()=>{
    res.redirect('/admin')
    if(req.files.image){
      let id=req.params.id
      //console.log(response);
      let image=req.files.image
      image.mv('./public/product-images/' + id + '.jpg')       

    }
  })
})

module.exports = router;
