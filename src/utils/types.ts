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
  score: number;
  oral_score: number;
  written_score: number;
  placement: number;
  code?: number;
  school: string;
};
export type TStudent = {
  name: string;
  school: string;
};
export type TCompitionsID =
  | "hafiz_lokman_lvl1"
  | "hafiz_lokman_lvl2"
  | "hafiz_lokman_lvl3"
  | "hafiz_elnour"
  | "hafiz_youcef"
  | "readers";
