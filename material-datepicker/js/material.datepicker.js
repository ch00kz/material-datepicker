function DatePicker(field, options) {
	var html =
   	[
	   	'<div class="material-datepicker hide">',
	    	'<section class="top-day">',
	    		'<span data-bind="text: day"></span>',
	    	'</section>',
	    	'<section class="middle-date">',
	    		'<div class="month" data-bind="text: shortMonth"></div>',
	    		'<div class="date" data-bind="text: date"></div>',
	    		'<div class="year" data-bind="text: year"></div>',
	    	'</section>',
	    	'<section class="calendar no-select">',
	    		'<a data-bind="click: prevMonth" class="control prev"> &#xf053 </a>',
	    		'<a data-bind="click: nextMonth" class="control next"> &#xf054 </a>',
	    		'<div class="title" data-bind="text: viewingMonthName() + \' \' + viewingYear()"></div>',
	    		'<div class="headings">',
		    		'<span class="day heading">S</span>',
		    		'<span class="day heading">M</span>',
		    		'<span class="day heading">T</span>',
		    		'<span class="day heading">W</span>',
		    		'<span class="day heading">T</span>',
		    		'<span class="day heading">F</span>',
		    		'<span class="day heading">S</span>',
		    	'</div>',
	    		'<div class="days" data-bind="foreach : monthStruct()">',
	    			'<a data-bind="css:{ selected: $parent.isSelected($data), today: $parent.isToday($data) },text: $data, click: function(data,event){ $parent.chooseDate(data) }" class="day" data-bind="text: $data"></a>',
	    		'</div>',
	    	'</section>',
	    	'<section class="no-select button-container">',
	    		'<a class="close" data-bind="click: closePicker">OK</a>',
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

	function AppViewModel(field, picker, options) {
		var self = this;

		self.daysShort = [
			'S', 'M', 'T', 'W',
			'T', 'F', 'S'
		];

		// get date from field or get todays date
		self.field = field;

		self.dateFormat = options ? options.format : "DD - MM - YYYY";
		self.today = ko.observable( moment() );
		self.datePickerValue = ko.observable();
		self.viewingMonth = ko.observable();
		self.viewingYear = ko.observable();
	    self.monthStruct = ko.observableArray();
		self.viewingMonthName = ko.computed(function(){
	    	return months[ self.viewingMonth() - 1 ];
	    });

		self.chooseDate = function(day) {
			if (day) {
				var date = moment( self.viewingMonth() + " " + day + " " + self.viewingYear(), "MM DD YYYY" );
				self.datePickerValue(date);
				var year = self.viewingYear();
				var month = self.viewingMonth();
		 		var dateString = self.datePickerValue().format(self.dateFormat);
				$(self.field).val(dateString);
			}
		};

		self.setupViewingDates = function() {
			self.viewingYear(self.datePickerValue().year());
			self.viewingMonth(self.datePickerValue().month() + 1);
		}

		self.buildMonthStruct = function(){
	    	self.monthStruct.removeAll();
	    	var monthNum = self.viewingMonth();
	    	var year = self.viewingYear();
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
	    	var day = 1;
	    	for(var i = 0; i < 50 ; i++){
	    		if (i < startDay) {
	    			self.monthStruct.push("");
	    		}
	    		else {
	    			if(day <= month.days){
		    			self.monthStruct.push(day);
	    			}
	    			day++;
	    		}
	    	}
	    };

		self.fetchDateFromField = function(){
			var dateString = $(field).val();
			console.log("dateString is ", dateString);
			if (dateString){
				self.datePickerValue( moment(dateString, self.dateFormat) );
			}
			else {
				self.datePickerValue( moment() );
			}
			self.setupViewingDates();
			self.buildMonthStruct();
		};

		$(field).keyup(function(){
			self.fetchDateFromField();
		});

		$(field).focus(function(){
			self.fetchDateFromField();
			self.chooseDate(self.datePickerValue().date());
		});

		   // init function
		self.init = function() {
			self.fetchDateFromField();
		};

		self.init();

	    self.nextMonth = function() {
	    	if (self.viewingMonth() < 12){
	    		self.viewingMonth(self.viewingMonth() + 1);
	    	} else {
	    		self.viewingMonth(1);
	    		self.viewingYear(self.viewingYear() + 1);
	    	}
	    	self.buildMonthStruct();
	    }

	    self.prevMonth = function() {
	    	if (self.viewingMonth() > 1){
	    		self.viewingMonth(self.viewingMonth() - 1);
	    	} else {
	    		self.viewingMonth(12);
	    		self.viewingYear(self.viewingYear() - 1);
	    	}
	    	self.buildMonthStruct();
	    }

	    self.isToday = function(day) {
	    	var thisDay = day == self.today().date();
	    	var thisMonth = self.viewingMonth() == (self.today().month() + 1);
	    	var thisYear = self.viewingYear() == self.today().year();
	    	return thisDay && thisMonth && thisYear;
	    };

	    self.isSelected = function(day) {
	    	var rightMonth = self.viewingMonth() == (self.datePickerValue().month() + 1);
	    	var rightYear = self.viewingYear() == self.datePickerValue().year();
	    	return day == self.date() && rightMonth && rightYear;
	    };

	    self.day = ko.computed(function(){
	    	return days[self.datePickerValue().day()];
	    });

	    self.date = ko.computed(function(){
	    	return self.datePickerValue().date();
	    });

	    self.month = ko.computed(function(){
	    	return months[self.datePickerValue().month()];
	    });

	    self.shortMonth = ko.computed(function(){
	    	return monthShort[self.datePickerValue().month()];
	    });

	    self.year = ko.computed(function(){
	    	return self.datePickerValue().year();
	    });

		self.closePicker = function(){
			picker.addClass('hide');
		}
   		self.buildMonthStruct();
	}
	var viewModel = new AppViewModel(field, picker, options);
	window.viewModel = viewModel;
	ko.applyBindings(viewModel, picker[0]);
}

var days = [
	'Sunday', 'Monday', 'Tuesday', 'Wedneday',
	'Thursday', 'Friday', 'Saturday'
];

var months = [
	'January', 'February', 'March', 'April', 'May',
	'June', 'July', 'August', 'September', 'October',
	'November', 'December'
];

var monthShort = [
	'Jan', 'Feb', 'Mar', 'Apr', 'May',
	'June', 'July', 'Aug', 'Sept', 'Oct',
	'Nov', 'Dec'
];

function Month(number, year) {
	this.number = number;
	this.year = year
	this.name = months[this.number - 1];
	this.days = new Date(year, number, 0).getDate();
	this.startDay = days[new Date(this.name + " 1 " + year).getDay()];
}

