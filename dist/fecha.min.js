(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.fecha = {})));
}(this, (function (exports) { 'use strict';

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
      return;
    }

    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  /**
   * Parse or format dates
   * @class fecha
   */
  var token = /d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g;
  var twoDigitsOptional = "[1-9]\\d?";
  var twoDigits = "\\d\\d";
  var threeDigits = "\\d{3}";
  var fourDigits = "\\d{4}";
  var word = "[^\\s]+";
  var literal = /\[([^]*?)\]/gm;

  var regexEscape = function regexEscape(str) {
    return str.replace(/[|\\{()[^$+*?.-]/g, "\\$&");
  };

  var assign = function assign(initial) {
    for (var _len = arguments.length, objs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      objs[_key - 1] = arguments[_key];
    }

    objs.forEach(function (obj) {
      Object.keys(obj).forEach(function (key) {
        initial[key] = obj[key];
      });
    });
  };

  var shorten = function shorten(arr, sLen) {
    var newArr = [];

    for (var i = 0, len = arr.length; i < len; i++) {
      newArr.push(arr[i].substr(0, sLen));
    }

    return newArr;
  };

  var monthUpdate = function monthUpdate(arrName) {
    return function (v, i18n) {
      var index = i18n[arrName].indexOf(v.charAt(0).toUpperCase() + v.substr(1).toLowerCase());

      if (~index) {
        return index;
      }

      return null;
    };
  };

  var pad = function pad(val, len) {
    val = String(val);
    len = len || 2;

    while (val.length < len) {
      val = "0" + val;
    }

    return val;
  };

  var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var monthNamesShort = shorten(monthNames, 3);
  var dayNamesShort = shorten(dayNames, 3);
  var globalI18n = {
    dayNamesShort: dayNamesShort,
    dayNames: dayNames,
    monthNamesShort: monthNamesShort,
    monthNames: monthNames,
    amPm: ["am", "pm"],
    DoFn: function DoFn(dayOfMonth) {
      return dayOfMonth + ["th", "st", "nd", "rd"][dayOfMonth % 10 > 3 ? 0 : (dayOfMonth - dayOfMonth % 10 !== 10) * dayOfMonth % 10];
    }
  };

  var setGlobalDateI18n = function setGlobalDateI18n(i18n) {
    return assign(globalI18n, i18n);
  };

  var formatFlags = {
    D: function D(dateObj) {
      return dateObj.getDate();
    },
    DD: function DD(dateObj) {
      return pad(dateObj.getDate());
    },
    Do: function Do(dateObj, i18n) {
      return i18n.DoFn(dateObj.getDate());
    },
    d: function d(dateObj) {
      return dateObj.getDay();
    },
    dd: function dd(dateObj) {
      return pad(dateObj.getDay());
    },
    ddd: function ddd(dateObj, i18n) {
      return i18n.dayNamesShort[dateObj.getDay()];
    },
    dddd: function dddd(dateObj, i18n) {
      return i18n.dayNames[dateObj.getDay()];
    },
    M: function M(dateObj) {
      return dateObj.getMonth() + 1;
    },
    MM: function MM(dateObj) {
      return pad(dateObj.getMonth() + 1);
    },
    MMM: function MMM(dateObj, i18n) {
      return i18n.monthNamesShort[dateObj.getMonth()];
    },
    MMMM: function MMMM(dateObj, i18n) {
      return i18n.monthNames[dateObj.getMonth()];
    },
    YY: function YY(dateObj) {
      return pad(String(dateObj.getFullYear()), 4).substr(2);
    },
    YYYY: function YYYY(dateObj) {
      return pad(dateObj.getFullYear(), 4);
    },
    h: function h(dateObj) {
      return dateObj.getHours() % 12 || 12;
    },
    hh: function hh(dateObj) {
      return pad(dateObj.getHours() % 12 || 12);
    },
    H: function H(dateObj) {
      return dateObj.getHours();
    },
    HH: function HH(dateObj) {
      return pad(dateObj.getHours());
    },
    m: function m(dateObj) {
      return dateObj.getMinutes();
    },
    mm: function mm(dateObj) {
      return pad(dateObj.getMinutes());
    },
    s: function s(dateObj) {
      return dateObj.getSeconds();
    },
    ss: function ss(dateObj) {
      return pad(dateObj.getSeconds());
    },
    S: function S(dateObj) {
      return Math.round(dateObj.getMilliseconds() / 100);
    },
    SS: function SS(dateObj) {
      return pad(Math.round(dateObj.getMilliseconds() / 10), 2);
    },
    SSS: function SSS(dateObj) {
      return pad(dateObj.getMilliseconds(), 3);
    },
    a: function a(dateObj, i18n) {
      return dateObj.getHours() < 12 ? i18n.amPm[0] : i18n.amPm[1];
    },
    A: function A(dateObj, i18n) {
      return dateObj.getHours() < 12 ? i18n.amPm[0].toUpperCase() : i18n.amPm[1].toUpperCase();
    },
    ZZ: function ZZ(dateObj) {
      var o = dateObj.getTimezoneOffset();
      return (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4);
    }
  };

  var monthParse = function monthParse(v) {
    return v - 1;
  };

  var parseFlags = {
    D: ["day", twoDigitsOptional],
    DD: ["day", twoDigits],
    Do: ["day", twoDigitsOptional + word, function (v) {
      return parseInt(v, 10);
    }],
    M: ["month", twoDigitsOptional, monthParse],
    MM: ["month", twoDigits, monthParse],
    YY: ["year", twoDigits, function (v) {
      var now = new Date();
      var cent = +("" + now.getFullYear()).substr(0, 2);
      return "" + (v > 68 ? cent - 1 : cent) + v;
    }],
    h: ["hour", twoDigitsOptional, undefined, "isPm"],
    hh: ["hour", twoDigits, undefined, "isPm"],
    H: ["hour", twoDigitsOptional],
    HH: ["hour", twoDigits],
    m: ["minute", twoDigitsOptional],
    mm: ["minute", twoDigits],
    s: ["second", twoDigitsOptional],
    ss: ["second", twoDigits],
    YYYY: ["year", fourDigits],
    S: ["millisecond", "\\d", function (v) {
      return v * 100;
    }],
    SS: ["millisecond", twoDigits, function (v) {
      return v * 10;
    }],
    SSS: ["millisecond", threeDigits],
    d: [null, twoDigitsOptional],
    ddd: [null, word],
    MMM: ["month", word, monthUpdate("monthNamesShort")],
    MMMM: ["month", word, monthUpdate("monthNames")],
    a: ["isPm", word, function (v, i18n) {
      var val = v.toLowerCase();

      if (val === i18n.amPm[0]) {
        return false;
      } else if (val === i18n.amPm[1]) {
        return true;
      }

      return null;
    }],
    ZZ: ["timezoneOffset", "[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?", function (v) {
      var parts = (v + "").match(/([+-]|\d\d)/gi);

      if (parts) {
        var minutes = +(parts[1] * 60) + parseInt(parts[2], 10);
        return parts[0] === "+" ? minutes : -minutes;
      }

      return 0;
    }]
  };
  parseFlags.dd = parseFlags.d;
  parseFlags.dddd = parseFlags.ddd;
  parseFlags.A = parseFlags.a; // Some common format strings

  var globalMasks = {
    "default": "ddd MMM DD YYYY HH:mm:ss",
    shortDate: "M/D/YY",
    mediumDate: "MMM D, YYYY",
    longDate: "MMMM D, YYYY",
    fullDate: "dddd, MMMM D, YYYY",
    shortTime: "HH:mm",
    mediumTime: "HH:mm:ss",
    longTime: "HH:mm:ss.SSS"
  };

  var setGlobalDateMasks = function setGlobalDateMasks(masks) {
    return assign(globalMasks, masks);
  };
  /***
   * Format a date
   * @method format
   * @param {Date|number} dateObj
   * @param {string} mask Format of the date, i.e. 'mm-dd-yy' or 'shortDate'
   */


  var formatDate = function formatDate(dateObj) {
    var mask = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : globalMasks["default"];
    var i18n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : globalI18n;

    if (typeof dateObj === "number") {
      dateObj = new Date(dateObj);
    }

    if (Object.prototype.toString.call(dateObj) !== "[object Date]" || isNaN(dateObj.getTime())) {
      throw new Error("Invalid Date pass to format");
    }

    mask = globalMasks[mask] || mask;
    var literals = []; // Make literals inactive by replacing them with ??

    mask = mask.replace(literal, function ($0, $1) {
      literals.push($1);
      return "@@@";
    }); // Apply formatting rules

    mask = mask.replace(token, function ($0) {
      return formatFlags[$0](dateObj, i18n);
    }); // Inline literal values back into the formatted value

    return mask.replace(/@@@/g, function () {
      return literals.shift();
    });
  };
  /**
   * Parse a date string into an object, changes - into /
   * @method parse
   * @param {string} dateStr Date string
   * @param {string} format Date parse format
   * @returns {Date|boolean}
   */


  var parseDate = function parseDate(dateStr, format) {
    var i18n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : globalI18n;

    if (typeof format !== "string") {
      throw new Error("Invalid format in fecha parse");
    }

    format = globalMasks[format] || format; // Avoid regular expression denial of service, fail early for really long strings
    // https://www.owasp.org/index.php/Regular_expression_Denial_of_Service_-_ReDoS

    if (dateStr.length > 1000) {
      return null;
    }

    var today = new Date();
    var dateInfo = {
      year: today.getFullYear(),
      month: 0,
      day: 1,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    };
    var parseInfo = [];
    var literals = [];
    var newFormat = format.replace(literal, function ($0, $1) {
      literals.push(regexEscape($1));
      return "@@@";
    });
    var specifiedFields = {};
    var requiredFields = {};
    newFormat = regexEscape(newFormat).replace(token, function ($0) {
      var info = parseFlags[$0];

      var _info = _slicedToArray(info, 4),
          field = _info[0],
          regex = _info[1],
          requiredField = _info[3];

      if (specifiedFields[field]) {
        throw new Error("Invalid format. ".concat(field, " specified twice in format"));
      }

      specifiedFields[field] = true;

      if (requiredField) {
        requiredFields[requiredField] = true;
      }

      parseInfo.push(info);
      return "(" + regex + ")";
    }); // Check all the required fields are present

    Object.keys(requiredFields).forEach(function (field) {
      if (!specifiedFields[field]) {
        throw new Error("Invalid format. ".concat(field, " is required in specified format"));
      }
    });
    newFormat = newFormat.replace(/@@@/g, function () {
      return literals.shift();
    });
    var matches = dateStr.match(new RegExp(newFormat, "i"));

    if (!matches) {
      return null;
    }

    for (var i = 1; i < matches.length; i++) {
      var _parseInfo = _slicedToArray(parseInfo[i - 1], 3),
          field = _parseInfo[0],
          parser = _parseInfo[2];

      var value = parser ? parser(matches[i], i18n) : +matches[i];

      if (value == null) {
        return null;
      }

      dateInfo[field] = value;
    }

    if (dateInfo.isPm === true && dateInfo.hour != null && +dateInfo.hour !== 12) {
      dateInfo.hour = +dateInfo.hour + 12;
    } else if (dateInfo.isPm === false && +dateInfo.hour === 12) {
      dateInfo.hour = 0;
    }

    var dateWithoutTZ = new Date(dateInfo.year, dateInfo.month, dateInfo.day, dateInfo.hour, dateInfo.minute, dateInfo.second, dateInfo.millisecond);
    var validateFields = [["month", "getMonth"], ["day", "getDate"], ["hour", "getHours"], ["minute", "getMinutes"], ["second", "getSeconds"]];

    for (var _i = 0, len = validateFields.length; _i < len; _i++) {
      // Check to make sure the date field is within the allowed range. Javascript dates allows values
      // outside the allowed range.
      if (dateInfo[validateFields[_i][0]] !== dateWithoutTZ[validateFields[_i][1]]()) {
        return null;
      }
    }

    if (dateInfo.timezoneOffset == null) {
      return dateWithoutTZ;
    }

    dateInfo.minute = dateInfo.minute - dateInfo.timezoneOffset;
    return new Date(Date.UTC(dateInfo.year, dateInfo.month, dateInfo.day, dateInfo.hour, dateInfo.minute, dateInfo.second, dateInfo.millisecond));
  };

  exports.formatDate = formatDate;
  exports.parseDate = parseDate;
  exports.setGlobalDateI18n = setGlobalDateI18n;
  exports.setGlobalDateMasks = setGlobalDateMasks;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
