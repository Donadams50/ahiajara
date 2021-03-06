module.exports = app => {
    const skinissue = require("./skinissues.controller");
    const jwtTokenUtils = require('../helpers/jwtTokenUtils')
    const { verifyToken, isAdmin, isFile } = jwtTokenUtils;
    require('../Cloudinary/cloudinary.js')
    const upload = require('../Cloudinary/multer.js');
 
        
  app.post("/symptom",  verifyToken, isAdmin, skinissue.createSymptom);
  app.get("/symptom/:category",  verifyToken,   skinissue.findSymptoms);
  app.post("/skinissue",  verifyToken, isAdmin, upload.single("files"), skinissue.createSkinIssue);
  app.get("/skinissue",  verifyToken,    skinissue.findSkinIssue);
    app.put("/skinissue/:id",  verifyToken,  isAdmin, upload.single("files")  , skinissue.update)
  app.post("/newskinissue",  verifyToken,  upload.single("files"), skinissue.createNewSkinIssue)
  app.get("/allskinissue",  verifyToken,    skinissue.findAllSkinIssue);
 app.delete("/skinissue/:id",  verifyToken, isAdmin,  skinissue.deleteSkinIssue)
}
