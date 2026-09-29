import type { ChangeEvent } from "react";
import { Field, Label, Select } from "../pages/styles/loginPage.style";
import { SelectRow } from "../pages/styles/createInvitationPage.style";

const pad = (n: number) => String(n).padStart(2, "0");

interface DateSelectProps {
  id: string;
  label: string;
  value: string; // "YYYY-MM-DD"
  onChange: (value: string) => void;
}

const THIS_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 3 }, (_, i) => THIS_YEAR + i);
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);

function daysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

export function DateSelect({ id, label, value, onChange }: DateSelectProps) {
  const [y, m, d] = value.split("-");
  const year = Number(y) || THIS_YEAR;
  const month = Number(m) || 1;
  const day = Number(d) || 1;
  const days = Array.from({ length: daysInMonth(year, month) }, (_, i) => i + 1);

  const emit = (nextYear: number, nextMonth: number, nextDay: number) => {
    const clampedDay = Math.min(nextDay, daysInMonth(nextYear, nextMonth));
    onChange(`${nextYear}-${pad(nextMonth)}-${pad(clampedDay)}`);
  };

  return (
    <Field>
      <Label htmlFor={`${id}-year`}>{label}</Label>
      <SelectRow>
        <Select
          id={`${id}-year`}
          aria-label="연도"
          value={y ? year : ""}
          onChange={(event: ChangeEvent<HTMLSelectElement>) =>
            emit(Number(event.target.value), month, day)
          }
        >
          <option value="" disabled>
            연도
          </option>
          {YEARS.map((option) => (
            <option key={option} value={option}>
              {option}년
            </option>
          ))}
        </Select>
        <Select
          id={`${id}-month`}
          aria-label="월"
          value={m ? month : ""}
          onChange={(event: ChangeEvent<HTMLSelectElement>) =>
            emit(year, Number(event.target.value), day)
          }
        >
          <option value="" disabled>
            월
          </option>
          {MONTHS.map((option) => (
            <option key={option} value={option}>
              {option}월
            </option>
          ))}
        </Select>
        <Select
          id={`${id}-day`}
          aria-label="일"
          value={d ? day : ""}
          onChange={(event: ChangeEvent<HTMLSelectElement>) =>
            emit(year, month, Number(event.target.value))
          }
        >
          <option value="" disabled>
            일
          </option>
          {days.map((option) => (
            <option key={option} value={option}>
              {option}일
            </option>
          ))}
        </Select>
      </SelectRow>
    </Field>
  );
}

interface TimeSelectProps {
  id: string;
  label: string;
  value: string; // "HH:mm"
  onChange: (value: string) => void;
}

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

export function TimeSelect({ id, label, value, onChange }: TimeSelectProps) {
  const [h, min] = value.split(":");
  const hour = Number(h) || 0;
  const minute = Number(min) || 0;

  const emit = (nextHour: number, nextMinute: number) => {
    onChange(`${pad(nextHour)}:${pad(nextMinute)}`);
  };

  return (
    <Field>
      <Label htmlFor={`${id}-hour`}>{label}</Label>
      <SelectRow>
        <Select
          id={`${id}-hour`}
          aria-label="시"
          value={h ? hour : ""}
          onChange={(event: ChangeEvent<HTMLSelectElement>) =>
            emit(Number(event.target.value), minute)
          }
        >
          <option value="" disabled>
            시
          </option>
          {HOURS.map((option) => (
            <option key={option} value={option}>
              {pad(option)}시
            </option>
          ))}
        </Select>
        <Select
          id={`${id}-minute`}
          aria-label="분"
          value={min ? minute : ""}
          onChange={(event: ChangeEvent<HTMLSelectElement>) =>
            emit(hour, Number(event.target.value))
          }
        >
          <option value="" disabled>
            분
          </option>
          {MINUTES.map((option) => (
            <option key={option} value={option}>
              {pad(option)}분
            </option>
          ))}
        </Select>
      </SelectRow>
    </Field>
  );
}
