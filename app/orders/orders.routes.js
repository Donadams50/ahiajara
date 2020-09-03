module.exports = app => {
    const order = require("./orders.controller");
    const jwtTokenUtils = require('../helpers/jwtTokenUtils')
    const { verifyToken, isAdmin } = jwtTokenUtils;
    require('../Cloudinary/cloudinary.js')
    const upload = require('../Cloudinary/multer.js');
 
        
 app.post("/order",  verifyToken,  upload.single("files"), order.create)
  app.get("/orders",  verifyToken,  isAdmin, order.findAllOrder)
//  app.put("/products/:id",  verifyToken,  isAdmin, upload.single("files")  , product.update)
 app.get("/orders/count",  verifyToken, isAdmin,  order.count)
}