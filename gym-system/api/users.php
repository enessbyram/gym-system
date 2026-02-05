<?php
require 'db.php';
header("Content-Type: application/json; charset=UTF-8");

$role = $_GET['role'] ?? '';

try {
    if ($role) {
        // Rol belirtilmişse (örn: role=pt) sadece o roldeki kullanıcıları getir
        $stmt = $pdo->prepare("SELECT id, CONCAT(name, ' ', surname) as name, email, role FROM users WHERE role = ? AND status = 1");
        $stmt->execute([$role]);
    } else {
        // Belirtilmemişse hepsini getir
        $stmt = $pdo->query("SELECT id, CONCAT(name, ' ', surname) as name, email, role FROM users");
    }
    
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($users);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
?>