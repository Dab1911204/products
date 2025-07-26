const ProductCategory = require('../../models/product-category.model')
const filterStatusHelper = require('../../helpers/filterStatus')
const searchHelper = require('../../helpers/search')
const mongoose = require('mongoose')
const paginationHelper = require('../../helpers/pagination')
const systemConfig = require('../../config/system')
const createTreeHelper = require('../../helpers/createTree')
//[GET] /admin/products-category
module.exports.index = async (req, res) => {
  const find = {
    deleted: false
  }
  const records = await ProductCategory.find(find).sort({ position: "desc" });
  const tree = createTreeHelper(records);
  res.render('admin/pages/products-category/index', {
    titlePage: 'Products Category Page',
    message: 'Welcome to the Products Page!',
    records: tree,
  });
}

//[GET] /admin/products-category/create
module.exports.create = async (req, res) => {
  let find = {
    deleted: false
  }
  const records = await ProductCategory.find(find).sort({ position: "desc" });
  const tree = createTreeHelper(records);
  res.render('admin/pages/products-category/create', {
    titlePage: 'Create Products Category Page',
    message: 'Welcome to the Products Page!',
    records: tree,
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

//[GET] /admin/products-category/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id
    const find = {
      _id: id,
      deleted: false
    }
    const records = await ProductCategory.find({deleted: false}).sort({ position: "desc" });
    const tree = createTreeHelper(records);
    const data = await ProductCategory.findOne(find)
    res.render('admin/pages/products-category/edit', {
      titlePage: 'Edit Product-Category Page',
      message: 'Welcome to the Create Product Page!',
      data: data,
      records: tree,
    });
  } catch (err) {
    req.flash('error', 'Danh mục Sản phẩm không tồn tại')
    res.redirect(`${systemConfig.prefixAdmin}/products-category`)
  }
}

//[PATCH] /admin/products-category/edit/:id
module.exports.editPatch = async (req, res) => {
  try {
    await ProductCategory.updateOne({ _id: req.params.id }, req.body);
    req.flash('success', 'Thêm Danh mục sản phẩm thành công')
    res.redirect(`${systemConfig.prefixAdmin}/products-category`)
  } catch (error) {
    req.flash('error', 'Cập nhật sản phẩm thất bại')
    return res.redirect(`${systemConfig.prefixAdmin}/products-category/edit/${req.params.id}`);
  }

}
