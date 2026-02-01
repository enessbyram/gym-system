<?php
// Hataları göster
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

require 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        handleGet($pdo);
        break;
    case 'POST':
        handlePost($pdo);
        break;
    case 'DELETE':
        handleDelete($pdo);
        break;
    default:
        echo json_encode(["message" => "Geçersiz metod"]);
        break;
}

// --- 1. GET: Sliderları Getir ---
function handleGet($pdo) {
    try {
        $stmt = $pdo->query("SELECT * FROM sliders ORDER BY id DESC");
        $sliders = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $data = array_map(function($item) {
            return [
                'id' => $item['id'],
                // Frontend 'image' bekliyor, biz tam URL döndürelim
                'image' => "http://localhost/gym-system/uploads/" . $item['image_path'],
                'alt' => $item['title'] // Alt metin olarak veritabanındaki title'ı kullanalım
            ];
        }, $sliders);

        echo json_encode($data);
    } catch (PDOException $e) {
        echo json_encode(["error" => "Veri çekme hatası: " . $e->getMessage()]);
    }
}

// --- 2. POST: Yeni Slider Ekle ---
function handlePost($pdo) {
    $imagePath = null;

    // Dosya Yükleme
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = '../uploads/';
        
        $fileInfo = pathinfo($_FILES['image']['name']);
        $extension = strtolower($fileInfo['extension']);
        $allowedTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

        if (in_array($extension, $allowedTypes)) {
            $newFileName = uniqid('slider_') . '.' . $extension;
            $targetFile = $uploadDir . $newFileName;

            if (move_uploaded_file($_FILES['image']['tmp_name'], $targetFile)) {
                $imagePath = $newFileName;
            } else {
                echo json_encode(["error" => "Dosya yüklenemedi. İzinleri kontrol edin."]);
                exit();
            }
        } else {
            echo json_encode(["error" => "Geçersiz dosya formatı."]);
            exit();
        }
    } else {
        echo json_encode(["error" => "Lütfen bir resim seçin."]);
        exit();
    }

    try {
        // Varsayılan değerlerle kayıt (Frontend'de title inputu olmadığı için)
        $title = "Slider Görseli";
        $item_order = 0;
        $is_active = 1;

        $sql = "INSERT INTO sliders (image_path, title, item_order, is_active) VALUES (?, ?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$imagePath, $title, $item_order, $is_active]);

        echo json_encode(["success" => true, "message" => "Slider eklendi", "id" => $pdo->lastInsertId()]);

    } catch (PDOException $e) {
        echo json_encode(["error" => "Veritabanı hatası: " . $e->getMessage()]);
    }
}

// --- 3. DELETE: Slider Sil ---
function handleDelete($pdo) {
    $id = $_GET['id'] ?? null;

    if (!$id) {
        echo json_encode(["error" => "ID gerekli"]);
        return;
    }

    try {
        // Önce dosyayı sil
        $stmt = $pdo->prepare("SELECT image_path FROM sliders WHERE id = ?");
        $stmt->execute([$id]);
        $slider = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($slider && $slider['image_path']) {
            $filePath = '../uploads/' . $slider['image_path'];
            if (file_exists($filePath)) {
                unlink($filePath);
            }
        }

        // Sonra kaydı sil
        $del = $pdo->prepare("DELETE FROM sliders WHERE id = ?");
        $del->execute([$id]);

        echo json_encode(["success" => true, "message" => "Silindi"]);
    } catch (PDOException $e) {
        echo json_encode(["error" => "Silme hatası: " . $e->getMessage()]);
    }
}
?>
