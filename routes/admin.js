var express = require('express');
const productHelpers = require('../helpers/product-helpers');
var router = express.Router();
var productHelper = require('../helpers/product-helpers')

/* GET users listing. */
router.get('/', function (req, res, next) {
  productHelpers.getAllProducts().then((products)=>{
    console.log(products);
    res.render('admin/view-products', { admin: true, products })
  })
});
router.get('/add-product', (req, res) => {
  res.render('admin/add-product')

})
router.post('/add-product', (req, res) => {
  //console.log(req.body)
  //console.log(req.files.image)

  productHelpers.addProduct(req.body, (result) => {
    res.render("admin/add-product")
    let image = req.files.image
    //console.log(result);
    image.mv('./public/product-images/' + result + '.jpg', (err, done) => {
      if (!err) {
        res.render("admin/add-product")
      }

    })

  })
})

module.exports = router;
