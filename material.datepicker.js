function DatePicker(field) {
	var html =
   ['<div class="material-datepicker hide">',
    	'<section class="top-day">',
    		'<span data-bind="text: day"></span>',
    	'</section>',
    	'<section class="middle-date">',
    		'<div class="month" data-bind="text: shortMonth"></div>',
    		'<div class="date" data-bind="text: date"></div>',
    		'<div class="year" data-bind="text: year"></div>',
    	'</section>',
    	'<section class="calendar">',
    		'<div class="title" data-bind="text: month() + \' \' + year()"></div>',
    		'<span class="day">S</span>',
    		'<span class="day">M</span>',
    		'<span class="day">T</span>',
    		'<span class="day">W</span>',
    		'<span class="day">T</span>',
    		'<span class="day">F</span>',
    		'<span class="day">S</span>',
    		'<div class="days" data-bind="foreach : monthStruct">',
    			'<a data-bind="text: $data, click: function(data,event){ $parent.chooseDate(data) }" class="day" data-bind="text: $data"></a>',
    		'</div>',
    	'</section>',
    '</div>'
   ].join('\n');

	var picker = $(html);
	$(field).after(picker);
	$(field).focus(function(){
		picker.removeClass('hide');
	});

	var fieldHeight = $(field).height();
	var offsetTop = $(field).offset().top + fieldHeight + 10;
	var offsetLeft = $(field).offset().left;
	picker.css('top', offsetTop);
	picker.css('left', offsetLeft);

	function AppViewModel(field) {
		var self = this;
		self.field = field;
		var datePickerValue = new Date ($(field).val());
		if (datePickerValue == "Invalid Date") {
			datePickerValue = new Date();
		}


		var days = [
			'Sunday', 'Monday', 'Tuesday', 'Wedneday',
			'Thursday', 'Friday', 'Saturday'
		];

		self.daysShort = [
			'S', 'M', 'T', 'W',
			'T', 'F', 'S'
		];

		var months = [
			'January', 'February', 'March', 'April', 'May',
			'June', 'July', 'August', 'September', 'October',
			'November', 'December'
		];

		var monthShort = [
			'Jan', 'Feb', 'Ma', 'Apr', 'May',
			'June', 'July', 'Aug', 'Sept', 'Oct',
			'Nov', 'Dec'
		];

		self.chooseDate = function(day) {
			if (day) {
				var date = new Date(self.month() + " " + day + " " + self.year());
				console.log("should be choosing date", date);
				self.datePickerValue(new Date(date));
				$(self.field).val(self.datePickerValue());
			}
		};

	    self.datePickerValue = ko.observable(datePickerValue);
	    self.day = ko.computed(function(){
	    	return days[self.datePickerValue().getDay()];
	    });
	    self.date = ko.computed(function(){
	    	return self.datePickerValue().getDay();
	    });
	    self.month = ko.computed(function(){
	    	return months[self.datePickerValue().getMonth()];
	    });

	    self.shortMonth = ko.computed(function(){
	    	return monthShort[self.datePickerValue().getMonth()];
	    });
	    self.year = ko.computed(function(){
	    	return self.datePickerValue().getFullYear();
	    });

	    self.monthStruct = new Array(42);

	    self.monthDaysArray = ko.computed(function(){
	    	var monthNum = self.datePickerValue().getMonth() + 1;
	    	var year = self.datePickerValue().getFullYear();
	    	var month = new Month(monthNum, year);
	    	var dayToNum = {
	    		"Sunday": 0,
	    		"Monday": 1,
	    		"Tuesday": 2,
	    		"Wednesday": 3,
	    		"Thursday": 4,
	    		"Friday": 5,
	    		"Saturday": 6,
	    	};
	    	var startDay = dayToNum[month.startDay];
	    	for(var i = 1; i <= month.days; i++){
	    		self.monthStruct[startDay] = i;
	    		startDay++;
	    	}
	    });
	}

	var app = new AppViewModel(field);
	window.app = app;
	// Activates knockout.js
	ko.applyBindings(app);
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
		'Thursday', 'Friday', 'Saturday'
	];
	this.number = number;
	this.year = year
	this.name = names[this.number - 1];
	this.days = new Date(year, number, 0).getDate();
	this.startDay = days[new Date(this.name + " 1 " + year).getDay()];
}


