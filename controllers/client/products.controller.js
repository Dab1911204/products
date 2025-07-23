const Product = require('../../models/product.model')

module.exports.index = async (req, res) => {
  const products = await Product.find({
    status:'active',
    deleted: false
  }).sort({ position: "desc" })

  const newProducts = products.map(item => {
    item.priceNew = (item.price * (100-item.discountPercentage) / 100).toFixed(0)
    return item;
  })

  res.render('client/pages/products/index', {
    titlePage: 'Products Page',
    message: 'Welcome to the Products Page!',
    products:newProducts
  });
}

module.exports.detail = async (req, res) => {
  try {
    const slug = req.params.slug;
    const find = {
      slug: slug,
      deleted: false,
      status: 'active'
    }
    const product = await Product.findOne(find)
    console.log(product);
    res.render('client/pages/products/detail', {
      titlePage: 'Detail Product Page',
      message: 'Welcome to the Create Product Page!',
      product: product,
    });
  } catch (err) {
    req.flash('error', 'Sản phẩm không tồn tại')
    res.redirect(`/products`)
  }
}