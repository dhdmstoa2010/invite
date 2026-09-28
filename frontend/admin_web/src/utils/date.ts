const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

export function formatDate(ymd: string) {
  const [y, m, d] = ymd.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  if (Number.isNaN(date.getTime())) return ymd;

  const mm = String(m).padStart(2, "0");
  const dd = String(d).padStart(2, "0");
  return `${y}.${mm}.${dd} (${WEEKDAYS[date.getDay()]})`;
}
