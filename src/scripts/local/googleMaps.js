function initMap() {
    var myLatLng = {
        lat: 49.9719322,
        lng: 36.1608323
    };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 18,
        center: myLatLng,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });


    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        animation: google.maps.Animation.DROP,
        title: 'Hello World!',
        icon: '../assets/images/pin_large.png'
    });

    function enableScrollingWithMouseWheel() {
        map.setOptions({
            scrollwheel: true
        });
    }

    function disableScrollingWithMouseWheel() {
        map.setOptions({
            scrollwheel: false
        });
    }



    google.maps.event.addListener(map, 'mousedown', function() {
        enableScrollingWithMouseWheel()
    });




    $('body').on('mousedown', function(event) {
        var clickedInsideMap = $(event.target).parents('.contacts_map')[0].length > 0;

        if (!clickedInsideMap) {
            disableScrollingWithMouseWheel();
        }
    });

    $(window).scroll(function() {
        disableScrollingWithMouseWheel();
    });



}

$(function() {
    var map = document.getElementById("map");


    var googleMapWidth = $("#map").css('width');
    var googleMapHeight = $("#map").css('height');



    var clicks = 0;
    $('#enter-full-screen').click(function() {


        if (clicks == 0) {

            $(".contacts__map").css("height", '500px');
            var interval = setInterval(function() {
                google.maps.event.trigger(map, 'resize');
                clearInterval();
            }, 1);


            clicks++;
        } else {
            $(".contacts__map").css("height", '200px');
            var interval = setInterval(function() {
                google.maps.event.trigger(map, 'resize');
                clearInterval();
            }, 1);



            clicks--;

        }

        function clearInterVal() {
            clearInterval(interval);
        }
    });
});