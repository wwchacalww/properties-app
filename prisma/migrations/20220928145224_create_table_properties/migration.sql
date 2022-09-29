-- CreateTable
CREATE TABLE "properties" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "room" TEXT NOT NULL,
    "labeled" BOOLEAN NOT NULL,
    "status" BOOLEAN NOT NULL,
    "page" INTEGER NOT NULL,
    "line" INTEGER NOT NULL
);
