module.exports = app => {
    const product = require("./products.controller");
    const jwtTokenUtils = require('../helpers/jwtTokenUtils')
    const { verifyToken, isAdmin } = jwtTokenUtils;
    require('../Cloudinary/cloudinary.js')
    const upload = require('../Cloudinary/multer.js');
 
        //console.log("routes")
 app.post("/product",  verifyToken, isAdmin, upload.single("files"), product.create)
 app.get("/products",  verifyToken,  product.findAllProducts)
}