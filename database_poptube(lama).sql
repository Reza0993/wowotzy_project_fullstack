-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 24 Apr 2026 pada 09.32
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `poptube_db`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `comments`
--

CREATE TABLE `comments` (
  `id_comment` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_film` int(11) NOT NULL,
  `komentar` text NOT NULL,
  `tanggal` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `comments`
--

INSERT INTO `comments` (`id_comment`, `id_user`, `id_film`, `komentar`, `tanggal`) VALUES
(1, 1, 1, 'lucu', '2026-04-22 20:59:23');

-- --------------------------------------------------------

--
-- Struktur dari tabel `films`
--

CREATE TABLE `films` (
  `id_film` int(11) NOT NULL,
  `judul` varchar(100) NOT NULL,
  `deskripsi` text NOT NULL,
  `video_url` varchar(255) NOT NULL,
  `foto_url` varchar(255) DEFAULT NULL,
  `id_admin` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `films`
--

INSERT INTO `films` (`id_film`, `judul`, `deskripsi`, `video_url`, `foto_url`, `id_admin`) VALUES
(1, 'Hoppers', 'Seorang anak perempuan yang ingin melindungi hewan peliharaan kesayangannya menemukan cara luar biasa untuk mentransfer pikirannya ke dalam robot hewan robotik.', 'https://youtu.be/39-Z10yK6Zk', 'https://image.tmdb.org/t/p/w500/y69sWw43lK1s49y083L275yO8hG.jpg', 2),
(2, 'Spider-Man: Brand New Day', '\'Spider-Man: Brand New Day\', dibintangi oleh Tom Holland dan disutradarai oleh Destin Daniel Cretton, berayun megah di bioskop kesayangan Anda.', 'https://youtu.be/R6MlUcmO1Mc', 'https://image.tmdb.org/t/p/w500/uKVwA4sQ5N95B14k51wLnd64IP1.jpg', 1),
(5, 'Cars 3', 'Lightning McQueen tiba-tiba terdorong keluar dari olahraga yang dicintainya oleh generasi pembalap baru yang sangat cepat. Untuk kembali beraksi, dia membutuhkan bantuan teknisi balap muda yang bersemangat.', 'https://youtu.be/aqz-KE-wJNw', 'https://image.tmdb.org/t/p/w500/a1J65VO945IQ69lO24d2tIAi4go.jpg', 2),
(7, 'Cars', 'Pembalap pemula yang ambisius, Lightning McQueen, tersesat di kota tua terpencil bernama Radiator Springs, di mana dia akhirnya menemukan arti sejati dari persahabatan, ketulusan, dan cinta.', 'https://youtu.be/SkVqJ1SGeL0', 'https://image.tmdb.org/t/p/w500/qi6Q07Gh11er476oBD4glOMclUi.jpg', 2),
(8, 'Coco', 'Miguel yang bermimpi menjadi musisi legendaris terpaksa bertualang ke Negeri Orang Mati yang menakjubkan dan penuh warna untuk mengungkap misteri sejarah leluhur keluarganya.', 'https://youtu.be/d193tV0zY9k', 'https://image.tmdb.org/t/p/w500/gGE2eBZ1wlh42IM6HYvQ3jP25CM.jpg', 2),
(9, 'Avatar: The Way of Water', 'Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na\'vi race to protect their home.', 'https://youtu.be/eRsGy9On1z0', 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60QsSmeqb61Se4.jpg', 1),
(10, 'Interstellar', 'When Earth becomes uninhabitable, a team of explorers travels through a wormhole in space in an attempt to ensure humanity\'s survival.', 'https://youtu.be/Y-g0y5gdV34', 'https://image.tmdb.org/t/p/w500/gEU2QpI6EIt7t8S3d8n9nE8Yj4q.jpg', 1),
(11, 'Your Name', 'Two strangers find themselves linked in a bizarre way. When a connection is formed, will distance be the only thing to keep them apart?', 'https://youtu.be/3KR8_M-G9pA', 'https://image.tmdb.org/t/p/w500/q719jXXEz3Yt3Ff8zK5P7p1U4yP.jpg', 1),
(12, 'Demon Slayer: Mugen Train', 'After a string of mysterious disappearance aboard a train, the Demon Slayer Corps sends Tanjiro, Nezuko, Zenitsu, and Inosuke to assist the Flame Hashira Kyojuro Rengoku in defeating a powerful demon.', 'https://youtu.be/mN0zPOpEPis', 'https://image.tmdb.org/t/p/w500/h8Rb9qYdJpP9oW32QJ1E256j617.jpg', 1),
(13, 'Suzume', 'A modern action-adventure road story where a 17-year-old girl named Suzume helps a mysterious young man close mystical doors causing disasters all across Japan.', 'https://youtu.be/F7nQ0VUAOXg', 'https://image.tmdb.org/t/p/w500/kC599gcozzo592et7sWz75mJ7G6.jpg', 1),
(14, 'John Wick: Chapter 4', 'John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe.', 'https://youtu.be/qEVUardgAvo', 'https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg', 1),
(15, 'Joker', 'During the 1980s, a failed stand-up comedian Arthur Fleck driven insane turns to a life of crime and chaos in Gotham City while becoming an infamous psychopathic crime figure.', 'https://youtu.be/zAGVQLHvyOY', 'https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg', 1),
(16, 'Spider-Man: Into the Spider-Verse', 'Teen Miles Morales becomes the Spider-Man of his universe, and must join with five spider-powered individuals from other dimensions to stop a threat for all realities.', 'https://youtu.be/g4HbzQFUp3Y', 'https://image.tmdb.org/t/p/w500/ldFmOcSGW8eZFSjIHjtj36t4gSY.jpg', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `history`
--

CREATE TABLE `history` (
  `id_history` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_film` int(11) NOT NULL,
  `waktu_nonton` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `history`
--

INSERT INTO `history` (`id_history`, `id_user`, `id_film`, `waktu_nonton`) VALUES
(1, 1, 1, '2026-04-22 21:11:34');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(20) DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id_user`, `username`, `email`, `password`, `role`) VALUES
(1, 'Mamat', 'mamatganteng@gmail.com', '1234', 'user'),
(2, 'ujang', 'ujanggarut@gmail.com', '1234', 'admin');

-- --------------------------------------------------------

--
-- Struktur dari tabel `watchlist`
--

CREATE TABLE `watchlist` (
  `id_watchlist` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_film` int(11) NOT NULL,
  `tanggal_tambah` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `watchlist`
--

INSERT INTO `watchlist` (`id_watchlist`, `id_user`, `id_film`, `tanggal_tambah`) VALUES
(1, 1, 1, '2026-04-15 17:39:54');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id_comment`),
  ADD KEY `fk_comments_user` (`id_user`),
  ADD KEY `fk_comments_film` (`id_film`);

--
-- Indeks untuk tabel `films`
--
ALTER TABLE `films`
  ADD PRIMARY KEY (`id_film`),
  ADD KEY `id_admin` (`id_admin`);

--
-- Indeks untuk tabel `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`id_history`),
  ADD KEY `fk_history_user` (`id_user`),
  ADD KEY `fk_history_film` (`id_film`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`);

--
-- Indeks untuk tabel `watchlist`
--
ALTER TABLE `watchlist`
  ADD PRIMARY KEY (`id_watchlist`),
  ADD KEY `fk_watchlist_user` (`id_user`),
  ADD KEY `fk_watchlist_film` (`id_film`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `comments`
--
ALTER TABLE `comments`
  MODIFY `id_comment` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `films`
--
ALTER TABLE `films`
  MODIFY `id_film` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `history`
--
ALTER TABLE `history`
  MODIFY `id_history` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `watchlist`
--
ALTER TABLE `watchlist`
  MODIFY `id_watchlist` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `fk_comments_film` FOREIGN KEY (`id_film`) REFERENCES `films` (`id_film`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_comments_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `films`
--
ALTER TABLE `films`
  ADD CONSTRAINT `films_ibfk_1` FOREIGN KEY (`id_admin`) REFERENCES `users` (`id_user`);

--
-- Ketidakleluasaan untuk tabel `history`
--
ALTER TABLE `history`
  ADD CONSTRAINT `fk_history_film` FOREIGN KEY (`id_film`) REFERENCES `films` (`id_film`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_history_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `watchlist`
--
ALTER TABLE `watchlist`
  ADD CONSTRAINT `fk_watchlist_film` FOREIGN KEY (`id_film`) REFERENCES `films` (`id_film`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_watchlist_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
