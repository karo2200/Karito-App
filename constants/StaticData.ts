export const monthsName = [
  { label: "فروردین", value: "1" },
  { label: "اردیبهشت", value: "2" },
  { label: "خرداد", value: "3" },
  { label: "تیر", value: "4" },
  { label: "مرداد", value: "5" },
  { label: "شهریور", value: "6" },
  { label: "مهر", value: "7" },
  { label: "آبان", value: "8" },
  { label: "آذر", value: "9" },
  { label: "دی", value: "10" },
  { label: "بهمن", value: "11" },
  { label: "اسفند", value: "12" },
];

export const days = Array.from({ length: 31 }, (_, i) => {
  const day = String(i + 1);
  return {
    label: day,
    value: day,
  };
});

export const generateYears = () => {
  const start = 1330;
  const end = 1386;

  const result = [];

  for (let year = start; year <= end; year++) {
    result.push({
      label: String(year),
      value: year,
    });
  }

  return result;
};
