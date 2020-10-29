module.exports = app => {
    const notification = require("./notification.controller");
    const jwtTokenUtils = require('../helpers/jwtTokenUtils')
    const { verifyToken, isAdmin } = jwtTokenUtils;

        //console.log("routes")
 app.get("/unreadnotifications", verifyToken, notification.getUnread)
 app.get("/allnotifications", verifyToken,notification.findAllNotifications)
 app.post("/markread/:id",  verifyToken, notification.markRead)
 app.get("/notifications/:id",  verifyToken, notification.getNotificationById)
}