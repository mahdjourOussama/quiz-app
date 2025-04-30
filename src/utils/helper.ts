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
const usedCodes: Record<TCompitionsID, Set<string>> = getUsedCodes();

function getUsedCodes(): Record<TCompitionsID, Set<string>> {
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
  const result: Record<TCompitionsID, Set<string>> = {} as Record<
    TCompitionsID,
    Set<string>
  >;
  for (const key in parsed) {
    result[key as TCompitionsID] = new Set(parsed[key]);
  }
  return result;
}

function saveUsedCodes(codes: Record<TCompitionsID, Set<string>>) {
  const obj: Record<TCompitionsID, string[]> = {} as Record<
    TCompitionsID,
    string[]
  >;
  for (const key in codes) {
    obj[key as TCompitionsID] = Array.from(codes[key as TCompitionsID]);
  }
  console.log("obj", obj);
  localStorage.setItem("usedCodes", JSON.stringify(obj));
}

export function generateUniqueCode(compition_id: TCompitionsID): string {
  const compition = compitions.find((c) => c.id === compition_id);
  if (!compition) return "";
  console.log("compition", compition_id, usedCodes);
  const code = Math.floor(
    1 + Math.random() * compition.participants.length
  ).toString();
  if (usedCodes[compition_id].has(code)) {
    return generateUniqueCode(compition_id);
  } else {
    usedCodes[compition_id].add(code);
    saveUsedCodes(usedCodes);
    return code;
  }
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
