<?php
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

// --- 1. GET ---
function handleGet($pdo) {
    try {
        $sql = "
            SELECT 
                u.id, CONCAT(u.name, ' ', u.surname) as full_name, u.email, u.phone, u.status,
                m.id as membership_id, m.start_date, m.end_date, 
                m.remaining_sessions, m.purchase_price, -- purchase_price eklendi
                p.id as package_id, p.title as package_title, p.price as current_package_price, p.type
            FROM users u
            LEFT JOIN memberships m ON u.id = m.user_id AND m.status = 'active'
            LEFT JOIN packages p ON m.package_id = p.id
            WHERE u.role = 'member' 
            ORDER BY u.id DESC
        ";
        
        $stmt = $pdo->query($sql);
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $formattedUsers = array_map(function($user) use ($pdo) {
            
            // GEÇMİŞ SORGUSU GÜNCELLENDİ: Fiyat artık üyelik tablosundan (purchase_price) geliyor
            $historyStmt = $pdo->prepare("
                SELECT p.title, m.purchase_price as price, m.start_date as start, m.end_date as end
                FROM memberships m
                JOIN packages p ON m.package_id = p.id
                WHERE m.user_id = ? AND m.status = 'expired'
                ORDER BY m.end_date DESC
            ");
            $historyStmt->execute([$user['id']]);
            $history = $historyStmt->fetchAll(PDO::FETCH_ASSOC);

            // Kalan Gün
            $remainingDays = 0;
            if ($user['end_date']) {
                $today = new DateTime();
                $end = new DateTime($user['end_date']);
                if ($end > $today) {
                    $diff = $today->diff($end);
                    $remainingDays = $diff->days;
                }
            }

            return [
                'id' => $user['id'],
                'name' => $user['full_name'],
                'email' => $user['email'],
                'phone' => $user['phone'],
                'status' => $user['status'] == 1 ? 'Aktif' : 'Pasif',
                'package' => $user['package_title'] ?? 'Paket Yok',
                'packageId' => $user['package_id'],
                // Eğer aktif paket varsa onun satın alındığı fiyatı göster, yoksa 0
                'price' => $user['purchase_price'] ? $user['purchase_price'] : ($user['current_package_price'] ?? 0),
                'remainingDays' => $remainingDays,
                'remainingSessions' => $user['remaining_sessions'] ?? 0,
                'startDate' => $user['start_date'],
                'history' => $history
            ];
        }, $users);

        echo json_encode($formattedUsers);

    } catch (PDOException $e) {
        echo json_encode(["error" => "Veri çekme hatası: " . $e->getMessage()]);
    }
}

// --- 2. POST ---
function handlePost($pdo) {
    $data = json_decode(file_get_contents("php://input"), true);
    $action = $data['action'] ?? 'save';

    try {
        if ($action === 'toggle_status') {
            $id = $data['id'];
            $newStatus = $data['status'] === 'Aktif' ? 0 : 1;
            $stmt = $pdo->prepare("UPDATE users SET status = ? WHERE id = ?");
            $stmt->execute([$newStatus, $id]);
            echo json_encode(["success" => true]);
            return;
        }

        if ($action === 'add_days') {
            $userId = $data['id'];
            $days = intval($data['extraDays']);
            $stmt = $pdo->prepare("SELECT id, end_date FROM memberships WHERE user_id = ? AND status = 'active' LIMIT 1");
            $stmt->execute([$userId]);
            $membership = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($membership) {
                $newEndDate = date('Y-m-d', strtotime($membership['end_date'] . " + $days days"));
                $update = $pdo->prepare("UPDATE memberships SET end_date = ? WHERE id = ?");
                $update->execute([$newEndDate, $membership['id']]);
                echo json_encode(["success" => true]);
            } else {
                echo json_encode(["error" => "Aktif üyelik bulunamadı."]);
            }
            return;
        }

        if ($action === 'add_session') {
            $userId = $data['id'];
            $sessions = intval($data['extraSessions']);
            $stmt = $pdo->prepare("UPDATE memberships SET remaining_sessions = remaining_sessions + ? WHERE user_id = ? AND status = 'active'");
            $stmt->execute([$sessions, $userId]);
            echo json_encode(["success" => true]);
            return;
        }

        // --- KAYIT / GÜNCELLEME ---
        $fullName = trim($data['name']);
        $parts = explode(' ', $fullName);
        if (count($parts) > 1) {
            $surname = array_pop($parts);
            $name = implode(' ', $parts);
        } else {
            $name = $fullName;
            $surname = '';
        }

        $email = $data['email'];
        $phone = $data['phone'];
        $password = $data['password'] ?? '123456';
        $packageId = $data['packageId'];
        $startDate = $data['startDate'] ?: date('Y-m-d');
        $id = $data['id'] ?? null;

        $pdo->beginTransaction();

        if ($id) {
            // GÜNCELLEME
            $sql = "UPDATE users SET name=?, surname=?, email=?, phone=? WHERE id=?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$name, $surname, $email, $phone, $id]);
            
            if (!empty($data['password'])) {
                $pdo->prepare("UPDATE users SET password=? WHERE id=?")->execute([$data['password'], $id]);
            }
            // NOT: Burada paket değişikliği senaryosu eklenmedi, sadece kullanıcı bilgileri güncelleniyor.
        } else {
            // EKLEME
            $sql = "INSERT INTO users (name, surname, email, phone, password, role, status) VALUES (?, ?, ?, ?, ?, 'member', 1)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$name, $surname, $email, $phone, $password]);
            $userId = $pdo->lastInsertId();

            // PAKET BİLGİSİNİ VE FİYATINI ÇEK
            $pkgStmt = $pdo->prepare("SELECT duration_days, session_count, price FROM packages WHERE id = ?");
            $pkgStmt->execute([$packageId]);
            $pkg = $pkgStmt->fetch(PDO::FETCH_ASSOC);

            if ($pkg) {
                $endDate = date('Y-m-d', strtotime($startDate . " + " . $pkg['duration_days'] . " days"));
                
                // purchase_price EKLENDİ: O anki paket fiyatını kaydediyoruz
                $memSql = "INSERT INTO memberships (user_id, package_id, start_date, end_date, total_sessions, remaining_sessions, status, purchase_price) VALUES (?, ?, ?, ?, ?, ?, 'active', ?)";
                $pdo->prepare($memSql)->execute([$userId, $packageId, $startDate, $endDate, $pkg['session_count'], $pkg['session_count'], $pkg['price']]);
            }
        }

        $pdo->commit();
        echo json_encode(["success" => true]);

    } catch (PDOException $e) {
        $pdo->rollBack();
        echo json_encode(["error" => "Veritabanı hatası: " . $e->getMessage()]);
    }
}
?>
