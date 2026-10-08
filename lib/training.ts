export const courses = [
  {id:"hataensiapu-4h",name:"Hätäensiapu 4 h®",short:"Hätäensiapu 4 h",duration:"4 tuntia",text:"Tiivis koulutus tärkeimpiin hätäensiaputaitoihin.",link:"Tutustu 4 tunnin kurssiin",goal:"Haluat tiiviin kokonaisuuden."},
  {id:"hataensiapu-8h",name:"Hätäensiapu 8 h®",short:"Hätäensiapu 8 h",duration:"8 tuntia",text:"Yhden päivän kokonaisuus hätäensiaputilanteiden harjoitteluun.",link:"Tutustu 8 tunnin kurssiin",goal:"Haluat yhden päivän koulutuksen."},
  {id:"ea1",name:"EA1®",short:"EA1",duration:"2 päivää",text:"Kaksipäiväinen kurssi, jolla ensiapuun perehdytään laajemmin.",link:"Tutustu EA1-kurssiin",goal:"Haluat perehtyä ensiapuun laajemmin."},
  {id:"ea2",name:"EA2®",short:"EA2",duration:"Jatkokurssi",text:"Jatkokurssi aiemmin EA1-kurssin suorittaneelle.",link:"Tutustu EA2-kurssiin",goal:"Olet suorittanut EA1-kurssin."},
] as const;
export const trainingCourses = [...courses, {id:"raataloity",name:"Räätälöity koulutus",short:"Räätälöity koulutus",duration:"2–16 tuntia",text:"Oman ryhmän tarpeista suunniteltava lähikoulutus.",goal:"Vähintään 4 osallistujaa."}] as const;
export type CourseId = typeof trainingCourses[number]["id"];
export const buyerRoles = [
  {id:"hr",name:"HR ja henkilöstöhallinto",text:"Järjestän koulutuksen henkilöstölle.",guide:"Kokoa osallistujamäärä, toimipisteet ja aiempi osaaminen. Selvitä työpaikan koulutustarve työterveyshuollon kanssa ennen tilaamista."},
  {id:"esihenkilo",name:"Esihenkilö ja työsuojelu",text:"Suunnittelen tiimini ensiapuvalmiutta.",guide:"Huomioi työympäristö, työvuorot ja koulutettujen henkilöiden saatavuus. Kurssin valinta alkaa tiimisi todetusta tarpeesta."},
  {id:"kasvatus",name:"Koulu ja päiväkoti",text:"Järjestän koulutusta lasten kanssa työskenteleville.",guide:"Kerro lasten ikäryhmistä, koulutuksen tavoitteesta ja henkilöstön aiemmasta osaamisesta. Lapsiin painottuvan koulutuksen sisältö vahvistetaan kouluttajan kanssa."},
] as const;
export type RoleId = typeof buyerRoles[number]["id"];
export const trainingPackages = [
  {id:"toimisto",name:"Ensiapu toimistotyöhön",english:"Low Risk First Aid",tag:"Toimisto ja työyhteisö",text:"Lähtökohta työyhteisön hätäensiaputaitojen harjoitteluun. Valitse sopiva laajuus työpaikan tarpeen mukaan.",courseIds:["hataensiapu-4h","hataensiapu-8h","ea1"]},
  {id:"tyomaa",name:"Ensiapu rakennustyömaille ja teollisuuteen",english:"High Risk First Aid",tag:"Rakennustyömaa ja teollisuus",text:"Suunnittele koulutus työympäristön vaaratekijöiden ja aiemman osaamisen pohjalta. Kerro työpaikan erityisistä tarpeista.",courseIds:["ea1","ea2","raataloity"]},
  {id:"lapset",name:"Lasten ensiapu",english:"Pediatric First Aid",tag:"Lapset ja kasvatustyö",text:"Kysy lapsiin painottuvaa koulutusta ryhmällesi. Sisältö, laajuus ja soveltuvuus vahvistetaan kouluttajan kanssa.",courseIds:["raataloity"]},
] as const;
export type PackageId = typeof trainingPackages[number]["id"];
export type TrainingContext = { courseId?: CourseId; roleId?: RoleId; packageId?: PackageId; participants?: number };
export type QueryValues = Record<string, string | string[] | undefined>;

export function readTrainingContext(query: QueryValues): TrainingContext {
  const course = trainingCourses.find(c => c.id === query.kurssi || c.short === query.kurssi);
  const role = buyerRoles.find(r => r.id === query.rooli);
  const selectedPackage = trainingPackages.find(p => p.id === query.paketti && p.courseIds.some(id => id === course?.id));
  const count = typeof query.osallistujat === "string" && /^\d{1,5}$/.test(query.osallistujat) ? Number(query.osallistujat) : 0;
  return {courseId:course?.id, roleId:role?.id, packageId:selectedPackage?.id, participants:count>=1 && count<=10000?count:undefined};
}
export function trainingLink(path: string, context: TrainingContext) {
  const params = new URLSearchParams();
  if(context.courseId) params.set("kurssi",context.courseId);
  if(context.roleId) params.set("rooli",context.roleId);
  if(context.packageId) params.set("paketti",context.packageId);
  if(context.participants) params.set("osallistujat",String(context.participants));
  return `${path}${params.size?`?${params}`:""}${path==="/yhteystiedot/"?"#tarjouspyynto":"#laskuri"}`;
}
