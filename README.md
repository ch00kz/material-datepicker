##material-datepicker

Datepicker (screenshot below) inspired by material design's pickers (http://www.google.com/design/spec/components/pickers.html) 

![Imgur](http://i.imgur.com/0UpiN52.png)

##Dependencies
* JQuery - 2.1.3 (http://jquery.com/download/)
* KnockoutJS - 3.2.0 (http://knockoutjs.com/)

##Use
* Add the `material-datepicker` folder to your project
* Add the dependencies & material-datepicker JS and CSS.
* If you moved any of the files around you'll need to ensure that the CSS is correctly pointing to the `Roboto fonts` (included in `material-datepicker/fonts/`)

```html
	<head>
		<!-- dependencies -->
		<script src="libs/jquery-2.1.3.min.js"></script>
		<script src="libs/knockout-3.2.0.js"></script>
		<!-- /dependencies -->
		<script src="material-datepicker/js/material.datepicker.js"></script>
		<link rel="stylesheet" type="text/css" href="material-datepicker/css/material.datepicker.css">
	</head>
```

* Initialize material-datepicker on an input field.

```html
  <input style="font-size:16px;height:30px;border-radius:2px;border:1 solid gray;padding:0px 10px">
```

```javascript
  var setupPicker = new DatePicker( $('input')[0] );
```

##To Do
* Allow for specification of date format
* Add time picker



