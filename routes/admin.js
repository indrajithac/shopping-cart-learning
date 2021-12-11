const { response } = require('express');
var express = require('express');
const productHelpers = require('../helpers/product-helpers');
const userHelpers=require('../helpers/user-helper')
var router = express.Router();
const verifyLogin = (req, res, next) => {
  adminData = req.session.admin
  if (req.session.adminLoggedIn) {
    next()

  } else {
    res.redirect('/admin/log-in')
  }
}

/* GET users listing. */
router.get('/', verifyLogin, function (req, res, next) {
  productHelpers.getAllProducts().then((products) => {
    //console.log(products);

    res.render('admin/view-products', { admin: true, products,adminData })
  })
});

router.get('/sign-up', (req, res) => {
  res.render('admin/sign-up', { admin: true })
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
    res.render('admin/log-in', { "loginError": req.session.adminLoginError, admin: true })
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

router.get('/log-out', (req, res, next) => {
  req.session.admin = null
  req.session.adminLoggedIn = false
  res.redirect('/admin')
})

router.get('/add-product', verifyLogin, (req, res) => {
  res.render('admin/add-product', { admin: true,adminData })

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
        res.render("admin/add-product", { admin: true,adminData })
      }

    })

  })
})

router.get('/delete-product/:id', (req, res) => {
  let proId = req.params.id
  //console.log(proId);
  productHelpers.deleteProduct(proId).then((response) => {
    res.redirect('/admin/')
  })
})
router.get('/edit-product/:id', async (req, res) => {
  let product = await productHelpers.getProductDetails(req.params.id)
  console.log(product);
  res.render('admin/edit-product', { product, admin: true,adminData })
})

router.post('/edit-product/:id', (req, res) => {
  productHelpers.updateProduct(req.params.id, req.body).then(() => {
    res.redirect('/admin')
    if (req.files.image) {
      let id = req.params.id
      //console.log(response);
      let image = req.files.image
      image.mv('./public/product-images/' + id + '.jpg')

    }
  })
})

router.get('/orders', verifyLogin, async (req, res) => {
  let orders = await productHelpers.getOrderDetails()
  console.log(orders);
  res.render('admin/orders', { admin: true, orders,adminData })
})

router.get('/view-order-products/:id',verifyLogin,async(req,res)=>{
  let product = await userHelpers.getOrderProducts(req.params.id)
  res.render('admin/view-order-products', { adminData, product,admin:true })
})

module.exports = router;
