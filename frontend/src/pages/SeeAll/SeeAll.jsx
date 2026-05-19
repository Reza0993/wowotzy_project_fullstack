import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import API from "../../services/api";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import MovieCard from "../../components/Moviecard/Moviecard";
import BottomNav from "../../components/BottomNav/BottomNav";
import "./SeeAll.css";

const MOCK_MOVIES = [
  {
    id_film: 201,
    judul: "Inception",
    deskripsi: "Seorang pencuri handal mencuri rahasia perusahaan berharga melalui teknologi memanipulasi mimpi.",
    video_url: "https://youtu.be/YoHD9XEInc0",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg",
    category: "Trending Now"
  },
  {
    id_film: 202,
    judul: "The Dark Knight",
    deskripsi: "Batman berhadapan dengan The Joker, dalang kriminal psikopatis sadis yang ingin mengacaukan Gotham.",
    video_url: "https://youtu.be/EXeTwQWrcwY",
    foto_url: "https://upload.wikimedia.org/wikipedia/id/8/8a/Dark_Knight.jpg",
    category: "Trending Now"
  },
  {
    id_film: 203,
    judul: "Oppenheimer",
    deskripsi: "Kisah fisikawan Amerika J. Robert Oppenheimer memimpin Proyek Manhattan demi menciptakan bom atom pertama.",
    video_url: "https://youtu.be/uYPbbksJxIg",
    foto_url: "https://upload.wikimedia.org/wikipedia/id/4/4a/Oppenheimer_%28film%29.jpg",
    category: "Popular Movies"
  },
  {
    id_film: 204,
    judul: "Spirited Away",
    deskripsi: "Petualangan fantastis Chihiro, gadis kecil berumur 10 tahun yang tersesat di dunia roh misterius.",
    video_url: "https://youtu.be/ByXuk9QqQkk",
    foto_url: "https://upload.wikimedia.org/wikipedia/ms/3/30/Spirited_Away_poster.JPG",
    category: "Popular Movies"
  },
  {
    id_film: 205,
    judul: "Dune: Part Two",
    deskripsi: "Paul Atreides bersekutu dengan Chani dan Fremen untuk membalas dendam kepada para pengkhianat keluarganya.",
    video_url: "https://youtu.be/Way9Dexny3w",
    foto_url: "https://upload.wikimedia.org/wikipedia/id/4/4d/Poster_film_dune_part_two.jpg",
    category: "Action Thriller"
  },
  {
    id_film: 206,
    judul: "Avengers: Endgame",
    deskripsi: "Pahlawan super Avengers yang tersisa harus bersatu kembali demi membatalkan jentikan jari Thanos.",
    video_url: "https://youtu.be/TcMBFSGVi1c",
    foto_url: "https://upload.wikimedia.org/wikipedia/id/0/0d/Avengers_Endgame_poster.jpg",
    category: "Action Thriller"
  },
  {
    id_film: 207,
    judul: "The Matrix",
    deskripsi: "Seorang hacker komputer mempelajari sifat asli dari realitasnya dan perannya dalam perang melawan penguasa.",
    video_url: "https://youtu.be/vKQi3bBA1y8",
    foto_url: "https://upload.wikimedia.org/wikipedia/id/c/c1/The_Matrix_Poster.jpg",
    category: "Action Thriller"
  },
  {
    id_film: 208,
    judul: "Forrest Gump",
    deskripsi: "Kisah hidup luar biasa seorang pria dengan IQ rendah yang menyaksikan berbagai peristiwa penting bersejarah.",
    video_url: "https://youtu.be/bLvqoHBptjg",
    foto_url: "https://upload.wikimedia.org/wikipedia/id/6/67/Forrest_Gump_poster.jpg",
    category: "Popular Movies"
  },
  {
    id_film: 209,
    judul: "Pulp Fiction",
    deskripsi: "Kehidupan dua pembunuh bayaran mobster, petinju, istri gangster, dan sepasang bandit restoran terjalin.",
    video_url: "https://youtu.be/s7EdQ4FqbhY",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/3/3b/Pulp_Fiction_%281994%29_poster.jpg",
    category: "Trending Now"
  },
  {
    id_film: 210,
    judul: "The Godfather",
    deskripsi: "Keluarga mafia legendaris Corleone berjuang mempertahankan kekuasaan dinastinya di New York pasca-perang.",
    video_url: "https://youtu.be/UaVTIH8mujA",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/a/af/The_Godfather%2C_The_Game.jpg",
    category: "Popular Movies"
  },
  {
    id_film: 211,
    judul: "Parasite",
    deskripsi: "Keluarga miskin yang licik menyusup ke dalam rumah keluarga kaya raya, memicu konflik tak terduga.",
    video_url: "https://youtu.be/5xH0HfJHsaY",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/5/53/Parasite_%282019_film%29.png",
    category: "Trending Now"
  },
  {
    id_film: 212,
    judul: "Whiplash",
    deskripsi: "Seorang drummer jazz muda yang berbakat mendaftar di konservatori musik di bawah konduktor kejam.",
    video_url: "https://youtu.be/7d_jQyG8DQY",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/0/01/Whiplash_poster.jpg",
    category: "Popular Movies"
  },
  {
    id_film: 213,
    judul: "Spider-Man: Across the Spider-Verse",
    deskripsi: "Miles Morales melintasi alam semesta alternatif dan bertemu tim Spider-People penjaga stabilitas dimensi.",
    video_url: "https://youtu.be/cqGjhVJWtEg",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/b/b4/Spider-Man-_Across_the_Spider-Verse_poster.jpg",
    category: "Action Thriller"
  },
  {
    id_film: 214,
    judul: "Gladiator",
    deskripsi: "Mantan jenderal Romawi yang dikhianati berjuang sebagai gladiator demi membalas kematian keluarganya.",
    video_url: "https://youtu.be/owK1ddwRQII",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/f/fb/Gladiator_%282000_film_poster%29.png",
    category: "Action Thriller"
  },
  {
    id_film: 215,
    judul: "Titanic",
    deskripsi: "Kisah cinta tragis berlatar belakang tenggelamnya kapal pesiar termewah Titanic yang sangat megah.",
    video_url: "https://youtu.be/I7c1etV7D7g",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/1/18/Titanic_%281997_film%29_poster.png",
    category: "Popular Movies"
  },
  {
    id_film: 216,
    judul: "The Lion King",
    deskripsi: "Singa muda bernama Simba berjuang merebut kembali tahta kerajaan ayahnya dari pamannya yang kejam, Scar.",
    video_url: "https://youtu.be/7TavVZMewpY",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/3/3d/The_Lion_King_poster.jpg",
    category: "Trending Now"
  },
  {
    id_film: 217,
    judul: "Toy Story",
    deskripsi: "Kisah kehidupan rahasia para mainan yang hidup kembali ketika manusia tidak sedang melihat mereka.",
    video_url: "https://youtu.be/v-PjgYDrgOP",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/1/13/Toy_Story.jpg",
    category: "Popular Movies"
  },
  {
    id_film: 218,
    judul: "Wall-E",
    deskripsi: "Robot pembersih sampah kecil di bumi yang sepi tanpa sengaja memulai perjalanan kosmis penyelamatan manusia.",
    video_url: "https://youtu.be/CZ1CATHer1E",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/c/c2/WALL-Eposter.png",
    category: "Popular Movies"
  },
  {
    id_film: 219,
    judul: "Up",
    deskripsi: "Kakek tua Carl Fredricksen mengikat ribuan balon ke rumahnya demi mewujudkan mimpi mendiang istrinya.",
    video_url: "https://youtu.be/ORFWdXl_zJ4",
    foto_url: "https://upload.wikimedia.org/wikipedia/id/c/c5/Up_Poster.JPG",
    category: "Popular Movies"
  },
  {
    id_film: 220,
    judul: "Inside Out",
    deskripsi: "Lima emosi utama di kepala gadis Riley berjuang memandu perasaannya selama masa kepindahan keluarganya.",
    video_url: "https://youtu.be/seMwpP0yeu4",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/0/0a/Inside_Out_%282015_film%29_poster.jpg",
    category: "Trending Now"
  },
  {
    id_film: 221,
    judul: "Finding Nemo",
    deskripsi: "Pencarian epik seekor ikan badut bernama Marlin melintasi samudera demi menyelamatkan anaknya, Nemo.",
    video_url: "https://youtu.be/wZdpNgl5Ez4",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/2/29/Finding_Nemo.jpg",
    category: "Popular Movies"
  },
  {
    id_film: 222,
    judul: "The Incredibles",
    deskripsi: "Keluarga pahlawan super legendaris terpaksa menyembunyikan kekuatan mereka sebelum ancaman robot besar datang.",
    video_url: "https://youtu.be/eZbzbC9t89s",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/2/27/The_Incredibles_%282004_poster%29.jpg",
    category: "Action Thriller"
  },
  {
    id_film: 223,
    judul: "Monsters, Inc.",
    deskripsi: "Monster ramah Sulley dan asistennya Mike tidak sengaja membawa seorang anak manusia kecil masuk ke dunia monster.",
    video_url: "https://youtu.be/CG3S4Uo_b78",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/6/63/Monsters_Inc.JPG",
    category: "Popular Movies"
  },
  {
    id_film: 224,
    judul: "Shrek",
    deskripsi: "Raksasa hijau ogre ramah Shrek memulai perjalanan seru menyelamatkan putri Fiona demi mendapatkan kembali rawanya.",
    video_url: "https://youtu.be/CwXOrWv585c",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/3/39/Shrek.jpg",
    category: "Trending Now"
  },
  {
    id_film: 225,
    judul: "Kung Fu Panda",
    deskripsi: "Po, seekor panda gemuk pemalas yang gemar makan terpilih menjadi Pendekar Naga untuk membasmi Tai Lung.",
    video_url: "https://youtu.be/fGPPfZIvt_Y",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/7/76/Kungfupanda.jpg",
    category: "Trending Now"
  },
  {
    id_film: 226,
    judul: "How to Train Your Dragon",
    deskripsi: "Hiccup, pemuda viking canggung berteman dengan naga langka jenis Night Fury yang diberi nama Toothless.",
    video_url: "https://youtu.be/fGPPfZIvt_Y",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/9/99/How_to_Train_Your_Dragon_Poster.jpg",
    category: "Trending Now"
  },
  {
    id_film: 227,
    judul: "Frozen",
    deskripsi: "Anna berpetualang mencari saudarinya Elsa yang tidak sengaja membekukan seluruh kerajaan Arendelle.",
    video_url: "https://youtu.be/TbQm5AMFvRE",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/0/05/Frozen_%282013_film%29_poster.jpg",
    category: "Popular Movies"
  },
  {
    id_film: 228,
    judul: "Zootopia",
    deskripsi: "Kelinci polisi Judy Hopps dan rubah penipu Nick Wilde bekerja sama memecahkan kasus konspirasi besar.",
    video_url: "https://youtu.be/jWM0ct-OLsM",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/e/e9/Zootopia_poster.png",
    category: "Popular Movies"
  },
  {
    id_film: 229,
    judul: "Moana",
    deskripsi: "Gadis pemberani Moana berlayar melintasi samudera luas bersama manusia setengah dewa Maui demi pulau kelahirannya.",
    video_url: "https://youtu.be/LKFuXETZUsI",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/0/0c/Moana_poster.jpg",
    category: "Trending Now"
  },
  {
    id_film: 230,
    judul: "Tangled",
    deskripsi: "Rapunzel berambut emas panjang melarikan diri dari menara tingginya bersama pencuri menawan Flynn Rider.",
    video_url: "https://youtu.be/2f5162HCJww",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/a/a8/Tangled_poster.jpg",
    category: "Popular Movies"
  },
  {
    id_film: 231,
    judul: "Spider-Man: No Way Home",
    deskripsi: "Peter Parker meminta bantuan Doctor Strange untuk menghapus ingatan dunia, memicu retaknya portal Multiverse.",
    video_url: "https://youtu.be/JfVOs4VSpmA",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/0/00/Spider-Man_No_Way_Home_poster.jpg",
    category: "Action Thriller"
  },
  {
    id_film: 232,
    judul: "Iron Man",
    deskripsi: "Miliarder Tony Stark membangun pakaian tempur canggih berlapis baja kuat demi melawan kejahatan global.",
    video_url: "https://youtu.be/8ugaeA-nMTc",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/0/0c/Iron_Man_poster.jpg",
    category: "Action Thriller"
  },
  {
    id_film: 233,
    judul: "The Avengers",
    deskripsi: "Pahlawan-pahlawan super terkuat bumi berkumpul menyatukan kekuatan demi menahan invasi alien Loki.",
    video_url: "https://youtu.be/eOrNdByGMv8",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/f/f9/TheAvengers2012Poster.jpg",
    category: "Action Thriller"
  },
  {
    id_film: 234,
    judul: "Guardians of the Galaxy",
    deskripsi: "Kelompok kriminal luar angkasa canggung bersatu menyelamatkan galaksi dari ancaman bola kosmik Ronan.",
    video_url: "https://youtu.be/d96jaSpwIhU",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/b/b5/Guardians_of_the_Galaxy_poster.jpg",
    category: "Action Thriller"
  },
  {
    id_film: 235,
    judul: "Thor: Ragnarok",
    deskripsi: "Thor terdampar di planet asing tanpa palu Mjolnir miliknya dan harus menghentikan kakaknya Hela menghancurkan Asgard.",
    video_url: "https://youtu.be/v7MGUNV8MxU",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/7/7d/Thor_Ragnarok_poster.jpg",
    category: "Action Thriller"
  },
  {
    id_film: 236,
    judul: "Black Panther",
    deskripsi: "Raja T'Challa berjuang mempertahankan takhta kerajaannya Wakanda dari klaim takhta Erik Killmonger.",
    video_url: "https://youtu.be/xjDjIWPwcPU",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/d/d6/Black_Panther_%28film%29_poster.jpg",
    category: "Action Thriller"
  },
  {
    id_film: 237,
    judul: "Blade Runner 2049",
    deskripsi: "Seorang blade runner baru mengungkap rahasia lama terpendam yang berpotensi memicu kekacauan besar.",
    video_url: "https://youtu.be/gCcx85zLyVM",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/9/9b/Blade_Runner_2049_poster.png",
    category: "Action Thriller"
  },
  {
    id_film: 238,
    judul: "Mad Max: Fury Road",
    deskripsi: "Max Rockatansky bersekutu dengan Furiosa melarikan diri melintasi gurun dari kejaran tirani Immortan Joe.",
    video_url: "https://youtu.be/hEJnMQG9ev8",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/6/6e/Mad_Max_Fury_Road.jpg",
    category: "Action Thriller"
  },
  {
    id_film: 239,
    judul: "Arrival",
    deskripsi: "Ahli bahasa Louise Banks direkrut militer untuk berkomunikasi dengan alien misterius yang mendarat di bumi.",
    video_url: "https://youtu.be/tFMo3UJ4B4g",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/d/df/Arrival%28film%29.jpg",
    category: "Popular Movies"
  },
  {
    id_film: 240,
    judul: "The Prestige",
    deskripsi: "Persaingan sengit berdarah dan penuh obsesi antara dua pesulap panggung legendaris abad ke-19 di London.",
    video_url: "https://youtu.be/o4gHCmTQDxs",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/d/d2/Prestige_poster.jpg",
    category: "Popular Movies"
  },
  {
    id_film: 241,
    judul: "Shutter Island",
    deskripsi: "Dua marshal A.S menyelidiki hilangnya seorang pasien wanita pembunuh dari fasilitas rumah sakit jiwa pulau terpencil.",
    video_url: "https://youtu.be/5iaYLCip5Qk",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/7/76/Shutter_Island_poster.jpg",
    category: "Popular Movies"
  },
  {
    id_film: 242,
    judul: "The Departed",
    deskripsi: "Seorang polisi menyusup ke geng kriminal besar, sementara geng menanam mata-mata di dalam kepolisian Boston.",
    video_url: "https://youtu.be/iQpN31Gw82c",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/c/c1/The_Departed_poster.jpg",
    category: "Action Thriller"
  },
  {
    id_film: 243,
    judul: "Django Unchained",
    deskripsi: "Mantan budak Django bekerja sama dengan pemburu bayaran Jerman menyelamatkan istrinya dari perkebunan kejam.",
    video_url: "https://youtu.be/0fUCuvNlOCg",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/8/8b/Django_Unchained_Poster.jpg",
    category: "Action Thriller"
  },
  {
    id_film: 244,
    judul: "Inglourious Basterds",
    deskripsi: "Pasukan prajurit Yahudi-Amerika melancarkan aksi balas dendam tak terduga kepada pimpinan militer Nazi.",
    video_url: "https://youtu.be/KnrRy6kSFF0",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/c/c3/Inglourious_Basterds_poster.jpg",
    category: "Action Thriller"
  },
  {
    id_film: 245,
    judul: "Kill Bill: Vol. 1",
    deskripsi: "Mantan pembunuh profesional berjuluk The Bride terbangun dari koma dan memburu mantan rekannya yang mengkhianatinya.",
    video_url: "https://youtu.be/7kSuas6mRpk",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/c/cf/Kill_bill_volume_one_ver3.jpg",
    category: "Action Thriller"
  },
  {
    id_film: 246,
    judul: "Star Wars: A New Hope",
    deskripsi: "Luke Skywalker memulai perjalanan antariksa legendaris melawan kekaisaran galaksi tirani jahat Darth Vader.",
    video_url: "https://youtu.be/1g3_CF56R5Q",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/8/80/Star_Wars_-_A_New_Hope.jpg",
    category: "Trending Now"
  },
  {
    id_film: 247,
    judul: "Star Wars: The Empire Strikes Back",
    deskripsi: "Kekaisaran meluncurkan serangan balasan besar, sementara Luke berguru kepada Master Jedi Yoda.",
    video_url: "https://youtu.be/JNwNXF9Y6kY",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/3/3c/SW_-_Empire_Strikes_Back.jpg",
    category: "Trending Now"
  },
  {
    id_film: 248,
    judul: "The Fellowship of the Ring",
    deskripsi: "Frodo Baggins memulai perjalanan epik berbahaya memusnahkan Cincin Sauron dibantu para sekutu terpilih.",
    video_url: "https://youtu.be/V75dMMIW2B4",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/8/8a/The_Lord_of_the_Rings_The_Fellowship_of_the_Ring_%282001%29_theatrical_poster.jpg",
    category: "Popular Movies"
  },
  {
    id_film: 249,
    judul: "The Lord of the Rings: The Two Towers",
    deskripsi: "Frodo dan Sam mendekati gerbang Mordor dengan panduan Gollum, sementara sekutu bertempur di Helm's Deep.",
    video_url: "https://youtu.be/LbfMDwc4azU",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/d/d0/Lord_of_the_Rings_-_The_Two_Towers.jpg",
    category: "Popular Movies"
  },
  {
    id_film: 250,
    judul: "The Return of the King",
    deskripsi: "Pertempuran akhir peradaban manusia melawan pasukan kegelapan Sauron di Minas Tirith.",
    video_url: "https://youtu.be/r5X-hFf6Bwo",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/8/87/The_Lord_of_the_Rings_-_The_Return_of_the_King_%282003%29_theatrical_poster.jpg",
    category: "Popular Movies"
  },
  {
    id_film: 251,
    judul: "Harry Potter: Sorcerer's Stone",
    deskripsi: "Anak yatim piatu Harry Potter menemukan bakat sihirnya dan bersekolah di Hogwarts School of Witchcraft.",
    video_url: "https://youtu.be/VyHV0BRfZyQ",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/7/7a/Harry_Potter_and_the_Philosopher%27s_Stone_poster.jpg",
    category: "Popular Movies"
  },
  {
    id_film: 252,
    judul: "Harry Potter: Prisoner of Azkaban",
    deskripsi: "Harry Potter menghadapi ancaman pembunuh bayaran Sirius Black yang kabur dari penjara sihir Azkaban.",
    video_url: "https://youtu.be/lAxgztbYDbs",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/b/bc/Harry_Potter_and_the_Prisoner_of_Azkaban_poster.jpg",
    category: "Popular Movies"
  },
  {
    id_film: 253,
    judul: "Jurassic Park",
    deskripsi: "Taman wisata pulau dinosaurus kloningan lepas kendali akibat sabotase listrik sistem keamanan.",
    video_url: "https://youtu.be/QWBKxrXPgyQ",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/e/e7/Jurassic_Park_poster.jpg",
    category: "Trending Now"
  },
  {
    id_film: 254,
    judul: "Back to the Future",
    deskripsi: "Remaja Marty McFly terlempar kembali ke tahun 1955 menggunakan mobil mesin waktu buatan Doc Brown.",
    video_url: "https://youtu.be/PsxKtPXKCqw",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/d/d2/Back_to_the_Future.jpg",
    category: "Trending Now"
  },
  {
    id_film: 255,
    judul: "Princess Mononoke",
    deskripsi: "Pangeran Ashitaka terjerumus ke dalam perang besar antara dewa-dewa hutan dan industri manusia modern.",
    video_url: "https://youtu.be/4OiM4ipC1EP",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/8/8c/Princess_Mononoke_Japanese_poster.png",
    category: "Popular Movies"
  },
  {
    id_film: 256,
    judul: "My Neighbor Totoro",
    deskripsi: "Dua gadis kecil berteman akrab dengan roh penjaga hutan ramah berbulu lebat bernama Totoro.",
    video_url: "https://youtu.be/92a7HAnrNaE",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/0/02/My_Neighbor_Totoro_-_Tonari_no_Totoro_%28movie_poster%29.png",
    category: "Popular Movies"
  },
  {
    id_film: 257,
    judul: "5 Centimeters per Second",
    deskripsi: "Kisah cinta manis nan melankolis tentang dua remaja yang terpisahkan jarak geografis dan waktu.",
    video_url: "https://youtu.be/1X95eE2Y1yM",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/e/e1/5_Centimeters_Per_Second_poster.jpg",
    category: "Trending Now"
  },
  {
    id_film: 258,
    judul: "The Garden of Words",
    deskripsi: "Pertemuan tanpa sengaja anak pembuat sepatu dengan wanita misterius di taman bergaya Jepang kala hujan turun.",
    video_url: "https://youtu.be/39-Z10yK6Zk",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/c/c3/The_Garden_of_Words_poster.jpg",
    category: "Popular Movies"
  },
  {
    id_film: 259,
    judul: "Grave of the Fireflies",
    deskripsi: "Kisah menyayat hati dua bersaudara Seita dan Setsuko bertahan hidup di pedesaan Jepang akhir Perang Dunia II.",
    video_url: "https://youtu.be/4vPeTSRd580",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/a/a5/Grave_of_the_Fireflies_japanese_poster.jpg",
    category: "Popular Movies"
  },
  {
    id_film: 260,
    judul: "Akira",
    deskripsi: "Pemimpin geng motor menyelamatkan temannya yang memperoleh kekuatan psikis berbahaya dari eksperimen rahasia.",
    video_url: "https://youtu.be/FtZsuba3N1w",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/5/5d/AKIRA_%281988%29_poster.jpg",
    category: "Action Thriller"
  },
  {
    id_film: 261,
    judul: "Ghost in the Shell",
    deskripsi: "Polisi cyborg wanita memburu kriminal peretas otak misterius Puppet Master di kota cyberpunk futuristik.",
    video_url: "https://youtu.be/gMpYX2o4E8M",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/c/ca/Ghostintheshellposter.jpg",
    category: "Action Thriller"
  },
  {
    id_film: 262,
    judul: "Perfect Blue",
    deskripsi: "Stalker misterius mengancam kesehatan mental idola pop yang beralih karir menjadi aktris drama.",
    video_url: "https://youtu.be/v2T-xLd17gA",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/9/9d/Perfect_Blue_poster.jpg",
    category: "Popular Movies"
  },
  {
    id_film: 263,
    judul: "Paprika",
    deskripsi: "Terapi canggih penyembuh mimpi disalahgunakan oleh pencuri untuk memicu mimpi buruk gila massal.",
    video_url: "https://youtu.be/jJz8mc82598",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/e/ec/Paprikaposter.jpg",
    category: "Trending Now"
  },
  {
    id_film: 264,
    judul: "One Piece Film: Red",
    deskripsi: "Luffy dan bajak laut Topi Jerami menghadiri konser konser akbar penyanyi dunia Uta yang memiliki suara pemikat jiwa.",
    video_url: "https://youtu.be/8939bL43_n8",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/a/aa/One_Piece_Film_Red_Visual_Poster.jpg",
    category: "Action Thriller"
  },
  {
    id_film: 265,
    judul: "Jujutsu Kaisen 0",
    deskripsi: "Yuta Okkotsu bersekolah di SMA Sihir Jujutsu demi melepaskan kutukan roh jahat mendiang teman kecilnya.",
    video_url: "https://youtu.be/WGiDn2ZzWz4",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/a/ad/Jujutsu_Kaisen_0_poster.jpg",
    category: "Action Thriller"
  },
  {
    id_film: 266,
    judul: "Evangelion: End of Evangelion",
    deskripsi: "Pertempuran psikologis penutup nasib kemanusiaan melawan malaikat raksasa perusak bumi.",
    video_url: "https://youtu.be/23G7p4g6V4Y",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/2/28/End_of_Evangelion.jpg",
    category: "Action Thriller"
  },
  {
    id_film: 267,
    judul: "A Silent Voice: The Movie",
    deskripsi: "Kisah haru perjalanan penebusan dosa Shoya Ishida yang ingin berteman kembali dengan Shoko Nishimiya.",
    video_url: "https://youtu.be/nfK6UgLra7g",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/3/32/A_Silent_Voice_Film_Poster.jpg",
    category: "Popular Movies"
  },
  {
    id_film: 268,
    judul: "Weathering with You: Special",
    deskripsi: "Gadis ajaib pengendali awan Hina Amano berteman dengan pemuda kabur Hodaka Morishima di Tokyo basah.",
    video_url: "https://youtu.be/Q6iK6ZOI-Ew",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/6/66/Weathering_with_You_Poster.jpg",
    category: "Trending Now"
  },
  {
    id_film: 269,
    judul: "Inception: Dream State",
    deskripsi: "Cobb memimpin kelompok pencuri mimpi memasuki alam bawah sadar terdalam target utama.",
    video_url: "https://youtu.be/YoHD9XEInc0",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg",
    category: "Trending Now"
  },
  {
    id_film: 270,
    judul: "The Dark Knight: Rises",
    deskripsi: "Batman harus bangkit menghentikan ancaman teroris bertopeng Bane yang kejam melumpuhkan Gotham.",
    video_url: "https://youtu.be/EXeTwQWrcwY",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/8/83/Dark_knight_rises_poster.jpg",
    category: "Trending Now"
  },
  {
    id_film: 271,
    judul: "Oppenheimer: Nuclear Age",
    deskripsi: "Langkah J. Robert Oppenheimer menguji Trinity Test bom atom pertama di padang pasir Los Alamos.",
    video_url: "https://youtu.be/uYPbbksJxIg",
    foto_url: "https://upload.wikimedia.org/wikipedia/id/4/4a/Oppenheimer_%28film%29.jpg",
    category: "Popular Movies"
  },
  {
    id_film: 272,
    judul: "Spirited Away: Spirit Realm",
    deskripsi: "Chihiro berjuang menyelamatkan orang tuanya yang berubah menjadi babi akibat sihir hitam.",
    video_url: "https://youtu.be/ByXuk9QqQkk",
    foto_url: "https://upload.wikimedia.org/wikipedia/ms/3/30/Spirited_Away_poster.JPG",
    category: "Popular Movies"
  },
  {
    id_film: 273,
    judul: "Dune: Prophecy",
    deskripsi: "Kisah perebutan rempah berharga Melange di gurun pasir tandus nan berbahaya planet Arrakis.",
    video_url: "https://youtu.be/Way9Dexny3w",
    foto_url: "https://upload.wikimedia.org/wikipedia/id/4/4d/Poster_film_dune_part_two.jpg",
    category: "Action Thriller"
  },
  {
    id_film: 274,
    judul: "Avengers: Infinity War",
    deskripsi: "Thanos memburu Batu Keabadian di galaksi, memicu pertempuran terbesar para Avengers.",
    video_url: "https://youtu.be/TcMBFSGVi1c",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/4/4d/Avengers_Infinity_War_poster.jpg",
    category: "Action Thriller"
  },
  {
    id_film: 275,
    judul: "The Matrix: Reloaded",
    deskripsi: "Neo, Trinity, dan Morpheus berjuang menahan gelombang serbuan ribuan mesin Sentinel.",
    video_url: "https://youtu.be/vKQi3bBA1y8",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/b/ba/The_Matrix_Reloaded_poster.jpg",
    category: "Action Thriller"
  },
  {
    id_film: 276,
    judul: "Forrest Gump: Life Story",
    deskripsi: "Kisah cinta abadi Forrest dengan Jenny di tengah persimpangan sejarah penting dunia.",
    video_url: "https://youtu.be/bLvqoHBptjg",
    foto_url: "https://upload.wikimedia.org/wikipedia/id/6/67/Forrest_Gump_poster.jpg",
    category: "Popular Movies"
  },
  {
    id_film: 277,
    judul: "Pulp Fiction: Mobsters",
    deskripsi: "Aksi gila Vincent Vega dan Jules Winnfield melacak koper misterius pimpinan mafia mereka.",
    video_url: "https://youtu.be/s7EdQ4FqbhY",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/3/3b/Pulp_Fiction_%281994%29_poster.jpg",
    category: "Trending Now"
  },
  {
    id_film: 278,
    judul: "The Godfather: Part II",
    deskripsi: "Kisah kilas balik perjuangan Vito Corleone mendirikan bisnis keluarga mafianya di New York.",
    video_url: "https://youtu.be/UaVTIH8mujA",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/0/03/Godfather_part_ii.jpg",
    category: "Popular Movies"
  },
  {
    id_film: 279,
    judul: "Parasite: Symbiosis",
    deskripsi: "Keluarga Park kaya tidak sadar bahwa ada rahasia gelap terpendam di ruang bawah tanah mereka.",
    video_url: "https://youtu.be/5xH0HfJHsaY",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/c/c3/Parasite_%282019_film%29_poster.jpg",
    category: "Trending Now"
  },
  {
    id_film: 280,
    judul: "Whiplash: Jazz Club",
    deskripsi: "Andrew Neiman melatih fisiknya sampai berdarah demi memuaskan ambisi konduktor kejam Fletcher.",
    video_url: "https://youtu.be/7d_jQyG8DQY",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/0/01/Whiplash_poster.jpg",
    category: "Popular Movies"
  },
  {
    id_film: 281,
    judul: "Spider-Man: Multiverse Mania",
    deskripsi: "Miles Morales harus memilih menyelamatkan ayahnya atau menjaga stabilitas linimasa seluruh dimensi.",
    video_url: "https://youtu.be/cqGjhVJWtEg",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/b/b4/Spider-Man-_Across_the_Spider-Verse_poster.jpg",
    category: "Action Thriller"
  },
  {
    id_film: 282,
    judul: "Gladiator: Arena of Fire",
    deskripsi: "Maximus menghadapi kaisar kejam Commodus dalam pertarungan hidup mati legendaris di Colosseum.",
    video_url: "https://youtu.be/owK1ddwRQII",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/f/fb/Gladiator_%282000_film_poster%29.png",
    category: "Action Thriller"
  },
  {
    id_film: 283,
    judul: "Titanic: Deep Blue",
    deskripsi: "Jack dan Rose berjuang menyelamatkan diri di dek kapal yang perlahan tenggelam ke samudera beku.",
    video_url: "https://youtu.be/I7c1etV7D7g",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/1/18/Titanic_%281997_film%29_poster.png",
    category: "Popular Movies"
  },
  {
    id_film: 284,
    judul: "The Lion King: Pride Lands",
    deskripsi: "Simba berguru kepada Timon dan Pumbaa mengadopsi moto legendaris Hakuna Matata.",
    video_url: "https://youtu.be/7TavVZMewpY",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/3/3d/The_Lion_King_poster.jpg",
    category: "Trending Now"
  },
  {
    id_film: 285,
    judul: "Toy Story: Andy's Room",
    deskripsi: "Woody dan Buzz Lightyear bekerja sama kabur dari ancaman anak nakal tetangga bernama Sid.",
    video_url: "https://youtu.be/v-PjgYDrgOP",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/1/13/Toy_Story.jpg",
    category: "Popular Movies"
  },
  {
    id_film: 286,
    judul: "Wall-E: Space Mission",
    deskripsi: "Wall-E bertemu robot pencari tanaman canggih bernama Eve dan ikut terbang ke stasiun ruang angkasa.",
    video_url: "https://youtu.be/CZ1CATHer1E",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/c/c2/WALL-Eposter.png",
    category: "Popular Movies"
  },
  {
    id_film: 287,
    judul: "Up: Paradise Falls",
    deskripsi: "Carl dan anak pramuka Russell tersesat di rimba belantara Amerika Selatan menemukan burung raksasa Kevin.",
    video_url: "https://youtu.be/ORFWdXl_zJ4",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/0/05/Up_%282009_film%29_poster.jpg",
    category: "Popular Movies"
  },
  {
    id_film: 288,
    judul: "Inside Out: Emotions",
    deskripsi: "Joy dan Sadness harus menjelajahi labirin ingatan Riley untuk mengembalikan memori inti Riley.",
    video_url: "https://youtu.be/seMwpP0yeu4",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/0/0a/Inside_Out_%282015_film%29_poster.jpg",
    category: "Trending Now"
  },
  {
    id_film: 289,
    judul: "Finding Nemo: Sydney Harbour",
    deskripsi: "Marlin mendapat bantuan kura-kura bijak Crush melintasi East Australian Current demi Nemo.",
    video_url: "https://youtu.be/wZdpNgl5Ez4",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/2/29/Finding_Nemo.jpg",
    category: "Popular Movies"
  },
  {
    id_film: 290,
    judul: "The Incredibles: Syndrome's Threat",
    deskripsi: "Mr. Incredible bertarung sendirian di pulau terpencil rahasia menghadapi robot cerdas buatan Syndrome.",
    video_url: "https://youtu.be/eZbzbC9t89s",
    foto_url: "https://upload.wikimedia.org/wikipedia/en/2/27/The_Incredibles_%282004_poster%29.jpg",
    category: "Action Thriller"
  }
];

function SeeAll() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [dbMovies, setDbMovies] = useState([]);
  const [combinedMovies, setCombinedMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState({ show: false, message: "" });

  // Fungsi helper untuk mendeteksi tipe URL gambar (eksternal vs lokal)
  const getImageUrl = (url) => {
    if (!url) return "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=300";
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    return `http://localhost:3000/uploads/${url}`;
  };

  // Ambil kategori aktif dari URL query parameter (default ke 'Semua')
  const activeCategory = searchParams.get("category") || "Semua";

  useEffect(() => {
    getMovies();
  }, []);

  async function getMovies() {
    try {
      const response = await API.get("/api/film");
      const list = response.data.data || [];

      // Inject kategori dinamis pada database film agar sinkron dengan Home.jsx
      const categorizedDbMovies = list.map((movie, index) => {
        let category = "Action Thriller";
        if (index < 4) category = "Trending Now";
        else if (index < 8) category = "Popular Movies";

        return {
          ...movie,
          category
        };
      });

      setDbMovies(categorizedDbMovies);
    } catch (error) {
      console.error("Gagal mengambil data film dari database:", error);
    }
  }

  // Gabungkan film DB dan film Mock
  useEffect(() => {
    // Merge database film dan mock film
    const merged = [...dbMovies, ...MOCK_MOVIES];
    // Pastikan tidak ada ID ganda
    const uniqueMovies = Array.from(new Map(merged.map(item => [item.id_film, item])).values());
    setCombinedMovies(uniqueMovies);
  }, [dbMovies]);

  const triggerToast = (msg) => {
    setToast({ show: true, message: msg });
    setTimeout(() => {
      setToast({ show: false, message: "" });
    }, 3500);
  };

  // Filter film berdasarkan kategori aktif dan kata kunci pencarian
  const filteredMovies = combinedMovies.filter((movie) => {
    const matchesCategory =
      activeCategory === "Semua" ||
      movie.category.toLowerCase() === activeCategory.toLowerCase();

    const matchesSearch =
      movie.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.deskripsi.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const categories = ["Semua", "Trending Now", "Popular Movies", "Action Thriller"];

  return (
    <div className="see-all-page">
      {/* Toast Notification */}
      {toast.show && (
        <div className="premium-toast">
          <span className="toast-icon">✨</span>
          <span className="toast-message">{toast.message}</span>
        </div>
      )}

      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onTriggerToast={triggerToast}
      />

      <div className="see-all-content">
        <div className="see-all-header">
          <Link to="/" className="back-link">
            ← Kembali ke Beranda
          </Link>
          <h1>🍿 Jelajahi Semua Film ({filteredMovies.length})</h1>
          <p className="subtitle">Cari dan jelajahi ratusan koleksi film premium PopTube favorit Anda.</p>
        </div>

        {/* Tab Filter Kategori */}
        <div className="filter-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-tab-btn ${activeCategory.toLowerCase() === cat.toLowerCase() ? "active" : ""}`}
              onClick={() => setSearchParams({ category: cat })}
            >
              {cat === "Semua" ? "📂 Semua Kategori" : cat}
            </button>
          ))}
        </div>

        {/* Pencarian Grid */}
        <div className="search-bar-container">
          <span className="search-bar-icon">🔍</span>
          <input
            type="text"
            placeholder="Cari film berdasarkan judul atau deskripsi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="premium-search-input"
          />
          {searchQuery && (
            <button className="clear-search-btn" onClick={() => setSearchQuery("")}>
              ✕
            </button>
          )}
        </div>

        {/* Grid Film */}
        {filteredMovies.length === 0 ? (
          <div className="empty-catalog">
            <span className="empty-icon">🎬</span>
            <h2>Film Tidak Ditemukan</h2>
            <p>Maaf, tidak ada film yang sesuai dengan kategori "{activeCategory}" dan pencarian Anda.</p>
            <button className="reset-btn" onClick={() => { setSearchQuery(""); setSearchParams({ category: "Semua" }); }}>
              Reset Filter Pencarian
            </button>
          </div>
        ) : (
          <div className="movies-grid">
            {filteredMovies.map((movie) => (
              <Link to={`/film/${movie.id_film}`} key={movie.id_film} className="image-only-card">
                <img
                  src={getImageUrl(movie.foto_url)}
                  alt={movie.judul}
                  className="grid-poster-img"
                  referrerPolicy="no-referrer"
                />
              </Link>
            ))}
          </div>
        )}
      </div>

      <BottomNav onTriggerToast={triggerToast} />
      <Footer />
    </div>
  );
}

export default SeeAll;
