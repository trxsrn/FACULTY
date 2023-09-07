<?php
include_once('connection.php');

if(isset($_POST["fullname"]) || isset($_POST["fname"]) || isset($_POST["mname"]) || isset($_POST["img"]) || isset($_POST["lname"]) || isset($_POST["email"]) || isset($_POST["link1"]) || isset($_POST["link2"]) || isset($_POST["college"]) || isset($_POST["department"]))
{
    $add_img = filter_var($_POST['img'], FILTER_SANITIZE_STRING);
    $add_fullname = filter_var($_POST['fullname'], FILTER_SANITIZE_STRING);
    $add_firstname = filter_var($_POST['fname'], FILTER_SANITIZE_STRING);
    $add_lastname = filter_var($_POST['lname'], FILTER_SANITIZE_STRING);
    $add_mname = filter_var($_POST['mname'], FILTER_SANITIZE_STRING);
    $add_link1 = filter_var($_POST['link1'], FILTER_SANITIZE_URL);
    $add_link2 = filter_var($_POST['link2'], FILTER_SANITIZE_URL);
    $add_college = filter_var($_POST['college'], FILTER_SANITIZE_STRING);
    $add_department = filter_var($_POST['department'], FILTER_SANITIZE_STRING);
    $add_email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);

    $sql = "SELECT *FROM pf_db WHERE f_name LIKE '%".mysqli_real_escape_string($conn, $add_fullname)."%'";
    $result = $conn->query($sql);
    $trecords = mysqli_num_rows($result);

    if($trecords>0){
        echo "encounter";
    }
    else{
        if (isset($_FILES['image']) && $_FILES['image']['name']) {
            $filename = $_FILES['image']['name'];
            $tmpname = $_FILES['image']['tmp_name'];
            $folder = "../IMG/";
            move_uploaded_file($tmpname, $folder . $filename);
        }
    
        
    
        $stmt = $conn->prepare("INSERT INTO pf_db (f_name, m_name, fs_name, s_name, rtu_gmail, c_college, d_department, d_fbpage, g_scholar, ProfileImg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssssssss", $add_fullname, $add_mname, $add_firstname, $add_lastname, $add_email, $add_college, $add_department, $add_link1, $add_link2, $add_img);
    
        if ($stmt->execute()) {
            echo "New record created successfully";
        } else {
            echo "error";
        }
    
        $stmt->close();
        $conn->close();
    }
}
else{
    echo "Ano bayan Error";
}
?>
