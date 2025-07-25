const ProductCategory = require('../../models/product-category.model')
const filterStatusHelper = require('../../helpers/filterStatus')
const searchHelper = require('../../helpers/search')
const mongoose = require('mongoose')
const paginationHelper = require('../../helpers/pagination')
const systemConfig = require('../../config/system')
//[GET] /admin/products-category
module.exports.index = async (req, res) => {
  const find = {
    deleted: false
  }
  const records = await ProductCategory.find(find)
  res.render('admin/pages/products-category/index', {
    titlePage: 'Products Category Page',
    message: 'Welcome to the Products Page!',
    records: records,
  });
}

//[GET] /admin/products-category/create
module.exports.create = async (req, res) => {
  res.render('admin/pages/products-category/create', {
    titlePage: 'Create Products Category Page',
    message: 'Welcome to the Products Page!'
  });
}
//[POST] /admin/products-category/create
module.exports.createPost = async (req, res) => {
  console.log(req.body);
  if (req.body.position == "") {
    const countProduct = await ProductCategory.countDocuments()
    req.body.position = countProduct + 1
  } else {
    req.body.position = parseInt(req.body.position)
  }
  const record = new ProductCategory(req.body)
  await record.save()
  req.flash('success', 'Thêm sản phẩm thành công')
  res.redirect(`${systemConfig.prefixAdmin}/products-category`)
}