##material-datepicker

Datepicker (screenshot below) inspired by material design's pickers (http://www.google.com/design/spec/components/pickers.html) 

![alt tag](https://raw.githubusercontent.com/ch00kz/material-datepicker/master/screenshots/screenshot.png)

##Dependencies
* JQuery
* KnockoutJS

##Use

* Add Dependencies along with material-datepicker js and css.

```html
	<head>
		<script src="libs/jquery-2.1.3.min.js"></script>
		<script src="libs/knockout-3.2.0.js"></script>
		<script src="material.datepicker.js"></script>
		<link rel="stylesheet" type="text/css" href="css/material.datepicker.css">
	</head>
```

* Initialize material-datepicker on an input field.

```html
  <input style="font-size:16px;height: 30px;border-radius: 2px;border:1 solid gray;padding:0px 10px">
```

```javascript
  var setupPicker = new DatePicker( $('input')[0] );
```

##To Do
* Specification of date format
* Time Picker



