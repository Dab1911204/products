module.exports.index = (req, res) => {
  res.render('client/pages/home/index', {
    titlePage: 'Home Page',
    message: 'Welcome to the Home Page!'
  });
}