module.exports = app => {
    const member = require("./members.controller");
    const jwtTokenUtils = require('../helpers/jwtTokenUtils')
    const { verifyToken, isAdmin } = jwtTokenUtils;

        //console.log("routes")
 app.post("/member", member.create)
 app.post("/authenticate", member.signIn)
 app.get("/members",  verifyToken, isAdmin,  member.findAllMembers)
}