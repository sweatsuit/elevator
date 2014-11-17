// set up floor vars
lis = $('.floors').find('li'),
liHeight = 230,
lisLength = lis.length;
totalLisHeight = liHeight * lisLength;


// initially push floors off screen
$('.floors').css('margin-top', -(totalLisHeight-liHeight))

var elevateMeLater = new $.Deferred();
// ?
elevateMeLater.resolve();
$(".btn").click(function(event) {
    var floorNum = $(this).text();
    // ?
    var clicked = event.target.id;
    clicked="#"+clicked;
    $(this).addClass( "btn-on" );
    $.when(elevateMeLater.promise()).done(function() {
        elevateMeLater = new $.Deferred();
        var onfloor = $(".floor-indicator").text();
        elevateFunction(clicked, floorNum, onfloor);
    });
    //console.log(clicked);
});
function elevateFunction(clicked,floorNum,onfloor) {    
    var delay = 2000;
    if (onfloor === floorNum) {	
        buttonoff(clicked);
        elevateMeLater.resolve();
    }
    else if(floorNum > onfloor) {
        $( ".up-indicator" ).addClass( "on" );
        var upElevator = function(){
            
            $(".floor-indicator").text(onfloor);
            $(".floors").animate({top: ((liHeight * onfloor)-liHeight)})
            if (onfloor == floorNum){
                $( ".up-indicator" ).removeClass( "on" );
                buttonoff(clicked);
                $(".floor-indicator").text(onfloor);
                elevateMeLater.resolve();
                console.log(onfloor, floorNum);
            }
            if(onfloor++ < floorNum){
                setTimeout(upElevator, delay);
            }
        }
        upElevator();
    } else if (onfloor > floorNum ) {
        $( ".down-indicator" ).addClass( "on" );
        var downElevator = function(){
            $(".floor-indicator").text(onfloor);
            $(".floors").animate({top: ((liHeight * onfloor)-liHeight)})
            if (onfloor == floorNum){
                $( ".down-indicator" ).removeClass( "on" );	
                buttonoff(clicked);
                $("#onfloor").text(onfloor);
                elevateMeLater.resolve();
            }
            if(onfloor-- > floorNum){
                setTimeout(downElevator, delay);
            }
        }
        downElevator();
    }
}
function buttonoff(clicked) {
    $(clicked).removeClass( "btn-on" );
}