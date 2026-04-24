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
(1, 'Hopper 1', 'Seorang anak yang ingin melindungi rumah hewan', 'https://www.disney.id/movies/hoppers', 'https://upload.wikimedia.org/wikipedia/id/thumb/6/6c/Hoppers_film_poster.jpg/250px-Hoppers_film_poster.jpg', 2),
(2, 'Spider-Man: Brand New Day', '\'Spider-Man: Brand New Day\', starring Tom Holland and directed by Destin Daniel Cretton, swings into theatres on July 31, 2026', 'https://youtu.be/8TZMtslA3UY?si=75-cFPYZGz8kQjOW', NULL, 1),
(5, 'Cars 3', 'Cars 3 adalah sebuah film komedi animasi komputer 3D Amerika yang diproduksi oleh Pixar Animation Studios dan dirilis oleh Walt Disney Pictures. Film tersebut merupakan sebuah sekuel dari Cars (2006) dan Cars 2 (2011), dan installment ketiga dari waralaba Cars dan dirilis di Amerika Serikat pada 16 Juni 2017 dan di Indonesia pada tanggal 16 Agustus 2017', 'https://youtu.be/2LeOH9AGJQM?si=j0cDNdb_lksI3lXi', 'https://m.media-amazon.com/images/S/pv-target-images/28be214173680f89b107908bae047d6787d8f884e670ca6af93886b1a360dfa1.jpg', 2),
(7, 'Cars 1', 'Cars 3 adalah sebuah film komedi animasi komputer 3D Amerika yang diproduksi oleh Pixar Animation Studios dan dirilis oleh Walt Disney Pictures. Film tersebut merupakan sebuah sekuel dari Cars (2006) dan Cars 2 (2011), dan installment ketiga dari waralaba Cars dan dirilis di Amerika Serikat pada 16 Juni 2017 dan di Indonesia pada tanggal 16 Agustus 2017', 'https://youtu.be/2LeOH9AGJQM?si=j0cDNdb_lksI3lXi', 'https://m.media-amazon.com/images/S/pv-target-images/28be214173680f89b107908bae047d6787d8f884e670ca6af93886b1a360dfa1.jpg', 2),
(8, 'Cars 3', 'Cars 3 adalah sebuah film komedi animasi komputer 3D Amerika yang diproduksi oleh Pixar Animation Studios dan dirilis oleh Walt Disney Pictures. Film tersebut merupakan sebuah sekuel dari Cars (2006) dan Cars 2 (2011), dan installment ketiga dari waralaba Cars dan dirilis di Amerika Serikat pada 16 Juni 2017 dan di Indonesia pada tanggal 16 Agustus 2017', 'https://youtu.be/2LeOH9AGJQM?si=j0cDNdb_lksI3lXi', 'https://m.media-amazon.com/images/S/pv-target-images/28be214173680f89b107908bae047d6787d8f884e670ca6af93886b1a360dfa1.jpg', 2);

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
