$(function(){
    $("header nav .for_icon .fa-bars").on("click",function(){
       
        $("header nav .div_for_links").toggle("1000");
    
    });
    
   $(window).resize(function() {
      
         location.reload();
         return;
   });
});