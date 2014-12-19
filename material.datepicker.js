function datepicker(field) {
	var picker = $('<div class="material-datepicker hide"><section class="1></section></div>');
	$(field).after(picker);
	$(field).focus(function(){
		console.log("I should be showing the datepicker now");
		picker.removeClass('hide');
	});

	var fieldHeight = $(field).height();
	var offsetTop = $(field).offset().top + fieldHeight + 15;
	var offsetLeft = $(field).offset().left;

	picker.css('top', offsetTop);
	picker.css('left', offsetLeft);

	// $(field).focusout(function(){
	// 	console.log("I should be hiding the datepicker now");
	// 	picker.addClass('hide');
	// });
}

function Calendar(year){
	this.months = []
	for(var i = 1; i < 13; i++){
		this.months.push(new Month(i, year));
	}
}

function Month(number, year) {
	var names = [
		'January', 'February', 'March', 'April', 'May',
		'June', 'July', 'August', 'September', 'October',
		'November', 'December'
	];
	var days = [
		'Sunday', 'Monday', 'Tuesday', 'Wedneday',
		'Thursday', 'Friday'
	];
	this.number = number;
	this.year = year
	this.name = names[this.number - 1];
	this.days = new Date(year, number, 0).getDate();
	this.startDay = days[new Date(this.name + " 1 " + year).getDay()];
}
