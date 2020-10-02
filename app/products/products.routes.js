module.exports = app => {
    const product = require("./products.controller");
    const jwtTokenUtils = require('../helpers/jwtTokenUtils')
    const { verifyToken, isAdmin, isFile } = jwtTokenUtils;
    require('../Cloudinary/cloudinary.js')
    const upload = require('../Cloudinary/multer.js');
 
        
 app.post("/product",  verifyToken, isAdmin, upload.single("files"), product.create)
 app.get("/products",  verifyToken,  product.findAllProducts)
 app.put("/products/:id",  verifyToken,  isAdmin, upload.single("files")  , product.update)
app.get("/products/count",  verifyToken, isAdmin,  product.count)

app.get("/products/:category",  verifyToken, isAdmin,  product.getByCategory)
app.get("/singleproducts/:id",  verifyToken,   product.getById)
}