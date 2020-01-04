/**
 * Parse or format dates
 * @class fecha
 */
const token = /d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g;
const twoDigitsOptional = "[1-9]\\d?";
const twoDigits = "\\d\\d";
const threeDigits = "\\d{3}";
const fourDigits = "\\d{4}";
const word = "[^\\s]+";
const literal = /\[([^]*?)\]/gm;

function regexEscape(str) {
  return str.replace(/[|\\{()[^$+*?.-]/g, "\\$&");
}

function shorten(arr, sLen) {
  var newArr = [];
  for (var i = 0, len = arr.length; i < len; i++) {
    newArr.push(arr[i].substr(0, sLen));
  }
  return newArr;
}

function monthUpdate(arrName) {
  return function(v, i18n) {
    var index = i18n[arrName].indexOf(
      v.charAt(0).toUpperCase() + v.substr(1).toLowerCase()
    );
    if (~index) {
      return index;
    }
    return null;
  };
}

function pad(val, len) {
  val = String(val);
  len = len || 2;
  while (val.length < len) {
    val = "0" + val;
  }
  return val;
}

const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
const monthNamesShort = shorten(monthNames, 3);
const dayNamesShort = shorten(dayNames, 3);
const globalI18n = {
  dayNamesShort,
  dayNames,
  monthNamesShort,
  monthNames,
  amPm: ["am", "pm"],
  DoFn: function DoFn(D) {
    return (
      D +
      ["th", "st", "nd", "rd"][
        D % 10 > 3 ? 0 : ((D - (D % 10) !== 10) * D) % 10
      ]
    );
  }
};
const setGlobalDateI18n = i18n => Object.assign(globalI18n, i18n);

const formatFlags = {
  D: dateObj => dateObj.getDate(),
  DD: dateObj => pad(dateObj.getDate()),
  Do: (dateObj, i18n) => i18n.DoFn(dateObj.getDate()),
  d: dateObj => dateObj.getDay(),
  dd: dateObj => pad(dateObj.getDay()),
  ddd: (dateObj, i18n) => i18n.dayNamesShort[dateObj.getDay()],
  dddd: (dateObj, i18n) => i18n.dayNames[dateObj.getDay()],
  M: dateObj => dateObj.getMonth() + 1,
  MM: dateObj => pad(dateObj.getMonth() + 1),
  MMM: (dateObj, i18n) => i18n.monthNamesShort[dateObj.getMonth()],
  MMMM: (dateObj, i18n) => i18n.monthNames[dateObj.getMonth()],
  YY: dateObj => pad(String(dateObj.getFullYear()), 4).substr(2),
  YYYY: dateObj => pad(dateObj.getFullYear(), 4),
  h: dateObj => dateObj.getHours() % 12 || 12,
  hh: dateObj => pad(dateObj.getHours() % 12 || 12),
  H: dateObj => dateObj.getHours(),
  HH: dateObj => pad(dateObj.getHours()),
  m: dateObj => dateObj.getMinutes(),
  mm: dateObj => pad(dateObj.getMinutes()),
  s: dateObj => dateObj.getSeconds(),
  ss: dateObj => pad(dateObj.getSeconds()),
  S: dateObj => Math.round(dateObj.getMilliseconds() / 100),
  SS: dateObj => pad(Math.round(dateObj.getMilliseconds() / 10), 2),
  SSS: dateObj => pad(dateObj.getMilliseconds(), 3),
  a: (dateObj, i18n) => (dateObj.getHours() < 12 ? i18n.amPm[0] : i18n.amPm[1]),
  A: (dateObj, i18n) =>
    dateObj.getHours() < 12
      ? i18n.amPm[0].toUpperCase()
      : i18n.amPm[1].toUpperCase(),
  ZZ(dateObj) {
    const o = dateObj.getTimezoneOffset();
    return (
      (o > 0 ? "-" : "+") +
      pad(Math.floor(Math.abs(o) / 60) * 100 + (Math.abs(o) % 60), 4)
    );
  }
};

const monthParse = v => v - 1;
var parseFlags = {
  D: ["day", twoDigitsOptional],
  DD: ["day", twoDigits],
  Do: ["day", twoDigitsOptional + word, v => parseInt(v, 10)],
  M: ["month", twoDigitsOptional, monthParse],
  MM: ["month", twoDigits, monthParse],
  YY: [
    "year",
    twoDigits,
    function(v) {
      const now = new Date();
      const cent = +("" + now.getFullYear()).substr(0, 2);
      return "" + (v > 68 ? cent - 1 : cent) + v;
    }
  ],
  h: ["hour", twoDigitsOptional, undefined, "isPm"],
  hh: ["hour", twoDigits, undefined, "isPm"],
  H: ["hour", twoDigitsOptional],
  HH: ["hour", twoDigits],
  m: ["minute", twoDigitsOptional],
  mm: ["minute", twoDigits],
  s: ["second", twoDigitsOptional],
  ss: ["second", twoDigits],
  YYYY: ["year", fourDigits],
  S: ["millisecond", "\\d", v => v * 100],
  SS: ["millisecond", twoDigits, v => v * 10],
  SSS: ["millisecond", threeDigits],
  d: [null, twoDigitsOptional],
  ddd: [null, word],
  MMM: ["month", word, monthUpdate("monthNamesShort")],
  MMMM: ["month", word, monthUpdate("monthNames")],
  a: [
    "isPm",
    word,
    function(v, i18n) {
      const val = v.toLowerCase();
      if (val === i18n.amPm[0]) {
        return false;
      } else if (val === i18n.amPm[1]) {
        return true;
      }
      return null;
    }
  ],
  ZZ: [
    "timezoneOffset",
    "[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",
    function(v) {
      const parts = (v + "").match(/([+-]|\d\d)/gi);

      if (parts) {
        const minutes = +(parts[1] * 60) + parseInt(parts[2], 10);
        return parts[0] === "+" ? minutes : -minutes;
      }

      return 0;
    }
  ]
};
parseFlags.dd = parseFlags.d;
parseFlags.dddd = parseFlags.ddd;
parseFlags.A = parseFlags.a;

// Some common format strings
const globalMasks = {
  default: "ddd MMM DD YYYY HH:mm:ss",
  shortDate: "M/D/YY",
  mediumDate: "MMM D, YYYY",
  longDate: "MMMM D, YYYY",
  fullDate: "dddd, MMMM D, YYYY",
  shortTime: "HH:mm",
  mediumTime: "HH:mm:ss",
  longTime: "HH:mm:ss.SSS"
};
const setGlobalDateMasks = masks => Object.assign(globalMasks, masks);

/***
 * Format a date
 * @method format
 * @param {Date|number} dateObj
 * @param {string} mask Format of the date, i.e. 'mm-dd-yy' or 'shortDate'
 */
const formatDate = (
  dateObj,
  mask = globalMasks["default"],
  i18n = globalI18n
) => {
  if (typeof dateObj === "number") {
    dateObj = new Date(dateObj);
  }

  if (
    Object.prototype.toString.call(dateObj) !== "[object Date]" ||
    isNaN(dateObj.getTime())
  ) {
    throw new Error("Invalid Date pass to format");
  }

  mask = globalMasks[mask] || mask;

  let literals = [];

  // Make literals inactive by replacing them with ??
  mask = mask.replace(literal, function($0, $1) {
    literals.push($1);
    return "@@@";
  });
  // Apply formatting rules
  mask = mask.replace(token, ($0) => formatFlags[$0](dateObj, i18n));
  // Inline literal values back into the formatted value
  return mask.replace(/@@@/g, () => literals.shift());
};

/**
 * Parse a date string into an object, changes - into /
 * @method parse
 * @param {string} dateStr Date string
 * @param {string} format Date parse format
 * @returns {Date|boolean}
 */
const parseDate = (dateStr, format, i18n = globalI18n) => {
  if (typeof format !== "string") {
    throw new Error("Invalid format in fecha parse");
  }

  format = globalMasks[format] || format;

  // Avoid regular expression denial of service, fail early for really long strings
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
  var newFormat = format.replace(literal, function($0, $1) {
    literals.push(regexEscape($1));
    return "@@@";
  });
  const specifiedFields = {};
  const requiredFields = {};
  newFormat = regexEscape(newFormat).replace(token, function($0) {
    const info = parseFlags[$0];
    const [field, regex, , requiredField] = info;

    if (specifiedFields[field]) {
      throw new Error(`Invalid format. ${field} specified twice in format`);
    }

    specifiedFields[field] = true;
    if (requiredField) {
      requiredFields[requiredField] = true;
    }

    parseInfo.push(info);
    return "(" + regex + ")";
  });

  // Check all the required fields are present
  Object.keys(requiredFields).forEach(field => {
    if (!specifiedFields[field]) {
      throw new Error(
        `Invalid format. ${field} is required in specified format`
      );
    }
  });

  newFormat = newFormat.replace(/@@@/g, function() {
    return literals.shift();
  });
  const matches = dateStr.match(new RegExp(newFormat, "i"));
  if (!matches) {
    return null;
  }

  for (let i = 1; i < matches.length; i++) {
    const [field, , parser] = parseInfo[i - 1];
    const value = parser ? parser(matches[i], i18n) : +matches[i];
    if (value == null) {
      return null;
    }
    dateInfo[field] = value;
  }

  if (
    dateInfo.isPm === true &&
    dateInfo.hour != null &&
    +dateInfo.hour !== 12
  ) {
    dateInfo.hour = +dateInfo.hour + 12;
  } else if (dateInfo.isPm === false && +dateInfo.hour === 12) {
    dateInfo.hour = 0;
  }

  const dateWithoutTZ = new Date(
    dateInfo.year,
    dateInfo.month,
    dateInfo.day,
    dateInfo.hour,
    dateInfo.minute,
    dateInfo.second,
    dateInfo.millisecond
  );

  const validateFields = [
    ["month", "getMonth"],
    ["day", "getDate"],
    ["hour", "getHours"],
    ["minute", "getMinutes"],
    ["second", "getSeconds"]
  ];
  for (let i = 0, len = validateFields.length; i < len; i++) {
    // Check to make sure the date field is within the allowed range. Javascript dates allows values
    // outside the allowed range.
    if (
      dateInfo[validateFields[i][0]] !== dateWithoutTZ[validateFields[i][1]]()
    ) {
      return null;
    }
  }

  if (dateInfo.timezoneOffset == null) {
    return dateWithoutTZ;
  }

  dateInfo.minute = dateInfo.minute - dateInfo.timezoneOffset;
  return new Date(
    Date.UTC(
      dateInfo.year,
      dateInfo.month,
      dateInfo.day,
      dateInfo.hour,
      dateInfo.minute,
      dateInfo.second,
      dateInfo.millisecond
    )
  );
};
export { formatDate, parseDate, setGlobalDateI18n, setGlobalDateMasks };
