<?php

    include_once('connection.php');
    if(isset($_POST["btn_vm"])){
    
      $fullprofile = filter_var($_POST['btn_vm'],FILTER_SANITIZE_NUMBER_INT);
          
          
      $sql = "SELECT * FROM pf_db WHERE id = $fullprofile GROUP BY s_name ASC";
      $result = $conn->query($sql);
      $trecords = mysqli_num_rows($result);
      // <!-- faculty profile card PHP -->

      if($trecords > 0){
        while ($row = mysqli_fetch_array($result)){
          echo    '<div class="image">';
          echo        '<img class="imahe" src="../IMG/'.$row["ProfileImg"].'">';
          echo    '</div>';

          echo    '<div class="promoreinfo" >';
          echo        '<label class="f_profile">Profile</label>';
          echo        '<label id="f_name">Name: '.$row["f_name"].'</label>';
          echo        '<label id="f_College">College: '.$row["c_college"].'</label>';
          echo        '<label id="f_Department">Department: '.$row['d_department'].'</label>';
        
          echo    '</div>';
          echo    '<div class="prolinksbutton">';  
          echo        '<button class="teeest" title = "EMAIL"><i class="fa-solid fa-envelope fa-2x rgmail"></i>
                          <div class="r_gmail">'.$row['rtu_gmail'].'</div>
                        </button>';
          echo        '<a href="'.$row['d_fbpage'].'" target="_blank"><button title = "Facebook Page"><i class="fa-brands fa-facebook fa-2x"></i></button></a>
                    <a href="'.$row['g_scholar'].'" target="_blank"> <button title = "Google Scholar"><i class="fa-solid fa-graduation-cap fa-2x"></i></button></a>
                    <a href="'.$row['scopus'].'" target="_blank"><button title = "Scopus"><i class="fa-solid fa-scopus"><img src="../IMG/scopus.png"></i></button></a>
                    <a href="'.$row['linkedin'].'" target="_blank"> <button title = "LinkedIn"><i class="fa-brands fa-linkedin fa-2x"></i></button></a>
                    <a href="'.$row['researchgate'].'" target="_blank"> <button title = "ResearchGate"><i class="fa-brands fa-researchgate fa-2x"></i></button></a>
                    <a href="'.$row['orcid'].'" target="_blank"> <button title = "ORCID"><i class="fa-brands fa-orcid fa-2x"></i></button></a>
                    <a href="'.$row['academia'].'" target="_blank"> <button title = "Academia"><i class="fa-solid fa-academia"><img src="../IMG/academia.png"></i></button></a>';
          echo    '</div>';
        }
      }else{
        echo '<div class="norecord" id = "norecord" style = "font-size: 30px; width: 100%; height:200px; text-align: center;">Not Available "'.$fullprofile.'"</div>'; 
      }   
      $conn->close();   
    }
?>