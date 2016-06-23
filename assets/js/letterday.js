var noSchool = [[1,18],[15,16],[24, 25],[11,12,13,14,15],[30],[17],[],[],[14,23],[12],[11,26,27],[24,25,28,29,30,31]];
		
			$(function() {
				var start = new Date(2015, 8, 8, 0, 0, 0, 0); //first day of school
				var today = new Date();
				var shifted = false;
				if(schoolDay(today) && today.getHours() >= 14)
				{
						today.setDate(today.getDate() + 1); //if the school day is over, show tomorrow
						shifted = true; //remember that we shifted to tomorrow
				}
				if(schoolDay(today)) //if it's still a school day (including after a shift)
					start.setDate(start.getDate() + 1); //easy fix for an off-by-one error
					
				day = 0; //0 - 3 to represent A - D day
				while(start < today) //iterate through every day until we reach today
				{
					if(schoolDay(start)) //increment the day counter if today is a school day
					{
						day++;
						if(day == 4)
							day = 0;
					}
					start.setDate(start.getDate() + 1);
				}
				$("#letter").text(['A','B','C','D'][day]); //set day on page
				
				var future = 0; 		
				if(!schoolDay(today)) //if there's no school today
				{
					while(!schoolDay(today)) //find the next school day
					{
						future++; //keep track of how many days into the future
						today.setDate(today.getDate() + 1);
					}
				}
				
				if(shifted) //if school day was over and we're showing the next day
					future++;
				
				if(future > 0) //change other text if there's no school today
				{
					$("#phrase").text("will be a");
					if(future == 1) //is it tomorrow or farther into the future?
						$("#day").html("<span>Tomorrow</span>");
					else
						$("#day").html(["","<span>Monday</span>","<span>Tuesday</span>","<span>Wednesday</span>","<span>Thursday</span>","<span>Friday</span>",""][today.getDay()]);
				}
				if(day == 0) //say "an" if it's an A day
					$("#phrase").append("n");
				
			})
			
			function schoolDay(date) {
				return !($.inArray(date.getDate(), noSchool[date.getMonth()]) != -1 || date.getDay() == 0 || date.getDay() == 6);
			}