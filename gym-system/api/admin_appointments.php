<?php
// Hataları gizle
error_reporting(0);
ini_set('display_errors', 0);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

require 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    try {
        // Tüm randevuları çek
        $sql = "
            SELECT 
                a.id, 
                a.appointment_date, 
                a.time, 
                a.type, 
                a.status,
                u.name as student_name, 
                u.surname as student_surname,
                pt.name as pt_name, 
                pt.surname as pt_surname
            FROM appointments a
            JOIN users u ON a.user_id = u.id
            LEFT JOIN users pt ON a.pt_id = pt.id
            WHERE a.status != 'cancelled'
            ORDER BY a.appointment_date ASC, a.time ASC
        ";
        
        $stmt = $pdo->query($sql);
        $allAppointments = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $formatted = [];
        
        foreach ($allAppointments as $app) {
            $studentFullName = $app['student_name'] . ' ' . $app['student_surname'];
            $ptFullName = $app['pt_name'] ? ($app['pt_name'] . ' ' . $app['pt_surname']) : null;

            // ÖNEMLİ DÜZELTME: Veritabanından gelen "2026-01-30 00:00:00" formatını "2026-01-30" yapıyoruz.
            $cleanDate = date('Y-m-d', strtotime($app['appointment_date']));

            $formatted[] = [
                'id' => $app['id'],
                'date' => $cleanDate, // Artık takvim bunu tanıyacak
                'time' => substr($app['time'], 0, 5),
                'member' => $studentFullName,
                'type' => $app['type'],
                'trainer' => $ptFullName,
                'status' => $app['status']
            ];
        }

        echo json_encode(["success" => true, "appointments" => $formatted]);

    } catch (PDOException $e) {
        echo json_encode(["success" => false, "error" => $e->getMessage()]);
    }
}
?>
