import moment from "moment-jalaali";

export function parseDate(dateString: string) {
  const [datePart] = dateString.split("T");
  const [year, month, day] = datePart.split("-");

  return {
    year: parseInt(year, 10).toString(),
    month: parseInt(month, 10).toString(),
    day: parseInt(day, 10).toString(),
  };
}

// حتما تنظیمات لوکال فارسی
moment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

export function formatToJalali(dateString: string) {
  const m = moment(dateString);

  const date = m.format("jYYYY/jMM/jDD");

  const weekday = m.format("dddd");

  const time = m.format("HH:mm");

  return `${date}  ${weekday} ساعت ${time}`;
}
