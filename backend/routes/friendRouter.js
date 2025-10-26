const { Router } = require("express");
const friendsRouter = Router();
const friendsController = require("../controllers/friendsController");
friendsRouter.get("/", friendsController.getFriends);
friendsRouter.post("/", friendsController.addFriend);
module.exports = friendsRouter;
