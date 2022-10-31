-- CreateTable
CREATE TABLE `Utente` (
    `PK_Email` VARCHAR(191) NOT NULL,
    `Password` VARCHAR(191) NOT NULL,
    `Timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `News` BOOLEAN NOT NULL,
    `CF` VARCHAR(191) NOT NULL,
    `Nascita` VARCHAR(191) NOT NULL,
    `Telefono` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`PK_Email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ordini` (
    `FK_Email` VARCHAR(191) NOT NULL,
    `PK_Id` VARCHAR(191) NOT NULL,
    `Totale` INTEGER NOT NULL,
    `Cart` VARCHAR(191) NOT NULL,
    `Timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Nome` VARCHAR(191) NOT NULL,
    `Cognome` VARCHAR(191) NOT NULL,
    `Indirizzo` VARCHAR(191) NOT NULL,
    `Cap` VARCHAR(191) NOT NULL,
    `Domicilio` BOOLEAN NOT NULL,

    PRIMARY KEY (`PK_Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Newsletter` (
    `PK_Token` VARCHAR(191) NOT NULL,
    `FK_Email` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Newsletter_PK_Token_key`(`PK_Token`),
    INDEX `Newsletter_FK_Email_fkey`(`FK_Email`),
    PRIMARY KEY (`PK_Token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RecoveryPassword` (
    `UUID` VARCHAR(191) NOT NULL,
    `FK_Email` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `RecoveryPassword_UUID_key`(`UUID`),
    INDEX `RecoveryPassword_FK_Email_fkey`(`FK_Email`),
    PRIMARY KEY (`UUID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Ordini` ADD CONSTRAINT `Ordini_FK_Email_fkey` FOREIGN KEY (`FK_Email`) REFERENCES `Utente`(`PK_Email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Newsletter` ADD CONSTRAINT `Newsletter_FK_Email_fkey` FOREIGN KEY (`FK_Email`) REFERENCES `Utente`(`PK_Email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecoveryPassword` ADD CONSTRAINT `RecoveryPassword_FK_Email_fkey` FOREIGN KEY (`FK_Email`) REFERENCES `Utente`(`PK_Email`) ON DELETE RESTRICT ON UPDATE CASCADE;
