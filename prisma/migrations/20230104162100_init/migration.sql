/*
  Warnings:

  - The primary key for the `tbl_food` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `tbl_food` table. All the data in the column will be lost.
  - You are about to drop the column `food_category` on the `tbl_food` table. All the data in the column will be lost.
  - You are about to drop the column `food_id` on the `tbl_food` table. All the data in the column will be lost.
  - You are about to drop the column `food_name` on the `tbl_food` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `tbl_food` table. All the data in the column will be lost.
  - The primary key for the `tbl_user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `country_code` on the `tbl_user` table. All the data in the column will be lost.
  - You are about to drop the column `f_name` on the `tbl_user` table. All the data in the column will be lost.
  - You are about to drop the column `l_name` on the `tbl_user` table. All the data in the column will be lost.
  - You are about to drop the column `m_name` on the `tbl_user` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `tbl_user` table. All the data in the column will be lost.
  - You are about to drop the column `user_status` on the `tbl_user` table. All the data in the column will be lost.
  - You are about to drop the `tbl_crendentials` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbl_menu` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbl_payment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbl_tran_history` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userID]` on the table `tbl_user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `foodCategory` to the `tbl_food` table without a default value. This is not possible if the table is not empty.
  - Added the required column `foodId` to the `tbl_food` table without a default value. This is not possible if the table is not empty.
  - Added the required column `foodName` to the `tbl_food` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `tbl_food` table without a default value. This is not possible if the table is not empty.
  - Added the required column `countryCode` to the `tbl_user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fName` to the `tbl_user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lName` to the `tbl_user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mName` to the `tbl_user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userID` to the `tbl_user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userStatus` to the `tbl_user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `tbl_crendentials` DROP FOREIGN KEY `tbl_crendentials_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_menu` DROP FOREIGN KEY `tbl_menu_food_id_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_payment` DROP FOREIGN KEY `tbl_payment_tran_id_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_payment` DROP FOREIGN KEY `tbl_payment_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_tran_history` DROP FOREIGN KEY `tbl_tran_history_food_id_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_tran_history` DROP FOREIGN KEY `tbl_tran_history_user_id_fkey`;

-- DropIndex
DROP INDEX `tbl_user_user_id_key` ON `tbl_user`;

-- AlterTable
ALTER TABLE `tbl_food` DROP PRIMARY KEY,
    DROP COLUMN `created_at`,
    DROP COLUMN `food_category`,
    DROP COLUMN `food_id`,
    DROP COLUMN `food_name`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `foodCategory` VARCHAR(255) NOT NULL,
    ADD COLUMN `foodId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `foodName` VARCHAR(255) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD PRIMARY KEY (`foodId`);

-- AlterTable
ALTER TABLE `tbl_user` DROP PRIMARY KEY,
    DROP COLUMN `country_code`,
    DROP COLUMN `f_name`,
    DROP COLUMN `l_name`,
    DROP COLUMN `m_name`,
    DROP COLUMN `user_id`,
    DROP COLUMN `user_status`,
    ADD COLUMN `countryCode` INTEGER NOT NULL,
    ADD COLUMN `fName` VARCHAR(255) NOT NULL,
    ADD COLUMN `lName` VARCHAR(255) NOT NULL,
    ADD COLUMN `mName` VARCHAR(255) NOT NULL,
    ADD COLUMN `userID` VARCHAR(255) NOT NULL,
    ADD COLUMN `userStatus` VARCHAR(255) NOT NULL,
    ADD PRIMARY KEY (`userID`);

-- DropTable
DROP TABLE `tbl_crendentials`;

-- DropTable
DROP TABLE `tbl_menu`;

-- DropTable
DROP TABLE `tbl_payment`;

-- DropTable
DROP TABLE `tbl_tran_history`;

-- CreateTable
CREATE TABLE `tblCrendentials` (
    `credId` INTEGER NOT NULL AUTO_INCREMENT,
    `userID` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phone` INTEGER NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `tblCrendentials_email_key`(`email`),
    UNIQUE INDEX `tblCrendentials_phone_key`(`phone`),
    PRIMARY KEY (`credId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblMenu` (
    `menuId` INTEGER NOT NULL AUTO_INCREMENT,
    `foodId` INTEGER NOT NULL,
    `isAvailable` BOOLEAN NOT NULL,
    `createdAtday` ENUM('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`menuId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblTranhistory` (
    `tranId` INTEGER NOT NULL AUTO_INCREMENT,
    `userID` VARCHAR(255) NOT NULL,
    `foodId` INTEGER NOT NULL,
    `tranDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `checkoutPrice` DECIMAL(65, 30) NOT NULL,
    `tranDesc` VARCHAR(255) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`tranId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblPayment` (
    `paymentId` INTEGER NOT NULL AUTO_INCREMENT,
    `userID` VARCHAR(255) NOT NULL,
    `tranId` INTEGER NOT NULL,
    `tranDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `paymentMethod` VARCHAR(255) NOT NULL,
    `paidStatus` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `tblPayment_tranId_key`(`tranId`),
    PRIMARY KEY (`paymentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `tbl_user_userID_key` ON `tbl_user`(`userID`);

-- AddForeignKey
ALTER TABLE `tblCrendentials` ADD CONSTRAINT `tblCrendentials_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `tbl_user`(`userID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblMenu` ADD CONSTRAINT `tblMenu_foodId_fkey` FOREIGN KEY (`foodId`) REFERENCES `tbl_food`(`foodId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblTranhistory` ADD CONSTRAINT `tblTranhistory_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `tbl_user`(`userID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblTranhistory` ADD CONSTRAINT `tblTranhistory_foodId_fkey` FOREIGN KEY (`foodId`) REFERENCES `tbl_food`(`foodId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblPayment` ADD CONSTRAINT `tblPayment_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `tbl_user`(`userID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblPayment` ADD CONSTRAINT `tblPayment_tranId_fkey` FOREIGN KEY (`tranId`) REFERENCES `tblTranhistory`(`tranId`) ON DELETE RESTRICT ON UPDATE CASCADE;
