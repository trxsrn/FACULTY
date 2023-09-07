<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css">
    <link rel="stylesheet" type="text/css" href="../CSS/admin.css">
    <title>ADMIN</title>
</head>
<body>
    <div class="logoCtr">
        <div class = "logoTitle">
            <i class="fa-solid fa-circle-question fa-xl" id = "infoBtn"></i>
            <i class="fa-solid fa-right-from-bracket fa-xl" id = "outBtn"></i>
        </div>
    </div>
    
    <main style = "">
        <section class = "sec_ctr1">
            Faculty Profile
        </section>
        <section class = "sec_ctr2">
            <div id = "add" class = "crudBtn">
            <i class="fa-solid fa-user-plus"></i> Add
            </div>
            <div id = "edit" class = "crudBtn">
            <i class="fa-solid fa-user-pen"></i> Edit
            </div>
        </section>

        <section class = "Add_ctr1">
            <div class = "Add_ctr2">
                <div class = "add_template">
                    <div class = "aback_ctr">
                        <button class = "aback_btn" title="Back"><i class="fa-solid fa-circle-arrow-left"></i></button>
                    </div>
                    <div class= "acard_ctr">
                    <div class = "acard_template">

                        <h1>ADD Faculty Profile Information</h1>
                        <form id = "myForm" name = "addMyForm" enctype="multipart/form-data">

                            <div class = "img_ctr">
                                <img class="add_imgPre" id = "addimg_preview" src="../IMG/R&DCDefaultProfile.png" alt = "Image">
                                <input type="file" title = "Image" placeholder = "Add Image" id = "add_img" name = "image" accept="image/*" hidden>
                                <button type = "button" id = "addimg_btn" title="Select Image">Select Image</i></button>
                            </div>

                            <div class = "addinfo_ctr">
                                <div class = "ainfo">
                                    <div class="updateinfo_ctr">
                                        <label class = "required" for="add_surname">Surname:</label>
                                        <input type="text" title = "Surname" placeholder = " " autocomplete="off" id="add_surname" name="surname" required>
                                        <label class = "required" for="add_firstname">First Name:</label>
                                        <input type="text" autocomplete="off" title = "Firstname" placeholder = " " id="add_firstname" name="firstname" required>
                                        <label for="add_middlename">M.I:</label>
                                        <input type="text" autocomplete="off" title = "Middlename" placeholder = "" id="add_middlename" name="middlename" required>
                                    </div>

                                    <div class="dropdown_ctr">
                                        <label class = "required" for="add_cllge">Colleges:</label>
                                        <select id="add_cllge" title = "College" name="college" required>
                                            <option value="" selected="selected" disabled style="text-align: center;">-Select Options-</option>
                                            <option value="CAS">College of Arts and Sciences</option>
                                            <option value="CBEA">College of Business, Intrepreneurship, and Accountancy</option>
                                            <option value="CED">College of Education</option>
                                            <option value="CEA">College of Engineering, Architecture</option>
                                            <option value="IHK">Institute of Human Kinetics</option>
                                        </select>

                                        <label class = "required" for="add_dprtment">Department:</label>
                                        <select id="add_dprtment" title = "Deparment" name="department" required>
                                            <option value="" style="text-align: center;" selected="selected" disabled>-Select Options-</option>
                                            <option value="Accountancy" >Accountancy</option>
                                            <option value="ALLAH" >ALLAH</option>
                                            <option value="Architecture" >Architecture</option>
                                            <option value="Astronomy" >Astronomy</option>
                                            <option value="Biology" >Biology</option>
                                            <option value="BTVTED" >BTVTED</option>
                                            <option value="CHEMAPHY" >CHEMAPHY</option>
                                            <option value="Computer Engineering" >Computer Engineering</option>
                                            <option value="Electrical Engineering" >Electrical Engineering</option>
                                            <option value="Electronics Engineering" >Electronics Engineering</option>
                                            <option value="English" >English</option>
                                            <option value="Entrepreneurship" >Entrepreneurship</option>
                                            <option value="Filipino" >Filipino</option>
                                            <option value="Financial Management" >Financial Management</option>
                                            <option value="General Education" >General Education</option>
                                            <option value="GS-Astronomy" >GS-Astronomy</option>
                                            <option value="HRDM" >HRDM</option>
                                            <option value="Industrial Engineering" >Industrial Engineering</option>
                                            <option value="Information Technology" >Information Technology</option>
                                            <option value="JHS-Mapeh" >JHS-Mapeh</option>
                                            <option value="Marketing Management" >Marketing Management</option>
                                            <option value="Mathematics" >Mathematics</option>
                                            <option value="Office Administration" >Office Administration</option>
                                            <option value="Operations Management" >Operations Management</option>
                                            <option value="Physical Education" >Physical Education</option>
                                            <option value="Political Sciences" >Political Sciences</option>
                                            <option value="Psychology" >Psychology</option>
                                            <option value="Sciences" >Sciences</option>
                                            <option value="Social Sciences" >Social Sciences</option>
                                            <option value="Statistics" >Statistics</option>
                                            <option value="TECHVOC" >TECHVOC</option>
                                        </select>

                                        <label class = "required" for="add_email">Gmail:</label>
                                        <input type="email" autocomplete="off" title = "Email" id="add_email" name="email" placeholder="example@rtu.edu.ph" required>
                                    </div>

                                    
                                </div>
                                
                                <div class="url_ctr">
                                        <div>
                                            <label for="add_fbpage" >Link 1:</label>
                                            <input type="url" autocomplete="off" title = "Facebook Department" name = "fbpage" id="add_fbpage" placeholder="the URL of your Department Facebook page" required>
                                        </div>
                                        <div>
                                            <label for="add_gscholar">Link 2:</label>
                                            <input type="url" autocomplete="off" title = "Google Scholar" name = "gscholar" id="add_gscholar" placeholder="the URL of your Google Scholar profile" required>
                                        </div>
                                </div>

                                
                            </div>
                        </form>
                            <div class="subres_ctr">
                                    <button id="submit" class="submit acard_submit" type="button" title="Submit">Submit</button>
                                    <button class="reset acard_reset" type="reset" id="reset_btn" title="Reset">Reset</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
            
        </section>
        
        <section class = "Edit_ctr1">
            <div class = "Edit_ctr2">
                <div class = "edit_template">
                    <div class = "eback_ctr">
                        <button title="Back"><i class="fa-solid fa-circle-arrow-left"></i></button>
                    </div>
                    <div class = "edcard_ctr">
                        <div class="edcard_template">
                            <h1>Edit Faculty Profile Information</h1>
                            <div class="search-ctr">
                                <div class="search-bar">
                                    <input type="text" autocomplete="off" class="search-input" name="search-name" maxlength = "30" id="search_in" value = "" autocomplete="off" placeholder="Search faculty">
                                    <button title="Clear" type="button" id="sclear_btn" class="search-clr">
                                        <i class="fa-solid fa-x"></i>
                                    </button>
                                    <button title="Submit" id ="ssubmit_btn" type="button" class="search-submit">
                                    <i class="fa-solid fa-magnifying-glass"></i>
                                    </button>
                                </div>

                                <div class="suggest-ctr">
                                    <div class="s_suggest" id="s_suggest"></div>
                                </div>

                                <div class = "editTableIcon">
                                    <i class="fa-solid fa-house fa-xl" title = "Refresh" id = "tableRefresh"></i>
                                </div>
                            </div>

                            <div class="tableED">
                                <table class = "facultyTable">
                                    <thead class="tableHeader">
                                        <tr>
                                            <th width="100PX" style="border: none;"></th>
                                            <th width="50px">ID</th>
                                            <th class="headerCell">Profile Image</th>
                                            <th class="headerCell">First Name</th>
                                            <th class="headerCell">Middle Name</th>
                                            <th class="headerCell">Last Name</th>
                                            <th class="headerCell">Department</th>
                                            <th class="headerCell">College</th>
                                            <th class="headerCell">FB Department Link</th>
                                            <th class="headerCell">Google Scholar Link</th>
                                        </tr>
                                        
                                    </thead> 
                                    <tbody id="tableRow" class = "tableRow">
                                        <!-- Retrive data here -->
                                    </tbody>
                                </table>
                            </div>

                            <div class="tableBtn" id="tableBtn">
                                <!-- Button here -->
                            </div>
                        </div>
                    </div>  
                </div> 
            </div> 
        </section>

        <section class="editProfile1" id="editProfilectr" >
            <div class="editProfile2" id="editProfilectr2">
                <div class="editContainer" id="editCtr">
                    <!-- Edit Form here -->
                </div>   
            </div>
        </section>

        <!-- Loading -->
		<div class="top_loading" id="t_load">
			<div class="loader" id="loader">
			</div>
		</div>

    </main>

    <section></section>
   
</body>
<!-- jquery -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.4/jquery.min.js" integrity="sha512-pumBsjNRGGqkPzKHndZMaAG+bir374sORyzM3uulLV14lN5LyykqNk8eEeUlUkB3U0M4FApyaHraT65ihJhDpQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<!-- JS CODE -->
<script type="text/javascript" src="../JS/admin.js"></script>
<!-- Sweet Alert 2 -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<!-- sly slider -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/Sly/1.6.1/sly.min.js" integrity="sha512-uR46GOwRUepFi2dzcatO3qpr4onAj46VC9ltPFIwaX8YXl5O18nVT/JnJZY7yqrrKUP0ngD/YjuatsJqCDpYyg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
</html>