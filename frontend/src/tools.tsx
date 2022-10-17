import { format } from "date-fns";

function assert(val: boolean, message?: string) {
  if (!val) {
    throw new Error(message || "Assertion failed");
  }
}

type DATE_DATA = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  millisecond: number;
  timezoneOffset: number;
};

/**
 * A simple wrapper around the date object to make it more palatable.
 */
class DateTime {
  private data: DATE_DATA;

  static get Now(): DateTime {
    return new DateTime(new Date());
  }

  static get StartOfToday(): DateTime {
    const currentDate = new Date();
    const options = {
      year: currentDate.getFullYear(),
      month: currentDate.getMonth(),
      day: currentDate.getDate(),
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
      timezoneOffset: currentDate.getTimezoneOffset(),
    };
    return new DateTime(options);
  }

  static get EndOfToday(): DateTime {
    const now = DateTime.Now.dateData;
    return new DateTime({
      year: now.year,
      month: now.month,
      day: now.day,
      hour: 23,
      minute: 59,
      second: 59,
      millisecond: 999,
      timezoneOffset: now.timezoneOffset,
    });
  }

  get dateData(): DATE_DATA {
    return this.data;
  }

  get epochValue(): number {
    return this.toDate().getTime();
  }

  constructor(data: Partial<DATE_DATA> | Date) {
    if (data instanceof Date) {
      // convert to DATE_DATA
      this.data = {
        year: data.getFullYear(),
        month: data.getMonth(),
        day: data.getDate(),
        hour: data.getHours(),
        minute: data.getMinutes(),
        second: data.getSeconds(),
        millisecond: data.getMilliseconds(),
        timezoneOffset: data.getTimezoneOffset(),
      };
    } else {
      const currentDate = new Date();
      const currentData: DATE_DATA = {
        year: currentDate.getFullYear(),
        month: currentDate.getMonth(),
        day: currentDate.getDate(),
        hour: currentDate.getHours(),
        minute: currentDate.getMinutes(),
        second: currentDate.getSeconds(),
        millisecond: currentDate.getMilliseconds(),
        timezoneOffset: currentDate.getTimezoneOffset(),
      };

      this.data = { ...currentData, ...data };
    }
  }

  setDataValue<T extends keyof DATE_DATA>(key: T, value: DATE_DATA[T]) {
    if (key === "hour") {
      assert(value >= 0 && value <= 23, `Invalid hour: ${value}`);
    }
    if (key === "minute") {
      assert(value >= 0 && value <= 59, `Invalid minute: ${value}`);
    }
    this.data[key] = value;
  }

  firstDayOfMonth() {
    return new Date(this.data.year, this.data.month).getDay();
  }

  daysInMonth() {
    return 32 - new Date(this.data.year, this.data.month, 32).getDate();
  }

  toDate(): Date {
    const { year, month, day, hour, minute, second, millisecond } = this.data;
    return new Date(year, month, day, hour, minute, second, millisecond);
  }

  isAMorPM(): "am" | "pm" {
    const { hour } = this.data;
    return hour < 12 ? "am" : "pm";
  }

  amPMHour(): number {
    const { hour } = this.data;
    if (hour < 12) {
      if (hour === 0) return 12;
      return hour;
    } else {
      return hour + 1 - 12;
    }
  }

  toString(formatString?: string): string {
    if (!formatString) {
      return this.toDate().toISOString();
    }
    try {
      return format(this.epochValue, formatString);
    } catch (error) {
      return "Invalid date";
    }
  }

  toDateTimeString() {
    const month = this.toDate().toLocaleString("default", { month: "short" });
    const minute =
      this.data.minute < 10 ? `0${this.data.minute}` : this.data.minute;

    return `${this.data.day} ${month} ${this.data.year},  ${
      this.data.hour
    }:${minute}  ${this.isAMorPM().toUpperCase()}`;
  }

  getDifferenceInDate() {
    // eslint-disable-next-line no-console
    console.log("ten");
  }
}
export const commafy = (num: number) => {
  const val = num?.toLocaleString();
  return `KSH ${val}`;
};
export const hasValue = (obj: any) => {
  for (const i in obj) {
    if (obj[i]) {
      return true;
    }
  }
  return false;
};
export const formatDateTo = (date: string) => {
  const dd = new Date(date);

  const standard = new DateTime(dd).toString("dd MMM yyyy");

  return standard;
};
