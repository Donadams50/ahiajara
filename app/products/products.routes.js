module.exports = app => {
    const product = require("./products.controller");
    const jwtTokenUtils = require('../helpers/jwtTokenUtils')
    const { verifyToken, isAdmin, isFile } = jwtTokenUtils;
    require('../Cloudinary/cloudinary.js')
    const upload = require('../Cloudinary/multer.js');
 
        
 app.post("/product",  verifyToken, isAdmin, upload.single("files"), product.create)
 app.get("/products",  verifyToken,  product.findAllProducts)
 app.put("/products/:id",  verifyToken,  isAdmin, upload.single("files")  , product.update)
app.get("/products/count",  verifyToken,   product.count)
app.delete("/products/:id",  verifyToken, isAdmin, product.deleteProduct);
app.get("/products/:category",  verifyToken,   product.getByCategory)
app.get("/singleproducts/:id",  verifyToken,   product.getById)
app.post("/adverts",  verifyToken, isAdmin, upload.single("files"), product.saveAdvertsImage)
app.get("/adverts",  verifyToken,  product.findAllAdverts)
app.delete("/adverts/:id",  verifyToken, isAdmin, product.deleteAdvert);
}