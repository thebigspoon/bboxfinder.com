/*
**
**  create a lightBox instance
**  really b/c we need a singleton
**
*/
var lightBox = (function(){ // execute immediately
    "use strict";

    var LightBox = function(options){

        options || (options={});
    
        this.cWidth = null;
        this.cHeight = null;

    };
    

    LightBox.prototype.startLightBox = function() {

        $("#ocontainer")
            .before('<div class="overlay"></div>')

        $(".overlay")
            .animate({"opacity":"0.6"}, 200, "linear");

        $(".ocontainer")
            .css( "display", "inherit" );

        // use width and height to dynamically position
        if( !(this.cWidth) && !(this.cHeight) ){
            this.cWidth = $(".ocontainer textarea").width();
            this.cHeight = $(".ocontainer textarea").height();
        }

        $(".ocontainer")
            .css({
                "top":        "50%",
                "left":        "50%",
                "width":      this.cWidth + 20,
                "height":     this.cHeight + 20,
                "margin-top": -(this.cHeight/2), // the middle position
                "margin-left":-(this.cWidth/2)
            })
            .animate({"opacity":"1"}, 200, "linear");

        
        $("#map .leaflet-tile-loaded").addClass( "blurred" );
    };

    LightBox.prototype.endLightBox = function(){

        $('.ocontainer').css("display", "none" );
        $('#map .leaflet-tile-loaded').removeClass('blurred');
        $('#map .leaflet-tile-loaded').addClass('unblurred');
        setTimeout( function(){
            $('#map .leaflet-tile-loaded').removeClass('unblurred');
        },7000);
        $('.overlay').remove();

    };

    return new LightBox();

})();
