<?php
// Database connection parameters
    $servername = "localhost";
	$username = "root";
	$password = "Lxgiwyl@123";
	$db = "faculty_profile";


// Data to be inserted
$newValue = "R&DCDefaultProfile.png";

// Create a connection
$conn = new mysqli($servername, $username, $password, $db);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// SQL query to update the column with the new value
$sql = "UPDATE pf_db SET ProfileImg = '$newValue'";

// Execute the query
if ($conn->query($sql) === TRUE) {
    echo "Data inserted successfully.";
} else {
    echo "Error: " . $conn->error;
}

// Close the connection
$conn->close();
?>
