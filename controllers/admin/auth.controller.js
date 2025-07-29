const Account = require('../../models/account.model');
const md5 = require('md5');
const systemConfig = require('../../config/system');

module.exports.login = async (req, res) => {
  if(req.cookies.token){
    const user = await Account.findOne({token: req.cookies.token});
    if (user) {
      res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
    }else{
      return res.render('admin/pages/auth/login', {
      titlePage: 'Login Page',
      message: 'Welcome to the Dashboard Page!'
    });
    }
  }else{
    return res.render('admin/pages/auth/login', {
      titlePage: 'Login Page',
      message: 'Welcome to the Dashboard Page!'
    });
  }
}

module.exports.loginPost = async (req, res) => {
  const { email, password } = req.body;
  
  const user = await Account.findOne({ email: email, deleted: false });

  if (!user) {
    req.flash('error', 'Tài khoản không tồn tại');
    return res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
  }

  const hashedPassword = md5(password);
  
  if (user.password != hashedPassword) {
    req.flash('error', 'Sai mật khẩu');
    return res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
  }

  if (user.status != 'active'){
    req.flash('error', 'Tài khoản không hoạt động');
    return res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
  }
  res.cookie("token",user.token)
  res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
}
module.exports.logout = (req, res) => {
  res.clearCookie("token");
  res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
}