const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

/** ISO 일시 → "2026.10.15 (목) 오후 6시" */
export function formatDate(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours < 12 ? "오전" : "오후";
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  const time = minutes === 0 ? `${hour12}시` : `${hour12}시 ${minutes}분`;

  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();

  return `${y}.${m}.${d} (${WEEKDAYS[date.getDay()]}) ${period} ${time}`;
}
