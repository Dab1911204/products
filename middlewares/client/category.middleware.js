const ProductCategory = require('../../models/product-category.model')
const createTreeHelper = require('../../helpers/createTree')

module.exports.index = async (req, res,next) => {
  const productsCatecory = await ProductCategory.find({deleted: false})
  const newProductsCatecory = createTreeHelper(productsCatecory)

  res.locals.layoutProductCategory = newProductsCatecory

  next()
}