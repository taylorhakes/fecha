declare namespace Fecha {
    type Days = [string, string, string, string, string, string, string];
    type Months = [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ];

    interface i18nSettings {
      amPm: [string, string],

      dayNames: Days,

      dayNamesShort: Days,

      monthNames: Months,

      monthNamesShort: Months,

      DoFn: (D: number) => string
    }

    export var masks: {
      default: string,
      fullDate: string,
      longDate: string,
      longTime: string,
      mediumDate: string,
      mediumTime: string,
      shortDate: string,
      shortTime: string,
      [myMask: string]: string
    };

    export var i18n: i18nSettings;

    export function format(dateObj: Date | number, mask: string, i18nSettings?: i18nSettings): string;

    export function parse(dateStr: string, format: string, i18nSettings?: i18nSettings): Date;
}

export = Fecha
