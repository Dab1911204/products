const systemConfig = require('../../config/system')
module.exports.createPost = async (req, res, next) => {
  if (!req.body.fullName || req.body.fullName.trim() === "") {
    req.flash('error', 'Vui lòng nhập tên tài khoản')
    res.redirect(`${systemConfig.prefixAdmin}/accounts/create`)
    return
  }
  if (!req.body.email || req.body.email.trim() === "") {
    req.flash('error', 'Vui lòng nhập email')
    res.redirect(`${systemConfig.prefixAdmin}/accounts/create`)
    return 
  }
  if (!req.body.password) {
    req.flash('error', 'Vui lòng nhập password')
    res.redirect(`${systemConfig.prefixAdmin}/accounts/create`)
    return 
  }
  next()
}
module.exports.editPatch = async (req, res, next) => {
  if (!req.body.fullName || req.body.fullName.trim() === "") {
    req.flash('error', 'Vui lòng nhập tên tài khoản')
    res.redirect(`${systemConfig.prefixAdmin}/accounts/create`)
    return
  }
  if (!req.body.email || req.body.email.trim() === "") {
    req.flash('error', 'Vui lòng nhập email')
    res.redirect(`${systemConfig.prefixAdmin}/accounts/create`)
    return 
  }
  next()
}