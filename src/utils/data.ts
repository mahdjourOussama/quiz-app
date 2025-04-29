import { loadData } from "./helper";
import { TCompition, TCompitionsID, TParticipant, TStudent } from "./types";

const compitionsNames: TCompitionsID[] = [
  "hafiz_lokman_lvl1",
  "hafiz_lokman_lvl2",
  "hafiz_lokman_lvl3",
  "hafiz_elnour",
  "hafiz_youcef",
  "readers",
];

const studentsNames: { [key: string]: TStudent[] } = {
  hafiz_lokman_lvl1: [
    { name: "سهتال روان", school: "سعدي العربي " },
    { name: "بوقفة ضحى", school: "المدرسة القرآنية عبد الحميد بن باديس" },
    { name: "قارة سراج عبد الصمد", school: "ابتدائية عطاف احمد" },
    { name: "جبلون محمد لقمان", school: "سعدي العربي" },
    { name: "بوقفة نور ايلاف", school: "سعدي العربي" },
    { name: "توهامي عبد المؤمن", school: "سعدي العربي" },
    { name: "فراشي سلسبيل", school: "بطلي ساعد" },
    { name: "عيايدية الين جوري ", school: "سعدي العربي" },
  ],
  hafiz_lokman_lvl2: [
    { name: "قارة اريج ميرال", school: "ابتدائية عطاف احمد" },
    {
      name: "بوكبوس هاجر",
      school: "حناشي العايب",
    },
    {
      name: "قايدي عبد الحسيب",
      school: "حناشي العايب",
    },
    { name: "بركان غفران", school: "حناشي العايب" },
    {
      name: "بوشريبة ألاء",
      school: "سفاري حسين",
    },
  ],
  hafiz_lokman_lvl3: [
    { name: "مزيلي رتاج", school: "حناشي العايب" },
    { name: "لزغد اسراء", school: "بلعشار عمار" },
    { name: "بن غنيسة اسراء", school: "سعدي العربي" },
    { name: "بن قارة ميس", school: "مدرسة تبيب بشير" },
    { name: "طلحة اسيل", school: "عيمن علي حامة بوزيان" },
    { name: "شايب عبد المؤمن", school: "مدرسة إبراهيم بيوض" },
    { name: "قايدي عائشة", school: "حناشي العايب" },
    { name: "فراشي سندس ", school: "بطلي ساعد " },
    { name: "بوغلوط احمد يحي", school: "مدرسة حناشي العايب" },
    { name: "بركان نور اليقين", school: "مدرسة بلعشار عمار " },
    { name: "سايحي الياس", school: "مدرسة بطلي ساعد" },
    { name: "بن خلاف نور الهدى", school: "مدرسة عين النحاس " },
    { name: "تومي تيماء", school: "سعدي العربي" },
    { name: "بن صيد محمد اياد", school: "سفاري حسين" },
    { name: "بورويسة امجد عبد المجيب", school: "سفاري حسين " },
  ],
  hafiz_youcef: [
    { name: " يعلاوي مروة", school: "بلعشار عمار" },
    { name: "يعلاوي اميمة", school: "عقون عبد المجيد" },
    { name: "العرفي ملاك", school: "إبراهيم بلحمدي" },
    { name: "باهي عبد الجبار", school: "شيهاني بشير" },
    { name: "معتز بالله وقرور", school: "بوتفاح محمد الصالح " },
    { name: "لجين زوربي", school: "متوسطة صالح دراجي" },
  ],
  hafiz_elnour: [
    { name: "ماجد دردور", school: "متوسطة الاخوة بوسالم" },
    { name: "سهتال يوسف عبد الجليل", school: "متوسطة صالح دراجي" },
    { name: "توهامي رونق", school: "متوسطة صالح دراجي" },
    { name: "بوديسة شهاب", school: "متوسطة قربوعة عبد الحميد" },
    { name: "بن لخلف اسيل", school: "بوتفاح محمد الصالح" },
    { name: "جندلي سيلين", school: "متوسطة صالح دراجي" },
    { name: "محيمود ملاك", school: "متوسطة علي منجلي" },
  ],
  readers: [
    { name: "العرفي ملاك", school: "إبراهيم بلحمدي" },
    { name: "طلحة اسيل", school: "عيمن علي حامة بوزيان" },
    { name: "بن قارة ميس", school: "مدرسة تبيب بشير" },
    { name: "قارة اريج ميرال", school: "ابتدائية عطاف احمد" },
    { name: "قارة سراج عبد الصمد", school: "ابتدائية عطاف احمد" },
    { name: "فرجيوي ميار", school: "مدرسة بطلي ساعد" },
    { name: "بولبردعة شام", school: "مدرسة بطلي ساعد" },
    { name: "سعداوي عمار", school: "مدرسة بيوض" },
    { name: "عيداوي ابتهال ليان", school: "حناشي العايب" },
    { name: "غلوسي هبة عبد الرحمان", school: "عبد المالك رمضان" },
    { name: "العرفي شهد", school: "عابد إبراهيم" },
    { name: "بن غنيسة اسراء", school: "سعدي العربي " },
    { name: "بن جميلة نرمين", school: "سفاري حسين" },
    { name: "مصباح تقاء", school: "سفاري حسين" },
    { name: "بن يحوب سجى", school: "سفاري حسين" },
  ],
};

export const compitions: TCompition[] = compitionsNames.map((name) => {
  return {
    title: name,
    logo: `/images/${name}.png`,
    link: `/compition/${name}`,
    id: name,
    participants:
      loadData(name) ||
      studentsNames[name].map((student, i) => {
        return {
          name: student.name,
          school: student.school,
          id: student.name + i,
          score: 0,
          oral_score: 0,
          written_score: 0,
          placement: 0,
        };
      }),
  };
});
