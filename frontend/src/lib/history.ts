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
const MAX_RECORDS = 100;

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
