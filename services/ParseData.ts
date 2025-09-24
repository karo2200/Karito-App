import moment from "moment-jalaali";

moment.loadPersian({ dialect: "persian-modern", usePersianDigits: false });

export function parseDate(dateString: string) {
  const m = moment(dateString, "YYYY-MM-DDTHH:mm:ssZ");

  return {
    year: m.jYear().toString(),
    month: (m.jMonth() + 1).toString(),
    day: m.jDate().toString(),
  };
}

export function formatToJalali(dateString: string) {
  const m = moment(dateString, "YYYY-MM-DDTHH:mm:ssZ");

  const date = m.format("jYYYY/jMM/jDD");
  const weekday = m.format("dddd");
  const time = m.format("HH:mm");

  return `${date}  ${weekday} ساعت ${time}`;
}

export function formatPrice(price: number | string): string {
  if (price === null || price === undefined) return "";

  const num = typeof price === "string" ? parseInt(price, 10) : price;

  if (isNaN(num)) return "";

  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
