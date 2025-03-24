<?php
require('connection.php');

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $name = $_POST['uname'];
    $pass = $_POST['pass'];

    $query = "SELECT * FROM User WHERE name = ? AND password = ?";
    $stmt = $con->prepare($query);
    
    if ($stmt) {
        $stmt->bind_param("ss", $name, $pass);
        $stmt->execute();
        
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            session_start();
            $_SESSION['uname'] = $name;
            header("Location: index.php");
            exit();
        } else {
            echo "Invalid username or password.";
        }

        $stmt->close();
    } else {
        echo "Error: " . $con->error;
    }

    $con->close();
}
?>
