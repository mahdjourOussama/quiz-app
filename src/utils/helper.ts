import { TParticipant } from "./types";

export function generateDummyStudents(): TParticipant[] {
  const participants: TParticipant[] = [];
  for (let i = 1; i < 32; i++) {
    participants.push({
      name: ` تلميذ ${i} `,
      id: i,
      score: Math.floor(Math.random() * 100),
      placement: i,
    } as TParticipant);
  }
  return participants;
}

export function generateDummyTeams(): TParticipant[] {
  const participants: TParticipant[] = [];
  for (let i = 1; i < 6; i++) {
    participants.push({
      name: `مدرسة ${i} `,
      id: i,
      score: Math.floor(Math.random() * 100),
      placement: i,
    } as TParticipant);
  }
  return participants;
}
