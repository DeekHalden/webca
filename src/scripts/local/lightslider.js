

$(document).ready(function(){
    $('#equipment__slider').lightSlider({
        gallery: true,
        item: 1,
        loop: true,
        slideMargin: 0,
        thumbItem: 3
    });

    $('#equipment__additional_slider').lightSlider({
        item:4,
        loop:true,
        slideMove:2,
        
        speed:600,
        responsive : [
            {
                breakpoint:800,
                settings: {
                    item:3,
                    slideMove:1,
                    slideMargin:6,
                  }
            },
            {
                breakpoint:480,
                settings: {
                    item:1,
                    slideMove:1
                  }
            }
        ]
    });  
})
        
        
