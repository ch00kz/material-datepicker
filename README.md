##material-datepicker

A datepicker (https://vimeo.com/115088510 & screenshot below) inspired by material design's pickers, using Moment.js  (http://www.google.com/design/spec/components/pickers.html) 

<img height="500px" src="http://i.imgur.com/Mf7R41L.png" />

##Dependencies
* JQuery - 2.1.3 (http://jquery.com/download/)
* KnockoutJS - 3.2.0 (http://knockoutjs.com/)
* Moment.js - 2.8.4 (http://momentjs.com/)

##Use
* Add the `material-datepicker` folder to your project
* Add the dependencies & material-datepicker JS and CSS.
* If you moved any of the files around you'll need to ensure that the CSS is correctly pointing to the `Roboto fonts` (included in `material-datepicker/fonts/`)

```html
	<head>
		<!-- dependencies -->
		<script src="libs/moment.min.js"></script>
		<script src="libs/jquery-2.1.3.min.js"></script>
		<script src="libs/knockout-3.2.0.js"></script>
		<!-- /dependencies -->
		<script src="material-datepicker/js/material.datepicker.js"></script>
		<link rel="stylesheet" type="text/css" href="material-datepicker/css/material.datepicker.css">
	</head>
```

* Initialize material-datepicker on an input field. (doesn't play well when the `input` field is of `type="date"`)

```html
  <input id="one" style="font-size:16px;height:30px;border-radius:2px;border:1 solid gray;padding:0px 10px">
```

```javascript
  var options = {};
  $('#one').datepicker(options);
```

###Options

The default option values are :

| Option     | Default       |
|------------|---------------|
| `format`   | `"DD/MM/YYYY"`|

Date format options (see http://momentjs.com/docs/#/parsing/string-format/)

| Input        | Example        | Description                                            |
| :----------: |:--------------:| :----------------------------------------------------: |
|YYYY	       | 2014	        | 4 digit year                                           |
|YY	       |14	        | 2 digit year                                           |
|Q	       |1..4	        | Quarter of year. Sets month to first month in quarter. |
|M MM	       |1..12	        | Month number                                           |
|MMM MMMM      | January..Dec   | Month name in locale set by moment.locale()            |
|D DD          | 1..31	        | Day of month                                           |
|Do            | 1st..31st	| Day of month with ordinal                              |
|DDD DDDD      | 1..365	        | Day of year                                            |
|X             | 1410715640.579	| Unix timestamp                                         |
|x             | 1410715640579	| Unix ms timestamp                                      |


##To Do (feature checklist)
* ~~Format of date string~~
* Limit Date Range
* Change base colour of picker
* Time picker



