export type TCompition = {
  title: string;
  logo: string;
  link: string;
  id: TCompitionsID;
  participants: TParticipant[];
};
export type TParticipant = {
  id: string;
  name: string;
  cripticName: string;
  score: number;
  subjects?: {
    name: string;
    score: number;
  }[];
  placement: number | null;
  anonymized?: boolean;
};
export type TCompitionsID = "individuals" | "teams_sciences" | "teams_arts";
