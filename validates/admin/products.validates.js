const systemConfig = require('../../config/system')
module.exports.createPost = async (req, res, next) => {
    if(!req.body.title || req.body.title.trim() === ""){
    req.flash('error', 'Vui lòng nhập tên sản phẩm')
    return res.redirect(`${systemConfig.prefixAdmin}/products/create`)
  }
  next()
}