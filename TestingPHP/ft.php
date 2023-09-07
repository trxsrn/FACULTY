<?php
    include_once('connection.php');
        
    // PAGE NUMBER THAT LIMIT UP TO 15 ONLY THAT WILL APPEAR ON THE FIRST PAGE.
    if(isset($_POST["offset"]) || isset($_POST["limit"])){
      $offset = filter_var($_POST['offset'], FILTER_SANITIZE_NUMBER_INT );
      $limit = filter_var($_POST['limit'], FILTER_SANITIZE_NUMBER_INT );

      $sql = "SELECT *From pf_db GROUP BY s_name LIMIT $offset, $limit ";
      $result = $conn->query($sql);
      $trecords = mysqli_num_rows($result);
      $tpages = ceil($trecords/$limit);

      // <!-- faculty profile card PHP -->
      if($trecords>0){
        while ($row = mysqli_fetch_assoc($result)){
          echo '<tr class="tableRowResult" id="tableRowResult">';
          echo    '<td class="rowCell">';
          echo      '<i class="fa-solid fa-pen tableEditbtn" title = "Edit Button" id="tableEditBtn"></i>';
          echo      '<i class="fa-solid fa-trash-can tabledeletetbtn" title = "Delete Button" id="tableDeleteBtn"></i>';
          echo    '</td>';
          echo    '<td id="tableOne">'.$row["id"].'</td>';
          echo    '<td ><img class = "tableRwImg" id = "edimg_preview" src="../IMG/'.$row["ProfileImg"].'" alt="Image"></td>';
          echo    '<td >'.$row["fs_name"].'</td>';
          echo    '<td >'.$row["m_name"].'</td>';
          echo    '<td >'.$row["s_name"].'</td>';
          echo    '<td >'.$row["d_department"].'</td>';
          echo    '<td >'.$row["c_college"].'</td>';
          echo    '<td >'.$row["d_fbpage"].'</td>';
          echo    '<td >'.$row["g_scholar"].'</td>';
          echo '</tr>';
        }
      }else{
        echo '<div class="norecord" id = "norecord" style = "font-size: 30px; width: 100%; height:200px; text-align: center;">Found 0 results</div>';
      }  
    }
    $conn->close();       
?>
