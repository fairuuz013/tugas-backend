/*
  Warnings:

  - You are about to drop the column `daleteAt` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "daleteAt",
ADD COLUMN     "deletedAt" TIMESTAMP(3);
