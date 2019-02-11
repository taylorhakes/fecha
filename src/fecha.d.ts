export type Days = [string, string, string, string, string, string, string];

export type Months = [
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

export interface i18nSettings {
    amPm: [string, string];
    dayNames: Days;
    dayNamesShort: Days;
    monthNames: Months;
    monthNamesShort: Months;
    DoFn(D: number): string;
}

export interface Masks {
    default: string;
    fullDate: string;
    longDate: string;
    longTime: string;
    mediumDate: string;
    mediumTime: string;
    shortDate: string;
    shortTime: string;
    [myMask: string]: string;
}

export var i18n: i18nSettings;

export var masks: Masks;

export function format(dateObj: Date | number, mask: string, i18nSettings?: i18nSettings): string;

export function parse(dateStr: string, format: string, i18nSettings?: i18nSettings): Date | null;
