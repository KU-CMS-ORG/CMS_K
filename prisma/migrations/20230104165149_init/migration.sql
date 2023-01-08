/*
  Warnings:

  - You are about to drop the column `userID` on the `tblcrendentials` table. All the data in the column will be lost.
  - You are about to drop the column `userID` on the `tblpayment` table. All the data in the column will be lost.
  - You are about to drop the column `userID` on the `tbltranhistory` table. All the data in the column will be lost.
  - You are about to drop the `tbl_food` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbl_user` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `tblCrendentials` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `tblPayment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `tblTranhistory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `tblcrendentials` DROP FOREIGN KEY `tblCrendentials_userID_fkey`;

-- DropForeignKey
ALTER TABLE `tblmenu` DROP FOREIGN KEY `tblMenu_foodId_fkey`;

-- DropForeignKey
ALTER TABLE `tblpayment` DROP FOREIGN KEY `tblPayment_userID_fkey`;

-- DropForeignKey
ALTER TABLE `tbltranhistory` DROP FOREIGN KEY `tblTranhistory_foodId_fkey`;

-- DropForeignKey
ALTER TABLE `tbltranhistory` DROP FOREIGN KEY `tblTranhistory_userID_fkey`;

-- AlterTable
ALTER TABLE `tblcrendentials` DROP COLUMN `userID`,
    ADD COLUMN `userId` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `tblpayment` DROP COLUMN `userID`,
    ADD COLUMN `userId` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `tbltranhistory` DROP COLUMN `userID`,
    ADD COLUMN `userId` VARCHAR(255) NOT NULL;

-- DropTable
DROP TABLE `tbl_food`;

-- DropTable
DROP TABLE `tbl_user`;

-- CreateTable
CREATE TABLE `tblUser` (
    `userId` VARCHAR(255) NOT NULL,
    `fName` VARCHAR(255) NOT NULL,
    `mName` VARCHAR(255) NOT NULL,
    `lName` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(255) NOT NULL,
    `countryCode` INTEGER NOT NULL,
    `role` VARCHAR(255) NOT NULL,
    `faculty` VARCHAR(255) NOT NULL,
    `userStatus` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `tblUser_userId_key`(`userId`),
    UNIQUE INDEX `tblUser_email_key`(`email`),
    UNIQUE INDEX `tblUser_phone_key`(`phone`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblFood` (
    `foodId` INTEGER NOT NULL AUTO_INCREMENT,
    `foodName` VARCHAR(255) NOT NULL,
    `foodCategory` VARCHAR(255) NOT NULL,
    `price` DECIMAL(65, 30) NOT NULL,
    `desc` VARCHAR(255) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`foodId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tblCrendentials` ADD CONSTRAINT `tblCrendentials_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `tblUser`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblMenu` ADD CONSTRAINT `tblMenu_foodId_fkey` FOREIGN KEY (`foodId`) REFERENCES `tblFood`(`foodId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblTranhistory` ADD CONSTRAINT `tblTranhistory_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `tblUser`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblTranhistory` ADD CONSTRAINT `tblTranhistory_foodId_fkey` FOREIGN KEY (`foodId`) REFERENCES `tblFood`(`foodId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblPayment` ADD CONSTRAINT `tblPayment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `tblUser`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
