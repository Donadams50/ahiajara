module.exports = app => {
    const bespoke = require("./bespoke.controller");
    const jwtTokenUtils = require('../helpers/jwtTokenUtils')
    const { verifyToken, isAdmin } = jwtTokenUtils;
   
 
        
 app.post("/question",  verifyToken, isAdmin, bespoke.create);
 app.get("/questions",  verifyToken,   bespoke.findQuestions);
 app.delete("/questions/:id",  verifyToken, isAdmin, bespoke.deleteQuestion);
 app.put("/questions/:id",  verifyToken,  isAdmin,    bespoke.update);
 app.post("/entry",  verifyToken, bespoke.postEntry);
 app.get("/entry",  verifyToken, isAdmin,  bespoke.getEntry);
 app.get("/entry/:id",  verifyToken, isAdmin,  bespoke.getSingleEntry)
 app.put("/entry/:id",  verifyToken,  isAdmin,    bespoke.reply);
}