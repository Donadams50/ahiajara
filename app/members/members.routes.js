module.exports = app => {
    const member = require("./members.controller");
    const jwtTokenUtils = require('../helpers/jwtTokenUtils')
    const { verifyToken, isAdmin } = jwtTokenUtils;

        //console.log("routes")
 app.post("/member", member.create)
 app.post("/authenticate", member.signIn)
 app.get("/members",  verifyToken, isAdmin,  member.findAllMembers)
 app.get("/members/:id",  verifyToken, isAdmin,  member.findMembeById)
 app.post("/feedback", verifyToken, member.postFeedback)
 app.post("/changeadminpassword", member.changeAdminPassword)
}