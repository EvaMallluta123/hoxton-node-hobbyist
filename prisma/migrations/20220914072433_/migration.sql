/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Hobby` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[image]` on the table `Hobby` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[active]` on the table `Hobby` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[image]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Hobby_name_key" ON "Hobby"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Hobby_image_key" ON "Hobby"("image");

-- CreateIndex
CREATE UNIQUE INDEX "Hobby_active_key" ON "Hobby"("active");

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_image_key" ON "User"("image");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
