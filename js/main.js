/* ---- mixitup.js our work sorting ---- */
$('#thework').mixItUp({
    animation: {
		duration: 1000
    }
});

/* ---- our ideology hover ---- */
$('.process-box').hover(function() {
	$(this).find('.process-intro').hide();
	$(this).find('.process-content').fadeIn();
}, function() {
	$(this).find('.process-content').hide();
	$(this).find('.process-intro').fadeIn();
});

/* ---- contact form ---- */
$("#contactForm").validator().on("submit", function(event) {
    if (event.isDefaultPrevented()) {
        formError();
        submitMSG(false, "Did you fill in the form properly?");
    } else {
        event.preventDefault();
        submitForm();
    }
});
function submitForm() {
    // Initiate Variables With Form Content
    var name = $("#name").val();
    var email = $("#email").val();
    var msg_subject = $("#msg_subject").val();
    var message = $("#message").val();
    $.ajax({
        type: "POST",
        url: "php/contact.php",
        data: "name=" + name + "&email=" + email + "&msg_subject=" +
            msg_subject + "&message=" + message,
        success: function(text) {
            if (text == "success") {
                formSuccess();
            } else {
                formError();
                submitMSG(false, text);
            }
        }
    });
}
function formSuccess() {
    $("#contactForm")[0].reset();
    submitMSG(true, "Message Submitted!")
}
function formError() {
    $("#contactForm").removeClass().addClass('shake animated').one(
        'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
        function() {
            $(this).removeClass();
        });
}
function submitMSG(valid, msg) {
    if (valid) {
        var msgClasses = "h4 text-success";
    } else {
        var msgClasses = "h4 text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
}

/* ---- our work gallery ---- */
$('#work').magnificPopup({
    delegate: 'a.zoom',
    type: 'image',
    fixedContentPos: false,
    removalDelay: 300,
    mainClass: 'mfp-fade',
    gallery: {
        enabled: true,
        preload: [0,2]
    }
});

/* ---- popup image ---- */
$('.popup-img').magnificPopup({
    type: 'image',
    removalDelay: 300,
    mainClass: 'mfp-fade'
});

/* ---- popup video ---- */
$(document).ready(function() {
    $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });
});

/* ---- nav smooth scroll ---- */
$(document).ready(function() {
    $('.scroll-link').on('click', function(event){
        event.preventDefault();
        var sectionID = $(this).attr("data-id");
        scrollToID('#' + sectionID, 750);
    });
    $('.scroll-top').on('click', function(event) {
        event.preventDefault();
        $('html, body').animate({scrollTop:0}, 1200);       
    });
});

/* ---- navbar offset ---- */
function scrollToID(id, speed){
    var offSet = 69;
    var targetOffset = $(id).offset().top - offSet;
    $('html,body').animate({scrollTop:targetOffset}, speed);
}

/* ---- animations ---- */
if (typeof sr == 'undefined') {
    window.sr = ScrollReveal({
        duration: 1500,
        delay: 50
    });
}
Royal_Preloader.config({
    onComplete: function () {
        triggerReveals();
    }
});

    sr.reveal('.bottomReveal', {
        origin: 'bottom'
    }).reveal('.leftReveal', {
        origin: 'left'
    }).reveal('.rightReveal', {
        origin: 'right'
    }).reveal('.topReveal', {
        origin: 'top'
    });

    // sr.reveal('.rotateBottomReveal', {
    //     origin: 'bottom',
    //     rotate: { x: 90 }
    // }).reveal('.rotateLeftReveal', {
    //     origin: 'left',
    //     rotate: { x: 90 }
    // }).reveal('.rotateRightReveal', {
    //     origin: 'right',
    //     rotate: { x: 90 }
    // }).reveal('.rotateTopReveal', {
    //     origin: 'top',
    //     rotate: { x: 90 }
    // })
    
function triggerReveals() {
    sr.reveal('.scaleReveal', {
        origin: 'top',
        scale: 0.6
    });
}

/* ---- close mobile nav on click ---- */
$(document).on('click','.navbar-collapse.in',function(e) {
    if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
        $(this).collapse('hide');
    }
});

/* ---- rotater text ---- */
var current = 1; 
var height = jQuery('.ticker').height(); 
var numberDivs = jQuery('.ticker').children().length; 
var first = jQuery('.ticker h1:nth-child(1)'); 
setInterval(function() {
    var number = current * -height;
    first.css('margin-top', number + 'px');
    if (current === numberDivs) {
        first.css('margin-top', '0px');
        current = 1;
    } else current++;
}, 2500);



// Make monochrome colors
var pieColors = (function () {
    var colors = [],
        base = Highcharts.getOptions().colors[0],
        i;

    for (i = 0; i < 10; i += 1) {
        // Start out with a darkened base color (negative brighten), and end
        // up with a much brighter color
        colors.push(Highcharts.Color(base).brighten((i - 3) / 7).get());
    }
    return colors;
}());

// Build the chart
Highcharts.chart('container', {
    chart: {
        style: {
            fontFamily:  'Open Sans'
        },
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: ''
    },
    tooltip: {
        pointFormat: '<b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            colors: pieColors,
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b><br>{point.percentage:.f} %',
            }
        }
    },
    series: [{
        name: 'Brands',
        data: [
            { name: 'Token Sale', y: 60 },
            { name: 'Foundation', y: 10 },
            { name: 'Reserve', y: 10 },
            { name: 'Team & Advisor', y: 9.5 },
            { name: 'Partner & Marketing', y: 6 },
            { name: 'Early Investors', y: 4.5 },

           
        ]
    }],
    credits: { enabled: false },
    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                plotOptions: {
                  pie: {
                      dataLabels: {
                          distance: 15,
                      }
                  }
              }
            }
        }]
    }
});

// Build the chart
Highcharts.chart('container2', {
    chart: {
        style: {
            fontFamily:  'Open Sans'
        },
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: ''
    },
    tooltip: {
        pointFormat: '<b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            colors: pieColors,
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b><br>{point.percentage:.f} %',
            }
        }
    },
    series: [{
        name: 'Brands',
        data: [
            { name: 'Tech R&D', y: 40 },
            { name: 'Strategy Planner', y: 20 },
            { name: 'Marketing', y: 13 },
            { name: 'Operation & Legal', y: 15 },
            { name: 'Business Development', y: 10 },
            { name: 'Acquisitions Cost', y: 2 },
           
        ]
    }],
    credits: { enabled: false },
    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                plotOptions: {
                  pie: {
                      dataLabels: {
                          distance: 1,
                      }
                  }
              }
            }
        }]
    }
});

// Build the chart
// Highcharts.chart('container3', {
//     chart: {
//         style: {
//             fontFamily:  'Open Sans'
//         },
//         plotBackgroundColor: null,
//         plotBorderWidth: null,
//         plotShadow: false,
//         type: 'pie'
//     },
//     title: {
//         text: 'Token Allocation'
//     },
//     tooltip: {
//         pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
//     },
//     plotOptions: {
//         pie: {
//             allowPointSelect: true,
//             cursor: 'pointer',
//             colors: pieColors,
//             dataLabels: {
//                 enabled: true,
//                 format: '<b>{point.name}</b><br>{point.percentage:.f} %',
//             }
//         }
//     },
//     series: [{
//         name: 'Brands',
//         data: [
//             { name: 'Tech Company', y: 40 },
//             { name: 'Contributors', y: 20 },
//             { name: 'Marketing', y: 15 },
//             { name: 'Operation and Legal', y: 15 },
//             { name: 'Business Development', y: 10 },
           
//         ]
//     }],
//     credits: { enabled: false },
//     responsive: {
//         rules: [{
//             condition: {
//                 maxWidth: 500
//             },
//             chartOptions: {
//                 plotOptions: {
//                   pie: {
//                       dataLabels: {
//                           distance: -30,
//                       }
//                   }
//               }
//             }
//         }]
//     }
// });


$("#login-button").click(function(event){
    event.preventDefault();

$('form').fadeOut(500);
$('.wrapper').addClass('form-success');
});

