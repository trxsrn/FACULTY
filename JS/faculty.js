
// GLOBAL VARIABLE
let btn_name;
let btn_vm;
let p_name;
const limit = 15;
const page = 1;
let col_val; 
let dept_val;
let az_val;
let pn;
let searchtxtlength;
let searchtxt;

$(document).ready(function(){
// VARIABLE
	const search_input = $('#search_in');
	const clear_btn = $('#sclear_btn');
	const sec_depart = $('#sec_department');
	const sec_col = $('#sec_college');
	const pop_top = $('#pop_ctr');
	const pop_in = $('#pop_card');

//LOADIING
	function pop_up() {
		$('#t_load').show();
		$('body').css('overflow', 'hidden');
	setTimeout(function() {
		$('#t_load').hide();
		$('body').css('overflow', 'auto');
	},2000);	   
	};

//FACULTY SEARCH
	function searchfaculty(){
	let offset = (page - 1) * limit;

	//SHOW FACULTY PROFILE
	let searchxhr = new XMLHttpRequest();
	let searchData = 'sname=' + encodeURIComponent(searchtxt) + '&offset='  + encodeURIComponent(offset) + '&limit='  + encodeURIComponent(limit);

	searchxhr.open('POST', 'searchresult.php', true);
	searchxhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

	searchxhr.onload = function() {
	  if (searchxhr.status === 200) {
		let data = searchxhr.responseText;
		// Handle the success response
		document.getElementById('profile_ctr').innerHTML = data;
		hidesuggest();
		clearsearch();
	  } else {
		console.error(searchxhr.status);
	  }
	};
	searchxhr.onerror = function() {
	  console.error(searchxhr.status);
	};
	searchxhr.send(searchData);

	//BUTTON BY LIST OF FACULTY PROFILE
	let searchBtnxhr = new XMLHttpRequest();
	let searchBtnData = 'sname=' + encodeURIComponent(searchtxt) + '&limit='  + encodeURIComponent(limit);

	searchBtnxhr.open('POST', 'btnpage.php', true);
	searchBtnxhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

	searchBtnxhr.onload = function() {
	  if (searchBtnxhr.status === 200) {
		let data = searchBtnxhr.responseText;
		// Handle the success response
		console.log(data);
		document.getElementById('btn_profile').innerHTML = data;
		document.getElementById('btnTopProfile').innerHTML = data;
	  } else {
		console.error(searchBtnxhr.status);
	  }
	};
	searchBtnxhr.onerror = function() {
	  console.error(searchBtnxhr.status);
	};
	searchBtnxhr.send(searchBtnData);
	}

//FUNCTION TO HIDE SUGGESTION SEARCH
	function hidesuggest(){
		$('.suggest-ctr').slideUp();
	}

//FUNCTION TO CLEAR THE INPUT SEARCH
	function clearsearch(){
		search_input.blur();
		search_input.val('');
		search_input.attr('placeholder','Search...');
		search_input.css("border","3px solid #ffffff");
		search_input.css("color","rgba(37,105,153,.7)");
		clear_btn.css("display","none");
	}

//FUNCTION TO PUT FOCUS ON INPUT
	function inputsearch(){
		search_input.focus();
		search_input.val('');
		search_input.css("border","1px solid black");
		clear_btn.css("display","block");
	}

//INPUT FIELD CHARACTERS LENGTH
	$('.search-input').keyup(function() {
		let maxLength = this.getAttribute('maxlength');
		let charlimit = 3;
		let searchtxtlength = this.value.length;

		if(searchtxtlength < charlimit){
			hidesuggest();
		}
		else if (searchtxtlength >= maxLength) {
			Swal.fire({
				title: 'Only 30 characters allowed.',
				confirmButtonColor: '#265999',
				confirmButtonText: 'OK',
			})
		} else {
		let searchtxt = document.querySelector('.search-input').value;
		document.querySelector('.suggest-ctr').style.display = 'block';
		let offset = (page - 1) * limit;
		
		let searchxhr = new XMLHttpRequest();
		let searchFormData = new FormData();
		searchFormData.append('name', searchtxt);
		searchFormData.append('offset', offset);
		searchFormData.append('limit', limit);

		searchxhr.open('POST', 'search.php', true);
		searchxhr.onload = function() {
			if (searchxhr.status === 200) {
			let searchData = searchxhr.responseText;
			document.getElementById('s_suggest').innerHTML = searchData;
			} else {
			console.error(searchxhr.status);
			}
		};
		searchxhr.onerror = function() {
			console.error(searchxhr.status);
		};
		searchxhr.send(searchFormData);
}
	  });

//INPUT FIELD ENTER FUNCTION
	$('.search-input').keypress(function(event) {

		if(event.which == 13){
			searchtxt = $('.search-input').val().trim();
			if(searchtxt === '')
			{
				Swal.fire({
					title: 'No input value',
					confirmButtonColor: '#265999',
					confirmButtonText: 'OK'
				})
			}
			else{
				pop_up();
				setTimeout(function(){
					$('.alphabet-btn').removeClass('activee');
					$("#filter_name").text("- SEARCH: "+searchtxt+" -");
					$('.suggest-ctr').slideDown();
					searchfaculty();
				},2000);
			}
		}
	});

//CLICK THE SUGGESTION NAME
	$(document).on('click','#s_suggest .suggestname',function(){
		let f_name = this.innerText;
		search_input.val(f_name);
		search_input.focus();
	});

//CLICK TO COPY GMAIL TEXT
	$(document).on('click','.fulldetails .prolinksbutton .teeest',function(){
		let text = $('.fulldetails .prolinksbutton .teeest .r_gmail').text();
		console.log(text);

		let tempElement = $('<textarea>');
		$('body').append(tempElement);
		tempElement.val(text).select();
		document.execCommand('copy');
		tempElement.remove();
		Swal.fire({
			title: "Text copied to clipboard!",
			confirmButtonColor: '#265999',
			confirmButtonText: "OK",
		});

		
  });

//SEARCHBAR CODE
	$('#search_in').click(function(){	
		inputsearch();
		// hidesuggest();
	});

	$('#sclear_btn').click(function(){
		clearsearch();
		hidesuggest();
	});

//BUTTON SEARCHBAR
	$('.search-submit').click(function(){
		// let maxLength = $('.search-input').attr('maxlength');
		// alert(maxLength);
		searchtxt = $('.search-input').val().trim();
		if(searchtxt === '')
		{ 
			Swal.fire({
				title: 'No input value.',
				confirmButtonColor: '#265999',
				confirmButtonText: 'OK'
			})
		}
		else{
			pop_up();
			setTimeout(function(){
				$('.alphabet-btn').removeClass('activee');
				$("#filter_name").text("- SEARCH: "+searchtxt+" -");
				$('.suggest-ctr').slideDown();
				searchfaculty();
			},2000);
		}
		
	});
	
//SELECTION CODE
	$('#sec_college').change(function(){
		sec_depart.prop("disabled",true);
		// dsec.disalbed = true;
	});

	$('#sec_department').change(function(){
		sec_col.prop("disabled",true);	
		// csec.disabled = true;
	});

//PAGINATION ONLY DIV REFRESH
	let offset = (page - 1) * limit;
	//PROFILE FILTER
	let allXhr = new XMLHttpRequest();
	let allFormData = 'offset=' + encodeURIComponent(offset) + '&limit=' + encodeURIComponent(limit);

	allXhr.open('POST', 'selection.php?page=' + page, true);
	allXhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

	allXhr.onload = function() {
	  if (allXhr.status === 200) {
		var allData = allXhr.responseText;
		// Handle the success response
		document.getElementById('profile_ctr').innerHTML = allData;
	  } else {
		console.error(allXhr.status);
	  }
	};

	allXhr.onerror = function() {
	  console.error(allXhr.status);
	};

	allXhr.send(allFormData);

	//BUTTON 
	pn = page
	$.ajax({
		type: "POST",
		url: "btnpage.php",
		data:{
			limit: limit,
			xid: pn
		},
		cache: false,
		success: function(data){
			let DATA = data;
			$('#btn_profile').html(DATA);
			$('#btnTopProfile').html(DATA);
		},
		error: function(xhr, status, error){
			console.error(xhr);
		}
	});

//BUTTON SUBMIT SELECTED DROP DOWN FILTER
	$('#sec_submit').click(function(){

	let college = $('#sec_college');
	let depart = $('#sec_department');

	if(college.val() === null && depart.val() === null)
	{
		Swal.fire({
			title: 'Select Department or College from Dropdown.',
			confirmButtonColor: '#265999',
			confirmButtonText: 'OK'
		})
	}
	else{
		if(college.val() != null)
		{ 
			pop_up();
			setTimeout(function(){
				let cole = college.val();
				col_val = cole;
				let offset = (page - 1) * limit;
				// //PROFILE FILTER
				let colxhr = new XMLHttpRequest();
				let colFormdata = 'c_select=' + encodeURIComponent(cole) + '&offset=' + encodeURIComponent(offset) + '&limit=' + encodeURIComponent(limit);

				colxhr.open('POST', 'college.php?page=' + page, true);
				colxhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

				colxhr.onload = function() {
				  if (colxhr.status === 200) {
					let colData = colxhr.responseText;
					// Handle the success response
					document.getElementById('profile_ctr').innerHTML = colData;
					document.getElementById('filter_name').innerHTML = "- SELECTED: " + col_val + " -";
					$('.alphabet-btn').removeClass('activee');
					document.getElementById('sec_form').reset();
					sec_depart.removeAttr('disabled');
				  } else {
					console.error(colxhr.status);
				  }
				};

				colxhr.onerror = function() {
				  console.error(colxhr.status);
				};

				colxhr.send(colFormdata);

				//BUTTON FOR DROPDOWN FILTER FACULTY
				pn = page;
				$.ajax({
					type: "POST",
					url: "btnpage.php",
					data:{
						c_select: col_val,
						limit: limit,
						cid: pn
					},
					cache: false,
					success: function(data){
						$('#btn_profile').html(data);
						$('#btnTopProfile').html(data);
					},
					error: function(xhr, status, error){
						console.error(xhr);
					}
				});
			},2000);
		}
		else if(depart.val() != null)
		{
			pop_up();
			setTimeout(function(){
				let dpt = depart.val();
				dept_val = dpt;
				let offset = (page - 1) * limit;
				//PROFILE FILTER
				let departxhr = new XMLHttpRequest();
				let departData = 'd_select=' + encodeURIComponent(dpt) + '&offset=' + encodeURIComponent(offset) + '&limit=' + encodeURIComponent(limit);

				departxhr.open('POST', 'department.php?page=' + page, true);
				departxhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

				departxhr.onload = function() {
				  if (departxhr.status === 200) {
					let dData = departxhr.responseText;
					// Handle the success response
					document.getElementById('profile_ctr').innerHTML = dData;
					$('.alphabet-btn').removeClass('activee');
					document.getElementById('filter_name').innerHTML = "- SELECTED: " + dept_val + " -";
					document.getElementById('sec_form').reset();
					sec_col.removeAttr('disabled');
				  } else {
					console.error(departxhr.status);
				  }
				};

				departxhr.onerror = function() {
				  console.error(departxhr.status);
				};

				departxhr.send(departData);

				//BUTTON FOR DROPDOWN FILTER FACULTY
				pn = page;
				$.ajax({
					type: "POST",
					url: "btnpage.php",
					data:{
						d_select: dept_val,
						limit: limit,
						did: pn
					},
					cache: false,
					success: function(data){
						$('#btn_profile').html(data);
						$('#btnTopProfile').html(data);
					},
					error: function(xhr, status, error){
						console.error(xhr);
					}
				});
			},2000);
		}
	}
	});

//BUTTON CLEAR SELECTED DROP DOWN FILTER
	$('#sec_clear').click(function(){
		let college = $('#sec_college');
		let depart = $('#sec_department');
		if(college.val() === null && depart.val() === null)
		{
			Swal.fire({
				title: 'No selected value.',
				confirmButtonColor: '#265999',
				confirmButtonText: 'OK'
			 })
		}
		else{
			sec_col.removeAttr('disabled');
			sec_depart.removeAttr('disabled');
		}	
		});

//BUTTON ALPHABET FILTER
	$(document).on("click",".az_btn", function(){
		let az = this.id;
		let active = $(this);
		pop_up();
		setTimeout(function(){
			az_val = az;
			let offset = (page - 1) * limit;
			//PROFILE FILTER
			let azxhr = new XMLHttpRequest();
			let azData = 'az=' + encodeURIComponent(az_val) + '&offset=' + encodeURIComponent(offset) + '&limit=' + encodeURIComponent(limit);

			azxhr.open('POST', 'az.php?page=' + page, true);
			azxhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

			azxhr.onload = function() {
			  if (azxhr.status === 200) {
				let azData = azxhr.responseText;
				// Handle the success response
				document.getElementById('profile_ctr').innerHTML = azData;
				$('.alphabet-btn').removeClass('activee');
				active.addClass('activee');
				document.getElementById('filter_name').innerHTML = "- SELECTED: " + az + " -";
				document.getElementById('sec_form').reset();
				sec_depart.removeAttr('disabled');
				sec_col.removeAttr('disabled');
			  } else {
				console.error(azxhr.status);
			  }
			};

			azxhr.onerror = function() {
			  console.error(azxhr.status);
			};

			azxhr.send(azData);

			//BUTTON FOR DROPDOWN FILTER FACULTY
			pn = page
			$.ajax({
				type: "POST",
				url: "btnpage.php",
				data:{
					az: az_val,
					limit: limit,
					aid: pn
				},
				cache: false,
				success: function(data){
					$('#btnTopProfile').html(data);
					$('#btn_profile').html(data);
				},
				error: function(xhr, status, error){
					console.error(xhr);
				}
			});
		},2000);
	});
//BUTTON ALL WITH COLOR AND CLICK
	$('#All').addClass('activee');
	$('#All').click(function(){
		pop_up();
		setTimeout(function(){
			let offset = (page - 1) * limit;
			//PROFILE FILTER
			let allXhr = new XMLHttpRequest();
			let allFormData = 'offset=' + encodeURIComponent(offset) + '&limit=' + encodeURIComponent(limit);

			allXhr.open('POST', 'selection.php?page=' + page, true);
			allXhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

			allXhr.onload = function() {
			  if (allXhr.status === 200) {
				let allData = allXhr.responseText;
				// Handle the success response
				document.getElementById('profile_ctr').innerHTML = allData;
				$('.alphabet-btn').removeClass('activee');
				$('#All').addClass('activee');
				document.getElementById('filter_name').innerHTML = "- Category : All FACULTY PROFILE -";
				document.getElementById('sec_form').reset();
				sec_depart.removeAttr('disabled');
				sec_col.removeAttr('disabled');
			  } else {s
				console.error(allXhr.status);
			  }
			};

			allXhr.onerror = function() {
			  console.error(allXhr.status);
			};

			allXhr.send(allFormData);

			//BUTTON FOR DROPDOWN FILTER FACULTY
			pn = page
			$.ajax({
				type: "POST",
				url: "btnpage.php",
				data:{
					limit: limit,
					xid: pn
				},
				cache: false,
				success: function(data){
					let DATA = data;
					$('#btn_profile').html(DATA);
					$('#btnTopProfile').html(DATA);
				},
				error: function(xhr, status, error){
					console.error(xhr);
				}
			});
		},2000);
	});

//BUTTON VIEW MORE PROFILE
	$(document).on('click', '.viewmore', function(){
	btn_vm = $(this).closest("#rw-profile").find("#hide_name").text();
	if(btn_vm === " "){
		Swal.fire({
			title: 'No input value.',
			confirmButtonColor: '#265999',
			confirmButtonText: 'OK'
		})
	}
	else{
		pop_up();
		setTimeout(function(){
			let viewxhr = new XMLHttpRequest();
			let vmData = 'btn_vm=' + encodeURIComponent(btn_vm);

			viewxhr.open('POST', 'fullprofile.php', true);
			viewxhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

			viewxhr.onload = function() {
			  if (viewxhr.status === 200) {
				let viewData = viewxhr.responseText;
				// Handle the success response
				document.getElementById('full_details').innerHTML = viewData;
			  } else {
				console.error(viewxhr.status);
			  }
			};
			viewxhr.onerror = function() {
			  console.error(viewxhr.status);
			};
			viewxhr.send(vmData);
			$('#pop_ctr').show();
			$('#pop_card').slideDown(800);
			$('body').css('overflow', 'hidden');
		},2000)
	}
	
	});

//BUTTON NUMBER AND FIRST AND LAST PAGINATION 
	$(document).on("click","#btn_profile .pg_num", function(){

	let btn_name = $(this).attr('name');
	
	if(btn_name === "li_col"){
		let id = this.value;
		let offset = (id - 1) * limit;
		pn = id;

		//SHOW FACULTY PROFILE
		let liColxhr = new XMLHttpRequest();
		let liColData = 'c_select=' + encodeURIComponent(col_val) + '&offset='  + encodeURIComponent(offset) + '&limit='  + encodeURIComponent(limit);

		liColxhr.open('POST', 'college.php?page=' + pn, true);
		liColxhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		liColxhr.onload = function() {
		  if (liColxhr.status === 200) {
			let liColdata = liColxhr.responseText;
			// Handle the success response
			document.getElementById('profile_ctr').innerHTML = liColdata;
			document.getElementById('sec_form').reset();
			sec_depart.removeAttr('disabled');
			sec_col.removeAttr('disabled');
		  } else {
			console.error(liColxhr.status);
		  }
		};
		liColxhr.onerror = function() {
		  console.error(liColxhr.status);
		};
		liColxhr.send(liColData);
	
		//BUTTON BY LIST OF FACULTY PROFILE
		$.ajax({
			type: "POST",
			url: "btnpage.php",
			data:{
				c_select: col_val,
				limit: limit,
				cid: pn
			},
			cache: false,
			success: function(data){
				$('#btn_profile').html(data);
				$('#btnTopProfile').html(data);
			},
			error: function(xhr, status, error){
				console.error(xhr);
			}
		});
	}
	else if(btn_name === "li_dept"){
		let id = this.value;
		let offset = (id - 1) * limit;
		pn = id;

		//SHOW FACULTY PROFILE
		let liDeptxhr = new XMLHttpRequest();
		let liDeptData = 'd_select=' + encodeURIComponent(dept_val) + '&offset='  + encodeURIComponent(offset) + '&limit='  + encodeURIComponent(limit);

		liDeptxhr.open('POST', 'department.php?page=' + pn, true);
		liDeptxhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		liDeptxhr.onload = function() {
		  if (liDeptxhr.status === 200) {
			let liDeptdata = liDeptxhr.responseText;
			// Handle the success response
			document.getElementById('profile_ctr').innerHTML = liDeptdata;
			document.getElementById('sec_form').reset();
			sec_depart.removeAttr('disabled');
			sec_col.removeAttr('disabled');
		  } else {
			console.error(liDeptxhr.status);
		  }
		};
		liDeptxhr.onerror = function() {
		  console.error(liDeptxhr.status);
		};
		liDeptxhr.send(liDeptData);
	
		//BUTTON BY LIST OF FACULTY PROFILE
		$.ajax({
			type: "POST",
			url: "btnpage.php",
			data:{
				d_select: dept_val,
				limit: limit,
				did: pn
			},
			cache: false,
			success: function(data){
				$('#btn_profile').html(data);
				$('#btnTopProfile').html(data);
			},
			error: function(xhr, status, error){
				console.error(xhr);
			}
		});
	}
	else if(btn_name === "li_az"){
		let id = this.value;
		let offset = (id - 1) * limit;
		pn = id;

		//SHOW FACULTY PROFILE
		let liazxhr = new XMLHttpRequest();
		let liazData = 'az=' + encodeURIComponent(az_val) + '&offset='  + encodeURIComponent(offset) + '&limit='  + encodeURIComponent(limit);

		liazxhr.open('POST', 'az.php?page=' + pn, true);
		liazxhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		liazxhr.onload = function() {
		  if (liazxhr.status === 200) {
			let liAzdata = liazxhr.responseText;
			// Handle the success response
			document.getElementById('profile_ctr').innerHTML = liAzdata;
			document.getElementById('sec_form').reset();
				sec_depart.removeAttr('disabled');
				sec_col.removeAttr('disabled');
		  } else {
			console.error(liazxhr.status);
		  }
		};
		liazxhr.onerror = function() {
		  console.error(liazxhr.status);
		};
		liazxhr.send(liazData);
	
		//BUTTON BY LIST OF FACULTY PROFILE
		$.ajax({
			type: "POST",
			url: "btnpage.php",
			data:{
				az: az_val,
				limit: limit,
				aid: pn
			},
			cache: false,
			success: function(data){
				$('#btn_profile').html(data);
				$('#btnTopProfile').html(data);
			},
			error: function(xhr, status, error){
				console.error(xhr);
			}
		});
	}
	else{
		let id = this.value;
		let offset = (id - 1) * limit;
		pn = id;

		let allXhr = new XMLHttpRequest();
		let allFormdata = 'offset=' + encodeURIComponent(offset) + '&limit=' + encodeURIComponent(limit);

		allXhr.open('POST', 'selection.php?page=' + page, true);
		allXhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		allXhr.onload = function() {
		  if (allXhr.status === 200) {
			let allData = allXhr.responseText;
			// Handle the success response
			document.getElementById('profile_ctr').innerHTML = allData;
			document.getElementById('sec_form').reset();
				sec_depart.removeAttr('disabled');
				sec_col.removeAttr('disabled');
		  } else {
			console.error(allXhr.status);
		  }
		};

		allXhr.onerror = function() {
		  console.error(allXhr.status);
		};

		allXhr.send(allFormdata);

		//BUTTON FOR DROPDOWN FILTER FACULTY
		$.ajax({
			type: "POST",
			url: "btnpage.php",
			data:{
				limit: limit,
				xid: pn
			},
			cache: false,
			success: function(data){
				$('#btn_profile').html(data);
				$('#btnTopProfile').html(data);
			},
			error: function(xhr, status, error){
				console.error(xhr);
			}
		});
	} 
	});

//BUTTON PREV BOTTOM
	$(document).on("click","#btn_profile .pg_prev", function() {
		let btn_name = $(this).attr('name');
	
		if(btn_name === "li_col"){
			let id = (this.value) - 1;
			let offset = (id - 1) * limit;
			pn = id

			//SHOW FACULTY PROFILE
			let liColxhr = new XMLHttpRequest();
			let liColData = 'c_select=' + encodeURIComponent(col_val) + '&offset='  + encodeURIComponent(offset) + '&limit='  + encodeURIComponent(limit);

			liColxhr.open('POST', 'college.php?page=' + pn, true);
			liColxhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

			liColxhr.onload = function() {
			  if (liColxhr.status === 200) {
				let liColdata = liColxhr.responseText;
				// Handle the success response
				document.getElementById('profile_ctr').innerHTML = liColdata;
				document.getElementById('sec_form').reset();
				sec_depart.removeAttr('disabled');
				sec_col.removeAttr('disabled');
			  } else {
				console.error(liColxhr.status);
			  }
			};
			liColxhr.onerror = function() {
			  console.error(liColxhr.status);
			};
			liColxhr.send(liColData);
		
			//BUTTON BY LIST OF FACULTY PROFILE
			$.ajax({
				type: "POST",
				url: "btnpage.php",
				data:{
					c_select: col_val,
					limit: limit,
					cid: pn
				},
				cache: false,
				success: function(data){
					$('#btn_profile').html(data);
					$('#btnTopProfile').html(data);
				},
				error: function(xhr, status, error){
					console.error(xhr);
				}
			});
		}
		else if(btn_name === "li_dept"){
			let id = (this.value) - 1;
			let offset = (id - 1) * limit;
			pn = id

			//SHOW FACULTY PROFILE
			let liDeptxhr = new XMLHttpRequest();
			let liDeptData = 'd_select=' + encodeURIComponent(dept_val) + '&offset='  + encodeURIComponent(offset) + '&limit='  + encodeURIComponent(limit);

			liDeptxhr.open('POST', 'department.php?page=' + pn, true);
			liDeptxhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

			liDeptxhr.onload = function() {
			  if (liDeptxhr.status === 200) {
				let liDeptdata = liDeptxhr.responseText;
				// Handle the success response
				document.getElementById('profile_ctr').innerHTML = liDeptdata;
				document.getElementById('sec_form').reset();
				sec_depart.removeAttr('disabled');
				sec_col.removeAttr('disabled');
			  } else {
				console.error(liDeptxhr.status);
			  }
			};
			liDeptxhr.onerror = function() {
			  console.error(liDeptxhr.status);
			};
			liDeptxhr.send(liDeptData);
		
			//BUTTON BY LIST OF FACULTY PROFILE
			$.ajax({
				type: "POST",
				url: "btnpage.php",
				data:{
					d_select: dept_val,
					limit: limit,
					did: pn
				},
				cache: false,
				success: function(data){
					$('#btn_profile').html(data);
					$('#btnTopProfile').html(data);
				},
				error: function(xhr, status, error){
					console.error(xhr);
				}
			});
		}
		else if(btn_name === "li_az"){
			let id = (this.value) - 1;
			let offset = (id - 1) * limit;
			pn = id;

			//SHOW FACULTY PROFILE
			let liazxhr = new XMLHttpRequest();
			let liazData = 'az=' + encodeURIComponent(az_val) + '&offset='  + encodeURIComponent(offset) + '&limit='  + encodeURIComponent(limit);

			liazxhr.open('POST', 'az.php?page=' + pn, true);
			liazxhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

			liazxhr.onload = function() {
			  if (liazxhr.status === 200) {
				let liAzdata = liazxhr.responseText;
				// Handle the success response
				document.getElementById('profile_ctr').innerHTML = liAzdata;
				document.getElementById('sec_form').reset();
				sec_depart.removeAttr('disabled');
				sec_col.removeAttr('disabled');
			  } else {
				console.error(liazxhr.status);
			  }
			};
			liazxhr.onerror = function() {
			  console.error(liazxhr.status);
			};
			liazxhr.send(liazData);
		
			//BUTTON BY LIST OF FACULTY PROFILE
			$.ajax({
				type: "POST",
				url: "btnpage.php",
				data:{
					az: az_val,
					limit: limit,
					aid: pn
				},
				cache: false,
				success: function(data){
					$('#btn_profile').html(data);
					$('#btnTopProfile').html(data);
				},
				error: function(xhr, status, error){
					console.error(xhr);
				}
			});
		}
		else{
			let id = (this.value) - 1;
			let offset = (id - 1) * limit;
			pn = id;

			let allXhr = new XMLHttpRequest();
			let allFormData = 'offset=' + encodeURIComponent(offset) + '&limit=' + encodeURIComponent(limit);

			allXhr.open('POST', 'selection.php?page=' + page, true);
			allXhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

			allXhr.onload = function() {
			  if (allXhr.status === 200) {
				let allData = allXhr.responseText;
				// Handle the success response
				document.getElementById('profile_ctr').innerHTML = allData;
				document.getElementById('sec_form').reset();
				sec_depart.removeAttr('disabled');
				sec_col.removeAttr('disabled');
			  } else {
				console.error(allXhr.status);
			  }
			};

			allXhr.onerror = function() {
			  console.error(allXhr.status);
			};

			allXhr.send(allFormData);

			//BUTTON FOR DROPDOWN FILTER FACULTY
			$.ajax({
				type: "POST",
				url: "btnpage.php",
				data:{
					limit: limit,
					xid: pn
				},
				cache: false,
				success: function(data){
					$('#btn_profile').html(data);
					$('#btnTopProfile').html(data);
				},
				error: function(xhr, status, error){
					console.error(xhr);
				}
			});
		} 
		});

//BUTTON NEXT BOTTOM
	$(document).on("click","#btn_profile .pg_next", function() {
		let btn_name = $(this).attr('name');
	
		if(btn_name === "li_col"){
			let id = parseInt((this.value)) + 1;
			let offset = (id - 1) * limit;
			pn = id;

			//SHOW FACULTY PROFILE
			let liColxhr = new XMLHttpRequest();
			let liColData = 'c_select=' + encodeURIComponent(col_val) + '&offset='  + encodeURIComponent(offset) + '&limit='  + encodeURIComponent(limit);

			liColxhr.open('POST', 'college.php?page=' + pn, true);
			liColxhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

			liColxhr.onload = function() {
			  if (liColxhr.status === 200) {
				let liColdata = liColxhr.responseText;
				// Handle the success response
				document.getElementById('profile_ctr').innerHTML = liColdata;
				document.getElementById('sec_form').reset();
				sec_depart.removeAttr('disabled');
				sec_col.removeAttr('disabled');
			  } else {
				console.error(liColxhr.status);
			  }
			};
			liColxhr.onerror = function() {
			  console.error(liColxhr.status);
			};
			liColxhr.send(liColData);
		
			//BUTTON BY LIST OF FACULTY PROFILE
			$.ajax({
				type: "POST",
				url: "btnpage.php",
				data:{
					c_select: col_val,
					limit: limit,
					cid: pn
				},
				cache: false,
				success: function(data){
					$('#btn_profile').html(data);
					$('#btnTopProfile').html(data);
				},
				error: function(xhr, status, error){
					console.error(xhr);
				}
			});
		}
		else if(btn_name === "li_dept"){
			let id = parseInt((this.value)) + 1;
			let offset = (id - 1) * limit;
			pn = id;

			//SHOW FACULTY PROFILE
			let liDeptxhr = new XMLHttpRequest();
			let liDeptData = 'd_select=' + encodeURIComponent(dept_val) + '&offset='  + encodeURIComponent(offset) + '&limit='  + encodeURIComponent(limit);

			liDeptxhr.open('POST', 'department.php?page=' + pn, true);
			liDeptxhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

			liDeptxhr.onload = function() {
			  if (liDeptxhr.status === 200) {
				let liDeptdata = liDeptxhr.responseText;
				// Handle the success response
				document.getElementById('profile_ctr').innerHTML = liDeptdata;
				document.getElementById('sec_form').reset();
				sec_depart.removeAttr('disabled');
				sec_col.removeAttr('disabled');
			  } else {
				console.error(liDeptxhr.status);
			  }
			};
			liDeptxhr.onerror = function() {
			  console.error(liDeptxhr.status);
			};
			liDeptxhr.send(liDeptData);
		
			//BUTTON BY LIST OF FACULTY PROFILE
			$.ajax({
				type: "POST",
				url: "btnpage.php",
				data:{
					d_select: dept_val,
					limit: limit,
					did: pn
				},
				cache: false,
				success: function(data){
					$('#btn_profile').html(data);
					$('#btnTopProfile').html(data);
				},
				error: function(xhr, status, error){
					console.error(xhr);
				}
			});
		}
		else if(btn_name === "li_az"){
			let id = parseInt((this.value)) + 1;
			let offset = (id - 1) * limit;
			pn = id;

			//SHOW FACULTY PROFILE
			let liazxhr = new XMLHttpRequest();
			let liazData = 'az=' + encodeURIComponent(az_val) + '&offset='  + encodeURIComponent(offset) + '&limit='  + encodeURIComponent(limit);

			liazxhr.open('POST', 'az.php?page=' + pn, true);
			liazxhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

			liazxhr.onload = function() {
			  if (liazxhr.status === 200) {
				let liAzdata = liazxhr.responseText;
				// Handle the success response
				document.getElementById('profile_ctr').innerHTML = liAzdata;
				document.getElementById('sec_form').reset();
				sec_depart.removeAttr('disabled');
				sec_col.removeAttr('disabled');
			  } else {
				console.error(liazxhr.status);
			  }
			};
			liazxhr.onerror = function() {
			  console.error(liazxhr.status);
			};
			liazxhr.send(liazData);
		
			//BUTTON BY LIST OF FACULTY PROFILE
			$.ajax({
				type: "POST",
				url: "btnpage.php",
				data:{
					az: az_val,
					limit: limit,
					aid: pn
				},
				cache: false,
				success: function(data){
					$('#btn_profile').html(data);
					$('#btnTopProfile').html(data);
				},
				error: function(xhr, status, error){
					console.error(xhr);
				}
			});
		}
		else{
			let id = parseInt((this.value)) + 1;
			let offset = (id - 1) * limit;
			pn = id;

			let allXhr = new XMLHttpRequest();
			let allFormdata = 'offset=' + encodeURIComponent(offset) + '&limit=' + encodeURIComponent(limit);

			allXhr.open('POST', 'selection.php?page=' + page, true);
			allXhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

			allXhr.onload = function() {
			  if (allXhr.status === 200) {
				let allData = allXhr.responseText;
				// Handle the success response
				document.getElementById('profile_ctr').innerHTML = allData;
				document.getElementById('sec_form').reset();
				sec_depart.removeAttr('disabled');
				sec_col.removeAttr('disabled');
			  } else {
				console.error(allXhr.status);
			  }
			};

			allXhr.onerror = function() {
			  console.error(allXhr.status);
			};

			allXhr.send(allFormdata);

			//BUTTON FOR DROPDOWN FILTER FACULTY
			$.ajax({
				type: "POST",
				url: "btnpage.php",
				data:{
					limit: limit,
					xid: pn
				},
				cache: false,
				success: function(data){
					$('#btn_profile').html(data);
					$('#btnTopProfile').html(data);
				},
				error: function(xhr, status, error){
					console.error(xhr);
				}
			});
		} 
		});


//BUTTON PREV TOP
$(document).on("click","#btnTopProfile .pg_prev", function() {
	let btn_name = $(this).attr('name');

	if(btn_name === "li_col"){
		let id = (this.value) - 1;
		let offset = (id - 1) * limit;
		pn = id

		//SHOW FACULTY PROFILE
		let liColxhr = new XMLHttpRequest();
		let liColData = 'c_select=' + encodeURIComponent(col_val) + '&offset='  + encodeURIComponent(offset) + '&limit='  + encodeURIComponent(limit);

		liColxhr.open('POST', 'college.php?page=' + pn, true);
		liColxhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		liColxhr.onload = function() {
		  if (liColxhr.status === 200) {
			let liColdata = liColxhr.responseText;
			// Handle the success response
			document.getElementById('profile_ctr').innerHTML = liColdata;
			document.getElementById('sec_form').reset();
				sec_depart.removeAttr('disabled');
				sec_col.removeAttr('disabled');
		  } else {
			console.error(liColxhr.status);
		  }
		};
		liColxhr.onerror = function() {
		  console.error(liColxhr.status);
		};
		liColxhr.send(liColData);
	
		//BUTTON BY LIST OF FACULTY PROFILE
		$.ajax({
			type: "POST",
			url: "btnpage.php",
			data:{
				c_select: col_val,
				limit: limit,
				cid: pn
			},
			cache: false,
			success: function(data){
				$('#btnTopProfile').html(data);
				$('#btn_profile').html(data);
			},
			error: function(xhr, status, error){
				console.error(xhr);
			}
		});
	}
	else if(btn_name === "li_dept"){
		let id = (this.value) - 1;
		let offset = (id - 1) * limit;
		pn = id

		//SHOW FACULTY PROFILE
		let liDeptxhr = new XMLHttpRequest();
		let liDeptData = 'd_select=' + encodeURIComponent(dept_val) + '&offset='  + encodeURIComponent(offset) + '&limit='  + encodeURIComponent(limit);

		liDeptxhr.open('POST', 'department.php?page=' + pn, true);
		liDeptxhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		liDeptxhr.onload = function() {
		  if (liDeptxhr.status === 200) {
			let liDeptdata = liDeptxhr.responseText;
			// Handle the success response
			document.getElementById('profile_ctr').innerHTML = liDeptdata;
			document.getElementById('sec_form').reset();
				sec_depart.removeAttr('disabled');
				sec_col.removeAttr('disabled');
		  } else {
			console.error(liDeptxhr.status);
		  }
		};
		liDeptxhr.onerror = function() {
		  console.error(liDeptxhr.status);
		};
		liDeptxhr.send(liDeptData);
	
		//BUTTON BY LIST OF FACULTY PROFILE
		$.ajax({
			type: "POST",
			url: "btnpage.php",
			data:{
				d_select: dept_val,
				limit: limit,
				did: pn
			},
			cache: false,
			success: function(data){
				$('#btnTopProfile').html(data);
				$('#btn_profile').html(data);
			},
			error: function(xhr, status, error){
				console.error(xhr);
			}
		});
	}
	else if(btn_name === "li_az"){
		let id = (this.value) - 1;
		let offset = (id - 1) * limit;
		pn = id;

		//SHOW FACULTY PROFILE
		let liazxhr = new XMLHttpRequest();
		let liazData = 'az=' + encodeURIComponent(az_val) + '&offset='  + encodeURIComponent(offset) + '&limit='  + encodeURIComponent(limit);

		liazxhr.open('POST', 'az.php?page=' + pn, true);
		liazxhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		liazxhr.onload = function() {
		  if (liazxhr.status === 200) {
			let liAzdata = liazxhr.responseText;
			// Handle the success response
			document.getElementById('profile_ctr').innerHTML = liAzdata;
			document.getElementById('sec_form').reset();
				sec_depart.removeAttr('disabled');
				sec_col.removeAttr('disabled');
		  } else {
			console.error(liazxhr.status);
		  }
		};
		liazxhr.onerror = function() {
		  console.error(liazxhr.status);
		};
		liazxhr.send(liazData);
	
		//BUTTON BY LIST OF FACULTY PROFILE
		$.ajax({
			type: "POST",
			url: "btnpage.php",
			data:{
				az: az_val,
				limit: limit,
				aid: pn
			},
			cache: false,
			success: function(data){
				$('#btnTopProfile').html(data);
				$('#btn_profile').html(data);
			},
			error: function(xhr, status, error){
				console.error(xhr);
			}
		});
	}
	else{
		let id = (this.value) - 1;
		let offset = (id - 1) * limit;
		pn = id;

		let allXhr = new XMLHttpRequest();
		let allFormData = 'offset=' + encodeURIComponent(offset) + '&limit=' + encodeURIComponent(limit);

		allXhr.open('POST', 'selection.php?page=' + page, true);
		allXhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		allXhr.onload = function() {
		  if (allXhr.status === 200) {
			let allData = allXhr.responseText;
			// Handle the success response
			document.getElementById('profile_ctr').innerHTML = allData;
			document.getElementById('sec_form').reset();
				sec_depart.removeAttr('disabled');
				sec_col.removeAttr('disabled');
		  } else {
			console.error(allXhr.status);
		  }
		};

		allXhr.onerror = function() {
		  console.error(allXhr.status);
		};

		allXhr.send(allFormData);

		//BUTTON FOR DROPDOWN FILTER FACULTY
		$.ajax({
			type: "POST",
			url: "btnpage.php",
			data:{
				limit: limit,
				xid: pn
			},
			cache: false,
			success: function(data){
				$('#btnTopProfile').html(data);
				$('#btn_profile').html(data);
			},
			error: function(xhr, status, error){
				console.error(xhr);
			}
		});
	} 
	});

//BUTTON NEXT TOP 
$(document).on("click","#btnTopProfile .pg_next", function() {
	let btn_name = $(this).attr('name');

	if(btn_name === "li_col"){
		let id = parseInt((this.value)) + 1;
		let offset = (id - 1) * limit;
		pn = id;

		//SHOW FACULTY PROFILE
		let liColxhr = new XMLHttpRequest();
		let liColData = 'c_select=' + encodeURIComponent(col_val) + '&offset='  + encodeURIComponent(offset) + '&limit='  + encodeURIComponent(limit);

		liColxhr.open('POST', 'college.php?page=' + pn, true);
		liColxhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		liColxhr.onload = function() {
		  if (liColxhr.status === 200) {
			let liColdata = liColxhr.responseText;
			// Handle the success response
			document.getElementById('profile_ctr').innerHTML = liColdata;
			document.getElementById('sec_form').reset();
				sec_depart.removeAttr('disabled');
				sec_col.removeAttr('disabled');
		  } else {
			console.error(liColxhr.status);
		  }
		};
		liColxhr.onerror = function() {
		  console.error(liColxhr.status);
		};
		liColxhr.send(liColData);
	
		//BUTTON BY LIST OF FACULTY PROFILE
		$.ajax({
			type: "POST",
			url: "btnpage.php",
			data:{
				c_select: col_val,
				limit: limit,
				cid: pn
			},
			cache: false,
			success: function(data){
				$('#btnTopProfile').html(data);
				$('#btn_profile').html(data);
			},
			error: function(xhr, status, error){
				console.error(xhr);
			}
		});
	}
	else if(btn_name === "li_dept"){
		let id = parseInt((this.value)) + 1;
		let offset = (id - 1) * limit;
		pn = id;

		//SHOW FACULTY PROFILE
		let liDeptxhr = new XMLHttpRequest();
		let liDeptData = 'd_select=' + encodeURIComponent(dept_val) + '&offset='  + encodeURIComponent(offset) + '&limit='  + encodeURIComponent(limit);

		liDeptxhr.open('POST', 'department.php?page=' + pn, true);
		liDeptxhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		liDeptxhr.onload = function() {
		  if (liDeptxhr.status === 200) {
			let liDeptdata = liDeptxhr.responseText;
			// Handle the success response
			document.getElementById('profile_ctr').innerHTML = liDeptdata;
			document.getElementById('sec_form').reset();
				sec_depart.removeAttr('disabled');
				sec_col.removeAttr('disabled');
		  } else {
			console.error(liDeptxhr.status);
		  }
		};
		liDeptxhr.onerror = function() {
		  console.error(liDeptxhr.status);
		};
		liDeptxhr.send(liDeptData);
	
		//BUTTON BY LIST OF FACULTY PROFILE
		$.ajax({
			type: "POST",
			url: "btnpage.php",
			data:{
				d_select: dept_val,
				limit: limit,
				did: pn
			},
			cache: false,
			success: function(data){
				$('#btnTopProfile').html(data);
				$('#btn_profile').html(data);
			},
			error: function(xhr, status, error){
				console.error(xhr);
			}
		});
	}
	else if(btn_name === "li_az"){
		let id = parseInt((this.value)) + 1;
		let offset = (id - 1) * limit;
		pn = id;

		//SHOW FACULTY PROFILE
		let liazxhr = new XMLHttpRequest();
		let liazData = 'az=' + encodeURIComponent(az_val) + '&offset='  + encodeURIComponent(offset) + '&limit='  + encodeURIComponent(limit);

		liazxhr.open('POST', 'az.php?page=' + pn, true);
		liazxhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		liazxhr.onload = function() {
		  if (liazxhr.status === 200) {
			let liAzdata = liazxhr.responseText;
			// Handle the success response
			document.getElementById('profile_ctr').innerHTML = liAzdata;
			document.getElementById('sec_form').reset();
				sec_depart.removeAttr('disabled');
				sec_col.removeAttr('disabled');
		  } else {
			console.error(liazxhr.status);
		  }
		};
		liazxhr.onerror = function() {
		  console.error(liazxhr.status);
		};
		liazxhr.send(liazData);
	
		//BUTTON BY LIST OF FACULTY PROFILE
		$.ajax({
			type: "POST",
			url: "btnpage.php",
			data:{
				az: az_val,
				limit: limit,
				aid: pn
			},
			cache: false,
			success: function(data){
				$('#btnTopProfile').html(data);
				$('#btn_profile').html(data);
			},
			error: function(xhr, status, error){
				console.error(xhr);
			}
		});
	}
	else{
		let id = parseInt((this.value)) + 1;
		let offset = (id - 1) * limit;
		pn = id;

		let allXhr = new XMLHttpRequest();
		let allFormdata = 'offset=' + encodeURIComponent(offset) + '&limit=' + encodeURIComponent(limit);

		allXhr.open('POST', 'selection.php?page=' + page, true);
		allXhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		allXhr.onload = function() {
		  if (allXhr.status === 200) {
			let allData = allXhr.responseText;
			// Handle the success response
			document.getElementById('profile_ctr').innerHTML = allData;
			document.getElementById('sec_form').reset();
				sec_depart.removeAttr('disabled');
				sec_col.removeAttr('disabled');
		  } else {
			console.error(allXhr.status);
		  }
		};

		allXhr.onerror = function() {
		  console.error(allXhr.status);
		};

		allXhr.send(allFormdata);

		//BUTTON FOR DROPDOWN FILTER FACULTY
		$.ajax({
			type: "POST",
			url: "btnpage.php",
			data:{
				limit: limit,
				xid: pn
			},
			cache: false,
			success: function(data){
				$('#btnTopProfile').html(data);
				$('#btn_profile').html(data);
			},
			error: function(xhr, status, error){
				console.error(xhr);
			}
		});
	} 
	});

//BUTTON NUMBER AND FIRST AND LAST PAGINATION TOP
$(document).on("click","#btnTopProfile .pg_num", function(){

	let btn_name = $(this).attr('name');
	
	if(btn_name === "li_col"){
		let id = this.value;
		let offset = (id - 1) * limit;
		pn = id;

		//SHOW FACULTY PROFILE
		let liColxhr = new XMLHttpRequest();
		let liColData = 'c_select=' + encodeURIComponent(col_val) + '&offset='  + encodeURIComponent(offset) + '&limit='  + encodeURIComponent(limit);

		liColxhr.open('POST', 'college.php?page=' + pn, true);
		liColxhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		liColxhr.onload = function() {
		  if (liColxhr.status === 200) {
			let liColdata = liColxhr.responseText;
			// Handle the success response
			document.getElementById('profile_ctr').innerHTML = liColdata;
			document.getElementById('sec_form').reset();
				sec_depart.removeAttr('disabled');
				sec_col.removeAttr('disabled');
		  } else {
			console.error(liColxhr.status);
		  }
		};
		liColxhr.onerror = function() {
		  console.error(liColxhr.status);
		};
		liColxhr.send(liColData);
	
		//BUTTON BY LIST OF FACULTY PROFILE
		$.ajax({
			type: "POST",
			url: "btnpage.php",
			data:{
				c_select: col_val,
				limit: limit,
				cid: pn
			},
			cache: false,
			success: function(data){
				$('#btnTopProfile').html(data);
				$('#btn_profile').html(data);
			},
			error: function(xhr, status, error){
				console.error(xhr);
			}
		});
	}
	else if(btn_name === "li_dept"){
		let id = this.value;
		let offset = (id - 1) * limit;
		pn = id;

		//SHOW FACULTY PROFILE
		let liDeptxhr = new XMLHttpRequest();
		let liDeptData = 'd_select=' + encodeURIComponent(dept_val) + '&offset='  + encodeURIComponent(offset) + '&limit='  + encodeURIComponent(limit);

		liDeptxhr.open('POST', 'department.php?page=' + pn, true);
		liDeptxhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		liDeptxhr.onload = function() {
		  if (liDeptxhr.status === 200) {
			let liDeptdata = liDeptxhr.responseText;
			// Handle the success response
			document.getElementById('profile_ctr').innerHTML = liDeptdata;
			document.getElementById('sec_form').reset();
				sec_depart.removeAttr('disabled');
				sec_col.removeAttr('disabled');
		  } else {
			console.error(liDeptxhr.status);
		  }
		};
		liDeptxhr.onerror = function() {
		  console.error(liDeptxhr.status);
		};
		liDeptxhr.send(liDeptData);
	
		//BUTTON BY LIST OF FACULTY PROFILE
		$.ajax({
			type: "POST",
			url: "btnpage.php",
			data:{
				d_select: dept_val,
				limit: limit,
				did: pn
			},
			cache: false,
			success: function(data){
				$('#btnTopProfile').html(data);
				$('#btn_profile').html(data);
			},
			error: function(xhr, status, error){
				console.error(xhr);
			}
		});
	}
	else if(btn_name === "li_az"){
		let id = this.value;
		let offset = (id - 1) * limit;
		pn = id;

		//SHOW FACULTY PROFILE
		let liazxhr = new XMLHttpRequest();
		let liazData = 'az=' + encodeURIComponent(az_val) + '&offset='  + encodeURIComponent(offset) + '&limit='  + encodeURIComponent(limit);

		liazxhr.open('POST', 'az.php?page=' + pn, true);
		liazxhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		liazxhr.onload = function() {
		  if (liazxhr.status === 200) {
			let liAzdata = liazxhr.responseText;
			// Handle the success response
			document.getElementById('profile_ctr').innerHTML = liAzdata;
			document.getElementById('sec_form').reset();
				sec_depart.removeAttr('disabled');
				sec_col.removeAttr('disabled');
		  } else {
			console.error(liazxhr.status);
		  }
		};
		liazxhr.onerror = function() {
		  console.error(liazxhr.status);
		};
		liazxhr.send(liazData);
	
		//BUTTON BY LIST OF FACULTY PROFILE
		$.ajax({
			type: "POST",
			url: "btnpage.php",
			data:{
				az: az_val,
				limit: limit,
				aid: pn
			},
			cache: false,
			success: function(data){
				$('#btnTopProfile').html(data);
				$('#btn_profile').html(data);
			},
			error: function(xhr, status, error){
				console.error(xhr);
			}
		});
	}
	else{
		let id = this.value;
		let offset = (id - 1) * limit;
		pn = id;

		let allXhr = new XMLHttpRequest();
		let allFormdata = 'offset=' + encodeURIComponent(offset) + '&limit=' + encodeURIComponent(limit);

		allXhr.open('POST', 'selection.php?page=' + page, true);
		allXhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		allXhr.onload = function() {
		  if (allXhr.status === 200) {
			let allData = allXhr.responseText;
			// Handle the success response
			document.getElementById('profile_ctr').innerHTML = allData;
			document.getElementById('sec_form').reset();
				sec_depart.removeAttr('disabled');
				sec_col.removeAttr('disabled');
		  } else {
			console.error(allXhr.status);
		  }
		};

		allXhr.onerror = function() {
		  console.error(allXhr.status);
		};

		allXhr.send(allFormdata);

		//BUTTON FOR DROPDOWN FILTER FACULTY
		$.ajax({
			type: "POST",
			url: "btnpage.php",
			data:{
				limit: limit,
				xid: pn
			},
			cache: false,
			success: function(data){
				$('#btnTopProfile').html(data);
				$('#btn_profile').html(data);
			},
			error: function(xhr, status, error){
				console.error(xhr);
			}
		});
	} 
	});

//POPUP CLOSE BUTTON
	$('#popclose_btn').click(function(){
			$('#pop_card').slideUp(800);
		setTimeout(function(){
			$('#pop_ctr').hide();
			$('body').css('overflow', 'auto');
		},900)
	});

//UP BUTTON
	window.addEventListener("scroll", function() {
	let button = document.getElementById("upbtn");
	if (window.pageYOffset > 0) {
	  button.style.display = "block";
	} else {
	  button.style.display = "none";
	}
  });
  
  document.getElementById("upbtn").addEventListener("click", function() {
	window.scrollTo({top: 0, behavior: 'smooth'});
  });

});