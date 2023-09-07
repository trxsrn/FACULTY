<?php
	include_once('connection.php');
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css">
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11.1.4/dist/sweetalert2.min.css">
	<link rel="stylesheet" type="text/css" href="../CSS/main.css">
	<title>Faculty Profiles </title>
</head>
<body>

	<header>
	<?php
		include_once('../HTML/mheader.html');
	?>
	</header>

	<main class="main-template" id="maintemplate">
		
		<!-- <div class="maintitle-ctr">
			<div class="main-titletxt">
				<h1 >Faculty Research Profile</h1>	
			</div>
		</div> -->

		<!-- Search Bar - Selection DropDown - A-Z Button -->
		<section class="first-ctr">

			<img src="..\ProfilePic\rdcc1.jpg" alt = "Image">

			<div class="bgtr-ctr"></div>
			
			<div class="intop">
				<div class="subtitle-ctr">
					<div class="subtitle-txt">
						<h2>Faculty Directory</h2>
					</div>
				</div>

				<!-- SEARCH FILTER -->
				<div class="search-ctr">
				   <div class="search-bar">
				      <input type="text" class="search-input" name="search-name" maxlength = "30" id="search_in" value = "" autocomplete="off" placeholder="Search faculty">
				     <button title="Clear" type="button" id="sclear_btn" class="search-clr">
				        <i class="fa-solid fa-x"></i>
				     </button>
				     <button title="Submit" id ="ssubmit_btn" type="button" class="search-submit">
				       <i class="fa-solid fa-magnifying-glass"></i>
				     </button>
				   </div>

				   <div class="suggest-ctr">
						<div class="s_suggest" id="s_suggest">
						</div>
					</div>
				</div>

				<!-- SELECTION DROPDOWN FILTER -->
				<div class="selection-ctr">
					<div class="inselection">
						<form method="POST" action="" id = "sec_form" >
							<div class="selection-title">
								Search by College or Department
							</div>
							<div class="rw-selection">

								<select title="College" class="college-selection" id="sec_college" name="c_select">
									<option class="selectionn sec_disabled" value="selectcollege" disabled="disabled" selected="selected">-Select College-</option>
									<option class="selectionn" value="CAS" >College of Arts and Science</option>
									<option class="selectionn" value="CBEA" >College of Business Entrepreneurship Accountancy</option>
									<option class="selectionn" value="CEA" >College of Engineering and Architecture</option>
									<option class="selectionn" value="CED" >College of Education</option>
									<option class="selectionn" value="IPE" >Institute of Human Kinetics</option>
								</select>	
								<select title="Department" class="department-selection" id="sec_department" name="d_select">
									<option class="selectionn sec_disabled" value="selectdeparment" disabled="disabled" selected="selected">-Select Department-</option>
									<option class="selectionn" value="Accountancy" >Accountancy</option>
									<option class="selectionn" value="ALLAH" >ALLAH</option>
									<option class="selectionn" value="Architecture" >Architecture</option>
									<option class="selectionn" value="Astronomy" >Astronomy</option>
									<option class="selectionn" value="Biology" >Biology</option>
									<option class="selectionn" value="BTVTED" >BTVTED</option>
									<option class="selectionn" value="CHEMAPHY" >CHEMAPHY</option>
									<option class="selectionn" value="Computer Engineering" >Computer Engineering</option>
									<option class="selectionn" value="Electrical Engineering" >Electrical Engineering</option>
									<option class="selectionn" value="Electronics Engineering" >Electronics Engineering</option>
									<option class="selectionn" value="English" >English</option>
									<option class="selectionn" value="Entrepreneurship" >Entrepreneurship</option>
									<option class="selectionn" value="Filipino" >Filipino</option>
									<option class="selectionn" value="Financial Management" >Financial Management</option>
									<option class="selectionn" value="General Education" >General Education</option>
									<option class="selectionn" value="GS-Astronomy" >GS-Astronomy</option>
									<option class="selectionn" value="HRDM" >HRDM</option>
									<option class="selectionn" value="Industrial Engineering" >Industrial Engineering</option>
									<option class="selectionn" value="Information Technology" >Information Technology</option>
									<option class="selectionn" value="JHS-Mapeh" >JHS-Mapeh</option>
									<option class="selectionn" value="Marketing Management" >Marketing Management</option>
									<option class="selectionn" value="Mathematics" >Mathematics</option>
									<option class="selectionn" value="Office Administration" >Office Administration</option>
									<option class="selectionn" value="Operations Management" >Operations Management</option>
									<option class="selectionn" value="Physical Education" >Physical Education</option>
									<option class="selectionn" value="Political Sciences" >Political Sciences</option>
									<option class="selectionn" value="Psychology" >Psychology</option>
									<option class="selectionn" value="Sciences" >Sciences</option>
									<option class="selectionn" value="Social Sciences" >Social Sciences</option>
									<option class="selectionn" value="Statistics" >Statistics</option>
									<option class="selectionn" value="TECHVOC" >TECHVOC</option>
								</select>
							</div>
							<div class="btn-selection">
								<button type="button" title = "Submit" name="search_select" class="btn_select" id = "sec_submit">Submit</button>
								<button type="reset" title = "Clear" value="Clear" name="clear_select" class="btn_select" id ="sec_clear">Clear</button>
							</div>
						</form>	
					</div>
				</div>

				<div class="azbtn-ctr">
					<label class="az-title">Sort by: Initial of Faculty's Last name</label>
					<div class="az-btn">
						<button class="alphabet-btn" title = "All Button"id="All" >All</button>
						<?php  
						for ($x = 'A'; $x <= 'Z'; $x++) { ?>
						  
						  <button class="alphabet-btn az_btn" title = "AZ Button" id="<?php echo $x; ?>" ><?php echo $x; ?></button>
						<?php
						if($x == 'Z')
						{
							break;
						}
						}
						?>
					</div>
				</div>		
			</div>
			
		</section>
		
		<!-- PROFILE OF FACULTY -->
		<section class="second-ctr" id = "second_ctr">
			<div class="filter_ctr">
				<div class="filter_name" id = "filter_name"> 
					- Category : All FACULTY PROFILE -
				</div>
			</div>
		
			<div class="btnTop" id="btnTopProfile">
				<!-- DISPLAY BUTTON FOR FACULTY PROFILE -->
			</div>

			
			
			
			<div class="profile-ctr" id = "profile_ctr">
				<!-- DISPLAY CARD PROFILE OF FACULTY -->
			</div>

			<div class="btn-profile" id="btn_profile">
				<!-- DISPLAY BUTTON FOR FACULTY PROFILE -->
			</div>
			
		</section>

		<!-- POPUP VIEW MORE DETIALS -->
		<div class="pop-ctr" id="pop_ctr">
			<div class="fullprofile-ctr" id="pop_card">
				<div class="fullprofile">
					<img src="..\ProfilePic\popupdes4.jpg" alt = "Image">
					<div class="fulldetails">
						<div class="closebutton">
							<button id = "popclose_btn" name = "popclose_btn" title = "Close Popup">
								<i class="fa-solid fa-rectangle-xmark fa-3x" ></i>
							</button>
						</div>

						<div class = "f_details" id="full_details">


							<!-- SHOW SELECTED FACULTY -->
						</div>
					</div>
				</div>
			</div>			
		</div>

		<!-- Loading -->
		<div class="top_loading" id="t_load">
			<div class="loader" id="loader">
			</div>
		</div>
		
	</main>
	<!-- <a href=""class="up-button"><i class="fa-solid fa-chevron-up"></i></a> -->
	<footer>
	<?php
		include_once('../HTML/index.html');
	?>
	</footer>
	<button id="upbtn" title = "Up Button" class = "up_btn"><i class="fa-solid fa-circle-chevron-up fa-1x"></i></button>
</body>

<!-- jquery -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.4/jquery.min.js" integrity="sha512-pumBsjNRGGqkPzKHndZMaAG+bir374sORyzM3uulLV14lN5LyykqNk8eEeUlUkB3U0M4FApyaHraT65ihJhDpQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<!-- sly slider -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/Sly/1.6.1/sly.min.js" integrity="sha512-uR46GOwRUepFi2dzcatO3qpr4onAj46VC9ltPFIwaX8YXl5O18nVT/JnJZY7yqrrKUP0ngD/YjuatsJqCDpYyg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<!-- File JS -->
<script type="text/javascript" src="../JS/main.js"></script>
<!-- <script type="text/javascript" src="../JS/mheader.js"></script> -->
<!--Up Button -->
<script type="text/javascript"src='..\JS\up-button.js'></script>
<!-- Sweet Alert 2 -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.1.4/dist/sweetalert2.min.js"></script>
<!-- Sweet Alert 2 -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</html>