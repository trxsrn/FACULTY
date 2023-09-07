<?php

    include_once('connection.php');
        
    // PAGE NUMBER THAT LIMIT UP TO 15 ONLY THAT WILL APPEAR ON THE FIRST PAGE.
    if(isset($_POST["offset"]) || isset($_POST["limit"])){
    $offset = $_POST["offset"];
    $limit = $_POST["limit"];
    $name = $_POST['name'];
        
    // . mysqli_real_escape_string($connection, $_POST["name"]) .
        
    $sql = "SELECT *FROM pf_db WHERE f_name LIKE '%".mysqli_real_escape_string($conn, $name)."%' GROUP BY s_name LIMIT $offset, $limit";
    $result = $conn->query($sql);
    $trecords = mysqli_num_rows($result);
    $tpages = ceil($trecords/$limit);

    // <!-- faculty profile card PHP -->
    if($trecords>0){
    while ($row = mysqli_fetch_array($result)){
      echo '<div class="suggestname">'.$row["f_name"].'</div>';
    }
    }else{
        echo '<div class="norecord" id = "norecord" style = "width: 100%; word-break: break-all;">'.$name.'</div>';
    } 
    
    $conn->close();    
    }   
?>