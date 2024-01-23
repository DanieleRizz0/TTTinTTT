var lastPlay;

const socket = io();

$(".square-item").click(function(){ 
    let len = $(".x").length + $(".o").length;

    if ($(this).hasClass("o")) {
        $(this).toggleClass("o");
        $(this).toggleClass("x");
        $(this).css("background-image", "url(cross.png)");
    } else if ($(this).hasClass("x")){
        $(this).toggleClass("x");
        $(this).toggleClass("o");
        $(this).css("background-image", "url(circle.png)"); 
    } else {
        if (len%2 == 0){
            $(this).toggleClass("o");
            $(this).css("background-image", "url(circle.png)");
        } else {
            $(this).toggleClass("x");
            $(this).css("background-image", "url(cross.png)");
        }
    } 

    $(".sub-container").removeClass("disabled")
    $(".sub-container").removeClass("enabled_g")
    $(".sub-container").removeClass("enabled_r")
    lastPlay = $(this).attr("ID").split("-")[1];
    $(".sub-container").not("#"+lastPlay).toggleClass("disabled")
    if(len%2 == 0){
        $(".sub-container").filter("#"+lastPlay).toggleClass("enabled_g");
    } else {
        $(".sub-container").filter("#"+lastPlay).toggleClass("enabled_r");
    }

    socket.emit('move', $(this).attr('ID')); 

});

$(".square-item").on("contextmenu", function(e){ 
    e.preventDefault();
    $(this).removeClass("o");
    $(this).removeClass("x");
    $(this).css("background-image", "none");
})

$(".reset").click(function(){
    $(".sub-container").removeClass("disabled")
    $(".sub-container").removeClass("enabled_g")
    $(".sub-container").removeClass("enabled_r")
    $(".square-item").removeClass("x");
    $(".square-item").removeClass("o");
    $(".square-item").css("background-image", "none");    

    socket.emit('reset');
})

$(".edit").click(function(){
    if($(this).text()=='EDIT'){
        $(".sub-container").removeClass("disabled");
    } 
})

socket.on('reset', ()=>{
    $(".sub-container").removeClass("disabled")
    $(".sub-container").removeClass("enabled_g")
    $(".sub-container").removeClass("enabled_r")
    $(".square-item").removeClass("x");
    $(".square-item").removeClass("o");
    $(".square-item").css("background-image", "none");  
})

socket.on('move', (idm) => {
    let len = $(".x").length + $(".o").length;

    if (len%2 == 0){
        $("#"+idm).toggleClass("o");
        $("#"+idm).css("background-image", "url(circle.png)");
    } else {
        $("#"+idm).toggleClass("x");
        $("#"+idm).css("background-image", "url(cross.png)");
    }

    $(".sub-container").removeClass("disabled")
    $(".sub-container").removeClass("enabled_g")
    $(".sub-container").removeClass("enabled_r")
    lastPlay = $("#"+idm).attr("ID").split("-")[1];
    $(".sub-container").not("#"+lastPlay).toggleClass("disabled")
    if(len%2 == 0){
        $(".sub-container").filter("#"+lastPlay).toggleClass("enabled_g");
    } else {
        $(".sub-container").filter("#"+lastPlay).toggleClass("enabled_r");
    }
});


