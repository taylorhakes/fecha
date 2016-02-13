## 2.0.0
Fecha now throws errors on invalid dates in `fecha.format` and is stricter about what dates it accepts. Dates must pass `Object.prototype.toString.call(dateObj) !== '[object Date]'`.
