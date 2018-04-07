/*
	Intensify by TEMPLATED
	templated.co @templatedco
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/

(function($) {

	skel.breakpoints({
		xlarge:	'(max-width: 1680px)',
		large:	'(max-width: 1280px)',
		medium:	'(max-width: 980px)',
		small:	'(max-width: 736px)',
		xsmall:	'(max-width: 480px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$header = $('#header');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Scrolly.
			$('.scrolly').scrolly({
				offset: function() {
					return $header.height();
				}
			});
			
			$('#submit_login')
				.click(function(e) {
					e.preventDefault();
					var username = $( "input:first" ).val()
					$.ajax({ 
					   type: "POST",
					   url: "http://localhost:3000/rest/login",
						 contentType: "application/json",
    		 		 dataType: "json",
						 data: JSON.stringify({ "user": username }),
					   success: function(data){        
					     console.log(data);
					   },
						 error: function(data){ 
							 if (data.statusText == "OK") {
								 window.location.replace("search.html");
								 return;
							 }
							 console.log('error');     
					     console.log(data);
					   }
					});
				})
				
				$( document ).ready(function() {
				    if(window.location.pathname == "/search.html") {
							$.ajax({ 
							   type: "GET",
							   url: "http://localhost:3000/rest/getuser",
							   success: function(data){
									 console.log(data);
									 var e = $('<div>Hello '+data+'</div>');
							   	$('#hello-message').append(e);
							   }
							});
						}
				});
				

		// Menu.
			$('#menu')
				.append('<a href="#menu" class="close"></a>')
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right'
				});

	});

})(jQuery);