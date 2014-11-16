
lis = $('.floors').find('li'),
liHeight = 230,
lisLength = lis.length;
totalLisHeight = liHeight * lisLength;

$('.floors').css('margin-top', -(totalLisHeight-liHeight))

var elevateMeLater = new $.Deferred();
elevateMeLater.resolve();
$(".btn").click(function(event) {
    var floorNum = $(this).text();
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
    var floored=floorNum;
    if (onfloor === floored) {	
        buttonoff(clicked);
        elevateMeLater.resolve();
    }
    else if(floored > onfloor) {
        $( ".up-indicator" ).addClass( "on" );
        var upElevator = function(){
            
            $(".floor-indicator").text(onfloor);
            $(".floors").animate({top: ((liHeight * onfloor)-liHeight)})
            if (onfloor == floored){
                $( ".up-indicator" ).removeClass( "on" );
                buttonoff(clicked);
                $(".floor-indicator").text(onfloor);
                elevateMeLater.resolve();
            }
            if(onfloor++ < floored){
                setTimeout(upElevator, delay);
            }
        }
        upElevator();
    } else if (onfloor > floored ) {
        $( ".down-indicator" ).addClass( "on" );
        var downElevator = function(){
            $(".floor-indicator").text(onfloor);
            $(".floors").animate({top: ((liHeight * onfloor)-liHeight)})
            if (onfloor == floored){
                $( ".down-indicator" ).removeClass( "on" );	
                buttonoff(clicked);
                $("#onfloor").text(onfloor);
                elevateMeLater.resolve();
            }
            if(onfloor-- > floored){
                setTimeout(downElevator, delay);
            }
        }
        downElevator();
    }
}
function buttonoff(clicked) {
    $(clicked).removeClass( "btn-on" );
}