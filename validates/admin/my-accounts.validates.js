const Account = require('../../models/account.model');
const md5 = require('md5');
const Role = require('../../models/roles.model');
const systemConfig = require('../../config/system');

//[GET] /admin/accounts
module.exports.index = async (req, res) => {
  const find = {
    deleted: false
  }
  const records = await Account.find(find).select("-password -token")
  for(const record of records) {
    const data = await Role.findOne({_id: record.role_id ,deleted: false});
    record.role = data;
  }
  res.render(`admin/pages/accounts/index`, {
    titlePage: 'Accounts Page',
    message: 'Welcome to the Dashboard Page!',
    records: records,
  });
}
//[GET] /admin/accounts/create
module.exports.create = async (req, res) => {
  const roles = await Role.find({ deleted: false });
  res.render(`admin/pages/accounts/create`, {
    titlePage: 'Create Account',
    message: 'Create a new account',
    roles: roles,
  });
}
//[POST] /admin/accounts/create
module.exports.createPost = async (req, res) => {
  const emailExists = await Account.findOne({ email: req.body.email, deleted: false });
  if (emailExists) {
    req.flash('error', `Email ${req.body.email} đã tồn tại`);
    res.redirect(`${systemConfig.prefixAdmin}/accounts/create`);
  } else {
    req.body.password = md5(req.body.password);
    const newAccount = new Account(req.body);
    await newAccount.save();
    req.flash('success', 'Tạo tài khoản thành công');
    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
  }

}
//[GET] /admin/accounts/edit/:id
module.exports.edit = async (req, res) => {
  const find = { _id: req.params.id, deleted: false }
  const account = await Account.findOne(find);
  const roles = await Role.find({ deleted: false });
  res.render(`admin/pages/accounts/edit`, {
    titlePage: 'Edit Account',
    message: 'Edit account details',
    account: account,
    roles: roles,
  });
}
//[PATCH] /admin/accounts/edit/:id
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
  const emailExists = await Account.findOne(
    {
      _id: { $ne: id },// ko lấy bản ghi có id này
      email: req.body.email,
      deleted: false 
    }
  );
  if (emailExists) {
    req.flash('error', `Email ${req.body.email} đã tồn tại`);
    res.redirect(`${systemConfig.prefixAdmin}/accounts/edit/${req.params.id}`);
  } else {
    if (req.body.password) {
      req.body.password = md5(req.body.password);
    }else {
      delete req.body.password; // If password is not provided, remove it from the body
    }
    await Account.updateOne({ _id: id },req.body);
    req.flash('success', 'Sửa tài khoản thành công');
    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
  }
}