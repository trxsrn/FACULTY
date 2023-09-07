<?php

    include_once('connection.php');
        
    // PAGE NUMBER THAT LIMIT UP TO 15 ONLY THAT WILL APPEAR ON THE FIRST PAGE.
    if(isset($_POST["offset"]) || isset($_POST["limit"])){
    $offset = $_POST["offset"];
    $limit = $_POST["limit"];
    $name = $_POST["sname"];
        
    // . mysqli_real_escape_string($connection, $_POST["name"]) .
        
    $sql = "SELECT *FROM pf_db WHERE f_name LIKE '%$name%' GROUP BY s_name LIMIT $offset, $limit";
    $result = $conn->query($sql);
    $trecords = mysqli_num_rows($result);
    $tpages = ceil($trecords/$limit);

    // <!-- faculty profile card PHP -->
    if($trecords>0){
        while ($row = mysqli_fetch_array($result)){
            echo '<div class="rw-profile" id="rw-profile">';
            echo    '<div class="col-profile">';
            echo        '<div class="img-profile">';
            echo            '<img src="../IMG/'.$row["ProfileImg"].'" width="90px" height="90px">';
            echo        '</div>';
            echo        '<div class="info-profile">';
            echo            '<label class="hide" id = "hide_name"  >'.$row["id"].' </label>';
            echo            '<label class="name" id = "card_name"  ><h5 class="fl">'.$row["s_name"].',</h5>'.$row["fs_name"].' </label>';
            echo            '<label class="department" id = "card_department" >'.$row["d_department"].'</label>';
            echo            '<label class="college" id = "card_college" >'.$row["c_college"].'</label>';
            echo        '</div>';
            echo        '<div class="vm-profile">';
            echo            '<button class="viewmore" id="vm_btn">View Profile</button>';
            echo        '</div>';
            echo    '</div>';
            echo '</div>';  
        }
    }else{
        echo '<div class="norecord" id = "norecord" style = "font-size: 30px; width: 100%; height:200px; text-align: center;">Found 0 results for "'.$name.'"</div>';
    }  
    
    $conn->close(); 
    }      
?>