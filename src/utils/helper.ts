"use client";
import { compitions } from "./data";
import { TCompitionsID, TParticipant } from "./types";

export function calculateTotalScore(participant: TParticipant): TParticipant {
  if (!participant.oral_score || !participant.written_score) return participant;
  const total = participant.oral_score + participant.written_score;
  return { ...participant, score: total / 2 };
}

export function calculatePosition(
  participants: TParticipant[]
): TParticipant[] {
  if (participants.length === 0) return [];
  return participants
    .sort((a, b) => b.score - a.score)
    .map((item, index) => {
      return { ...item, placement: index + 1 };
    });
}
const usedCodes: Record<TCompitionsID, Set<number>> = getUsedCodes();

function getUsedCodes(): Record<TCompitionsID, Set<number>> {
  const stored = localStorage.getItem("usedCodes");
  if (!stored)
    return {
      hafiz_elnour: new Set(),
      hafiz_youcef: new Set(),
      readers: new Set(),
      hafiz_lokman_lvl1: new Set(),
      hafiz_lokman_lvl2: new Set(),
      hafiz_lokman_lvl3: new Set(),
    };
  const parsed = JSON.parse(stored);
  const result: Record<TCompitionsID, Set<number>> = {} as Record<
    TCompitionsID,
    Set<number>
  >;
  for (const key in parsed) {
    result[key as TCompitionsID] = new Set(parsed[key]);
  }
  return result;
}

function saveUsedCodes(codes: Record<TCompitionsID, Set<number>>) {
  const obj: Record<TCompitionsID, number[]> = {} as Record<
    TCompitionsID,
    number[]
  >;
  for (const key in codes) {
    obj[key as TCompitionsID] = Array.from(codes[key as TCompitionsID]);
  }
  console.log("obj", obj);
  localStorage.setItem("usedCodes", JSON.stringify(obj));
}
const lastCode: Record<TCompitionsID, number> = getLastCode();
function getLastCode(): Record<TCompitionsID, number> {
  const stored = localStorage.getItem("lastCode");
  if (!stored)
    return {
      hafiz_elnour: 0,
      hafiz_youcef: 0,
      readers: 0,
      hafiz_lokman_lvl1: 0,
      hafiz_lokman_lvl2: 0,
      hafiz_lokman_lvl3: 0,
    };
  return JSON.parse(stored);
}
function saveLastCode(codes: Record<TCompitionsID, number>) {
  localStorage.setItem("lastCode", JSON.stringify(codes));
}
export function generateUniqueCode(compition_id: TCompitionsID): number {
  const compition = compitions.find((c) => c.id === compition_id);
  if (!compition) return 0;
  if (lastCode[compition_id] > compition.participants.length)
    return compition.participants.length;
  console.log("compition", compition_id, usedCodes);
  const code = 1 + lastCode[compition_id];
  lastCode[compition_id] = code;
  saveLastCode(lastCode);
  return code;
}

export function saveData(data: TParticipant[], key: string) {
  if (!key || typeof window === "undefined") {
    return;
  }
  localStorage.setItem(key, JSON.stringify(data));
}

export function loadData(key: string): TParticipant[] | null {
  if (!key || typeof window === "undefined") {
    return null;
  }
  const data = localStorage.getItem(key);
  if (!data) return null;
  return JSON.parse(data);
}

export function clearData(key: string) {
  if (!key || typeof window === "undefined") {
    return;
  }
  localStorage.removeItem(key);
  localStorage.removeItem(`${key}_available`);
}

export function clearLocalStorage() {
  localStorage.clear();
  window.location.reload();
}
