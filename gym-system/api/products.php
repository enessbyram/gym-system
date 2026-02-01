<?php
// Hata ayıklama modunu aç (Geliştirme aşamasında hayat kurtarır)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// CORS Ayarları (React ile iletişim için)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// OPTIONS isteği gelirse (Preflight) 200 dönüp bitiriyoruz
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

require 'db.php'; // Veritabanı bağlantısı

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

// --- 1. GET: Ürünleri Listele ---
function handleGet($pdo) {
    try {
        $stmt = $pdo->query("SELECT * FROM products ORDER BY id DESC");
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Veriyi Frontend formatına çeviriyoruz
        $data = array_map(function($product) {
            return [
                'id' => $product['id'],
                'name' => $product['title'], // DB'de 'title', React'te 'name'
                'price' => $product['price'],
                'stock' => $product['stock'],
                'description' => $product['description'],
                // Resim yolunu tam URL olarak veriyoruz
                'image' => $product['image_path'] ? "http://localhost/gym-system/uploads/" . $product['image_path'] : null
            ];
        }, $products);

        echo json_encode($data);
    } catch (PDOException $e) {
        echo json_encode(["error" => "Veri çekme hatası: " . $e->getMessage()]);
    }
}

// --- 2. POST: Ekleme ve Güncelleme ---
function handlePost($pdo) {
    // React FormData'dan gelen veriler
    $name = $_POST['name'] ?? '';
    $price = $_POST['price'] ?? 0;
    $stock = $_POST['stock'] ?? 0;
    $description = $_POST['description'] ?? '';
    $id = $_POST['id'] ?? null;

    $imagePath = null;

    // DOSYA YÜKLEME MANTIĞI
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        
        $uploadDir = '../uploads/'; // api klasörünün bir üstündeki uploads klasörü
        
        // Güvenlik için dosya uzantısını kontrol edip benzersiz isim veriyoruz
        $fileInfo = pathinfo($_FILES['image']['name']);
        $extension = strtolower($fileInfo['extension']);
        
        // Sadece resim dosyalarına izin ver (Opsiyonel güvenlik)
        $allowedTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
        if (in_array($extension, $allowedTypes)) {
            $newFileName = uniqid('prod_') . '.' . $extension; // Örn: prod_65a4bc.jpg
            $targetFile = $uploadDir . $newFileName;

            if (move_uploaded_file($_FILES['image']['tmp_name'], $targetFile)) {
                $imagePath = $newFileName; // DB'ye sadece dosya adını kaydedeceğiz
            } else {
                echo json_encode(["error" => "Dosya klasöre taşınamadı. Klasör yazma iznini kontrol edin."]);
                exit();
            }
        }
    }

    try {
        if ($id) {
            // --- GÜNCELLEME (UPDATE) ---
            if ($imagePath) {
                // Yeni resim varsa, eski resmi de silmek iyi olur (Opsiyonel)
                // updateWithImage
                $sql = "UPDATE products SET title=?, price=?, stock=?, description=?, image_path=? WHERE id=?";
                $stmt = $pdo->prepare($sql);
                $stmt->execute([$name, $price, $stock, $description, $imagePath, $id]);
            } else {
                // Resim değişmediyse sadece metinleri güncelle
                $sql = "UPDATE products SET title=?, price=?, stock=?, description=? WHERE id=?";
                $stmt = $pdo->prepare($sql);
                $stmt->execute([$name, $price, $stock, $description, $id]);
            }
            echo json_encode(["success" => true, "message" => "Güncellendi"]);

        } else {
            // --- EKLEME (INSERT) ---
            $sql = "INSERT INTO products (title, price, stock, description, image_path) VALUES (?, ?, ?, ?, ?)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$name, $price, $stock, $description, $imagePath]);
            
            echo json_encode(["success" => true, "id" => $pdo->lastInsertId(), "message" => "Eklendi"]);
        }
    } catch (PDOException $e) {
        echo json_encode(["error" => "Veritabanı hatası: " . $e->getMessage()]);
    }
}

// --- 3. DELETE: Silme ---
function handleDelete($pdo) {
    $id = $_GET['id'] ?? null;

    if (!$id) {
        echo json_encode(["error" => "ID eksik"]);
        return;
    }

    try {
        // Önce resim dosyasının adını bulup sunucudan silelim
        $stmt = $pdo->prepare("SELECT image_path FROM products WHERE id = ?");
        $stmt->execute([$id]);
        $product = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($product && $product['image_path']) {
            $filePath = '../uploads/' . $product['image_path'];
            if (file_exists($filePath)) {
                unlink($filePath); // Dosyayı sil
            }
        }

        // Sonra veritabanından kaydı sil
        $delStmt = $pdo->prepare("DELETE FROM products WHERE id = ?");
        $delStmt->execute([$id]);

        echo json_encode(["success" => true, "message" => "Silindi"]);
    } catch (PDOException $e) {
        echo json_encode(["error" => "Silme hatası: " . $e->getMessage()]);
    }
}
?>
