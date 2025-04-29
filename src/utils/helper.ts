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
const usedCodes = getUsedCodes() || new Set<string>();

export function generateUniqueCode(): string {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  do {
    code = Array.from(
      { length: 4 },
      () => charset[Math.floor(Math.random() * charset.length)]
    ).join("");
  } while (usedCodes.has(code));
  usedCodes.add(code);
  saveUsedCodes(usedCodes);
  return code;
}

function getUsedCodes(): Set<string> {
  const stored = localStorage.getItem("usedCodes");
  return stored ? new Set(JSON.parse(stored)) : new Set();
}

function saveUsedCodes(codes: Set<string>) {
  localStorage.setItem("usedCodes", JSON.stringify(Array.from(codes)));
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
