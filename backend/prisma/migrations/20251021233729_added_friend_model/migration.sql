-- CreateTable
CREATE TABLE "friend" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "friendId" TEXT NOT NULL,

    CONSTRAINT "friend_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "friend" ADD CONSTRAINT "friend_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friend" ADD CONSTRAINT "friend_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
