/*
  Warnings:

  - Made the column `name` on table `list` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `list` MODIFY `name` VARCHAR(191) NOT NULL;
