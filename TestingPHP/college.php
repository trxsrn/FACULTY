<?php

    include_once('connection.php');
        
    // PAGE NUMBER THAT LIMIT UP TO 15 ONLY THAT WILL APPEAR ON THE FIRST PAGE.
    if(isset($_POST["offset"]) || isset($_POST["limit"])){
        $offset = filter_var($_POST['offset'], FILTER_SANITIZE_NUMBER_INT );
        $limit = filter_var($_POST['limit'], FILTER_SANITIZE_NUMBER_INT );

        //PAGE ID
        // $active = $_POST["active"];
        // FOR PAGINATION
        $college = filter_var($_POST['c_select'],FILTER_SANITIZE_STRING);
            
            
            $sql = "SELECT  *From pf_db WHERE `c_college` = '$college' GROUP BY s_name LIMIT $offset, $limit ";
            $result = $conn->query($sql);
            $trecords = mysqli_num_rows($result);
            $tpages = ceil($trecords/$limit);

    				// <!-- faculty profile card PHP -->
            while ($row = mysqli_fetch_array($result)){
                echo '<div class="rw-profile" id="rw-profile">';
                echo    '<div class="col-profile">';
                echo        '<div class="img-profile">';
                echo            '<img src="../IMG/'.$row["ProfileImg"].'" width="90px" height="90px" alt = "Image">';
                echo        '</div>';
                echo        '<div class="info-profile">';
                echo            '<label class="hide" id = "hide_name"  >'.$row["id"].' </label>';
                echo            '<label class="name" id = "card_name" ><h5 class="fl">'.$row["s_name"].',</h5>'.$row["fs_name"].'</label>';
                echo            '<label class="department" id = "card_department" >'.$row["d_department"].'</label>';
                echo            '<label class="college" id = "card_college" style = "color: #000000; font-weight: bold;">'.$row["c_college"].'</label>';
                echo        '</div>';
                echo        '<div class="vm-profile">';
                echo            '<button class="viewmore" title = "Viewmore Button" id="vm_btn">View Profile</button>';
                echo        '</div>';
                echo    '</div>';
                echo '</div>'; 
            }

            $conn->close();
    }        
?>