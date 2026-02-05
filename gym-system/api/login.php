<?php
// api/login.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

require 'db.php';

$data = json_decode(file_get_contents("php://input"));

if(isset($data->email) && isset($data->password) && isset($data->role)) {
    $email = $data->email;
    $password = $data->password;
    $role = $data->role;

    try {
        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ? AND role = ?");
        $stmt->execute([$email, $role]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            if ($password === $user['password']) {
                
                if ($user['status'] == 0) {
                    echo json_encode(["success" => false, "message" => "Hesabınız pasif durumdadır. Yönetici ile görüşünüz."]);
                    exit;
                }

                echo json_encode([
                    "success" => true,
                    "message" => "Giriş başarılı",
                    "user" => [
                        "id" => $user['id'],
                        "name" => $user['name'] . " " . $user['surname'],
                        "email" => $user['email'],
                        "role" => $user['role']
                    ]
                ]);
            } else {
                echo json_encode(["success" => false, "message" => "Hatalı şifre"]);
            }
        } else {
            echo json_encode(["success" => false, "message" => "Kullanıcı bulunamadı"]);
        }
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "message" => "Veritabanı hatası: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Eksik bilgi"]);
}
?>