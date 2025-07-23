const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const expressFlash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const routes = require('./routes/client/index.route');
const routesAdmin = require('./routes/admin/index.route');
require('dotenv').config(); // nạp biến môi trường từ .env
const database = require('./config/database');
const systemConfig = require('./config/system');

database.connect();

const app = express();
const port = process.env.PORT;// lấy cổng từ biến môi trường từ .env
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));


app.set('views', __dirname + '/views');//set thư mục chứa view
app.set('view engine', 'pug');//set template engine là pug

//app.use(express.static('public'));//set thư mục chứa file tĩnh(Khi đưa lên server thì nó sẽ ko hiểu nên ta cần thêm __dirname)
app.use(express.static(__dirname + '/public'))

//Flash
app.use(cookieParser("keyboard cat"));//cần thêm thư viện cookie-parser
app.use(session({ cookie: { maxAge: 60000 }}));//cần thêm thư viện express-session
app.use(expressFlash());

//app locals variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;


routesAdmin(app); // sử dụng các route đã định nghĩa
routes(app); // sử dụng các route đã định nghĩa

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});