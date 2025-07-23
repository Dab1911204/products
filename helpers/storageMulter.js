const multer = require('multer');
module.exports = () => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './public/uploads'); // thư mục lưu trữ file tải lên
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, uniqueSuffix + '-' + file.originalname); // đặt tên file
        }
    });
    return storage;
}