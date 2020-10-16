module.exports = app => {
    const order = require("./orders.controller");
    const jwtTokenUtils = require('../helpers/jwtTokenUtils')
    const { verifyToken, isAdmin } = jwtTokenUtils;
    require('../Cloudinary/cloudinary.js')
    const upload = require('../Cloudinary/multer.js');
 
        
 app.post("/order",  verifyToken,   order.create)
  app.get("/orders",  verifyToken,  isAdmin, order.findPendingOrder)
  app.get("/orders/:status",  verifyToken,  isAdmin, order.findOrder)
  app.get("/order/:id",  verifyToken,  isAdmin, order.findOrderById)
//app.put("/products/:id",  verifyToken,  isAdmin, upload.single("files")  , product.update)
 app.get("/count/orders",  verifyToken, isAdmin,  order.count)
 app.post("/dispatchorder",  verifyToken, isAdmin,  order.dispatchOrder)
 app.post("/completeorder/:orderId",  verifyToken,   order.completeOrder)
  app.get("/completedorder/:userId",  verifyToken,  isAdmin, order.completedOrderByUserId)
   app.get("/incompletedorder/:userId",  verifyToken,  isAdmin, order.inCompletedOrderByUserId)
}