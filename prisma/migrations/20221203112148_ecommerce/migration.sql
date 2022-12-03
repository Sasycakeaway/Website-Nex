/*
  Warnings:

  - Added the required column `Spedizione` to the `Ordini` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Ordini` ADD COLUMN `Spedizione` BOOLEAN NOT NULL;
