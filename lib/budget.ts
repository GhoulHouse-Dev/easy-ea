export function parseMoney(value: string): number | null {
  const normalized=value.replace(/\s/g,"").replace(",",".");
  if(!/^\d+(?:\.\d{1,2})?$/.test(normalized)) return null;
  const [euros,cents=""]=normalized.split(".");
  const amount=Number(euros)*100+Number(cents.padEnd(2,"0"));
  return Number.isSafeInteger(amount)&&amount<=100_000_000?amount:null;
}
export function parseCount(value: string): number | null {
  if(!/^\d+$/.test(value))return null;
  const count=Number(value);
  return Number.isSafeInteger(count)&&count>=1&&count<=10000?count:null;
}
export type BudgetInput = {
  participants:string;groups:string;unit:"group"|"person";training:string;certificate:string;travel:string;other:string;
  includesVat:boolean;vat:string;
};
export function calculateBudget(input: BudgetInput) {
  const errors:Record<string,string>={};
  const participants=parseCount(input.participants),groups=input.unit==="group"?parseCount(input.groups):1;
  if(participants===null)errors.participants="Syötä kokonaisluku väliltä 1–10 000.";
  if(groups===null)errors.groups="Syötä kokonaisluku väliltä 1–10 000.";
  const amounts:Record<"training"|"certificate"|"travel"|"other",number|null>={training:parseMoney(input.training),certificate:parseMoney(input.certificate),travel:parseMoney(input.travel),other:parseMoney(input.other)};
  for(const key of Object.keys(amounts) as Array<keyof typeof amounts>){if(amounts[key]===null)errors[key]="Syötä summa väliltä 0–1 000 000 €, enintään kahdella desimaalilla.";}
  const vat=input.includesVat?0:parseMoney(input.vat);
  if(vat===null||vat>10000)errors.vat="Syötä tarjouksen ALV-prosentti väliltä 0–100.";
  if(Object.keys(errors).length)return {errors,result:null};
  const training=amounts.training!*(input.unit==="group"?groups!:participants!);
  const certificate=amounts.certificate!*participants!;
  const subtotal=training+certificate+amounts.travel!+amounts.other!;
  const tax=input.includesVat?null:Math.round(subtotal*vat!/10000);
  const total=subtotal+(tax??0);
  return {errors,result:{training,certificate,travel:amounts.travel!,other:amounts.other!,subtotal,tax,total,perPerson:Math.round(total/participants!),participants:participants!,groups:groups!}};
}
const currency=new Intl.NumberFormat("fi-FI",{style:"currency",currency:"EUR"});
export function formatEuro(cents:number){return currency.format(cents/100);}

export const exampleTiers = [
  {min:1,max:9,price:9900,label:"1–9 osallistujaa"},
  {min:10,max:49,price:7900,label:"10–49 osallistujaa"},
  {min:50,max:10000,price:5900,label:"50+ osallistujaa"},
] as const;
export function calculateTierExample(value:string) {
  const participants=parseCount(value);
  if(participants===null)return null;
  const tier=exampleTiers.find(t=>participants>=t.min&&participants<=t.max)!;
  return {participants,unitPrice:tier.price,total:participants*tier.price,tierMin:tier.min};
}
