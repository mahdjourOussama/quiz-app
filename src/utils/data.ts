import { loadData } from "./helper";
import { TCompition, TParticipant } from "./types";
const studentsNames = [
  "زغمار أنفال",
  "بودبغة انيس أحمد ",
  "عماري براء الدين ",
  "خلفون مرام ",
  "بوحرابة هبة ",
  "بطلي تسنيم ",
  "بلعقون شيماء ",
  "خطاب ريم ",
  "خطاب رنيم ",
  "بركان نور اليقين ",
  "بن العلمي علاء الدين ",
  "سعداوي عمار ",
  "شايب عبد المؤمن ",
  "جندلي نور سين ",
  "بن قارة ميس ",
  "مزياني أحمد راشد ",
  "جندلي معتصم بالله ",
  "يوزيتونة سجي ",
  "معلم جنى ",
  "عصفور رحمة ",
  "حمادوش نسرين ",
  "يوترعة سرين ",
  "بوزيرة اويس",
  "بن خلاف نور هدى",
  "غرفي محمد مهدي ",
  "لحمر محمد ساجد ",
  "لحول عبد المؤمن",
  "زبيري بيان",
  "رجال آدم مذير",
  "رواس هديل نوران",
  "حمادة سلين حورية ",
];
const scienceTeamsNames = [
  " ربيعي أحمد",
  "بلكحل لعروسي ",
  "الشيخ بيوض ",
  "سعدي العربي ",
  "معاوي عمار ",
];
const artsTeamsNames = [
  " عابد إبراهيم",
  "غضبان الخميسي",
  "تبيب بشير ",
  "بالعشار عمار",
  "عين النحاس",
];
export const students: TParticipant[] =
  loadData("individuals") ||
  studentsNames.map((name, i) => {
    return {
      name: name,
      id: name + i,
      cripticName: "",
      score: 0,
      placement: null,
    } as TParticipant;
  });
export const scienceTeams: TParticipant[] =
  loadData("teams_sciences") ||
  scienceTeamsNames.map((name, i) => {
    return {
      name: name,
      id: name + i,
      score: 0,
      cripticName: "",
      subjects: [
        { name: "math", score: 0 },
        { name: "science", score: 0 },
        { name: "arabic", score: 0 },
        { name: "islamic", score: 0 },
        { name: "art", score: 0 },
      ],
      placement: null,
    } as TParticipant;
  });
export const artsTeams: TParticipant[] =
  loadData("teams_arts") ||
  artsTeamsNames.map((name, i) => {
    return {
      name: name,
      cripticName: "",
      id: name + i,
      score: 0,
      subjects: [
        { name: "quoran", score: 0 },
        { name: "theater", score: 0 },
        { name: "songs", score: 0 },
        { name: "presentation", score: 0 },
        { name: "time", score: 0 },
      ],
      placement: null,
    } as TParticipant;
  });
export const compitions: TCompition[] = [
  {
    title: "individuals",
    logo: "/images/individuals.png",
    link: "/compition/individuals",
    id: "individuals",
    participants: students,
  },
  {
    title: "teams_arts",
    logo: "/images/arts.png",
    link: "/compition/teams_arts",
    id: "teams_arts",
    participants: artsTeams,
  },
  {
    title: "teams_sciences",
    logo: "/images/science.png",
    link: "/compition/teams_sciences",
    id: "teams_sciences",
    participants: scienceTeams,
  },
];
