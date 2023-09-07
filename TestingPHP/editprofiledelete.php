<?php

    include_once('connection.php');
    if(isset($_POST["btn_vm"])){
        $fullprofile = filter_var($_POST['btn_vm'],FILTER_SANITIZE_STRING);
        
        
        $sql = "DELETE From pf_db WHERE id = '$fullprofile'";
        $result = $conn->query($sql);

        if ($result) {
            // Check if any rows were deleted
            if ($conn->affected_rows > 0) {
                echo "Record deleted successfully.";
            } else {
                echo "No records were deleted.";
            }
        } else {
            echo "Error deleting record: " . $conn->error;
        }
    }
    
?>