const prisma = require("../lib/prisma");

exports.getFriends = async (req, res) => {
  try {
    const friendsObj = await prisma.friend.findMany({
      where: {
        OR: [{ userId: req.user.id }, { friendId: req.user.id }],
      },
      select: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        friend: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
    const friends = friendsObj.map((f) => {
      if (f.user.username === req.user.username) {
        return f.friend.username;
      }
      if (f.friend.username === req.user.username) {
        return f.user.username;
      }
      return;
    });
    res.status(200).json({ success: true, friends, userId: req.user.id });
  } catch (e) {
    console.error(`Error getting friends ${e}`);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.addFriend = async (req, res) => {
  console.log("hello there");
  if (req.user.username === req.body.friendsUsername) {
    return res.status(400).json({ success: false, message: "Nice try" });
  }
  try {
    const { friendsUsername } = req.body;
    if (!friendsUsername) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a username" });
    }
    const newFriend = await prisma.user.findUnique({
      where: {
        username: friendsUsername,
      },
    });
    if (!newFriend) {
      return res
        .status(400)
        .json({ success: false, message: "No user found with username" });
    }
    const alreadyAdded = await prisma.friend.findFirst({
      where: {
        OR: [
          { friendId: newFriend.id, userId: req.user.id },
          { friendId: req.user.id, userId: newFriend.id },
        ],
      },
    });
    if (alreadyAdded) {
      return res.status(400).json({ success: false, message: "Already added" });
    }
    await prisma.friend.create({
      data: {
        friendId: newFriend.id,
        userId: req.user.id,
      },
    });
    return res.status(200).json({ success: true });
  } catch (e) {
    console.error(`Error adding new friend ${e}`);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
