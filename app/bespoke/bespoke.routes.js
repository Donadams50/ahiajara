module.exports = app => {
    const bespoke = require("./bespoke.controller");
    const jwtTokenUtils = require('../helpers/jwtTokenUtils')
    const { verifyToken, isAdmin } = jwtTokenUtils;
   
 
        
 app.post("/question",  verifyToken, isAdmin, bespoke.create);
  app.get("/questions",  verifyToken, isAdmin,  bespoke.findQuestions);
//   app.post("/skinissue",  verifyToken, isAdmin, upload.single("files"), skinissue.createSkinIssue);
//   app.get("/skinissue",  verifyToken, isAdmin,   skinissue.findSkinIssue);
//  app.put("/products/:id",  verifyToken,  isAdmin, upload.single("files")  , product.update)
// app.get("/products/count",  verifyToken, isAdmin,  product.count)
}