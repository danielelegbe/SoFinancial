/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Forum` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "avatar" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Forum_name_key" ON "Forum"("name");
