/*
  Warnings:

  - You are about to alter the column `Cart` on the `Ordini` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.

*/
-- AlterTable
ALTER TABLE `Ordini` MODIFY `Cart` JSON NOT NULL;
