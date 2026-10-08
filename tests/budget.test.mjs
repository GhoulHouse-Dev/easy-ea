import test from "node:test";
import assert from "node:assert/strict";
import { calculateBudget, calculateTierExample, parseMoney } from "../lib/budget.ts";
import { readTrainingContext, trainingLink } from "../lib/training.ts";

const quote={participants:"12",groups:"1",unit:"group",training:"1000",certificate:"5",travel:"100",other:"40",includesVat:true,vat:""};

test("group quote adds per-person certificates and one-time extras once",()=>{
  const {result}=calculateBudget({...quote,groups:"2"});
  assert.equal(result.training,200000);
  assert.equal(result.certificate,6000);
  assert.equal(result.total,220000);
  assert.equal(result.perPerson,18333);
});
test("per-person quote ignores the hidden group count",()=>{
  const {result}=calculateBudget({...quote,unit:"person",training:"79",groups:"invalid"});
  assert.equal(result.total,114800);
  assert.equal(result.perPerson,9567);
});
test("excluded VAT is added once and rounded to cents",()=>{
  const {result}=calculateBudget({...quote,training:"0,10",certificate:"0",travel:"0",other:"0",participants:"3",unit:"person",includesVat:false,vat:"25,5"});
  assert.equal(result.subtotal,30);
  assert.equal(result.tax,8);
  assert.equal(result.total,38);
  assert.equal(result.perPerson,13);
});
test("including VAT does not add tax; explicit zero VAT is valid",()=>{
  assert.equal(calculateBudget(quote).result.tax,null);
  assert.equal(calculateBudget({...quote,includesVat:false,vat:"0"}).result.tax,0);
});
test("Finnish decimal inputs are exact and invalid inputs cannot produce a result",()=>{
  assert.equal(parseMoney("1 250,50"),125050);
  for(const bad of ["-1","NaN","Infinity","1e3","1.234","","1000001"]){assert.equal(parseMoney(bad),null);assert.equal(calculateBudget({...quote,training:bad}).result,null);}
  for(const bad of ["0","-2","2.5","","10001"]){assert.equal(calculateBudget({...quote,participants:bad}).result,null);}
  assert.equal(calculateBudget({...quote,includesVat:false,vat:""}).result,null);
  assert.equal(calculateBudget({...quote,includesVat:false,vat:"101"}).result,null);
});
test("all participants receive the tier price at 1, 9, 10, 49 and 50",()=>{
  for(const [participants,price,total] of [[1,9900,9900],[9,9900,89100],[10,7900,79000],[49,7900,387100],[50,5900,295000]]){
    assert.deepEqual(calculateTierExample(String(participants)),{participants,unitPrice:price,total,tierMin:participants<10?1:participants<50?10:50});
  }
  assert.equal(calculateTierExample("0"),null);
});
test("training selections survive navigation without carrying quote prices",()=>{
  const context={courseId:"raataloity",roleId:"kasvatus",packageId:"lapset",participants:15};
  const url=new URL(trainingLink("/yhteystiedot/",context),"https://example.com");
  assert.equal(url.hash,"#tarjouspyynto");
  assert.deepEqual(readTrainingContext(Object.fromEntries(url.searchParams)),context);
  assert.deepEqual([...url.searchParams.keys()].sort(),["kurssi","osallistujat","paketti","rooli"]);
});
test("unknown, repeated and mismatched query values are rejected",()=>{
  assert.deepEqual(readTrainingContext({kurssi:["ea1","ea2"],rooli:"unknown",paketti:"lapset",osallistujat:"1e3"}),{courseId:undefined,roleId:undefined,packageId:undefined,participants:undefined});
  assert.equal(readTrainingContext({kurssi:"ea2",paketti:"lapset"}).packageId,undefined);
  assert.equal(readTrainingContext({kurssi:"EA1"}).courseId,"ea1");
});
