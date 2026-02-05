<?php
// api/products.php

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

// --- 1. GET: Ürünleri Listele ---
function handleGet($pdo) {
    try {
        $stmt = $pdo->query("SELECT * FROM products ORDER BY id DESC");
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $data = array_map(function($product) {
            return [
                'id' => $product['id'],
                'name' => $product['title'], 
                'price' => $product['price'],
                'stock' => $product['stock'],
                'description' => $product['description'],
                // DÜZELTME BURADA YAPILDI:
                // Artık "http://localhost..." yok. Sadece dosya ismi gönderiyoruz.
                // Örn: "prod_123.jpg"
                'image' => $product['image_path'] 
            ];
        }, $products);

        echo json_encode($data);
    } catch (PDOException $e) {
        echo json_encode(["error" => "Veri çekme hatası: " . $e->getMessage()]);
    }
}

// --- 2. POST: Ekleme ve Güncelleme ---
function handlePost($pdo) {
    $name = $_POST['name'] ?? '';
    $price = $_POST['price'] ?? 0;
    $stock = $_POST['stock'] ?? 0;
    $description = $_POST['description'] ?? '';
    $id = $_POST['id'] ?? null;

    $imagePath = null;

    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = '../uploads/';
        
        $fileInfo = pathinfo($_FILES['image']['name']);
        $extension = strtolower($fileInfo['extension']);
        $allowedTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
        
        if (in_array($extension, $allowedTypes)) {
            $newFileName = uniqid('prod_') . '.' . $extension;
            $targetFile = $uploadDir . $newFileName;

            if (move_uploaded_file($_FILES['image']['tmp_name'], $targetFile)) {
                $imagePath = $newFileName;
            } else {
                echo json_encode(["error" => "Dosya yüklenemedi."]);
                exit();
            }
        }
    }

    try {
        if ($id) {
            if ($imagePath) {
                $sql = "UPDATE products SET title=?, price=?, stock=?, description=?, image_path=? WHERE id=?";
                $stmt = $pdo->prepare($sql);
                $stmt->execute([$name, $price, $stock, $description, $imagePath, $id]);
            } else {
                $sql = "UPDATE products SET title=?, price=?, stock=?, description=? WHERE id=?";
                $stmt = $pdo->prepare($sql);
                $stmt->execute([$name, $price, $stock, $description, $id]);
            }
            echo json_encode(["success" => true, "message" => "Güncellendi"]);

        } else {
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
        $stmt = $pdo->prepare("SELECT image_path FROM products WHERE id = ?");
        $stmt->execute([$id]);
        $product = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($product && $product['image_path']) {
            $filePath = '../uploads/' . $product['image_path'];
            if (file_exists($filePath)) {
                unlink($filePath);
            }
        }
        $delStmt = $pdo->prepare("DELETE FROM products WHERE id = ?");
        $delStmt->execute([$id]);
        echo json_encode(["success" => true, "message" => "Silindi"]);
    } catch (PDOException $e) {
        echo json_encode(["error" => "Silme hatası: " . $e->getMessage()]);
    }
}
?>