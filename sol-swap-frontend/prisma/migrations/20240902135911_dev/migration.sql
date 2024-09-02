/*
  Warnings:

  - You are about to drop the column `inrWalletId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `INRWallet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "INRWallet" DROP CONSTRAINT "INRWallet_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "inrWalletId";

-- DropTable
DROP TABLE "INRWallet";
