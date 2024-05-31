"use client";
import { compitions } from "./data";
import { TCompitionsID, TParticipant } from "./types";

export function calculateTotalScore(participant: TParticipant): TParticipant {
  if (!participant.subjects) return participant;
  const total = participant.subjects.reduce((acc, item) => acc + item.score, 0);
  return { ...participant, score: total / participant.subjects.length };
}

export function calculatePosition(
  participants: TParticipant[]
): TParticipant[] {
  if (participants.length === 0) return [];
  return participants
    .sort((a, b) => b.score - a.score)
    .map((item, index) => {
      return { ...item, placement: index + 1, anonymized: false };
    });
}

export function randomize(
  participant: TParticipant,
  compition: TCompitionsID
): TParticipant {
  const available =
    localStorage.getItem(`${compition}_available`)?.split(",") ||
    Array.from(
      {
        length:
          compitions.find((c) => c.id === compition)?.participants.length ?? 0,
      },
      (_, i) => i + 1
    ) ||
    [];
  console.log("available", available);
  if (available.length === 0 || participant.anonymized) return participant;
  const index = Math.floor(Math.random() * available.length);
  const [random] = available.splice(index, 1);
  participant.cripticName = ` مشارك غامض ${random} `;
  participant.anonymized = true;
  localStorage.setItem(`${compition}_available`, available.join(","));
  return participant;
}

export function saveData(data: TParticipant[], key: string) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function loadData(key: string): TParticipant[] | null {
  const data = localStorage.getItem(key);
  if (!data) return null;
  return JSON.parse(data);
}

export function clearData(key: string) {
  localStorage.removeItem(key);
  localStorage.removeItem(`${key}_available`);
}
