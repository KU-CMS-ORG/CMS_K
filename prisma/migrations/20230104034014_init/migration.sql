-- CreateTable
CREATE TABLE `tbl_user` (
    `user_id` VARCHAR(255) NOT NULL,
    `f_name` VARCHAR(255) NOT NULL,
    `m_name` VARCHAR(255) NOT NULL,
    `l_name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `phone` INTEGER NOT NULL,
    `country_code` INTEGER NOT NULL,
    `role` VARCHAR(255) NOT NULL,
    `faculty` VARCHAR(255) NOT NULL,
    `user_status` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `tbl_user_user_id_key`(`user_id`),
    UNIQUE INDEX `tbl_user_email_key`(`email`),
    UNIQUE INDEX `tbl_user_phone_key`(`phone`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_crendentials` (
    `cred_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phone` INTEGER NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `tbl_crendentials_email_key`(`email`),
    UNIQUE INDEX `tbl_crendentials_phone_key`(`phone`),
    PRIMARY KEY (`cred_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_food` (
    `food_id` INTEGER NOT NULL AUTO_INCREMENT,
    `food_name` VARCHAR(255) NOT NULL,
    `food_category` VARCHAR(255) NOT NULL,
    `price` DECIMAL(65, 30) NOT NULL,
    `desc` VARCHAR(255) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`food_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_menu` (
    `menu_id` INTEGER NOT NULL AUTO_INCREMENT,
    `food_id` INTEGER NOT NULL,
    `is_available` BOOLEAN NOT NULL,
    `created_at_day` ENUM('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`menu_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_tran_history` (
    `tran_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(255) NOT NULL,
    `food_id` INTEGER NOT NULL,
    `tran_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `checkout_price` DECIMAL(65, 30) NOT NULL,
    `tran_desc` VARCHAR(255) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`tran_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_payment` (
    `payment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(255) NOT NULL,
    `tran_id` INTEGER NOT NULL,
    `tran_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `payment_method` VARCHAR(255) NOT NULL,
    `paid_status` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `tbl_payment_tran_id_key`(`tran_id`),
    PRIMARY KEY (`payment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_crendentials` ADD CONSTRAINT `tbl_crendentials_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `tbl_user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_menu` ADD CONSTRAINT `tbl_menu_food_id_fkey` FOREIGN KEY (`food_id`) REFERENCES `tbl_food`(`food_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_tran_history` ADD CONSTRAINT `tbl_tran_history_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `tbl_user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_tran_history` ADD CONSTRAINT `tbl_tran_history_food_id_fkey` FOREIGN KEY (`food_id`) REFERENCES `tbl_food`(`food_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_payment` ADD CONSTRAINT `tbl_payment_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `tbl_user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_payment` ADD CONSTRAINT `tbl_payment_tran_id_fkey` FOREIGN KEY (`tran_id`) REFERENCES `tbl_tran_history`(`tran_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
