const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
require('dotenv').config(); // nạp biến môi trường từ .env



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

module.exports.upload = (req, res, next) => {
    if (req.file) {
        let streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream(
                    (error, result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    }
                );

                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };

        async function upload(req) {
            let result = await streamUpload(req);
            console.log(result.secure_url);
            req.body[req.file.fieldname] = result.secure_url; // Lưu URL của ảnh đã tải lên vào req.body
            next(); // Tiếp tục với middleware tiếp theo
        }

        upload(req);
    } else {
        next(); // Tiếp tục với middleware tiếp theo
    }

}