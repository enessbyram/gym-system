<?php
$host = 'sql103.infinityfree.com';
$db   = 'if0_41038677_gym_system';
$user = 'if0_41038677'; // XAMPP varsayılanı
$pass = 'cHCnOLvwP0pvWGJ';     // XAMPP varsayılanı (şifre varsa buraya yaz)
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    throw new \PDOException($e->getMessage(), (int)$e->getCode());
}
?>
