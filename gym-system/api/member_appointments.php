<?php
// Hataları gizle (Production ortamı için)
error_reporting(0);
ini_set('display_errors', 0);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

require 'db.php';

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

// --- INIT: Verileri Çek ---
if ($method === 'GET' && $action === 'init') {
    $userId = $_GET['user_id'];

    if (!$userId) {
        echo json_encode(["success" => false, "error" => "Kullanıcı ID eksik"]);
        exit;
    }

    try {
        // 1. ÜYELİK SORGUSU
        $memSql = "
            SELECT 
                m.id as membership_id,
                m.assigned_pt_id,
                p.type as package_type,
                p.title as package_title
            FROM memberships m
            LEFT JOIN packages p ON m.package_id = p.id
            WHERE m.user_id = ? 
            AND (TRIM(m.status) = 'active' OR m.status LIKE 'active%')
            ORDER BY m.id DESC
            LIMIT 1
        ";
        $stmt = $pdo->prepare($memSql);
        $stmt->execute([$userId]);
        $membership = $stmt->fetch(PDO::FETCH_ASSOC);

        // 2. RANDEVULAR (DÜZELTME: `time` backtick içine alındı)
        // User ID'ye göre filtreliyoruz
        $appSql = "
            SELECT id, appointment_date, `time`, type, status 
            FROM appointments 
            WHERE user_id = ? 
            ORDER BY appointment_date DESC
        ";
        $appStmt = $pdo->prepare($appSql);
        $appStmt->execute([$userId]);
        $appointments = $appStmt->fetchAll(PDO::FETCH_ASSOC);

        // 3. DOLULUK (DÜZELTME: `time` backtick içine alındı)
        $occSql = "
            SELECT `appointment_date`, `time`, COUNT(*) as count 
            FROM `appointments` 
            WHERE `status` = 'active' AND `appointment_date` >= CURDATE() 
            GROUP BY `appointment_date`, `time`
        ";
        $occStmt = $pdo->query($occSql);
        $occupancy = $occStmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            "success" => true,
            "membership" => $membership,
            "appointments" => $appointments, // Frontend burayı bekliyor
            "occupancy" => $occupancy
        ]);

    } catch (PDOException $e) {
        // Hata durumunda JSON döndür
        echo json_encode(["success" => false, "error" => "SQL Hatası: " . $e->getMessage()]);
    }
}

// --- POST: Randevu Oluştur ---
if ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    
    $userId = $data['user_id'] ?? null;
    $date = $data['date'] ?? null;
    $time = $data['time'] ?? null;
    $type = $data['type'] ?? null;
    $ptId = $data['pt_id'] ?? null;

    if (!$userId || !$date || !$time || !$type) {
        echo json_encode(["success" => false, "error" => "Eksik veri"]);
        exit;
    }

    try {
        // ÇAKIŞMA KONTROLÜ
        $checkSql = "SELECT id FROM appointments WHERE user_id = ? AND appointment_date = ? AND status != 'cancelled'";
        $stmt = $pdo->prepare($checkSql);
        $stmt->execute([$userId, $date]);
        
        if ($stmt->rowCount() > 0) {
            echo json_encode(["success" => false, "error" => "Bu tarihte zaten randevunuz var."]);
            exit;
        }

        // KAPASİTE KONTROLÜ (DÜZELTME: `time` eklendi)
        if ($type === 'salon') {
             $gymCheck = $pdo->prepare("SELECT COUNT(*) FROM appointments WHERE appointment_date = ? AND `time` = ? AND type = 'salon' AND status = 'active'");
             $gymCheck->execute([$date, $time]);
             if ($gymCheck->fetchColumn() >= 20) {
                 echo json_encode(["success" => false, "error" => "Seçilen saatte salon dolu."]);
                 exit;
             }
        }

        // KAYIT (DÜZELTME: `time` eklendi)
        $insertSql = "INSERT INTO appointments (user_id, pt_id, appointment_date, `time`, type, status) VALUES (?, ?, ?, ?, ?, 'active')";
        $stmt = $pdo->prepare($insertSql);
        $stmt->execute([$userId, ($type === 'pt' ? $ptId : null), $date, $time, $type]);

        // PT HAK DÜŞÜMÜ
        if ($type === 'pt') {
            $updSql = "UPDATE memberships SET remaining_sessions = remaining_sessions - 1 WHERE user_id = ? AND (TRIM(status) = 'active' OR status LIKE 'active%')";
            $pdo->prepare($updSql)->execute([$userId]);
        }

        echo json_encode(["success" => true]);

    } catch (PDOException $e) {
        echo json_encode(["success" => false, "error" => "Kayıt Hatası: " . $e->getMessage()]);
    }
}
?>
