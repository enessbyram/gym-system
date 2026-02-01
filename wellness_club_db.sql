-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Anamakine: localhost
-- Üretim Zamanı: 31 Oca 2026, 11:38:04
-- Sunucu sürümü: 10.4.28-MariaDB
-- PHP Sürümü: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `wellness_club_db`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `appointments`
--

CREATE TABLE `appointments` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `pt_id` int(11) DEFAULT NULL,
  `appointment_date` datetime NOT NULL,
  `time` varchar(10) NOT NULL,
  `type` varchar(20) NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `appointments`
--

INSERT INTO `appointments` (`id`, `user_id`, `pt_id`, `appointment_date`, `time`, `type`, `status`, `created_at`) VALUES
(1, 5, 2, '2026-01-30 00:00:00', '17:00', 'pt', 'completed', '2026-01-30 11:24:58'),
(2, 5, 2, '2026-02-13 00:00:00', '21:00', 'pt', 'completed', '2026-01-30 11:37:27'),
(3, 4, NULL, '2026-01-30 00:00:00', '17:00', 'salon', 'active', '2026-01-30 12:16:29'),
(4, 5, 2, '2026-01-05 00:00:00', '14:00', 'pt', 'completed', '2026-01-30 12:18:56'),
(5, 5, NULL, '2026-01-08 00:00:00', '09:00', 'salon', 'active', '2026-01-30 12:18:56'),
(6, 5, 2, '2026-01-12 00:00:00', '16:00', 'pt', 'completed', '2026-01-30 12:18:56'),
(7, 5, NULL, '2026-01-15 00:00:00', '18:00', 'salon', 'active', '2026-01-30 12:18:56'),
(8, 5, 2, '2026-01-20 00:00:00', '10:00', 'pt', 'completed', '2026-01-30 12:18:56'),
(9, 5, 2, '2026-01-31 00:00:00', '20:00', 'pt', 'active', '2026-01-30 12:49:58'),
(10, 6, NULL, '2026-01-31 00:00:00', '18:00', 'salon', 'active', '2026-01-30 12:53:41'),
(11, 5, 2, '2026-02-14 00:00:00', '18:00', 'pt', 'active', '2026-01-30 13:41:40');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `memberships`
--

CREATE TABLE `memberships` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `package_id` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `total_sessions` int(11) DEFAULT 0,
  `remaining_sessions` int(11) DEFAULT 0,
  `status` enum('active','passive','expired') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `purchase_price` decimal(10,2) DEFAULT 0.00,
  `assigned_pt_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `memberships`
--

INSERT INTO `memberships` (`id`, `user_id`, `package_id`, `start_date`, `end_date`, `total_sessions`, `remaining_sessions`, `status`, `created_at`, `purchase_price`, `assigned_pt_id`) VALUES
(1, 4, 2, '2026-01-30', '2026-05-14', 0, 0, 'active', '2026-01-30 09:34:44', 0.00, 2),
(4, 4, 1, '2024-08-10', '2024-09-09', 0, 0, 'expired', '2024-08-10 06:15:00', 1500.00, NULL),
(5, 4, 2, '2024-11-05', '2025-02-03', 0, 0, 'expired', '2024-11-05 11:30:00', 4000.00, NULL),
(6, 5, 4, '2026-01-30', '2026-04-30', 20, 16, 'active', '2026-01-30 09:46:18', 9000.00, 2),
(7, 6, 2, '2026-01-30', '2026-05-30', 0, 0, 'active', '2026-01-30 12:53:06', 10000.00, NULL);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `packages`
--

CREATE TABLE `packages` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `type` enum('gym','pt') NOT NULL,
  `session_count` int(11) DEFAULT 0 COMMENT 'PT ise ders sayısı, Gym ise 0',
  `duration_days` int(11) NOT NULL COMMENT 'Paketin geçerlilik süresi (gün)',
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `packages`
--

INSERT INTO `packages` (`id`, `title`, `price`, `type`, `session_count`, `duration_days`, `description`, `created_at`) VALUES
(1, '1 Aylık Spor Salonu', 5000.00, 'gym', 0, 30, 'Sınırsız salon kullanımı, duş ve dolap dahil.', '2026-01-29 12:29:29'),
(2, '3 Aylık Spor Salonu', 10000.00, 'gym', 0, 90, 'İndirimli 3 aylık sınırsız üyelik.', '2026-01-29 12:29:29'),
(3, '10 Ders PT Paketi', 9000.00, 'pt', 10, 60, 'Kişisel antrenör eşliğinde 10 ders. 60 gün içinde kullanılmalıdır.', '2026-01-29 12:29:29'),
(4, '20 Ders PT Paketi', 17000.00, 'pt', 20, 90, 'Kişisel antrenör eşliğinde 20 ders. 90 gün içinde kullanılmalıdır.', '2026-01-29 12:29:29'),
(5, '30 Ders PT Paketi', 24000.00, 'pt', 30, 120, 'Profesyonel gelişim paketi. 120 gün geçerlidir.', '2026-01-29 12:29:29');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `package_features`
--

CREATE TABLE `package_features` (
  `id` int(11) NOT NULL,
  `package_id` int(11) NOT NULL,
  `feature_text` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `package_features`
--

INSERT INTO `package_features` (`id`, `package_id`, `feature_text`) VALUES
(1, 2, 'Kişiye özel antrenman programı'),
(2, 2, 'Salondaki tüm imkanlardan yararlanma'),
(3, 2, 'Duş, tuvalet, hijyenik soyunma odaları');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `title` varchar(150) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock` int(11) DEFAULT 0,
  `image_path` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `products`
--

INSERT INTO `products` (`id`, `title`, `description`, `price`, `stock`, `image_path`, `created_at`) VALUES
(1, 'Eldiven', 'Dövüşmek için birebir.', 1000.00, 15, 'prod_697c6ab180689.jpg', '2026-01-30 08:17:06'),
(2, 'Whey Protein', 'kaslanmak için birebir.', 1300.00, 100, 'prod_697c6ace243c2.jpg', '2026-01-30 08:24:46'),
(3, 'bcca', 'bcca', 1000.00, 0, 'prod_697c6bc260d3f.jpg', '2026-01-30 08:28:50');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `sliders`
--

CREATE TABLE `sliders` (
  `id` int(11) NOT NULL,
  `image_path` varchar(255) NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `item_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `sliders`
--

INSERT INTO `sliders` (`id`, `image_path`, `title`, `item_order`, `is_active`) VALUES
(1, 'slider_697c77484b907.jpg', 'Slider Görseli', 0, 1),
(2, 'slider_697c775488b78.jpg', 'Slider Görseli', 0, 1),
(3, 'slider_697c77652b4f7.jpg', 'Slider Görseli', 0, 1);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `role` enum('admin','pt','member') NOT NULL DEFAULT 'member',
  `photo` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `users`
--

INSERT INTO `users` (`id`, `name`, `surname`, `email`, `password`, `phone`, `role`, `photo`, `created_at`, `status`) VALUES
(1, 'Enes', 'Admin', 'admin@wellnessclub.com', '123456', '5551234567', 'admin', NULL, '2026-01-29 12:29:29', 1),
(2, 'Burak', 'Hoca', 'pt@wellnessclub.com', '123456', '5551112233', 'pt', NULL, '2026-01-29 12:33:24', 1),
(4, 'Özgün', 'Biberoğlu', 'ozgun@wellnessclub.com', '123456', '5551234567', 'member', NULL, '2026-01-30 09:34:44', 1),
(5, 'Enes', 'Bayram', 'enes@wellnessclub.com', '123456', '5551234567', 'member', NULL, '2026-01-30 09:46:18', 1),
(6, 'Eren', 'TAŞTAN', 'eren@wellnessclub.com', '123456', '5551234567', 'member', NULL, '2026-01-30 12:53:06', 0);

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_app_member` (`user_id`),
  ADD KEY `fk_app_pt` (`pt_id`);

--
-- Tablo için indeksler `memberships`
--
ALTER TABLE `memberships`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_membership_user` (`user_id`),
  ADD KEY `fk_membership_package` (`package_id`);

--
-- Tablo için indeksler `packages`
--
ALTER TABLE `packages`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `package_features`
--
ALTER TABLE `package_features`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_package_features` (`package_id`);

--
-- Tablo için indeksler `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `sliders`
--
ALTER TABLE `sliders`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Tablo için AUTO_INCREMENT değeri `memberships`
--
ALTER TABLE `memberships`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Tablo için AUTO_INCREMENT değeri `packages`
--
ALTER TABLE `packages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Tablo için AUTO_INCREMENT değeri `package_features`
--
ALTER TABLE `package_features`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Tablo için AUTO_INCREMENT değeri `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Tablo için AUTO_INCREMENT değeri `sliders`
--
ALTER TABLE `sliders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Tablo için AUTO_INCREMENT değeri `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Dökümü yapılmış tablolar için kısıtlamalar
--

--
-- Tablo kısıtlamaları `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `fk_app_member` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_app_pt` FOREIGN KEY (`pt_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Tablo kısıtlamaları `memberships`
--
ALTER TABLE `memberships`
  ADD CONSTRAINT `fk_membership_package` FOREIGN KEY (`package_id`) REFERENCES `packages` (`id`),
  ADD CONSTRAINT `fk_membership_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Tablo kısıtlamaları `package_features`
--
ALTER TABLE `package_features`
  ADD CONSTRAINT `fk_package_features` FOREIGN KEY (`package_id`) REFERENCES `packages` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
