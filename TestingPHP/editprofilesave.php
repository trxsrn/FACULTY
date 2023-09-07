
<?php
    include_once('connection.php');
    if(isset($_POST["fullname"]) || isset($_POST["fname"]) || isset($_POST["mname"]) || isset($_POST["img"]) || isset($_POST["lname"]) || isset($_POST["email"]) || isset($_POST["link1"]) || isset($_POST["link2"]) || isset($_POST["college"]) || isset($_POST["department"]))
    {
        $folder = "../IMG/";
        $fullprofile = filter_var($_POST['btnVm'],FILTER_SANITIZE_NUMBER_INT);
        $editImg = $_POST['img'];
        $editFullname = filter_var($_POST['fullname'], FILTER_SANITIZE_STRING);
        $editFirstname = filter_var($_POST['fname'], FILTER_SANITIZE_STRING);
        $editLastname = filter_var($_POST['lname'], FILTER_SANITIZE_STRING);
        $editMname = filter_var($_POST['mname'], FILTER_SANITIZE_STRING);
        $editLink1 = filter_var($_POST['link1'], FILTER_SANITIZE_URL);
        $editLink2 = filter_var($_POST['link2'], FILTER_SANITIZE_URL);
        $editCollege = filter_var($_POST['college'], FILTER_SANITIZE_STRING);
        $editDepartment = filter_var($_POST['department'], FILTER_SANITIZE_STRING);
        $editEmail = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
        
        // if ($oldImg === "R&DCDefaultProfile.png") {
        //    echo "default gamit ";
        // } else {
        //     unlink($folder . $oldImg);
        // }
        
        if (isset($_FILES['image']) && $_FILES['image']['name']) {
            $filename = $_FILES['image']['name'];
            $tmpname = $_FILES['image']['tmp_name'];
            move_uploaded_file($tmpname, $folder . $filename);
        } else {
            echo "hindi masave";
            //Do nothing
        }
        

        $sql = "UPDATE pf_db SET f_name='$editFullname', fs_name='$editFirstname', s_name='$editLastname', m_name= '$editMname', rtu_gmail='$editEmail', c_college='$editCollege', d_department='$editDepartment', d_fbpage='$editLink1', g_scholar='$editLink2', ProfileImg='$editImg' WHERE id = '$fullprofile'";
        $result = $conn->query($sql);
        
        if ($result) {
            echo "The record updated successfully";
        } else {
            echo "error";
        }

        $conn->close();

    }
    else{
        echo "Ano bayan Error";
    }
?>



