-- CreateTable
CREATE TABLE "ClientUser" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,

    CONSTRAINT "ClientUser_pkey" PRIMARY KEY ("id")
);
