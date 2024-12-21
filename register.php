<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection details
$servername = "localhost";
$username = "root"; // Default MySQL username
$password = ""; // Your MySQL password, if any
$dbname = "test"; // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Sanitize and retrieve form data
    $firstName = mysqli_real_escape_string($conn, $_POST['firstName']);
    $middleName = mysqli_real_escape_string($conn, $_POST['middleName']);
    $lastName = mysqli_real_escape_string($conn, $_POST['lastName']);
    $dob = mysqli_real_escape_string($conn, $_POST['age']); // Assuming 'age' is date of birth (age is misleading as field name)
    $mobileNumber = mysqli_real_escape_string($conn, $_POST['mobileNumber']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $verificationCode = mysqli_real_escape_string($conn, $_POST['verificationCode']); // Assuming verification code is being captured

    // Insert user registration data into the database
    $sql = "INSERT INTO registration (first_name, middle_name, last_name, dob, mobile_number, email, verification_code)
            VALUES (?, ?, ?, ?, ?, ?, ?)";

    // Prepare statement to avoid SQL injection
    $stmt = $conn->prepare($sql);
    if ($stmt === false) {
        die("Prepare failed: " . $conn->error);
    }

    // Bind parameters and execute
    $stmt->bind_param("sssssss", $firstName, $middleName, $lastName, $dob, $mobileNumber, $email, $verificationCode);

    if ($stmt->execute()) {
        echo "Registration successful!";
    } else {
        echo "Error: " . $stmt->error;
    }

    // Close the statement
    $stmt->close();
}

// Close the connection
$conn->close();
?>
