module.exports = app => {
    const questionaire = require("./questionaire.controller");
    const jwtTokenUtils = require('../helpers/jwtTokenUtils')
    const { verifyToken, isAdmin } = jwtTokenUtils;
   
 
        
 app.post("/questioniare",  verifyToken, isAdmin, questionaire.create);
 app.get("/questioniare",  verifyToken,   questionaire.findQuestions);
  app.delete("/questioniare/:id",  verifyToken, isAdmin, questionaire.deleteQuestion);
  app.put("/questioniare/:id",  verifyToken,  isAdmin,    questionaire.update);
  app.post("/questioniareentry",  verifyToken, questionaire.postEntry);
  app.get("/questioniareentry",  verifyToken, isAdmin,  questionaire.getEntry);
  app.get("/questioniareentry/:id",  verifyToken, isAdmin,  questionaire.getSingleEntry)
 app.put("/questioniareentry/:id",  verifyToken,  isAdmin,    questionaire.reply);
}