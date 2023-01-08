/*
  Warnings:

  - You are about to alter the column `phone` on the `tbl_user` table. The data in that column could be lost. The data in that column will be cast from `Int` to `MediumInt`.

*/
-- AlterTable
ALTER TABLE `tbl_user` MODIFY `phone` MEDIUMINT NOT NULL;
