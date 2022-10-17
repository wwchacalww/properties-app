-- CreateTable
CREATE TABLE `properties` (
    `id` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `room` VARCHAR(191) NOT NULL,
    `labeled` BOOLEAN NOT NULL,
    `status` BOOLEAN NOT NULL,
    `page` INTEGER NOT NULL,
    `line` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
