const prisma = require("../lib/prisma");

exports.newMessage = async (req, res) => {
  try {
    if (req.user.username === req.body.toUsername) {
      return res.status(400).json({ success: false, message: "Nice try" });
    }
    const toUser = await prisma.user.findUnique({
      where: {
        username: req.body.toUsername,
      },
    });
    if (!toUser) {
      return res.status(400).json({ success: false, message: "No user found" });
    }
    const friends = await prisma.friend.findFirst({
      where: {
        OR: [
          { friendId: req.user.id, userId: toUser.id },
          { friendId: toUser.id, userId: req.user.id },
        ],
      },
    });
    if (!friends) {
      return res.status(400).json({ success: false, message: "Not a friend" });
    }
    await prisma.messages.create({
      data: {
        toId: toUser.id,
        fromId: req.user.id,
        message: req.body.message,
      },
    });
    return res.status(200).json({ success: true });
  } catch (e) {
    console.error(`Error occurred sending message ${e}`);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.getReceivedMessages = async (req, res) => {
  try {
    const messages = await prisma.messages.findMany({
      where: {
        toId: req.user.id,
      },
      select: {
        from: {
          select: {
            username: true,
          },
        },
        id: true,
      },
    });

    return res.status(200).json({ success: true, messages });
  } catch (e) {
    console.error(`Error getting messages ${e}`);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
exports.getUser = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.body.userId,
      },
    });
    return res.status(200).json({ success: true, user });
  } catch (err) {
    console.error(`Error finding user ${err}`);
    return res
      .status(500)
      .json({ success: false, message: "Error getting user" });
  }
};
exports.getMessage = async (req, res) => {
  try {
    const messageId = parseInt(req.params.id);
    if (isNaN(messageId)) {
      return res
        .status(400)
        .json({ message: "Message ID must be a number", success: false });
    }
    const messageFound = await prisma.messages.findUnique({
      where: {
        toId: req.user.id,
        id: messageId,
      },
    });
    return res.status(200).json({ success: true, messageFound });
  } catch (e) {
    console.error(`Error getting message ${e}`);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.authenticateMessage = async (req, res) => {
  try {
    const messageId = parseInt(req.params.id);

    if (!messageId || isNaN(messageId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid message format" });
    }
    const messageToUser = await prisma.messages.findFirst({
      where: {
        AND: [{ toId: req.user.id }, { id: messageId }],
      },
      include: {
        from: {
          select: {
            username: true,
          },
        },
      },
    });
    if (!messageToUser) {
      return res
        .status(400)
        .json({ success: false, message: "No message found" });
    }
    return res.status(200).json({ messageToUser, success: true });
  } catch (err) {
    console.error(`Error authenticating message ${err}`);
    return res.status(500).json({ success: false, message: "Network error" });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const messageId = req.body.id;

    if (!messageId) {
      return res
        .status(400)
        .json({ success: false, message: "Message is invalid" });
    }
    const checkMessage = await prisma.messages.findFirst({
      where: {
        AND: [{ toId: req.user.id }, { id: messageId }],
      },
    });
    if (!checkMessage) {
      return res.status(400).json({
        success: false,
        message: "Error deleting message no message found",
      });
    }
    const message = await prisma.messages.delete({
      where: {
        id: messageId,
      },
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(`Error deleting message ${err}`);
    return res
      .status(500)
      .json({ success: false, message: "Error deleting message" });
  }
};
