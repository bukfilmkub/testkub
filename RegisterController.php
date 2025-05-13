<?php
// Include database connection
include('connectdb.php');

// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get POST data and sanitize inputs
    $status_mb = mysqli_real_escape_string($con, $_POST['status_mb']);
    $ip = mysqli_real_escape_string($con, $_POST['ip']);
    $date_mb = mysqli_real_escape_string($con, $_POST['date_mb']);
    $aff = mysqli_real_escape_string($con, $_POST['aff']);
    $phone_mb = mysqli_real_escape_string($con, $_POST['phone_mb']);
    $phone_true = mysqli_real_escape_string($con, $_POST['phone_true']);
    $password_mb = mysqli_real_escape_string($con, $_POST['password_mb']);
    $bank_mb = mysqli_real_escape_string($con, $_POST['bank_mb']);
    $bankacc_mb = mysqli_real_escape_string($con, $_POST['bankacc_mb']);
    $name_mb = mysqli_real_escape_string($con, $_POST['name_mb']);

    // Basic validations
    if (empty($phone_mb) || empty($phone_true) || empty($password_mb) || empty($bank_mb) || empty($bankacc_mb) || empty($name_mb)) {
        header("Location: register.php");
        exit();
    }

    // Check if phone number already exists
    $query = "SELECT * FROM users WHERE phone_mb = '$phone_mb' OR phone_true = '$phone_true' OR bankacc_mb = '$bankacc_mb' LIMIT 1";
    $result = mysqli_query($con, $query);
    if (mysqli_num_rows($result) > 0) {
        // If duplicate, redirect with error
        header("Location: register.php");
        exit();
    }

    // Insert the data into the database
    $query = "INSERT INTO users (status_mb, ip, date_mb, aff, phone_mb, phone_true, password_mb, bank_mb, bankacc_mb, name_mb) 
              VALUES ('$status_mb', '$ip', '$date_mb', '$aff', '$phone_mb', '$phone_true', '$password_mb', '$bank_mb', '$bankacc_mb', '$name_mb')";
    
    if (mysqli_query($con, $query)) {
        // Successfully inserted
        header("Location: register_success.php");
        exit();
    } else {
        // Error in insertion
        header("Location: register.php");
        exit();
    }
}
?>
