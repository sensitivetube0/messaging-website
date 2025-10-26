const { Router } = require("express");
const messagesRouter = Router();
const messagesController = require("../controllers/messagesController");
messagesRouter.post("/", messagesController.newMessage);
messagesRouter.get("/", messagesController.getReceivedMessages);
messagesRouter.get("/auth/:id", messagesController.authenticateMessage);

messagesRouter.delete("/", messagesController.deleteMessage);
module.exports = messagesRouter;
