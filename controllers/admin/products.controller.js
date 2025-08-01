const Product = require('../../models/product.model')
const Account = require('../../models/account.model')
const filterStatusHelper = require('../../helpers/filterStatus')
const searchHelper = require('../../helpers/search')
const mongoose = require('mongoose')
const paginationHelper = require('../../helpers/pagination')
const systemConfig = require('../../config/system')
const ProductCategory = require('../../models/product-category.model')
const createTreeHelper = require('../../helpers/createTree')

//[GET] /admin/products
module.exports.index = async (req, res) => {

  const filterStatus = filterStatusHelper(req.query)

  const find = {
    deleted: false
  }
  if (req.query.status) {
    find.status = req.query.status
  }

  const objectSearch = searchHelper(req.query)
  if (objectSearch.keyword) {
    find.title = objectSearch.regex
  }

  //Pagination
  const countProduct = await Product.countDocuments(find)
  let objectPagination = paginationHelper(
    {
      currentPage: 1,
      limitItem: 4,
    },
    req.query,
    countProduct
  )
  //End Pagination

  //Sort
  let sort = {}
  if (req.query.sort && req.query.sortValue) {
    sort[req.query.sort] = req.query.sortValue
  }else {
    sort.position = 'desc'
  }
  //End Sort

  const products = await Product.find(find).sort(sort).limit(objectPagination.limitItem).skip(objectPagination.skip)

  for(const product of products){
    //lấy ra thông tin người tạo
    const user = await Account.findOne({_id: product.createdBy.account_id})
    if (user) {
      product.accountFullName = user.fullName
    }
    //lấy ra thông tin người sửa
    const updatedBy = product.updatedBy.slice(-1)[0]
    if (updatedBy) {
      const userUpdate = await Account.findOne({_id: updatedBy.account_id})
      if (userUpdate) {
        updatedBy.accountFullName = userUpdate.fullName
      }
    }
  }

  res.render('admin/pages/products/index', {
    titlePage: 'Products Page',
    message: 'Welcome to the Products Page!',
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    objectPagination: objectPagination
  });
}

//[PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const id = req.params.id
  const status = req.params.status
  const backUrl = req.query.referer || req.get("Referer") || "/admin/products";

  if (mongoose.Types.ObjectId.isValid(id)) {
    await Product.updateMany({ _id: { $in: ids } }, 
          {
           status: status,
           $push: { updatedBy: updatedBy }
          }
        )
    req.flash('success', 'Cập nhật trạng thái thành công')
  }
  res.redirect(backUrl)//chuyển về trang trước đó
}

//[PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type
  const ids = req.body.ids.split(", ")
  const backUrl = req.query.referer || req.get("Referer") || "/admin/products";

  switch (type) {
    case "active":
      await Product.updateMany({ _id: { $in: ids } }, 
          {
           status: "active",
           $push: { updatedBy: updatedBy }
          }
        )
      req.flash('success', 'Cập nhật trạng thái thành công')
      break;
    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, 
          {
           status: "inactive",
           $push: { updatedBy: updatedBy }
          }
        )
      req.flash('success', 'Cập nhật trạng thái thành công')
      break;
    case "delete-all":
      await Product.updateMany({ _id: { $in: ids } }, { deleted: true, deletedBy: {account_id: res.locals.user.id, deletedAt: new Date()} })
      req.flash('success', 'Xóa sản phẩm thành công')
      break;
    case "change-position":
      for (const item of ids) {
        console.log(item);
        let [id, position] = item.split("-")
        position = parseInt(position)
        console.log(id + " - " + position);
        await Product.updateOne({ _id: id }, { position: position , $push: { updatedBy: updatedBy }})
      }
      req.flash('success', 'Cập nhật vị trí thành công')
      break;
    default:
      break;
  }
  res.redirect(backUrl)//chuyển về trang trước đó
}

//[PATCH] /admin/products/change-multi
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id
  const backUrl = req.query.referer || req.get("Referer") || "/admin/products";
  if (mongoose.Types.ObjectId.isValid(id)) {
    //await Product.deleteOne({ _id: id }) //xóa cứng
    await Product.updateOne({ _id: id }, { deleted: true, deletedBy: {account_id: res.locals.user.id, deletedAt: new Date()} })//xóa mềm
    req.flash('success', 'Xóa sản phẩm thành công')
  }
  res.redirect(backUrl)//chuyển về trang trước đó
}

//[GET] /admin/products/create
module.exports.create = async (req, res) => {
  const find = {
    deleted: false
  }
  const records = await ProductCategory.find(find).sort({ position: "desc" });
  const tree = createTreeHelper(records);
  res.render('admin/pages/products/create', {
    titlePage: 'Create Product Page',
    message: 'Welcome to the Create Product Page!',
    category: tree,
  });
}

//[POST] /admin/products/create
module.exports.createPost = async (req, res) => {
  console.log(req.file);
  req.body.price = parseInt(req.body.price)
  req.body.discountPercentage = parseInt(req.body.discountPercentage)
  req.body.stock = parseInt(req.body.stock)
  if (req.body.position == "") {
    const countProduct = await Product.countDocuments()
    req.body.position = countProduct + 1
  } else {
    req.body.position = parseInt(req.body.position)
  }
  req.body.createdBy = {
    account_id: res.locals.user.id
  }
  const product = new Product(req.body)
  await product.save()
  req.flash('success', 'Thêm sản phẩm thành công')
  res.redirect(`${systemConfig.prefixAdmin}/products`)
}

//[GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id
    const find = {
      _id: id,
      deleted: false
    }
    const product = await Product.findOne(find)
    const categorys = await ProductCategory.find({deleted: false}).sort({ position: "desc" });
  const tree = createTreeHelper(categorys);
    res.render('admin/pages/products/edit', {
      titlePage: 'Edit Product Page',
      message: 'Welcome to the Create Product Page!',
      product: product,
      categorys: tree,
    });
  } catch (err) {
    req.flash('error', 'Sản phẩm không tồn tại')
    res.redirect(`${systemConfig.prefixAdmin}/products`)
  }
}

//[PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
  req.body.price = parseInt(req.body.price)
  req.body.discountPercentage = parseInt(req.body.discountPercentage)
  req.body.stock = parseInt(req.body.stock)
  req.body.position = parseInt(req.body.position)
  try {
    const updatedBy = {
      account_id: res.locals.user.id,
      updatedAt: new Date()
    }
    await Product.updateOne({ _id: req.params.id }, {
      ...req.body,
      $push: { updatedBy: updatedBy }
    });
    req.flash('success', 'Sửa sản phẩm thành công')
    res.redirect(`${systemConfig.prefixAdmin}/products`)
  } catch (error) {
    req.flash('error', 'Cập nhật sản phẩm thất bại')
    return res.redirect(`${systemConfig.prefixAdmin}/products/edit/${req.params.id}`);
  }
  
}

//[GET] /admin/products/edit/:id
module.exports.detail = async (req, res) => {
  try {
    const id = req.params.id
    const find = {
      _id: id,
      deleted: false
    }
    const product = await Product.findOne(find)
    console.log(product);
    res.render('admin/pages/products/detail', {
      titlePage: 'Detail Product Page',
      message: 'Welcome to the Create Product Page!',
      product: product,
    });
  } catch (err) {
    req.flash('error', 'Sản phẩm không tồn tại')
    res.redirect(`${systemConfig.prefixAdmin}/products`)
  }
}