<?php
// Hataları gizle
error_reporting(0);
ini_set('display_errors', 0);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

require 'db.php';

$userId = $_GET['id'] ?? null;

if (!$userId) {
    echo json_encode(["success" => false, "error" => "Kullanıcı ID eksik"]);
    exit();
}

try {
    // 1. Kullanıcıyı Bul
    $userStmt = $pdo->prepare("SELECT name, surname FROM users WHERE id = ?");
    $userStmt->execute([$userId]);
    $user = $userStmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        echo json_encode(["success" => false, "error" => "Kullanıcı bulunamadı"]);
        exit();
    }

    // 2. Aktif Paketi Ara (GÜNCELLENDİ)
    // - LEFT JOIN kullanıldı (Paket silinse bile hata vermez)
    // - TRIM ve LIKE active% kullanıldı (Boşluk hatalarını önler)
    $sql = "
        SELECT 
            p.title as package_title, 
            p.duration_days,
            m.end_date, 
            m.total_sessions, 
            m.remaining_sessions
        FROM memberships m
        LEFT JOIN packages p ON m.package_id = p.id
        WHERE m.user_id = ? 
        AND (TRIM(m.status) = 'active' OR m.status LIKE 'active%')
        ORDER BY m.id DESC 
        LIMIT 1
    ";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$userId]);
    $membership = $stmt->fetch(PDO::FETCH_ASSOC);

    // 3. Verileri Hazırla
    $fullName = trim($user['name'] . ' ' . $user['surname']);
    
    // Varsayılan Değerler
    $packageName = "Aktif Paket Bulunamadı";
    $remainingDays = 0;
    $totalDays = 90;
    $currentSessions = 0;
    $totalSessions = 0;
    $activeAppointments = 0;

    // Eğer paket varsa değerleri güncelle
    if ($membership) {
        $packageName = $membership['package_title'] ?? 'Paket İsmi Yok';
        $totalDays = intval($membership['duration_days'] ?? 90);
        $currentSessions = intval($membership['remaining_sessions']);
        $totalSessions = intval($membership['total_sessions']);

        // Gün Hesabı
        if (!empty($membership['end_date'])) {
            $today = new DateTime();
            $end = new DateTime($membership['end_date']);
            $today->setTime(0, 0, 0);
            $end->setTime(0, 0, 0);
            
            if ($end >= $today) {
                $remainingDays = $today->diff($end)->days;
            }
        }
    }

    // 4. Aktif Randevu Sayısı (DÜZELTİLDİ: member_id -> user_id oldu)
    $appStmt = $pdo->prepare("SELECT COUNT(*) FROM appointments WHERE user_id = ? AND appointment_date >= CURDATE() AND status != 'cancelled'");
    $appStmt->execute([$userId]);
    $activeAppointments = $appStmt->fetchColumn();

    // 5. JSON Cevabı
    echo json_encode([
        'success' => true,
        'debug_user_id' => $userId,
        'name' => $fullName,
        'packageName' => $packageName,
        'stats' => [
            'remainingDays' => ['current' => $remainingDays, 'total' => $totalDays],
            'ptSessions' => ['current' => $currentSessions, 'total' => $totalSessions],
            'activeAppointments' => ['current' => $activeAppointments, 'total' => 10]
        ]
    ]);

} catch (Exception $e) {
    echo json_encode(["success" => false, "error" => "Sunucu Hatası: " . $e->getMessage()]);
}
?>
