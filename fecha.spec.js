(function () {
	'use strict';

	function testFormat(name, dateObj, format, expected) {
		it(name, function () {
			expect(fecha.format(dateObj, format)).toEqual(expected);
		});
	}

	describe('core/util/date', function () {
		describe('parse', function () {
			it('Basic date parse', function () {
				var date = fecha.parse('2012/05/03', 'YYYY/MM/DD');
				expect(date).toEqual(new Date(2012, 4, 3));
			});
			it('Basic date parse with time', function () {
				expect(fecha.parse('2012/05/03 05:01:40', 'YYYY/MM/DD HH:mm:ss')).toEqual(new Date(2012, 4, 3, 5, 1,
					40));
			});
			it('Date with different slashes', function () {
				expect(fecha.parse('2012-05-03 05:01:40', 'YYYY-MM-DD HH:mm:ss')).toEqual(new Date(2012, 4, 3, 5, 1,
					40));
			});
			it('Date with different order', function () {
				expect(fecha.parse('11-7-97', 'D-M-YY')).toEqual(new Date(1997, 6, 11));
			});
			it('Date very short', function () {
				expect(fecha.parse('2-8-04', 'D-M-YY')).toEqual(new Date(2004, 7, 2));
			});
			it('compact', function () {
				expect(fecha.parse('11081997', 'MMDDYYYY')).toEqual(new Date(1997, 10, 8));
			});
			it('month names', function () {
				expect(fecha.parse('March 3rd, 1999', 'MMMM Do, YYYY')).toEqual(new Date(1999, 2, 3));
			});
			it('month names short', function () {
				expect(fecha.parse('Jun 12, 2003', 'MMM D, YYYY')).toEqual(new Date(2003, 5, 12));
			});
			it('day name', function () {
				expect(fecha.parse('Wednesday Feb 03, 2100', 'dddd MMM DD, YYYY')).toEqual(new Date(2100, 1, 3));
			});
			it('ampm', function () {
				expect(fecha.parse('2015-11-07 10PM', 'YYYY-MM-DD hhA')).toEqual(new Date(2015, 10, 7, 22));
			});
			it('ampm am', function () {
				expect(fecha.parse('2000-01-01 12AM', 'YYYY-MM-DD hhA')).toEqual(new Date(2000, 0, 1, 12));
			});
			it('ampm am lowercase', function () {
				expect(fecha.parse('2000-01-01 11am', 'YYYY-MM-DD hha')).toEqual(new Date(2000, 0, 1, 11));
			});
			it('24 hour time long', function () {
				expect(fecha.parse('2000-01-01 20', 'YYYY-MM-DD HH')).toEqual(new Date(2000, 0, 1, 20));
			});
			it('24 hour time long 02', function () {
				expect(fecha.parse('2000-01-01 02', 'YYYY-MM-DD HH')).toEqual(new Date(2000, 0, 1, 2));
			});
			it('24 hour time short', function () {
				expect(fecha.parse('2000-01-01 3', 'YYYY-MM-DD H')).toEqual(new Date(2000, 0, 1, 3));
			});
			it('milliseconds time', function () {
				expect(fecha.parse('10:20:30.123', 'HH:mm:ss.SSS')).toEqual(new Date(2015, 0, 1, 10, 20, 30, 123));
			});
			it('milliseconds medium', function () {
				expect(fecha.parse('10:20:30.12', 'HH:mm:ss.SS')).toEqual(new Date(2015, 0, 1, 10, 20, 30, 120));
			});
			it('milliseconds short', function () {
				expect(fecha.parse('10:20:30.1', 'HH:mm:ss.S')).toEqual(new Date(2015, 0, 1, 10, 20, 30, 100));
			});
			it('timezone offset', function () {
				expect(fecha.parse('09:20:31 GMT-0500 (EST)', 'HH:mm:ss ZZ')).toEqual(new Date(Date.UTC(2015, 0, 1, 14,
					20, 31)));
			});
			it('invalid date', function () {
				expect(fecha.parse('hello', 'HH:mm:ss ZZ')).toEqual(false);
			});
			it('invalid date no format', function () {
				expect(fecha.parse('hello')).toEqual(false);
			});
			it('no date', function () {
				expect(fecha.parse()).toEqual(false);
			});
			it('no format specified', function () {
				expect(fecha.parse('2014-11-05')).toEqual(new Date(2014, 10, 5));
			});
			it('another no format', function() {
				expect(fecha.parse('2015-02-29')).toEqual(new Date(2015, 1, 29));
			});
		});
		describe('format', function () {
			// Day of the month
			testFormat('Day of the month', new Date(2014, 2, 5), 'D', '5');
			testFormat('Day of the month padded', new Date(2014, 2, 5), 'DD', '05');

			// Day of the week
			testFormat('Day of the week short', new Date(2015, 0, 8), 'd', '4');
			testFormat('Day of the week long', new Date(2015, 0, 10), 'dd', '06');
			testFormat('Day of the week short name', new Date(2014, 2, 5), 'ddd', 'Wed');
			testFormat('Day of the week long name', new Date(2014, 2, 5), 'dddd', 'Wednesday');

			// Month
			testFormat('Month', new Date(2014, 2, 5), 'M', '3');
			testFormat('Month padded', new Date(2014, 2, 5), 'MM', '03');
			testFormat('Month short name', new Date(2014, 2, 5), 'MMM', 'Mar');
			testFormat('Month full name mmmm', new Date(2014, 2, 5), 'MMMM', 'March');

			// Year
			testFormat('Year short', new Date(2001, 2, 5), 'YY', '01');
			testFormat('Year long', new Date(2001, 2, 5), 'YYYY', '2001');

			// Hour
			testFormat('Hour 12 hour short', new Date(2001, 2, 5, 6), 'h', '6');
			testFormat('Hour 12 hour padded', new Date(2001, 2, 5, 6), 'hh', '06');
			testFormat('Hour 12 hour short 2', new Date(2001, 2, 5, 14), 'h', '2');
			testFormat('Hour 12 hour padded 2', new Date(2001, 2, 5, 14), 'hh', '02');
			testFormat('Hour 24 hour short', new Date(2001, 2, 5, 13), 'H', '13');
			testFormat('Hour 24 hour padded', new Date(2001, 2, 5, 13), 'HH', '13');
			testFormat('Hour 24 hour short', new Date(2001, 2, 5, 3), 'H', '3');
			testFormat('Hour 24 hour padded', new Date(2001, 2, 5, 3), 'HH', '03');

			// Minute
			testFormat('Minutes short', new Date(2001, 2, 5, 6, 7), 'm', '7');
			testFormat('Minutes padded', new Date(2001, 2, 5, 6, 7), 'mm', '07');

			// Seconds
			testFormat('Seconds short', new Date(2001, 2, 5, 6, 7, 2), 's', '2');
			testFormat('Seconds padded', new Date(2001, 2, 5, 6, 7, 2), 'ss', '02');

			// Milliseconds
			testFormat('milliseconds short', new Date(2001, 2, 5, 6, 7, 2, 500), 'S', '5');
			testFormat('milliseconds short 2', new Date(2001, 2, 5, 6, 7, 2, 2), 'S', '0');
			testFormat('milliseconds medium', new Date(2001, 2, 5, 6, 7, 2, 300), 'SS', '30');
			testFormat('milliseconds medium 2', new Date(2001, 2, 5, 6, 7, 2, 10), 'SS', '01');
			testFormat('milliseconds long', new Date(2001, 2, 5, 6, 7, 2, 5), 'SSS', '005');

			// AM PM
			testFormat('ampm am', new Date(2001, 2, 5, 3, 7, 2, 5), 'a', 'am');
			testFormat('ampm pm', new Date(2001, 2, 5, 15, 7, 2, 5), 'a', 'pm');
			testFormat('ampm AM', new Date(2001, 2, 5, 3, 7, 2, 5), 'A', 'AM');
			testFormat('ampm PM', new Date(2001, 2, 5, 16, 7, 2, 5), 'A', 'PM');

			// th, st, nd, rd
			testFormat('th', new Date(2001, 2, 11), 'Do', '11th');
			testFormat('st', new Date(2001, 2, 21), 'Do', '21st');
			testFormat('nd', new Date(2001, 2, 2), 'Do', '2nd');
			testFormat('rd', new Date(2001, 2, 23), 'Do', '23rd');

			// Timezone offset
			it('timezone offset', function () {
				expect(fecha.format(new Date(2001, 2, 11), 'ZZ').match(/^[\+\-]\d{4}$/)).toBeTruthy()
			});

			// Random groupings
			testFormat('MM-DD-YYYY HH:mm:ss', new Date(2001, 2, 5, 6, 7, 2, 5), 'MM-DD-YYYY HH:mm:ss',
				'03-05-2001 06:07:02');
			testFormat('MMMM D, YY', new Date(1987, 0, 8, 6, 7, 2, 5), 'MMMM D, YY', 'January 8, 87');
			testFormat('M MMMM MM YYYY, YY', new Date(1987, 0, 8, 6, 7, 2, 5), 'M MMMM MM YYYY, YY',
				'1 January 01 1987, 87');
			testFormat('YYYY/MM/DD HH:mm:ss', new Date(2031, 10, 29, 2, 1, 9, 5), 'YYYY/MM/DD HH:mm:ss',
				'2031/11/29 02:01:09');
			testFormat('D-M-YYYY', new Date(2043, 8, 18, 2, 1, 9, 5), 'D-M-YYYY', '18-9-2043');

			it('Invalid date', function () {
				expect(function () {
					fecha.format('hello', 'YYYY');
				}).toThrow();
			});
			it('Valid parse', function () {
				expect(fecha.format('2011-10-01', 'MM-DD-YYYY')).toBe('10-01-2011');
			});
			it('Current Date', function () {
				expect(fecha.format(null, 'YYYY')).toBe('' + (new Date()).getFullYear());
			});
			it('Mask', function () {
				expect(fecha.format(new Date(1999, 0, 2), 'mediumDate')).toBe('Jan 2, 1999');
			});
		});
	});
})();