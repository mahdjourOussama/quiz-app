import { TCompition, TParticipant } from "./types";
import { generateDummyStudents, generateDummyTeams } from "./helper";
export const compitions: TCompition[] = [
  {
    title: "compition 1",
    logo: "/images/placeholder.jpg",
    link: "/compition/1",
  },
  {
    title: "compition 2",
    logo: "/images/placeholder.jpg",
    link: "/compition/2",
  },
  {
    title: "compition 2",
    logo: "/images/placeholder.jpg",
    link: "/compition/2",
  },
];

export const students: TParticipant[] = generateDummyStudents();
export const teams: TParticipant[] = generateDummyTeams();
