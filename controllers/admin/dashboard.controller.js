module.exports.dashboard = (req, res) => {
    res.render('admin/pages/dashboard/index', {
    titlePage: 'Dashboard Page',
    message: 'Welcome to the Dashboard Page!'
  });
}