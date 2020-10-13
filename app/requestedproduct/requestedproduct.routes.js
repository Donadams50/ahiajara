module.exports = app => {
    const requestedproduct = require("./requestedproduct.controller");
    const jwtTokenUtils = require('../helpers/jwtTokenUtils')
    const { verifyToken, isAdmin } = jwtTokenUtils;
   
 
        
  app.post("/requestproduct",  verifyToken,  requestedproduct.create);
   app.get("/requestedproductuser/:userId",  verifyToken,   requestedproduct.findRequestedProductByUserId);
   app.get("/requestproduct",  verifyToken, isAdmin,   requestedproduct.findAll);
   app.get("/requestedproduct/:productId",  verifyToken, isAdmin,   requestedproduct.findRequestedProductById);
   app.put("/reply/:id",  verifyToken, isAdmin,   requestedproduct.reply);
}