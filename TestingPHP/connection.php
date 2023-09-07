<?php

	//INFO
	$servername = "localhost";
	$username = "root";
	$password = "";
	$db = "faculty";

	//CONNECTION TO DATABASE
	$conn = new mysqli($servername,$username,$password,$db);

	//CHECK CONNECTION IF EXIST
	if ($conn->connect_error) {
		die("connection failed:" .$conn->connect_error);
	}

	
?>