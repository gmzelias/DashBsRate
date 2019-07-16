//Only numbers validation
function validate(evt) {
    var theEvent = evt || window.event;
    // Handle paste
    if (theEvent.type === 'paste') {
        key = event.clipboardData.getData('text/plain');
    } else {
    // Handle key press
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    var regex = /[0-9]|\./;
    if( !regex.test(key) ) {
      theEvent.returnValue = false;
      if(theEvent.preventDefault) theEvent.preventDefault();
    }
  }
/////

//Timestamp//
var currentdate = new Date(); 
var datetime =  currentdate.getDate() + "/"
                + (currentdate.toLocaleString('default', { month: 'long' }))  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
console.log(datetime);
$(".timestamp").html(datetime);
/////

function showIt2() {
    $("#mainBox").addClass("blurElement");  
    $("#apiReload").fadeIn("slow");
}


jQuery.ajax({
    type: "GET",
    url: 'http://ec2-18-237-86-164.us-west-2.compute.amazonaws.com:3000/API/rates',
    rejectUnauthorized: false,
    requestCert: true,
    agent: false,
    success: function(res) { 
        var strVES = res.vesDashRate;

        //************************************** 1MM, 10MM, 100MM***********************************//START
        if(strVES.length === 10){
            var mainBsRate = strVES.replace(".", ",");
            mainBsRate = mainBsRate.slice(0,1) + "." + mainBsRate.slice(1,4)  + "." + mainBsRate.slice(4);
           $("#mainDashRate").text(mainBsRate + ' Bs');
        } 
        if(strVES.length === 11){
            var mainBsRate = strVES.replace(".", ",");
            mainBsRate = mainBsRate.slice(0,2) + "." + mainBsRate.slice(2,5)  + "." + mainBsRate.slice(5);
           $("#mainDashRate").text(mainBsRate + ' Bs');
        } 
        if(strVES.length === 12){
            var mainBsRate = strVES.replace(".", ",");
            mainBsRate = mainBsRate.slice(0,3) + "." + mainBsRate.slice(3,6)  + "." + mainBsRate.slice(6);
           $("#mainDashRate").text(mainBsRate + ' Bs');
        } 
        //************************************** 1MM, 10MM, 100MM***********************************//END

        $('#bsRate').bind("keyup change",function(e){
            var dashCalculation = ($("#bsRate").val() / strVES).toFixed(8);
            $("#dashRate").val(dashCalculation);
        });
        $('#dashRate').bind("keyup change",function(e){
            var bsCalculation = ($("#dashRate").val() * strVES).toFixed(2);
            $("#bsRate").val(bsCalculation);
        });
        setTimeout("showIt2()", 20000); // after 5 secs
        $("#bsRate").val(strVES);
        $("#loaderSpinner").hide();
        $("#apiDocs").show();
        $("#mainBox").fadeIn("slow");  
    },
    error: function (e) {
        $("#loaderSpinner").hide();
        $("#apiError").fadeIn("slow");
    }
})
