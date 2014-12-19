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
