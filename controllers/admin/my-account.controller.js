const Account = require('../../models/account.model');
const md5 = require('md5');
const Role = require('../../models/roles.model');
const systemConfig = require('../../config/system');

//[GET] /admin/my-accounts
module.exports.index = async (req, res) => {
  res.render(`admin/pages/my-account/index`, {
    titlePage: 'Accounts Page',
    message: 'Welcome to the Dashboard Page!'
  });
}

//[GET] /admin/my-accounts/edit
module.exports.edit = async (req, res) => {
  res.render(`admin/pages/my-account/edit`, {
    titlePage: 'Accounts Page',
    message: 'Welcome to the Dashboard Page!'
  });
}

//[PATCH] /admin/my-account/edit
module.exports.editPatch = async (req, res) => {
  const id = res.locals.user.id;
  const emailExists = await Account.findOne(
    {
      _id: { $ne: id },// ko lấy bản ghi có id này
      email: req.body.email,
      deleted: false 
    }
  );
  if (emailExists) {
    req.flash('error', `Email ${req.body.email} đã tồn tại`);
    res.redirect(`${systemConfig.prefixAdmin}/my-account/edit`);
  } else {
    if (req.body.password) {
      req.body.password = md5(req.body.password);
    }else {
      delete req.body.password; // If password is not provided, remove it from the body
    }
    await Account.updateOne({ _id: id },req.body);
    req.flash('success', 'Sửa tài khoản thành công');
    res.redirect(`${systemConfig.prefixAdmin}/my-account`);
  }
}