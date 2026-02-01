<?php
// Hata raporlama
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

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

// --- 1. PAKETLERİ VE ÖZELLİKLERİNİ GETİR ---
function handleGet($pdo) {
    try {
        // Önce paketleri çek
        $stmt = $pdo->query("SELECT * FROM packages ORDER BY id DESC");
        $packages = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Her paketin özelliklerini çekip içine ekle
        foreach ($packages as &$pkg) {
            $featStmt = $pdo->prepare("SELECT feature_text FROM package_features WHERE package_id = ?");
            $featStmt->execute([$pkg['id']]);
            // Sadece metinleri içeren düz bir diziye çevir (['Havlu', 'Su'] gibi)
            $pkg['features'] = $featStmt->fetchAll(PDO::FETCH_COLUMN);
        }

        echo json_encode($packages);
    } catch (PDOException $e) {
        echo json_encode(["error" => "Veri çekme hatası: " . $e->getMessage()]);
    }
}

// --- 2. PAKET EKLEME VE GÜNCELLEME ---
function handlePost($pdo) {
    // JSON verisini al (React'ten JSON yollayacağız, FormData değil)
    $data = json_decode(file_get_contents("php://input"), true);

    $title = $data['title'] ?? '';
    $price = $data['price'] ?? 0;
    $duration_days = $data['duration_days'] ?? 30;
    $session_count = $data['session_count'] ?? 0;
    $features = $data['features'] ?? [];
    $id = $data['id'] ?? null;

    // Tip belirleme (PT mi GYM mi?)
    $type = ($session_count > 0) ? 'pt' : 'gym';

    try {
        $pdo->beginTransaction(); // İşlemleri bir bütün olarak yap (Hata olursa geri al)

        if ($id) {
            // --- GÜNCELLEME ---
            $sql = "UPDATE packages SET title=?, price=?, duration_days=?, session_count=?, type=? WHERE id=?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$title, $price, $duration_days, $session_count, $type, $id]);

            // Özellikleri güncellemek zor olduğu için: Önce eskileri sil, sonra yenileri ekle.
            $delFeat = $pdo->prepare("DELETE FROM package_features WHERE package_id = ?");
            $delFeat->execute([$id]);
            
            $packageId = $id;
            $msg = "Paket güncellendi";
        } else {
            // --- EKLEME ---
            $sql = "INSERT INTO packages (title, price, duration_days, session_count, type) VALUES (?, ?, ?, ?, ?)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$title, $price, $duration_days, $session_count, $type]);
            
            $packageId = $pdo->lastInsertId();
            $msg = "Paket eklendi";
        }

        // Özellikleri Ekleme (Döngü ile)
        if (!empty($features)) {
            $insertFeat = $pdo->prepare("INSERT INTO package_features (package_id, feature_text) VALUES (?, ?)");
            foreach ($features as $feature) {
                if (trim($feature) !== "") {
                    $insertFeat->execute([$packageId, $feature]);
                }
            }
        }

        $pdo->commit(); // İşlemi onayla
        echo json_encode(["success" => true, "message" => $msg]);

    } catch (PDOException $e) {
        $pdo->rollBack(); // Hata olursa işlemleri geri al
        echo json_encode(["error" => "Veritabanı hatası: " . $e->getMessage()]);
    }
}

// --- 3. SİLME ---
function handleDelete($pdo) {
    $id = $_GET['id'] ?? null;
    if (!$id) {
        echo json_encode(["error" => "ID gerekli"]);
        return;
    }

    try {
        // package_features tablosunda 'ON DELETE CASCADE' ayarlıysa özellikleri silmeye gerek yok.
        // Ama biz garanti olsun diye önce özellikleri silelim.
        $delFeat = $pdo->prepare("DELETE FROM package_features WHERE package_id = ?");
        $delFeat->execute([$id]);

        $delPkg = $pdo->prepare("DELETE FROM packages WHERE id = ?");
        $delPkg->execute([$id]);

        echo json_encode(["success" => true, "message" => "Paket silindi"]);
    } catch (PDOException $e) {
        echo json_encode(["error" => "Silme hatası: " . $e->getMessage()]);
    }
}
?>
