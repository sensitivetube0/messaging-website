const prisma = require("./lib/prisma");
async function deleteEverything() {
  const refreshTokenDeletion = await prisma.refreshToken.deleteMany();
  console.log(`refresh Tokens deleted ${refreshTokenDeletion.count}`);
  const friendsDeletion = await prisma.friend.deleteMany();
  console.log(`Friends deleted ${friendsDeletion.count}`);
  const messages = await prisma.messages.deleteMany();
  console.log(`Messages deleted ${messages.count}`);
  const userDeletion = await prisma.user.deleteMany();
  console.log(`User deleted ${userDeletion.count}`);

  console.log("FINISHED DELETION");
}

deleteEverything();
