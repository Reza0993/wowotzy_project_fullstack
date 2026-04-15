-- MySQL Script diperbaiki untuk Sprint 4 PopTube
-- Penghapusan spasi pada nama tabel untuk memudahkan query di Express.js

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `users` ;

CREATE TABLE IF NOT EXISTS `users` (
  `id_user` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `role` VARCHAR(20) DEFAULT 'user',
  PRIMARY KEY (`id_user`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `films`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `films` ;

CREATE TABLE IF NOT EXISTS `films` (
  `id_film` INT NOT NULL AUTO_INCREMENT,
  `judul` VARCHAR(100) NOT NULL,
  `deskripsi` TEXT NOT NULL,
  `video_url` VARCHAR(255) NOT NULL,
  `id_admin` INT NOT NULL,
  PRIMARY KEY (`id_film`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `watchlist`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `watchlist` ;

CREATE TABLE IF NOT EXISTS `watchlist` (
  `id_watchlist` INT NOT NULL AUTO_INCREMENT,
  `id_user` INT NOT NULL,
  `id_film` INT NOT NULL,
  `tanggal_tambah` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_watchlist`),
  CONSTRAINT `fk_watchlist_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE,
  CONSTRAINT `fk_watchlist_film` FOREIGN KEY (`id_film`) REFERENCES `films` (`id_film`) ON DELETE CASCADE)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `comments`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `comments` ;

CREATE TABLE IF NOT EXISTS `comments` (
  `id_comment` INT NOT NULL AUTO_INCREMENT,
  `id_user` INT NOT NULL,
  `id_film` INT NOT NULL,
  `komentar` TEXT NOT NULL,
  `tanggal` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_comment`),
  CONSTRAINT `fk_comments_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE,
  CONSTRAINT `fk_comments_film` FOREIGN KEY (`id_film`) REFERENCES `films` (`id_film`) ON DELETE CASCADE)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `history`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `history` ;

CREATE TABLE IF NOT EXISTS `history` (
  `id_history` INT NOT NULL AUTO_INCREMENT,
  `id_user` INT NOT NULL,
  `id_film` INT NOT NULL,
  `waktu_nonton` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_history`),
  CONSTRAINT `fk_history_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE,
  CONSTRAINT `fk_history_film` FOREIGN KEY (`id_film`) REFERENCES `films` (`id_film`) ON DELETE CASCADE)
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;