var expr = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;

$(document).ready(function() {
    $("#bEnviar").click(function() {
        var nombre = $("#name").val();
        var email = $("#email").val();
        var mensaje = $("#message").val();

        if(nombre == ""){
            $("#mensaje1").fadeIn();
            return false;
        }else{
            $("#mensaje1").fadeOut();
        }

        if(email == "" || !expr.test(email)){
            $("#mensaje2").fadeIn();
            return false;
        }else{
            $("#mensaje2").fadeOut();
        }

        if(mensaje == ""){
            $("#mensaje3").fadeIn();
            return false;
        }else{
            $("#mensaje3").fadeOut();
        }
    });

});

