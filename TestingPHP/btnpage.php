<?php
    include_once('connection.php');
    
    
    // include(../CSS/profiletab.css);

    // FOR PAGINATION
    if(isset($_POST["c_select"]) || isset($_POST["cid"])){
        // PAGE NUMBER THAT LIMIT UP TO 15 ONLY THAT WILL APPEAR ON THE FIRST PAGE.
        $college = $_POST['c_select'];
        $limit = $_POST["limit"];
        $pageid = $_POST["cid"];
        $start = intval($pageid)-1;

        $faculty_sql = "SELECT  *From `pf_db` WHERE `c_college` = '$college' GROUP BY s_name";
        $faculty_result = mysqli_query($conn, $faculty_sql);
        $total_records = mysqli_num_rows($faculty_result);
        $total_pages = ceil($total_records/$limit);

        if($total_records>0){
        echo '<div class="pagi_ctr" id="pagi_btn">';
        echo '<div class="btn_left">';
            if($pageid <= 1){
                //Arrow Button
                echo    '<button class="pg_num btn_arrow" name = "li_col" value="1" style = "cursor: not-allowed;" disabled>❮❮</button>';
                echo    '<button class="pg_prev btn_arrow" name = "li_col" value="1" style = "cursor: not-allowed;" disabled>❮</button>';
                //Name Button
                echo    '<button class="btn_page pg_num btn_name" name = "li_col" value="1" style = "cursor: not-allowed;" disabled>First</button>';
                echo    '<button class="btn_page pg_prev btn_name" name = "li_col" value="'.$pageid.'" style = "cursor: not-allowed;" disabled>&laquo;Prev</button>';        
            }
            else{
                //Arrow Button
                echo    '<button class="pg_num btn_arrow" name = "li_col" value="1">❮❮</button>';
                echo    '<button class="pg_prev btn_arrow" name = "li_col" value="'.$pageid.'">❮</button>';
                //Name Button
                echo    '<button class="btn_page  pg_num btn_name" name = "li_col" value="1">First</button>';
                echo    '<button class="btn_page pg_prev btn_name" name = "li_col" value="'.$pageid.'">&laquo;Prev</button>';        
            }
        echo '</div>';

        echo        '<div class="frame" id="basic">';
        echo            '<ul class="slidee">';
        for($btn_pagination = 1; $btn_pagination<=$total_pages; $btn_pagination++)
        {    
        echo                '<li class="number_btn pg_num" name = "li_col" value="'.$btn_pagination.'">'.$btn_pagination.'</li>';
        }               
        echo            '</ul>';
        echo        '</div>';

        echo '<div class="btn_right">';

            if($pageid == $total_pages){
                //Arrow Button
                echo    '<button class="pg_next btn_arrow" name = "li_col" value="1" style = "cursor: not-allowed;" disabled>❯</button>';
                echo    '<button class="pg_num btn_arrow" name = "li_col" value="1" style = "cursor: not-allowed;" disabled>❯❯</button>';
                //Name Button
                echo    '<button class="btn_page pg_next btn_name" name = "li_col" value="'.$pageid.'" style = "cursor: not-allowed;" disabled>Next&raquo;</button>';
                echo    '<button class="btn_page pg_num btn_name" name = "li_col" value="'.$total_pages.'" style = "cursor: not-allowed;" disabled>Last</button>';
            }
            else{
                //Arrow Button
                echo    '<button class="pg_next btn_arrow" name = "li_col" value="'.$pageid.'">❯</button>';
                echo    '<button class="pg_num btn_arrow" name = "li_col" value="'.$total_pages.'">❯❯</button>';
                //Name Button
                echo    '<button class="btn_page pg_next btn_name" name = "li_col" value="'.$pageid.'">Next&raquo;</button>';
        		echo	'<button class="btn_page pg_num btn_name" name = "li_col" value="'.$total_pages.'">Last</button>';
            }
        echo '</div>';
        echo '</div>';
        
        // echo "<script type=\"text/javascript\" src=\"../JS/faculty.js\"></script>";
        echo '<script type=text/javascript>';
        echo 'var $frame = $(\'.frame\');';

        // Call Sly on frame
        echo '$frame.sly({'; 
        echo 'horizontal: 1,';
        echo 'itemNav: \'basic\',';
        echo 'smart: 1,';
        echo 'activateOn: \'click\',';
        echo 'mouseDragging: 1,';
        echo 'touchDragging: 1,';
        echo 'releaseSwing: 1,';
        echo 'startAt: ' .$start. ',';
        echo 'scrollBy: 1,';
        echo 'speed: 1,';
        echo 'clickBar: 1';
        echo '});';
        echo '</script>';
        }
        $conn->close(); 
    }elseif(isset($_POST["d_select"]) || isset($_POST["did"])){
        $department = $_POST['d_select'];
        $limit = $_POST["limit"];
        $pageid = $_POST["did"];
        $start = intval($pageid)-1;
        
        $faculty_sql = "SELECT  *From `pf_db` WHERE `d_department` = '$department' GROUP BY s_name";
        $faculty_result = mysqli_query($conn, $faculty_sql);
        $total_records = mysqli_num_rows($faculty_result);
        $total_pages = ceil($total_records/$limit);

        if($total_records > 0){
        echo '<div class="pagi_ctr" id="pagi_btn">';
        echo    '<div class="btn_left">';
            if($pageid <= 1){
                //Arrow Button
                echo    '<button class="pg_num btn_arrow" name = "li_dept" value="1" style = "cursor: not-allowed;" disabled>❮❮</button>';
                echo    '<button class="pg_prev btn_arrow" name = "li_dept" value="1" style = "cursor: not-allowed;" disabled>❮</button>';
                //Name Button
                echo    '<button class="btn_page pg_num btn_name" name = "li_dept" value="1" style = "cursor: not-allowed;" disabled>First</button>';
                echo    '<button class="btn_page pg_prev btn_name" name = "li_dept" value="'.$pageid.'" style = "cursor: not-allowed;" disabled>&laquo;Prev</button>';        
            }
            else{
                //Arrow Button
                echo    '<button class="pg_num btn_arrow" name = "li_dept" value="1" >❮❮</button>';
                echo    '<button class="pg_prev btn_arrow" name = "li_dept" value="'.$pageid.'" >❮</button>';
                //Name Button
                echo    '<button class="btn_page  pg_num btn_name" name = "li_dept" value="1">First</button>';
                echo    '<button class="btn_page pg_prev btn_name" name = "li_dept" value="'.$pageid.'">&laquo;Prev</button>';        
            }
        echo    '</div>';

        echo        '<div class="frame" id="basic">';
        echo            '<ul class="slidee">';
        for($btn_pagination = 1; $btn_pagination<=$total_pages; $btn_pagination++)
        {    
        echo                '<li class="number_btn pg_num" name = "li_dept" value="'.$btn_pagination.'">'.$btn_pagination.'</li>';
        }               
        echo            '</ul>';
        echo        '</div>';

        echo    '<div class="btn_right">';
            if($pageid == $total_pages){
                //Arrow Button
                echo    '<button class="pg_next btn_arrow" name = "li_dept" value="1" style = "cursor: not-allowed;" disabled>❯</button>';
                echo    '<button class="pg_num btn_arrow" name = "li_dept" value="1" style = "cursor: not-allowed;" disabled>❯❯</button>';
                //Name Button
                echo    '<button class="btn_page pg_next btn_name" name = "li_dept" value="'.$pageid.'" style = "cursor: not-allowed;" disabled>Next&raquo;</button>';
                echo    '<button class="btn_page pg_num btn_name" name = "li_dept" value="'.$total_pages.'" style = "cursor: not-allowed;" disabled>Last</button>';
            }
            else{
                //Arrow Button
                echo    '<button class="pg_next btn_arrow" name = "li_dept" value="'.$pageid.'" >❯</button>';
                echo    '<button class="pg_num btn_arrow" name = "li_dept" value="'.$total_pages.'" >❯❯</button>';
                //Name Button
                echo    '<button class="btn_page pg_next btn_name" name = "li_dept" value="'.$pageid.'">Next&raquo;</button>';
                echo	'<button class="btn_page pg_num btn_name" name = "li_dept" value="'.$total_pages.'">Last</button>';
            }
        echo    '</div>';
        echo '</div>';
        
        // echo "<script type=\"text/javascript\" src=\"../JS/faculty.js\"></script>";
        echo '<script type=text/javascript>';
        echo 'var $frame = $(\'.frame\');';

        // Call Sly on frame
        echo '$frame.sly({'; 
        echo 'horizontal: 1,';
        echo 'itemNav: \'basic\',';
        echo 'smart: 1,';
        echo 'activateOn: \'click\',';
        echo 'mouseDragging: 1,';
        echo 'touchDragging: 1,';
        echo 'releaseSwing: 1,';
        echo 'startAt: ' .$start. ',';
        echo 'scrollBy: 1,';
        echo 'speed: 1,';
        echo 'clickBar: 1';
        echo '});';
        echo '</script>';
        }
        $conn->close();
    }
    elseif(isset($_POST["az"]) || isset($_POST["aid"])){
        // PAGE NUMBER THAT LIMIT UP TO 15 ONLY THAT WILL APPEAR ON THE FIRST PAGE.
        $az = $_POST['az'];
        $limit = $_POST["limit"];
        $pageid = $_POST["aid"];
        $start = intval($pageid)-1;
        
        $faculty_sql = "SELECT *From pf_db WHERE `s_name` LIKE '$az%' GROUP BY LEFT(s_name, 1)";
        $faculty_result = mysqli_query($conn, $faculty_sql);
        $total_records = mysqli_num_rows($faculty_result);
        $total_pages = ceil($total_records/$limit);

        if($total_records>0){
        echo '<div class="pagi_ctr" id="pagi_btn">';
        echo '<div class="btn_left">';
            if($pageid <= 1){
                //Arrow Button
                echo    '<button class="pg_num btn_arrow" name = "li_az" value="1" style = "cursor: not-allowed;" disabled>❮❮</button>';
                echo    '<button class="pg_prev btn_arrow" name = "li_az" value="1" style = "cursor: not-allowed;" disabled>❮</button>';
                //Name Button
                echo    '<button class="btn_page pg_num btn_name" name = "li_az" value="1" style = "cursor: not-allowed;" disabled>First</button>';
                echo    '<button class="btn_page pg_prev btn_name" name = "li_az" value="'.$pageid.'" style = "cursor: not-allowed;" disabled>&laquo;Prev</button>';        
            }
            else{
                //Arrow Button
                echo    '<button class="pg_num btn_arrow" name = "li_az" value="1" >❮❮</button>';
                echo    '<button class="pg_prev btn_arrow" name = "li_az" value="'.$pageid.'" >❮</button>';
                //Name Button
                echo    '<button class="btn_page  pg_num btn_name" name = "li_az" value="1">First</button>';
                echo    '<button class="btn_page pg_prev btn_name" name = "li_az" value="'.$pageid.'">&laquo;Prev</button>';        
            }
        echo '</div>';

        echo        '<div class="frame" id="basic">';
        echo            '<ul class="slidee">';
        for($btn_pagination = 1; $btn_pagination<=$total_pages; $btn_pagination++)
        {    
        echo                '<li class="number_btn pg_num" name = "li_az" value="'.$btn_pagination.'">'.$btn_pagination.'</li>';
        }               
        echo            '</ul>';
        echo        '</div>';

        echo '<div class="btn_right">';
            if($pageid == $total_pages){
                //Arrow Button
                echo    '<button class="pg_next btn_arrow" name = "li_az" value="1" style = "cursor: not-allowed;" disabled>❯</button>';
                echo    '<button class="pg_num btn_arrow" name = "li_az" value="1" style = "cursor: not-allowed;" disabled>❯❯</button>';
                //Name Button
                echo    '<button class="btn_page pg_next btn_name" name = "li_az" value="'.$pageid.'" style = "cursor: not-allowed;" disabled>Next&raquo;</button>';
                echo    '<button class="btn_page pg_num btn_name" name = "li_az" value="'.$total_pages.'" style = "cursor: not-allowed;" disabled>Last</button>';
            }
            else{
                //Arrow Button
                echo    '<button class="pg_next btn_arrow" name = "li_az" value="'.$pageid.'" >❯</button>';
                echo    '<button class="pg_num btn_arrow" name = "li_az" value="'.$total_pages.'" >❯❯</button>';
                //Name Button
                echo    '<button class="btn_page pg_next btn_name" name = "li_az" value="'.$pageid.'">Next&raquo;</button>';
                echo	'<button class="btn_page pg_num btn_name" name = "li_az" value="'.$total_pages.'">Last</button>';
            }
        echo '</div>';
        echo '</div>';
        
        // echo "<script type=\"text/javascript\" src=\"../JS/faculty.js\"></script>";
        echo '<script type=text/javascript>';
        echo 'var $frame = $(\'.frame\');';

        // Call Sly on frame
        echo '$frame.sly({'; 
        echo 'horizontal: 1,';
        echo 'itemNav: \'basic\',';
        echo 'smart: 1,';
        echo 'activateOn: \'click\',';
        echo 'mouseDragging: 1,';
        echo 'touchDragging: 1,';
        echo 'releaseSwing: 1,';
        echo 'startAt: ' .$start. ',';
        echo 'scrollBy: 1,';
        echo 'speed: 1,';
        echo 'clickBar: 1';
        echo '});';
        echo '</script>';
        }
        $conn->close();  
    }
    elseif(isset($_POST["sname"]) || isset($_POST["sid"])){
        //Nothing.........
    }
    elseif(isset($_POST["tname"]) || isset($_POST["tid"])){
        $name = $_POST['tname'];
        $limit = $_POST["limit"];
        $pageid = $_POST["tid"];
        $start = intval($pageid)-1;
        
        $faculty_sql = "SELECT *FROM pf_db WHERE f_name LIKE '%".mysqli_real_escape_string($conn, $name)."%' GROUP BY s_name";
        $faculty_result = mysqli_query($conn, $faculty_sql);
        $total_records = mysqli_num_rows($faculty_result);
        $total_pages = ceil($total_records/$limit);

        if($total_records>0){
            echo '<div class="pagi_ctr" id="pagi_btn">';
            echo    '<div class="btn_left">';
                if($pageid <= 1){
                    //Arrow Button
                    echo    '<button class="pg_num btn_arrow" name = "liTableBtn" value="1" style = "cursor: not-allowed;" disabled>❮❮</button>';
                    echo    '<button class="pg_prev btn_arrow" name = "liTableBtn" value="1" style = "cursor: not-allowed;" disabled>❮</button>';
                    //Name Button
                    echo    '<button class="btn_page pg_num btn_name" name = "liTableBtn" value="1" style = "cursor: not-allowed;" disabled>First</button>';
                    echo    '<button class="btn_page pg_prev btn_name" name = "liTableBtn" value="'.$pageid.'" style = "cursor: not-allowed;" disabled>&laquo;Prev</button>';        
                }
                else{//Arrow Button
                    echo    '<button class="pg_num btn_arrow" name = "liTableBtn" value="1" >❮❮</button>';
                    echo    '<button class="pg_prev btn_arrow" name = "liTableBtn" value="'.$pageid.'" >❮</button>';
                    //Name Button
                    echo    '<button class="btn_page  pg_num btn_name" name = "liTableBtn" value="1">First</button>';
                    echo    '<button class="btn_page pg_prev btn_name" name = "liTableBtn" value="'.$pageid.'">&laquo;Prev</button>';        
                }
            echo    '</div>';
    
    
            echo    '<div class="frame" id="basic">';
            echo        '<ul class="slidee">';
            for($btn_pagination = 1; $btn_pagination<=$total_pages; $btn_pagination++)
            {    
            echo            '<li class="number_btn pg_num" name = "liTableBtn" value="'.$btn_pagination.'">'.$btn_pagination.'</li>';
            }               
            echo        '</ul>';
            echo    '</div>';
    
            echo    '<div class="btn_right">';
                if($pageid == $total_pages){
                    //Arrow Button
                    echo    '<button class="pg_next btn_arrow" name = "liTableBtn" value="1" style = "cursor: not-allowed;" disabled>❯</button>';
                    echo    '<button class="pg_num btn_arrow" name = "liTableBtn" value="1" style = "cursor: not-allowed;" disabled>❯❯</button>';
                    //Name Button
                    echo    '<button class="btn_page pg_next btn_name" name = "liTableBtn" value="'.$pageid.'" style = "cursor: not-allowed;" disabled>Next&raquo;</button>';
                    echo    '<button class="btn_page pg_num btn_name" name = "liTableBtn" value="'.$total_pages.'" style = "cursor: not-allowed;" disabled>Last</button>';
                }
                else{
                    //Arrow Button
                    echo    '<button class="pg_next btn_arrow" name = "liTableBtn" value="'.$pageid.'" >❯</button>';
                    echo    '<button class="pg_num btn_arrow" name = "liTableBtn" value="'.$total_pages.'" >❯❯</button>';
                    //Name Button
                    echo    '<button class="btn_page pg_next btn_name" name = "liTableBtn" value="'.$pageid.'">Next&raquo;</button>';
                    echo	'<button class="btn_page pg_num btn_name" name = "liTableBtn" value="'.$total_pages.'">Last</button>';
                }
            echo    '</div>';
            echo '</div>';
    
            // echo "<script type=\"text/javascript\" src=\"../JS/faculty.js\"></script>";
            echo '<script type=text/javascript>';
            echo 'var $frame = $(\'.frame\');';
            echo 'var $wrap  = $frame.parent();';
    
            // Call Sly on frame
            echo '$frame.sly({'; 
            echo 'horizontal: 1,';
            echo 'itemNav: \'basic\',';
            echo 'smart: 1,';
            echo 'activateOn: \'click\',';
            echo 'mouseDragging: 1,';
            echo 'touchDragging: 1,';
            echo 'releaseSwing: 1,';
            echo 'startAt: ' .$start. ',';
            echo 'scrollBy: 1,';
            echo 'speed: 1,';
            echo 'clickBar: 1';
            echo '});';
            echo '</script>';
        }
        $conn->close();
    }
    else{
        $limit = $_POST["limit"];
        $pageid = $_POST["xid"];
        $start = intval($pageid)-1;

        $faculty_sql = "SELECT *From `pf_db` GROUP BY s_name";
        $faculty_result = mysqli_query($conn, $faculty_sql);
        $total_records = mysqli_num_rows($faculty_result);
        $total_pages = ceil($total_records/$limit);

        if($total_records>0){
        echo '<div class="pagi_ctr" id="pagi_btn">';
        echo    '<div class="btn_left">';
            if($pageid <= 1){
                //Arrow Button
                echo    '<button class="pg_num btn_arrow" name = "li_all" value="1" style = "cursor: not-allowed;" disabled>❮❮</button>';
                echo    '<button class="pg_prev btn_arrow" name = "li_all" value="1" style = "cursor: not-allowed;" disabled>❮</button>';
                //Name Button
                echo    '<button class="btn_page pg_num btn_name" name = "li_all" value="1" style = "cursor: not-allowed;" disabled>First</button>';
                echo    '<button class="btn_page pg_prev btn_name" name = "li_all" value="'.$pageid.'" style = "cursor: not-allowed;" disabled>&laquo;Prev</button>';        
            }
            else{//Arrow Button
                echo    '<button class="pg_num btn_arrow" name = "li_all" value="1" >❮❮</button>';
                echo    '<button class="pg_prev btn_arrow" name = "li_all" value="'.$pageid.'" >❮</button>';
                //Name Button
                echo    '<button class="btn_page  pg_num btn_name" name = "li_all" value="1">First</button>';
                echo    '<button class="btn_page pg_prev btn_name" name = "li_all" value="'.$pageid.'">&laquo;Prev</button>';        
            }
        echo    '</div>';


        echo    '<div class="frame" id="basic">';
        echo        '<ul class="slidee">';
        for($btn_pagination = 1; $btn_pagination<=$total_pages; $btn_pagination++)
        {    
        echo            '<li class="number_btn pg_num" name = "li_all" value="'.$btn_pagination.'">'.$btn_pagination.'</li>';
        }               
        echo        '</ul>';
        echo    '</div>';

        echo    '<div class="btn_right">';
            if($pageid == $total_pages){
                //Arrow Button
                echo    '<button class="pg_next btn_arrow" name = "li_all" value="1" style = "cursor: not-allowed;" disabled>❯</button>';
                echo    '<button class="pg_num btn_arrow" name = "li_all" value="1" style = "cursor: not-allowed;" disabled>❯❯</button>';
                //Name Button
                echo    '<button class="btn_page pg_next btn_name" name = "li_all" value="'.$pageid.'" style = "cursor: not-allowed;" disabled>Next&raquo;</button>';
                echo    '<button class="btn_page pg_num btn_name" name = "li_all" value="'.$total_pages.'" style = "cursor: not-allowed;" disabled>Last</button>';
            }
            else{
                //Arrow Button
                echo    '<button class="pg_next btn_arrow" name = "li_all" value="'.$pageid.'" >❯</button>';
                echo    '<button class="pg_num btn_arrow" name = "li_all" value="'.$total_pages.'" >❯❯</button>';
                //Name Button
                echo    '<button class="btn_page pg_next btn_name" name = "li_all" value="'.$pageid.'">Next&raquo;</button>';
                echo	'<button class="btn_page pg_num btn_name" name = "li_all" value="'.$total_pages.'">Last</button>';
            }
        echo    '</div>';
        echo '</div>';

        // echo "<script type=\"text/javascript\" src=\"../JS/faculty.js\"></script>";
        echo '<script type=text/javascript>';
        echo 'var $frame = $(\'.frame\');';
        echo 'var $wrap  = $frame.parent();';

        // Call Sly on frame
        echo '$frame.sly({'; 
        echo 'horizontal: 1,';
        echo 'itemNav: \'basic\',';
        echo 'smart: 1,';
        echo 'activateOn: \'click\',';
        echo 'mouseDragging: 1,';
        echo 'touchDragging: 1,';
        echo 'releaseSwing: 1,';
        echo 'startAt: ' .$start. ',';
        echo 'scrollBy: 1,';
        echo 'speed: 1,';
        echo 'clickBar: 1';
        echo '});';
        echo '</script>';
        }
        
        $conn->close(); 
    }
?>
