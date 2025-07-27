const Role = require('../../models/roles.model');
const systemConfig = require('../../config/system')

//[GET] /admin/roles
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    };
    const roles = await Role.find(find)
    res.render('admin/pages/roles/index', {
    titlePage: 'Roles Page',
    message: 'Welcome to the Dashboard Page!',
    roles: roles
  });
}

//[GET] /admin/roles/create
module.exports.create = async (req, res) => {
    res.render('admin/pages/roles/create', {
    titlePage: 'Create Roles Page',
    message: 'Welcome to the Dashboard Page!'
  });
}

//[POST] /admin/roles/create
module.exports.createPost = async (req, res) => {
    const record = new Role(req.body)
    await record.save()
    req.flash('success', 'Thêm quyền thành công')
    res.redirect(`${systemConfig.prefixAdmin}/roles`)
}

//[GET] /admin/roles/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id
        const find = {
            _id: id,
            deleted: false
        }
        const data = await Role.findOne(find)
        res.render('admin/pages/roles/edit', {
                titlePage: 'Edit Roles Page',
                message: 'Welcome to the Dashboard Page!',
                data: data
        });
    } catch (err) {
        req.flash('error', 'Quyền không tồn tại')
        res.redirect(`${systemConfig.prefixAdmin}/roles`)
    }

}
//[PATCH] /admin/roles/edit/:id
module.exports.editPatch = async (req, res) => {
    try {
        const id = req.params.id
        await Role.updateOne({ _id: id }, req.body);
        req.flash('success', 'Sửa quyền thành công')
        res.redirect(`${systemConfig.prefixAdmin}/roles`)
    } catch (err) {
        req.flash('error', 'Sửa quyền thành công')
        res.redirect(`${systemConfig.prefixAdmin}/roles`)
    }
}

//[GET] /admin/roles/permission
module.exports.permission = async (req, res) => {
    let find = {
        deleted: false
    }
    const records = await Role.find(find)
    res.render('admin/pages/roles/permission', {
        titlePage: 'Permission Roles Page',
        message: 'Welcome to the Dashboard Page!',
        records: records
    });
};

//[PATCH] /admin/roles/permission
module.exports.permissionPatch = async (req, res) => {
    const permissions = JSON.parse(req.body.permissions);
    for (const permission of permissions) {
        if (permission.id) {
            await Role.updateOne({ _id: permission.id }, { permissions: permission.permissions });
        }
    }
    req.flash('success', 'Cập nhật quyền thành công');
    res.redirect(`${systemConfig.prefixAdmin}/roles/permissions`);
};