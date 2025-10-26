/*
  Warnings:

  - You are about to drop the column `receivedId` on the `messages` table. All the data in the column will be lost.
  - Added the required column `fromId` to the `messages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."messages" DROP CONSTRAINT "messages_receivedId_fkey";

-- AlterTable
ALTER TABLE "messages" DROP COLUMN "receivedId",
ADD COLUMN     "fromId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
