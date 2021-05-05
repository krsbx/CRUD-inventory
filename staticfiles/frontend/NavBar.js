$(document).ready(function(){
    //Changes navbar color
    $(window).scroll(function(){
        if(this.scrollY > 20){
            $('.SideBar').addClass('sticky');
        }else{
            $('.SideBar').removeClass('sticky');
        }
    });
    // //Menu button for responsiveness
    // $('.menu-btn').click(function(){
    //     $(this).toggleClass("active");
    //     $(".navbar-menu").toggleClass("active");
    // });
});