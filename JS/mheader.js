$(document).ready(function(){

    // console.log("hello");
    // BUTTON LINKS BG-COLOR
    // $('.linkshome').addClass('active');
    // $(document).on('click','.link_ctr .links',function(){
    //     // $('.links').removeClass('active');
    //     // $(this).addClass('active');
    //     alert("Hello");
    // });


    // $('.link_ctr a .links').click(function(){
    //     var text = this.innerText;
    //     alert(text);
    // });

    // $('.link_ctr').css('display','block');
    $('.linkburger_ctr .linkburger').on('click',function(){
        // alert("hello");
        $('.hlink_ctr').slideToggle();
        // $('.link_ctr').toggleClass('hidee');
    });

    // $(document).on('click', '.linkburger span', function(){
    //     console.log("hello");
    // })
});
   
      