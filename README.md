# fecha [![Build Status](https://travis-ci.org/taylorhakes/fecha.svg?branch=master)](https://travis-ci.org/taylorhakes/fecha)

Lightweight date formatting and parsing (~2KB). Meant to replace parsing and formatting functionality of moment.js.

### NPM
```
npm install fecha --save
```

### Fecha vs Moment
<table class="table table-striped table-bordered">
  <tbody>
    <tr>
      <th></th>
      <th>Fecha</th>
      <th>Moment</th>
    </tr>
    <tr>
      <td><b>Size (Min. and Gzipped)</b></td>
      <td>2.1KBs</td>
      <td>13.1KBs</td>
    </tr>
    <tr>
      <td><b>Date Parsing</b></td>
      <td>&#x2713;</td>
      <td>&#x2713;</td>
    </tr>
    <tr>
      <td><b>Date Formatting</b></td>
      <td>&#x2713;</td>
      <td>&#x2713;</td>
    </tr>
    <tr>
      <td><b>Date Manipulation</b></td>
      <td></td>
      <td>&#x2713;</td>
    </tr>
    <tr>
      <td><b>I18n Support</b></td>
      <td>&#x2713;</td>
      <td>&#x2713;</td>
    </tr>
  </tbody>
</table>

## Use it

#### Importing
Import fecha where you need
`import fecha from 'fecha'`

#### Formatting
`fecha.format` accepts a Date object (or timestamp) and a string format and returns a formatted string. See below for
available format tokens.

Note: `fecha.format` will throw an error when passed invalid parameters
```js
fecha.format(<Date Object>, <String Format>);

// Custom formats
fecha.format(new Date(2015, 10, 20), 'dddd MMMM Do, YYYY'); // 'Friday November 20th, 2015'
fecha.format(new Date(1998, 5, 3, 15, 23, 10, 350), 'YYYY-MM-DD hh:mm:ss.SSS A'); // '1998-06-03 03:23:10.350 PM'

// Named masks
fecha.format(new Date(2015, 10, 20), 'mediumDate'); // 'Nov 20, 2015'
fecha.format(new Date(2015, 2, 10, 5, 30, 20), 'shortTime'); // '05:30'

// Literals
fecha.format(new Date(2001, 2, 5, 6, 7, 2, 5), '[on] MM-DD-YYYY [at] HH:mm'); // 'on 03-05-2001 at 06:07'
```

#### Parsing
`fecha.parse` accepts a Date string and a string format and returns a Date object. See below for available format tokens.

Note: `fecha.parse` will throw an error when passed invalid parameters
```js
// Custom formats
fecha.parse('February 3rd, 2014', 'MMMM Do, YYYY'); // new Date(2014, 1, 3)
fecha.parse('10-12-10 14:11:12', 'YY-MM-DD HH:mm:ss'); // new Date(2010, 11, 10, 14, 11, 12)

// Named masks
fecha.parse('5/3/98', 'shortDate'); // new Date(1998, 4, 3)
fecha.parse('November 4, 2005', 'longDate'); // new Date(2005, 10, 4)
```

#### i18n Support
```js
// Override fecha.i18n to support any language
fecha.i18n = {
	dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
	dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
	monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
	monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	amPm: ['am', 'pm'],
	// D is the day of the month, function returns something like...  3rd or 11th
	DoFn: function (D) {
		return D + [ 'th', 'st', 'nd', 'rd' ][ D % 10 > 3 ? 0 : (D - D % 10 !== 10) * D % 10 ];
    }
}
```

#### Custom Named Masks
```js
fecha.masks = {
	default: 'ddd MMM DD YYYY HH:mm:ss',
	shortDate: 'M/D/YY',
	mediumDate: 'MMM D, YYYY',
	longDate: 'MMMM D, YYYY',
	fullDate: 'dddd, MMMM D, YYYY',
	shortTime: 'HH:mm',
	mediumTime: 'HH:mm:ss',
	longTime: 'HH:mm:ss.SSS'
};

// Create a new mask
fecha.masks.myMask = 'HH:mm:ss YY/MM/DD';

// Use it
fecha.format(new Date(2014, 5, 6, 14, 10, 45), 'myMask'); // '14:10:45 14/06/06'
```

### Formatting Tokens
<table class="table table-striped table-bordered">
  <tbody>
    <tr>
      <th></th>
      <th>Token</th>
      <th>Output</th>
    </tr>
    <tr>
      <td><b>Month</b></td>
      <td>M</td>
      <td>1 2 ... 11 12</td>
    </tr>
    <tr>
      <td></td>
      <td>MM</td>
      <td>01 02 ... 11 12</td>
    </tr>
    <tr>
      <td></td>
      <td>MMM</td>
      <td>Jan Feb ... Nov Dec</td>
    </tr>
    <tr>
      <td></td>
      <td>MMMM</td>
      <td>January February ... November December</td>
    </tr>
    <tr>
      <td><b>Day of Month</b></td>
      <td>D</td>
      <td>1 2 ... 30 31</td>
    </tr>
    <tr>
      <td></td>
      <td>Do</td>
      <td>1st 2nd ... 30th 31st</td>
    </tr>
    <tr>
      <td></td>
      <td>DD</td>
      <td>01 02 ... 30 31</td>
    </tr>
    <tr>
      <td><b>Day of Week</b></td>
      <td>d</td>
      <td>0 1 ... 5 6</td>
    </tr>
    <tr>
      <td></td>
      <td>ddd</td>
      <td>Sun Mon ... Fri Sat</td>
    </tr>
    <tr>
      <td></td>
      <td>dddd</td>
      <td>Sunday Monday ... Friday Saturday</td>
    </tr>
    <tr>
      <td><b>Year</b></td>
      <td>YY</td>
      <td>70 71 ... 29 30</td>
    </tr>
    <tr>
      <td></td>
      <td>YYYY</td>
      <td>1970 1971 ... 2029 2030</td>
    </tr>
    <tr>
      <td><b>AM/PM</b></td>
      <td>A</td>
      <td>AM PM</td>
    </tr>
    <tr>
      <td></td>
      <td>a</td>
      <td>am pm</td>
    </tr>
    <tr>
      <td><b>Hour</b></td>
      <td>H</td>
      <td>0 1 ... 22 23</td>
    </tr>
    <tr>
      <td></td>
      <td>HH</td>
      <td>00 01 ... 22 23</td>
    </tr>
    <tr>
      <td></td>
      <td>h</td>
      <td>1 2 ... 11 12</td>
    </tr>
    <tr>
      <td></td>
      <td>hh</td>
      <td>01 02 ... 11 12</td>
    </tr>
    <tr>
      <td><b>Minute</b></td>
      <td>m</td>
      <td>0 1 ... 58 59</td>
    </tr>
    <tr>
      <td></td>
      <td>mm</td>
      <td>00 01 ... 58 59</td>
    </tr>
    <tr>
      <td><b>Second</b></td>
      <td>s</td>
      <td>0 1 ... 58 59</td>
    </tr>
    <tr>
      <td></td>
      <td>ss</td>
      <td>00 01 ... 58 59</td>
    </tr>
    <tr>
      <td><b>Fractional Second</b></td>
      <td>S</td>
      <td>0 1 ... 8 9</td>
    </tr>
    <tr>
      <td></td>
      <td>SS</td>
      <td>0 1 ... 98 99</td>
    </tr>
    <tr>
      <td></td>
      <td>SSS</td>
      <td>0 1 ... 998 999</td>
    </tr>
    <tr>
      <td><b>Timezone</b></td>
      <td>ZZ</td>
      <td>
        -0700 -0600 ... +0600 +0700
      </td>
    </tr>
  </tbody>
</table>
