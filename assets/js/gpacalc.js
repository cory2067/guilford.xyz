$(document).ready(function(){
	var n = 2;
	var gpa = 0;
	var weighted = 0;
	
	function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

	function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

	$('#fullpage').fullpage({
		//Design
		controlArrows: false,
		verticalCentered: false,
		resize : false,
		paddingTop: '3em',
		paddingBottom: '0px',
		fixedElements: '',
		responsive: 0,
		anchors: ['slide1', 'slide2'],
	});
	
	$('#submit').click(function(){
		var credits = 0;
		var gpa = 0;
		var unweighted = 0;
		
		for (var i=1; i < n; i++)
		{
			var grade;
			try{
				grade = $('.class-' + String(i) + ' #grade').val().toUpperCase();
			}
			catch(err){
				continue
			}
			var level = $('.class-' + String(i) + ' #level').val();
			var cc = $('.class-' + String(i) + ' #course-length').val();
			switch (cc)
				{
					case "half-year":
						c = .5;
						break;
					case "single-period":
						c = 1;
						break;
					case "double-period":
						c = 1.5;
						break;
					default:
						c=1;
				}
				
			//console.log(course);
			//var grade = $('#grade').val().toUpperCase();
			//var level = $('#level').val();
			//console.log(grade);
			
			var g = 0;
			if(isNaN(grade))
			{
				switch (grade.charAt(0))
				{
					case "A":
						g = 4;
						break;
					case "B":
						g = 3;
						break;
					case "C":
						g = 2;
						break;
					case "D":
						g = 1;
						break;
					case "F":
						g = 0;
						break;	
					default:
						alert('Try that AGAIN.');
				}
				
				if(g > 0)
				{
					switch(grade.charAt(1))
					{
						case "+":
							g += .33;
							break;			
						case "-":
							g -= .33;
							break;
					}
				}
				//console.log(g);
			}
			else
			{
				var num = Number(grade);
				g = Math.max(0, Math.floor(num/10) - 5);
				var ones = num%10;
				if(ones >= 6.5)
					g+=0.33;
				else if(ones < 2.5)
					g-=0.33;
				if(num >= 100)
					g = 4.33;
				else if(num < 60)
					g = 0;
				//do a thing to the things plz becuz no workerino
				//console.log(g)
			}
			
			unweighted += Math.min(g, 4) * c;
			if(g > 0){
				switch(level)
					{
						case "ap":
							g += .5;
							break;			
						case "honors":
							g += .25;
							break;
							
						case "level2":
							g -= .5;
							break;
						
						default:
							break;
					}
			//console.log(g);					
				
			}
			
			
			//console.log(level);
			//console.log(n-1);
			//console.log($('.class-1 #grade').val());
			console.log(g);
			gpa += c * g;
			credits += c;
			
		}
		gpa = gpa / credits;
		unweighted = unweighted / credits;
		gpa = Math.round(100 * gpa)/100;
		unweighted =  Math.round(100 * unweighted)/100;
		$('#weighted').text(gpa);
		$('#unweighted').text(unweighted);
		
		createCookie('test', 'gpa', 7 );
		var plebCookie = readCookie("test");
		console.log(plebCookie);

$.cookie('ghsstudent', gpa, { expires: 7 });
console.log($.cookie());
	});

// Identify which class user is manipulating
// When user inputs name, check for key words, then change the value of level accordingly
	
	$('#add-class').click(function(){
		$('<li class="class"> <input type="text" name="class" id="class" placeholder="CLASS NAME..."> <input type="text" name="grade" id="grade" required placeholder="GRADE..."> <select name="level" id="level"> <option selected="selected" style="display: none;">LEVEL</option> <option value="ap">AP</option> <option value="honors">Honors</option> <option value="level1">Level 1</option> <option value="level2">Level 2</option></select> <select name="course-length" id="course-length" required><option selected="selected" style="display: none;">CREDIT</option><option value="half-year" id="half-year">Half Year</option><option value="single-period" id="single-period">Single Period (full)</option><option value="double-period" id="double-period">Double Period (full)</option></select> <img src="static/assets/images/delete.png" class="delete-class" alt="delete class"></li>').addClass('class-' + n).hide().appendTo('#classes').slideDown('slow').animate({ opacity: 1 },{ queue: false, duration: 'slow' });

		
		n += 1;
		$('img.delete-class').click(function(){
		$(this).closest('li').remove();
		});
	});

	$('#college-match').click(function(){
		$('#dialog').dialog();
	});
	

	});

