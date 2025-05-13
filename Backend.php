<?php
// รับค่าจาก Frontend
$phone = $_POST['phone'] ?? '';
$password = $_POST['password'] ?? '';

// ตรวจสอบข้อมูล
if (empty($phone) || !preg_match('/^[0-9]{10}$/', $phone)) {
    die("เบอร์โทรศัพท์ไม่ถูกต้อง");
}

if (strlen($password) < 6) {
    die("รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร");
}

// เรียกใช้ API หรือบันทึกลงฐานข้อมูล
$response = register($phone, $password);
$responseData = json_decode($response, true);

if (isset($responseData['status']) && $responseData['status'] == 'success') {
    echo "สมัครสมาชิกสำเร็จ";
} else {
    echo "การสมัครสมาชิกล้มเหลว: " . ($responseData['message'] ?? 'Unknown error');
}
?>