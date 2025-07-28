const systemConfig = require('../../config/system')
module.exports.loginPost = async (req, res, next) => {
  if (!req.body.email || req.body.email.trim() === "") {
    req.flash('error', 'Vui lòng nhập email')
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
    return 
  }
  if (!req.body.password) {
    req.flash('error', 'Vui lòng nhập password')
    res.redirect(`${systemConfig.prefixAdmin}/accounts/login`)
    return 
  }
  next()
}