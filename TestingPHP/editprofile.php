<?php
    include_once('connection.php');

    if(isset($_POST["btn_vm"]) && !empty($_POST["btn_vm"])){
        $fullprofile = filter_var($_POST['btn_vm'],FILTER_SANITIZE_NUMBER_INT);
        $sql = "SELECT * FROM pf_db WHERE id = $fullprofile GROUP BY s_name ASC";
        $result = $conn->query($sql);
        $trecords = mysqli_num_rows($result);

        if($trecords > 0){
            while ($row = mysqli_fetch_array($result)){

                echo  '<div class = "editImage">';
                echo      '<div></div>';
                echo      '<img  class="editImgPre" id = "editImagePreview" data-name = "'.$row["ProfileImg"].'" src="../IMG/'.$row["ProfileImg"].'" alt="Image">';
                echo      '<input type="file" id = "editAddimg" name = "image" accept="image/*" hidden>';
                echo      '<i class="fa-solid fa-circle-plus fa-2x edImgbtn" title = "Add Image Button" id = "edImgbtn"></i>';
                echo  '</div>';
                echo  '<div class="editNameprofile">';
                echo     '<label class = "required" for="editLname">Last Name:</label>';
                echo     '<input type="text" autocomplete="off" id="editLname" name="lastname" value = "'.$row['s_name'].'">';
                echo     '<label class = "required" for="editFname">First Name:</label>';
                echo     '<input type="text" autocomplete="off" id="editFname" name="firstname" value = "'.$row['fs_name'].'">';
                echo     '<label for="editMname">Middle Name:</label>';
                echo     '<input type="text" autocomplete="off" id="editMname" name="middlename" value = "'.$row['m_name'].'">';   
                echo     '<label class = "required" for="editEmail">Gmail:</label>';
                echo     '<input type="email" autocomplete="off" id="editEmail" name="email" value = "'.$row['rtu_gmail'].'">'; 
                echo  '</div>';

                echo  '<div class="editDropdown">';
                echo            '<label class = "required" for="editCol">Colleges:</label>';
                echo            '<select id="editCollege" name="college" required>';
                echo                '<option value="" selected="selected" disabled style="text-align: center;">-Select Options-</option>';
                echo                '<option value="CAS">College of Arts and Sciences</option>';
                echo                '<option value="CBEA">College of Business, Intrepreneurship, and Accountancy</option>';
                echo                '<option value="CED">College of Education</option>';
                echo                '<option value="CEA">College of Engineering, Architecture</option>';
                echo                '<option value="IHK">Institute of Human Kinetics</option>';
                echo            '</select>';
                echo            '<input type="text" id="editCol" name="College Output" value = "'.$row["c_college"].'" readonly>';

                echo            '<label class = "required" for="editDept">Department:</label>';
                echo            '<select id="editDepart" name="department" required>';
                echo                '<option value="" style="text-align: center;" selected="selected" disabled>-Select Options-</option>';
                echo                '<option value="Accountancy" >Accountancy</option>';
                echo                '<option value="ALLAH" >ALLAH</option>';
                echo                '<option value="Architecture" >Architecture</option>';
                echo                '<option value="Astronomy" >Astronomy</option>';
                echo                '<option value="Biology" >Biology</option>';
                echo                '<option value="BTVTED" >BTVTED</option>';
                echo                '<option value="CHEMAPHY" >CHEMAPHY</option>';
                echo                '<option value="Computer Engineering" >Computer Engineering</option>';
                echo                '<option value="Electrical Engineering" >Electrical Engineering</option>';
                echo                '<option value="Electronics Engineering" >Electronics Engineering</option>';
                echo                '<option value="English" >English</option>';
                echo                '<option value="Entrepreneurship" >Entrepreneurship</option>';
                echo                '<option value="Filipino" >Filipino</option>';
                echo                '<option value="Financial Management" >Financial Management</option>';
                echo                '<option value="General Education" >General Education</option>';
                echo                '<option value="GS-Astronomy" >GS-Astronomy</option>';
                echo                '<option value="HRDM" >HRDM</option>';
                echo                '<option value="Industrial Engineering" >Industrial Engineering</option>';
                echo                '<option value="Information Technology" >Information Technology</option>';
                echo                '<option value="JHS-Mapeh" >JHS-Mapeh</option>';
                echo                '<option value="Marketing Management" >Marketing Management</option>';
                echo                '<option value="Mathematics" >Mathematics</option>';
                echo                '<option value="Office Administration" >Office Administration</option>';
                echo                '<option value="Operations Management" >Operations Management</option>';
                echo                '<option value="Physical Education" >Physical Education</option>';
                echo                '<option value="Political Sciences" >Political Sciences</option>';
                echo                '<option value="Psychology" >Psychology</option>';
                echo                '<option value="Sciences" >Sciences</option>';
                echo                '<option value="Social Sciences" >Social Sciences</option>';
                echo                '<option value="Statistics" >Statistics</option>';
                echo                '<option value="TECHVOC" >TECHVOC</option>';
                echo            '</select>';
                echo            '<input type="text" id="editDept" name="Department Output" value = "'.$row['d_department'].'" readonly>';
                echo        '</div>';
                echo    '</div>';    
                echo    '<div class="editURL">';
                echo            '<label for="editFB" >Link 1:</label>';
                echo            '<input type="url" autocomplete="off" name = "fbpage" id="editFB" value = "'.$row['d_fbpage'].'" required>';
                echo            '<label for="editGscholar">Link 2:</label>';
                echo            '<input type="url" autocomplete="off" name = "gscholar" id="editGscholar" value = "'.$row['g_scholar'].'" required>';
                echo    '</div>'; 
                echo    '<div class="editBtn">';
                echo        '<button class="editSave" title = "Save Button" id="editSavebtn">Save</button>';
                echo        '<button class="editBack" title = "Back Button" id="editBackbtn">Cancel</button>';
                echo    '</div>';
            }
          }else{
            echo 'NONE'; 
          }   
    }
    else{
        echo "Not Available";
    }
?>