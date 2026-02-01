<?php
// Hataları gizle
error_reporting(0);
ini_set('display_errors', 0);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

require 'db.php';

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

// --- 1. RANDEVULARI GETİR ---
if ($method === 'GET' && $action === 'get_all') {
    $ptId = $_GET['pt_id'] ?? null;

    if (!$ptId) {
        echo json_encode(["success" => false, "error" => "PT ID eksik"]);
        exit;
    }

    try {
        // PT'ye ait randevuları çek
        $sql = "
            SELECT 
                a.id, 
                a.appointment_date, 
                a.time, 
                a.status,
                u.name as student_name, 
                u.surname as student_surname
            FROM appointments a
            JOIN users u ON a.user_id = u.id
            WHERE a.pt_id = ? AND a.status != 'cancelled'
            ORDER BY a.appointment_date ASC, a.time ASC
        ";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$ptId]);
        $allAppointments = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $upcoming = [];
        $completed = [];
        
        foreach ($allAppointments as $app) {
            // İsim Birleştirme
            $app['student'] = $app['student_name'] . ' ' . $app['student_surname'];
            
            // Tarih Formatlama (Basit Yöntem - Sunucu uyumlu)
            $dateObj = new DateTime($app['appointment_date']);
            $months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
            $day = $dateObj->format('d');
            $monthIndex = (int)$dateObj->format('m') - 1;
            $year = $dateObj->format('Y');
            
            $app['date_formatted'] = "$day " . $months[$monthIndex] . " $year";
            $app['time_formatted'] = substr($app['time'], 0, 5); // 14:00

            // LİSTELEME MANTIĞI (GÜNCELLENDİ)
            // Sadece status 'completed' ise tamamlanmışa at.
            // Tarihi geçmiş olsa bile hoca onaylamadıysa 'upcoming'de kalsın.
            if ($app['status'] === 'completed') {
                $completed[] = $app;
            } else {
                $upcoming[] = $app;
            }
        }
        
        // Tamamlananları tarihe göre tersten sırala (En yeni en üstte)
        usort($completed, function($a, $b) {
            return strtotime($b['appointment_date'] . ' ' . $b['time']) - strtotime($a['appointment_date'] . ' ' . $a['time']);
        });

        echo json_encode([
            "success" => true,
            "upcoming" => $upcoming,
            "completed" => $completed
        ]);

    } catch (PDOException $e) {
        echo json_encode(["success" => false, "error" => $e->getMessage()]);
    }
}

// --- 2. DERSİ TAMAMLA ---
if ($method === 'POST' && $action === 'complete') {
    $data = json_decode(file_get_contents("php://input"), true);
    $appointmentId = $data['id'] ?? null;

    if (!$appointmentId) {
        echo json_encode(["success" => false, "error" => "ID eksik"]);
        exit;
    }

    try {
        // Sadece durumu güncelle (Bakiye randevu alınırken düşmüştü)
        $updSql = "UPDATE appointments SET status = 'completed' WHERE id = ?";
        $stmt = $pdo->prepare($updSql);
        $stmt->execute([$appointmentId]);

        echo json_encode(["success" => true]);

    } catch (PDOException $e) {
        echo json_encode(["success" => false, "error" => $e->getMessage()]);
    }
}
?>
