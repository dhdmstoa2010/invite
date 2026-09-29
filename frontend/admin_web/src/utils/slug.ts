const INITIALS = [
  "g", "kk", "n", "d", "tt", "r", "m", "b", "pp", "s",
  "ss", "", "j", "jj", "ch", "k", "t", "p", "h",
];
const MEDIALS = [
  "a", "ae", "ya", "yae", "eo", "e", "yeo", "ye", "o", "wa",
  "wae", "oe", "yo", "u", "wo", "we", "wi", "yu", "eu", "ui", "i",
];
const FINALS = [
  "", "g", "kk", "gs", "n", "nj", "nh", "d", "l", "lg",
  "lm", "lb", "ls", "lt", "lp", "lh", "m", "b", "bs", "s",
  "ss", "ng", "j", "ch", "k", "t", "p", "h",
];

const HANGUL_BASE = 0xac00;
const HANGUL_LAST = 0xd7a3;

/** 한글 음절 하나를 로마자(국어의 로마자 표기법)로 바꾼다. 한글이 아니면 그대로 반환. */
function romanizeChar(char: string): string {
  const code = char.codePointAt(0) ?? 0;
  if (code < HANGUL_BASE || code > HANGUL_LAST) return char;

  const offset = code - HANGUL_BASE;
  const initial = Math.floor(offset / (MEDIALS.length * FINALS.length));
  const medial = Math.floor((offset % (MEDIALS.length * FINALS.length)) / FINALS.length);
  const final = offset % FINALS.length;

  return INITIALS[initial] + MEDIALS[medial] + FINALS[final];
}

/** 한글을 로마자로 바꾼 뒤 URL/ID에 쓸 수 있는 소문자 slug로 정리한다. */
export function slugify(text: string): string {
  const romanized = [...text].map(romanizeChar).join("");
  return romanized
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}
