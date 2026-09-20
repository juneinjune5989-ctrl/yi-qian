import type { LuckLevel } from '../data/fortunes.ts';

export interface FortuneRecord {
  recordId: string;
  id: number;
  no: string;
  title: string;
  level: string;
  levelType: LuckLevel;
  motto: string;
  drawnAt: string;
}

const STORAGE_KEY = 'fortune_history_v1';
const TODAY_KEY = 'fortune_today_v1';
const MAX_RECORDS = 100;

function todayStamp(): string {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

interface TodayDraw {
  date: string;
  fortuneId: number;
}

/** 返回今日已抽取的签 id；今日未抽取则返回 null */
export function getTodayFortuneId(): number | null {
  try {
    const raw = localStorage.getItem(TODAY_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as TodayDraw;
    return data.date === todayStamp() ? data.fortuneId : null;
  } catch {
    return null;
  }
}

/** 记录今日抽取的签，用于每日一签限制 */
export function setTodayFortuneId(fortuneId: number): void {
  const data: TodayDraw = { date: todayStamp(), fortuneId };
  localStorage.setItem(TODAY_KEY, JSON.stringify(data));
}

export function loadHistory(): FortuneRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const list = JSON.parse(raw) as FortuneRecord[];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export function addRecord(rec: Omit<FortuneRecord, 'recordId' | 'drawnAt'>): void {
  const list = loadHistory();
  const record: FortuneRecord = {
    ...rec,
    recordId: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    drawnAt: new Date().toISOString(),
  };
  const next = [record, ...list].slice(0, MAX_RECORDS);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export function clearHistory(): void {
  localStorage.removeItem(STORAGE_KEY);
}
