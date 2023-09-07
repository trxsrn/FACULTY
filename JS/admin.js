class DefaultVal{
  constructor(){
    this.defaultProfile = "R&DCDefaultProfile.png";
    this.defaultLink2 = "https://scholar.google.com/citations?hl=en&view_op=search_authors&mauthors=&btnG=";
    this.defaultLink1 = "https://www.facebook.com/profile.php?id=100063883637726";
  }
}

class FacultyForm{
  constructor(fNname,lName,mName,fCollege,fDepartment,fEmail,fProfile,fbPage,gScholar){
    this.fName = fNname;
    this.lName = lName;
    this.mName = mName;
    this.fCollege = fCollege;
    this.fDepartment = fDepartment;
    this.fEmail = fEmail;
    this.fProfile = fProfile;
    this.fbPage = fbPage;
    this.gScholar = gScholar;
    this.emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    this.fullName = "";
    this.ProfileImg = "";
    this.fFBPage = "";
    this.fGScohlar = "";
    this.fCollegeSelect = "";
    this.fDepartmentSelect = "";
  }

  getURLs(fFBPage,fGScohlar){
    this.fFBPage = fFBPage;
    this.fGScohlar = fGScohlar;
  }

  getProfileImg(ProfileImg){
    this.ProfileImg = ProfileImg;
  }

  getFullName(){
    return this.fullName;
  }

  setFullName(FullName){
    this.fullName = FullName;
  }

  isFormEmpty(){
    if(this.fName === "" || this.lName === "" || this.fEmail === "" || this.fCollege === null || this.fDepartment === null || this.fCollege === "" || this.fDepartment === ""){
      return true;
    } else{
      return false;
    }
  }

  isDropdownEmpty(){
    if(this.fCollegeSelect === null || this.fDepartmentSelect === null){
      return true;
    }else{
      return false;
    }
  }

  isEmailFormat(){
    if(!this.emailPattern.test(this.fEmail)){
      return true;
    }else{
      return false;
    }
  }

  isUrlEmpty(){
    if(this.gScholar === "none" || this.gScholar == "" || this.fbPage === "none" || this.fbPage == ""){
      return true;
    }else{
      return false;
    }
  }

  isUrlFormat(){
    if(!this.urlPattern.test(this.fbPage.trim()) || !this.urlPattern.test(this.gScholar.trim())){
      return true;
    }else{
      return false;
    }
  }

  isProfileImg(){
    if(this.fProfile === ""){
      return true;
    }
    else{
      return false;
    }
  }
}

class GlobalVariable{
  constructor(){
    this.searchTxt = "";
    this.buttonEdit = "";
    this.atrName = "";
    this.limit = 10;
    this.page = 1;

  }

  getAtrName(atrName){
    this.atrName = atrName;
  }

  getBtnEdit() {
    return this.buttonEdit;
  }

  getSearchTxt(){
    return this.searchTxt;
  }

  setBtnEdit(btnEdit) {
    this.buttonEdit = btnEdit;
  }

  setSearchTxt(searchTxt){
    this.searchTxt = searchTxt;
  }
    
}


$(document).ready(function(){
    //VARIABLE
        const globalVar = new GlobalVariable();
        const search_input = $('#search_in');
        const clear_btn = $('#sclear_btn');
        
    //LOADIING
    function pop_up() {
      $('#t_load').show();
      $('body').css('overflow', 'hidden');
      setTimeout(function() {
        $('#t_load').hide();
        $('body').css('overflow', 'auto');
      },2000);	   
    };

    function defaultTable(){
      let offset = (globalVar.page - 1) * globalVar.limit;
      let allXhr = new XMLHttpRequest();
      let allFormData = 'offset=' + encodeURIComponent(offset) + '&limit=' + encodeURIComponent(globalVar.limit);

      allXhr.open('POST', 'ft.php?page=' + globalVar.page, true);
      allXhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

      allXhr.onload = function() {
        if (allXhr.status === 200) {
          var allData = allXhr.responseText;
          // Handle the success response
          document.getElementById('tableRow').innerHTML = allData;
        } else {
          console.error(allXhr.status);
        }
      };

      allXhr.onerror = function() {
        console.error(allXhr.status);
      };

      allXhr.send(allFormData);

      //BUTTON OF TABLE
      pn = globalVar.page
      $.ajax({
        type: "POST",
        url: "btnpage.php",
        data:{
          limit: globalVar.limit,
          xid: pn
        },
        cache: false,
        success: function(data){
          $('#tableBtn').html(data);
        },
        error: function(xhr, status, error){
          console.error(xhr);
        }
      });
    }
    
    // ADD AND EDIT BUTTON DISPLAY
        $('.sec_ctr2 div').click(function(){
            let text = this.id;
            if(text === "add"){
                $('.Add_ctr1').show();
                $('.Add_ctr1 .Add_ctr2').slideDown(800);
            }
            else if(text === "edit" ){
              //TABLE CONTENTS
              $('.Edit_ctr1').show();
              $('.Edit_ctr1 .Edit_ctr2').slideDown(800);
              defaultTable();
            }
            else{
              //Nothing
            }
        });

    // INFORMATION BUTTON
        $('#infoBtn').click(function(){
          Swal.fire({
            title: 'INFORMATION',
            html: 'In this page you can ADD, EDIT, and DELETE FACULTY PROFILE <br> <br> <b>ADD Tab</b> <br> You need to know the following: <br>1. It has default profile, if you want to use different profie then click the select button.<br>2. You can leave the Middle name blank or empty.<br>3. You can type "none" or blank in Link input field.<br>4. It has validation for correct email and links.<br>5. It has validation when submitting empty form.<br>6. Confirmation messasge when the save button or reset button is click. <br> <br> <b>Edit Tab</b> <br> You need to know the following: <br>1. It has search bar designated only for name the of faculty. <br>2. It has home icon or just simply a refresh button.<br>3. It has edit and delete button.<br>4. It has confirmation message.<br>5. You can type "none" or blank in Link input field.',
            confirmButtonColor: '#265999',
            confirmButtonText: 'OK',
          });
        });

    // LOGOUT BUTTTON
        $("#outBtn").click(function(){

        });
        
    // ****************************EDIT PROFILE****************************

    //FACULTY SEARCH
        function searchfaculty(){
            let offset = (globalVar.page - 1) * globalVar.limit;
            // alert(globalVar.getSearchTxt());
            //SHOW FACULTY PROFILE
            let searchxhr = new XMLHttpRequest();
            let searchData = 'sname=' + encodeURIComponent(globalVar.getSearchTxt()) + '&offset='  + encodeURIComponent(offset) + '&limit='  + encodeURIComponent(globalVar.limit);

            searchxhr.open('POST', 'ftsearchresult.php', true);
            searchxhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            searchxhr.onload = function() {
              if (searchxhr.status === 200) {
                let sData = searchxhr.responseText;
                // Handle the success response
                if(sData === "none"){
                  Swal.fire({
                    title: 'No Result.',
                    confirmButtonColor: '#265999',
                    confirmButtonText: 'OK'
                  })
                  hidesuggest();
                  clearsearch();
                  defaultTable();
                }
                else{
                  document.getElementById('tableRow').innerHTML = sData;
                  hidesuggest();
                  clearsearch();
                }
                
              } else {
                console.error(searchxhr.status);
              }
            };
            searchxhr.onerror = function() {
              console.error(searchxhr.status);
            };
            searchxhr.send(searchData);

            //BUTTON BY LIST OF FACULTY PROFILE
            pn = globalVar.page;
            $.ajax({
              type: "POST",
              url: "btnpage.php",
              data:{
                limit: globalVar.limit,
                tname: globalVar.getSearchTxt(),
                tid: pn
              },
              cache: false,
              success: function(data){
                let DATA = data;
                $('#tableBtn').html(DATA);
              },
              error: function(xhr, status, error){
                console.error(xhr);
              }
            });
        }

    //SEARCH BAR BUTTON
        $('.search-submit').click(function(){
            // let text = $('.search-input').val();
            globalVar.setSearchTxt($('.search-input').val().trim());
            // globalVar.setSearchTxt(text);
            if(globalVar.getSearchTxt() === '')
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
                    $('.suggest-ctr').slideDown();
                    searchfaculty();
                },2000);
            }
            
        });

    //HOME BUTTON
        $('#tableRefresh').click(function(){
          pop_up();
          setTimeout(function(){
            defaultTable();
          },2000)
          
        });

    //REMINDER BUTTON
        $('#tableReminder').click(function(){
          Swal.fire({
            title: 'REMINDER',
            html: 'THIS IS FOR THE USER <br> <br> PROS <br> 1. Can search Faculty names on search bar <br> 2. Can Edit and Delete Faculty data. <br> 3. Message prompt to user. <br> <br> CONS <br> 1. Search bar is for faculty names only. <br> 2. Not available for multiple delete of Faculty data.',
            confirmButtonColor: '#265999',
            confirmButtonText: 'OK',
          });
        });

    //DELETE BUTTON
        $(document).on("click","#tableRow #tableDeleteBtn", function() {
          Swal.fire({
            title: 'Are you sure you want to Delete the Faculty Profile?',
             confirmButtonColor: '#265999',
             confirmButtonText: 'Yes',
             showCancelButton: true,
             cancelButtonColor: '#265999',
             cancelButtonText: 'No'
           }).then((result)=>{
              if (result.isConfirmed){
                  btn_vm = $(this).closest("#tableRowResult").find("#tableOne").text();
                  pop_up();
                  setTimeout(function() {
                    let xhr = new XMLHttpRequest();
                    let formData = 'btn_vm=' + encodeURIComponent(btn_vm);

                    xhr.open('POST', 'editprofiledelete.php', true);
                    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

                    xhr.onload = function() {
                      if (xhr.status === 200) {
                        let data = xhr.responseText;
                        Swal.fire({
                            title: 'Deleted Successfully.',
                            confirmButtonColor: '#265999',
                            confirmButtonText: 'OK',
                        })
                        defaultTable();
                      } else {
                        console.error(xhr.status);
                      }
                    };

                    xhr.onerror = function() {
                      console.error(xhr.status);
                    };
                    xhr.send(formData);
                },2000)
              }
           })


        });

    //EDIT BUTTON
        $(document).on("click","#tableRow #tableEditBtn", function() {
            Swal.fire({
              title: 'Are you sure you want to edit the Faculty Profile?',
               confirmButtonColor: '#265999',
               confirmButtonText: 'Yes',
               showCancelButton: true,
               cancelButtonColor: '#265999',
               cancelButtonText: 'No'
             }).then((result)=>{
                if (result.isConfirmed){
                    btn_vm = $(this).closest("#tableRowResult").find("#tableOne").text();
                    globalVar.setBtnEdit(btn_vm);
                    pop_up(); 
                      setTimeout(function() {
                        let xhr = new XMLHttpRequest();
                        let formData = 'btn_vm=' + encodeURIComponent(btn_vm);
                        xhr.open('POST', 'editprofile.php', true);
                        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

                        xhr.onload = function() {
                          if (xhr.status === 200) {
                            let data = xhr.responseText;
                            document.getElementById('editCtr').innerHTML = data;
                            // dImage = $('#editImagePreview').data('name');
                          } else {
                            console.error(xhr.status);
                          }
                        };
                        xhr.onerror = function() {
                          console.error(xhr.status);
                        };
                        xhr.send(formData);
                    
                      $('#editProfilectr').css('display','block')
                    },2000)
                }
             })   
        })

    //BACK BUTTON
        $(document).on("click", "#editCtr #editBackbtn", function(){
            Swal.fire({
              title: 'Are you sure you want to go back?',
               confirmButtonColor: '#265999',
               confirmButtonText: 'Yes',
               showCancelButton: true,
               cancelButtonColor: '#265999',
               cancelButtonText: 'No'
             }).then((result)=>{
                if (result.isConfirmed){
                    $('#editProfilectr').css('display','none')
                }
             })    
        })

    //SAVE BUTTON
        $(document).on("click","#editCtr #editSavebtn",function(){
            // INPUT VALUES
            let fname = $('#editFname').val().trim();
            let lname = $('#editLname').val().trim();
            let mname = $('#editMname').val().trim();
            let fullname = fname + " " + mname + " " + lname;
            let email = $('#editEmail').val();
            let link1 = $('#editFB').val();
            let link2 = $('#editGscholar').val();
            let college = $('#editCol').val();
            let department = $('#editDept').val();
            let img1 =  $('#editAddimg').val().split('\\').pop();
            // DROPPDOWN SELECTION VALUES
            let collegeSelect = $('#editCollege').val();
            let departmentSelect = $('#editDepart').val();

            
            //Format
            const facultyForm = new FacultyForm(fname,lname,mname,college,department,email,img1,link1,link2);
            const defaultValue = new DefaultVal();
            if (facultyForm.isFormEmpty()) {
                Swal.fire({
                    title: 'Fill-out all the required fields.',
                    confirmButtonColor: '#265999',
                    confirmButtonText: 'OK',
                });
            }
            else if(facultyForm.isEmailFormat()){
                Swal.fire({
                    title: 'Please enter a valid email.',
                    confirmButtonColor: '#265999',
                    confirmButtonText: 'OK',
                });
                $('#add_email').focus();
            }
            else{  
                if(facultyForm.isProfileImg()){
                  facultyForm.getProfileImg(defaultValue.defaultProfile);
                }
                else{
                  facultyForm.getProfileImg(facultyForm.fProfile);
                }
                
                if (facultyForm.isUrlEmpty()){
                  facultyForm.getURLs(defaultValue.defaultLink1, defaultValue.defaultLink2);
                }
                else if (facultyForm.isUrlFormat()){
                  Swal.fire({
                    title: 'Please enter a valid URL for your Department Facebook page and Google Scholar.',
                    confirmButtonColor: '#265999',
                    confirmButtonText: 'OK',
                  });
                }
                else{
                  facultyForm.getURLs(facultyForm.fbPage, facultyForm.gScholar);
                }

                if(collegeSelect === null || departmentSelect === null){
                  // nothing
                }else{
                  college = collegeSelect;
                  department = departmentSelect; 
                }

                if(facultyForm.mName === ""){
                  facultyForm.setFullName(facultyForm.fName + " " + facultyForm.lName);
                }
                else{
                  facultyForm.setFullName(facultyForm.fName + " " + facultyForm.mName + " " + facultyForm.lName);
                }
              
                var formData = new FormData();
                var imageFile = $('#editAddimg')[0].files[0];
                formData.append('btnVm', globalVar.buttonEdit);
                formData.append('image', imageFile);
                formData.append('img', facultyForm.ProfileImg);
                formData.append('fullname', facultyForm.getFullName().toUpperCase());
                formData.append('fname', facultyForm.fName.toUpperCase());
                formData.append('lname', facultyForm.lName.toUpperCase());
                formData.append('mname', facultyForm.mName.toUpperCase());
                formData.append('email', facultyForm.fEmail);
                formData.append('college', facultyForm.fCollege);
                formData.append('department', facultyForm.fDepartment);
                formData.append('link1', facultyForm.fFBPage);
                formData.append('link2', facultyForm.fGScohlar);

                let xhr = new XMLHttpRequest();
                
                xhr.open('POST', 'editprofilesave.php', true);
                // xhr.setRequestHeader('Content-Type', 'multipart/form-data');
                xhr.onload = function() {
                  if (xhr.status === 200) {
                    let data = xhr.responseText;
                    // Handle the success response
                    Swal.fire({
                            title: 'Edit Successfully.',
                            confirmButtonColor: '#265999',
                            confirmButtonText: 'OK',
                        }).then((result)=>{
                            if(result.isConfirmed){
                                $('#editProfilectr').css('display','none')
                            }
                        });
                  } else {
                    console.error(xhr.status);
                  }
                };
                xhr.onerror = function() {
                  console.error(xhr.status);
                };
                xhr.send(formData);
            }
        })

    //ADD IMAGE BUTTON
        $(document).on("click","#editCtr #edImgbtn", function(){
            $('#editAddimg').click();
        })

    //Preview Image
        $(document).on("change", "#editCtr #editAddimg", function(){
          let file_name = $(this).val().split('\\').pop();
          let file = $(this).prop('files')[0];
          let reader = new FileReader();
          
          reader.onload = function() {
            $('#editCtr #editImagePreview').attr('src', reader.result).show();
          };
          reader.readAsDataURL(file);
        });

    // DROPDOWN COLLEGE
        $(document).on("change", "#editCollege", function(){
          var selectedOption = $(this).val();
          $('#editCol').val(selectedOption);
        });
    // DROPDOWN DEPARTMENT
        $(document).on("change", "#editDepart", function(){
          var selectedOption = $(this).val();
          $('#editDept').val(selectedOption);
        })
        
    // ****************************Table Button****************************

    //BUTTON PREV
        $(document).on("click","#tableBtn .pg_prev", function() {
          globalVar.getAtrName($(this).attr('name'));

          if(globalVar.atrName === "liTableBtn"){
            let id = (this.value) - 1;
            let offset = (id - 1) * globalVar.limit;
            pn = id;

            let liTableXhr = new XMLHttpRequest();
            let liTformData = 'offset=' + encodeURIComponent(offset) + '&limit=' + encodeURIComponent(globalVar.limit) + '&sname=' + encodeURIComponent(globalVar.getSearchTxt());

            liTableXhr.open('POST', 'ftsearchresult.php?page=' + globalVar.page, true);
            liTableXhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            liTableXhr.onload = function() {
              if (liTableXhr.status === 200) {
                let liTabledata = liTableXhr.responseText;
                document.getElementById('tableRow').innerHTML = liTabledata;
              } else {
                console.error(liTableXhr.status);
              }
            };

            liTableXhr.onerror = function() {
              console.error(liTableXhr.status);
            };

            liTableXhr.send(liTformData);

            //BUTTON FOR DROPDOWN FILTER FACULTY
            $.ajax({
              type: "POST",
              url: "btnpage.php",
              data:{
                limit: globalVar.limit,
                tname: globalVar.getSearchTxt(),
                tid: pn
              },
              cache: false,
              success: function(data){
                $('#tableBtn').html(data);
              },
              error: function(xhr, status, error){
                console.error(xhr);
              }
            });
          }
          else{
            let id = (this.value) - 1;
            let offset = (id - 1) * globalVar.limit;
            pn = id;

            let prevTablexhr = new XMLHttpRequest();
            let prevformData = 'offset=' + encodeURIComponent(offset) + '&limit=' + encodeURIComponent(globalVar.limit);

            prevTablexhr.open('POST', 'ft.php?page=' + globalVar.page, true);
            prevTablexhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            prevTablexhr.onload = function() {
              if (prevTablexhr.status === 200) {
                let prevTabledata = prevTablexhr.responseText;
                document.getElementById('tableRow').innerHTML = prevTabledata;
              } else {
                console.error(prevTablexhr.status);
              }
            };

            prevTablexhr.onerror = function() {
              console.error(prevTablexhr.status);
            };

            prevTablexhr.send(prevformData);

            //BUTTON FOR DROPDOWN FILTER FACULTY
            $.ajax({
              type: "POST",
              url: "btnpage.php",
              data:{
                limit: globalVar.limit,
                xid: pn
              },
              cache: false,
              success: function(data){
                $('#tableBtn').html(data);
              },
              error: function(xhr, status, error){
                console.error(xhr);
              }
            });
          }
            
        });
    
    //BUTTON NEXT
        $(document).on("click","#tableBtn .pg_next", function() {
          globalVar.getAtrName($(this).attr('name'));
          if(globalVar.atrName === "liTableBtn"){
            let id = parseInt((this.value)) + 1;
            let offset = (id - 1) * globalVar.limit;
            pn = id;

            let liTablexhr = new XMLHttpRequest();
            let liTableformData = 'offset=' + encodeURIComponent(offset) + '&limit=' + encodeURIComponent(globalVar.limit) + '&sname=' + encodeURIComponent(globalVar.getSearchTxt());

            liTablexhr.open('POST', 'ftsearchresult.php?page=' + globalVar.page, true);
            liTablexhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            liTablexhr.onload = function() {
              if (liTablexhr.status === 200) {
                let liTabledata = liTablexhr.responseText;
                document.getElementById('tableRow').innerHTML = liTabledata;
              } else {
                console.error(liTablexhr.status);
              }
            };

            liTablexhr.onerror = function() {
              console.error(liTablexhr.status);
            };

            liTablexhr.send(liTableformData);

            //BUTTON FOR DROPDOWN FILTER FACULTY
            $.ajax({
              type: "POST",
              url: "btnpage.php",
              data:{
                limit: globalVar.limit,
                tname: globalVar.getSearchTxt(),
                tid: pn
              },
              cache: false,
              success: function(data){
                $('#tableBtn').html(data);
              },
              error: function(xhr, status, error){
                console.error(xhr);
              }
            });
          }
          else{

          }
            let id = parseInt((this.value)) + 1;
            let offset = (id - 1) * globalVar.limit;
            pn = id;

            let nextTablexhr = new XMLHttpRequest();
            let nextTableformData = 'offset=' + encodeURIComponent(offset) + '&limit=' + encodeURIComponent(globalVar.limit);

            nextTablexhr.open('POST', 'ft.php?page=' + globalVar.page, true);
            nextTablexhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            nextTablexhr.onload = function() {
              if (nextTablexhr.status === 200) {
                let nextTabledata = nextTablexhr.responseText;
                document.getElementById('tableRow').innerHTML = nextTabledata;
              } else {
                console.error(nextTablexhr.status);
              }
            };

            nextTablexhr.onerror = function() {
              console.error(nextTablexhr.status);
            };

            nextTablexhr.send(nextTableformData);

            //BUTTON FOR DROPDOWN FILTER FACULTY
            $.ajax({
              type: "POST",
              url: "btnpage.php",
              data:{
                limit: globalVar.limit,
                xid: pn
              },
              cache: false,
              success: function(data){
                $('#tableBtn').html(data);
              },
              error: function(xhr, status, error){
                console.error(xhr);
              }
            });
        });

    //BUTTON FIRST AND LAST PAGINATION 
        $(document).on("click","#tableBtn .pg_num", function(){
          globalVar.getAtrName($(this).attr('name'));
          if(globalVar.atrName === "liTableBtn"){
            let id = this.value;
            let offset = (id - 1) * globalVar.limit;
            pn = id;

            let liTablexhr = new XMLHttpRequest();
            let liTableformData = 'offset=' + encodeURIComponent(offset) + '&limit=' + encodeURIComponent(globalVar.limit) + '&sname=' + encodeURIComponent(globalVar.getSearchTxt());

            liTablexhr.open('POST', 'ftsearchresult.php?page=' + globalVar.page, true);
            liTablexhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            liTablexhr.onload = function() {
              if (liTablexhr.status === 200) {
                let liTabledata = liTablexhr.responseText;
                document.getElementById('tableRow').innerHTML = liTabledata;
              } else {
                console.error(liTablexhr.status);
              }
            };

            liTablexhr.onerror = function() {
              console.error(liTablexhr.status);
            };

            liTablexhr.send(liTableformData);

            //BUTTON FOR DROPDOWN FILTER FACULTY
            $.ajax({
              type: "POST",
              url: "btnpage.php",
              data:{
                tname: globalVar.getSearchTxt(),
                limit: globalVar.limit,
                tid: pn
              },
              cache: false,
              success: function(data){
                $('#tableBtn').html(data);
              },
              error: function(xhr, status, error){
                console.error(xhr);
              }
            });
          }
          else{
            let id = this.value;
            let offset = (id - 1) * globalVar.limit;
            pn = id;

            let flTablexhr = new XMLHttpRequest();
            let flTableformData = 'offset=' + encodeURIComponent(offset) + '&limit=' + encodeURIComponent(globalVar.limit);

            flTablexhr.open('POST', 'ft.php?page=' + globalVar.page, true);
            flTablexhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            flTablexhr.onload = function() {
              if (flTablexhr.status === 200) {
                let flTabledata = flTablexhr.responseText;
                document.getElementById('tableRow').innerHTML = flTabledata;
              } else {
                console.error(flTablexhr.status);
              }
            };

            flTablexhr.onerror = function() {
              console.error(flTablexhr.status);
            };

            flTablexhr.send(flTableformData);

            //BUTTON FOR DROPDOWN FILTER FACULTY
            $.ajax({
              type: "POST",
              url: "btnpage.php",
              data:{
                limit: globalVar.limit,
                xid: pn
              },
              cache: false,
              success: function(data){
                $('#tableBtn').html(data);
              },
              error: function(xhr, status, error){
                console.error(xhr);
              }
            });
          }
        });


    // ****************************Table Button UNTIL HERE****************************

    //BACK BUTTON FOR EDIT&DELETE
        $('.eback_ctr button').click(function(){
            Swal.fire({
              title: 'Are you sure you want to exit?',
              confirmButtonColor: '#265999',
              confirmButtonText: 'Yes',
              showCancelButton: true,
              cancelButtonColor: '#265999',
              cancelButtonText: 'No'
            }).then((result) => {
              if (result.isConfirmed) {
                $('.Edit_ctr2').slideUp(800);
                setTimeout(function(){
                    clearsearch();
                    hidesuggest();
                    disabledT();
                    $('#edsave_btn').css('display','none')
                    $('#ededit_btn').css('display','block')
                    $('#edimg_preview').attr('src', '../IMG/R&DCDefaultProfile.png');
                    $('.Edit_ctr1').hide(400);
                },900);
              }
            });
        });

    //DISABLED FORM
        function disabledT(){
        $('#ed_surname').prop("disabled",true);
        $('#ed_firstname').prop("disabled",true);
        $('#ed_middlename').prop("disabled",true);
        $('#ed_email').prop("disabled",true);
        $('#ed_surname').prop("disabled",true);
        $('#ed_fbpage').prop("disabled",true);
        $('#ed_gscholar').prop("disabled",true);
        $('#ed_cllge').prop("disabled",true);
        $('#ed_dprtment').prop("disabled",true);
        $('edimg_btn').prop("disabled", true);
        }

        function disabledF(){
        $('#ed_surname').prop("disabled",false);
        $('#ed_firstname').prop("disabled",false);
        $('#ed_middlename').prop("disabled",false);
        $('#ed_email').prop("disabled",false);
        $('#ed_surname').prop("disabled",false);
        $('#ed_fbpage').prop("disabled",false);
        $('#ed_gscholar').prop("disabled",false);
        $('#ed_cllge').prop("disabled",false);
        $('#ed_dprtment').prop("disabled",false);
        $('edimg_btn').prop("disabled", false);
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
            let maxLength = $(this).attr('maxlength');
            let charlimit = 3;
            searchtxtlength = $(this).val().length;

            if(searchtxtlength <charlimit){
                hidesuggest();
            }
            else if(searchtxtlength >= maxLength){ 
                Swal.fire({
                    title: 'Only 30 characters allowed.',
                    confirmButtonColor: '#265999',
                    confirmButtonText: 'OK',
                })
            }
            else{
              let searchtxt = document.querySelector('.search-input').value;
              document.querySelector('.suggest-ctr').style.display = 'block';
              let offset = (globalVar.page - 1) * globalVar.limit;
              
              let searchxhr = new XMLHttpRequest();
              let searchFormData = new FormData();
              searchFormData.append('name', searchtxt);
              searchFormData.append('offset', offset);
              searchFormData.append('limit', globalVar.limit);
          
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
              globalVar.setSearchTxt($('.search-input').val().trim());
              // globalVar.setSearchTxt(text);
              if(globalVar.getSearchTxt() === '')
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
                      $('.suggest-ctr').slideDown();
                      searchfaculty();
                  },2000);
              }
            }
        });

    //CLICK THE SUGGESTION NAME
        $(document).on('click','#s_suggest .suggestname', function(){
            let f_name = this.innerText.trim();
            search_input.val(f_name);
            search_input.focus();
        });

    //SEARCHBAR CODE
        $('#search_in').click(function(){   
            inputsearch();
            hidesuggest();
        });

        $('#sclear_btn').click(function(){
            clearsearch();
            hidesuggest();
        });

    //BUTTON SEARCHBAR
        $('.search-submit').click(function(){
            let noresult = $('#ed_noresult').val();
            globalVar.setSearchTxt($('.search-input').val());
            if(globalVar.getSearchTxt() === '')
            { 
                Swal.fire({
                    title: 'No input value.',
                    confirmButtonColor: '#265999',
                    confirmButtonText: 'OK'
                })
            }
            else if(noresult === "No Result Found") {
                Swal.fire({
                    title: 'No Records Founds.',
                    confirmButtonColor: '#265999',
                    confirmButtonText: 'OK',
                }).then((result) => {
                  if (result.isConfirmed) {
                    hidesuggest();
                    clearsearch();
                  }
                });

            }
            else{
                pop_up();
                setTimeout(function(){
                    searchfaculty();
                    $('.suggest-ctr').slideDown();
                },2000);
            }
            
        });
    // ****************************UNTIL HERE EDIT PROFILE****************************


    // ****************************ADD PROFILE****************************
        
    //ADD PROFILE - BACK BUTTON
        $('.aback_ctr button').click(function(){
        Swal.fire({
          title: 'Are you sure you want to exit?',
          confirmButtonColor: '#265999',
          confirmButtonText: 'Yes',
          showCancelButton: true,
          cancelButtonColor: '#265999',
          cancelButtonText: 'No'
        }).then((result) => {
          if (result.isConfirmed) {
            $('.Add_ctr2').slideUp(800);
            setTimeout(function(){
                $('#addimg_preview').attr('src', '../IMG/R&DCDefaultProfile.png');
                $('.acard_template #myForm')[0].reset();
                $('.Add_ctr1').hide(400);
            },900);
          }
        });
    });

    //ADD PROFILE - ADD IMG BUTTON
        $('#addimg_btn').click(function(){
        $('#add_img').click();
      });
    
    //ADD PROFLI - iMG PREVIEW
        $('#add_img').change(function() {
        let file_name = $(this).val().split('\\').pop();
        let file = $(this).prop('files')[0];
        // let file_namee = file.name;
        let reader = new FileReader();
        reader.onload = function() {
        $('#addimg_preview').attr('src', reader.result).show();
        }
        reader.readAsDataURL(file);
    });

    //ADD PROFILE FORM - RESET BUTTON
        $('.acard_reset').click(function() {
            let fname = $('#add_firstname').val();
            let lname = $('#add_surname').val();
            let mname = $('#add_middlename').val();
            let email = $('#add_email').val();
            let link1 = $('#add_fbpage').val();
            let link2 = $('#add_gscholar').val();
            let college = $('#add_cllge').val();
            let department = $('#add_dprtment').val();
            
            if (fname === "" && lname === "" && email === "" && college === null && department === null && link1 === "" && link2 === "") {
                Swal.fire({
                    title: 'No Input Value',
                    confirmButtonColor: '#265999',
                    confirmButtonText: 'OK',
                });
            }
            else{
                $('.acard_template #myForm')[0].reset();
            }
        });
    
    //ADD PROFILE FORM - SUBMIT BUTTON
        $('.acard_submit').click(function(e){
            // VARIABLE WITH DATA
            let fname = $('#add_firstname').val().trim();
            let lname = $('#add_surname').val().trim();
            let mname = $('#add_middlename').val().trim();
            let email = $('#add_email').val();
            let link1 = $('#add_fbpage').val();
            let link2 = $('#add_gscholar').val();
            let college = $('#add_cllge').val();
            let department = $('#add_dprtment').val();
            let img1 =  $('#add_img').val().split('\\').pop();
            
            // CLASS
            const facultyForm = new FacultyForm(fname,lname,mname,college,department,email,img1,link1,link2);
            const defaultValue = new DefaultVal();

            // CONDITION
            if (facultyForm.isFormEmpty()) {
                Swal.fire({
                    title: 'Fill-out all the required fields.',
                    confirmButtonColor: '#265999',
                    confirmButtonText: 'OK',
                });
            }
            else if(facultyForm.isEmailFormat()){
                Swal.fire({
                    title: 'Please enter a valid email.',
                    confirmButtonColor: '#265999',
                    confirmButtonText: 'OK',
                });
                $('#add_email').focus();
            }
            else{
                if(facultyForm.isProfileImg()){
                  facultyForm.getProfileImg(defaultValue.defaultProfile);
                }
                else{
                  facultyForm.getProfileImg(facultyForm.fProfile);
                }
                
                if (facultyForm.isUrlEmpty()){
                  facultyForm.getURLs(defaultValue.defaultLink1, defaultValue.defaultLink2);
                }
                else if (facultyForm.isUrlFormat()){
                  Swal.fire({
                    title: 'Please enter a valid URL for your Department Facebook page and Google Scholar.',
                    confirmButtonColor: '#265999',
                    confirmButtonText: 'OK',
                  });
                }
                else{
                  facultyForm.getURLs(facultyForm.fbPage, facultyForm.gScholar);
                }

                if(facultyForm.mName === ""){
                  facultyForm.setFullName(facultyForm.fName + " " + facultyForm.lName);
                }
                else{
                  facultyForm.setFullName(facultyForm.fName + " " + facultyForm.mName + " " + facultyForm.lName);
                }
                // alert(facultyForm.getFullName())
                // SEND TO DATABASE

                let imageData = $('#add_img');
                var formData = new FormData();
                var imageFile = imageData[0].files[0];
                formData.append('image', imageFile);
                formData.append('img', facultyForm.ProfileImg);
                formData.append('fullname', facultyForm.getFullName().toUpperCase());
                formData.append('fname', facultyForm.fName.toUpperCase());
                formData.append('lname', facultyForm.lName.toUpperCase());
                formData.append('mname', facultyForm.mName.toUpperCase());
                formData.append('email', facultyForm.fEmail);
                formData.append('college', facultyForm.fCollege);
                formData.append('department', facultyForm.fDepartment);
                formData.append('link1', facultyForm.fFBPage);
                formData.append('link2', facultyForm.fGScohlar);
                

                let xhr = new XMLHttpRequest();
                xhr.open('POST', 'addprofile.php', true);
                // SAVE TO DATABASE
                xhr.onload = function() {
                  if (xhr.status === 200) {
                    let data = xhr.responseText;
                    if(data === "error"){
                      Swal.fire({
                        title: 'Error',
                        confirmButtonColor: '#265999',
                        confirmButtonText: 'OK',
                      })
                    }else if(data === "encounter"){
                      Swal.fire({
                        title: 'There is already with the same record in the database.',
                        confirmButtonColor: '#265999',
                        confirmButtonText: 'OK',
                      }).then((result)=>{
                        if (result.isConfirmed){
                          $('.acard_template #myForm')[0].reset();
                          $('#addimg_preview').attr('src', '../IMG/R&DCDefaultProfile.png');
                        }
                      });
                    }else{
                      // Handle the success response
                      Swal.fire({
                        title: 'New Faculty Added Successfully.',
                        confirmButtonColor: '#265999',
                        confirmButtonText: 'OK',
                      }).then((result)=>{
                        if (result.isConfirmed){
                          $('.acard_template #myForm')[0].reset();
                          $('#addimg_preview').attr('src', '../IMG/R&DCDefaultProfile.png');
                        }
                      });
                    }
                  }else{
                    console.error(xhr.status);
                  }
                };
                xhr.onerror = function() {
                  console.error(xhr.status);
                };
                xhr.send(formData);
            }
        });
    // ****************************UNTIL HERE ADD PROFILE****************************
        
});