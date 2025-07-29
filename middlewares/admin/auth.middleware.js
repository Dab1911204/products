const systemConfig = require('../../config/system')

const Role = require('../../models/roles.model')
const Account = require('../../models/account.model')

module.exports.requireAuth = async (req, res, next) => {
    if(req.cookies.token){
        const token = req.cookies.token;
        const user = await Account.findOne({token: token}).select("-password -token")
        if(!user){
            res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
        }else {
            const role = await Role.findOne({_id: user.role_id ,deleted: false}).select("title permissions");
            //tạo biến toàn cục
            res.locals.user = user;
            res.locals.role = role;
            next()
        }
    }else {
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
    }
}