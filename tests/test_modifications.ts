//Should create every Datatype

import { Specification } from "../src/reqif-naive/content/ReqIFSpecification";
import { SpecObject } from "../src/reqif-naive/content/ReqIFSpecObject";
import { DatatypeDefinitionInteger, DatatypeDefinitionString, IDatatypeDefinitionInteger } from "../src/reqif-naive/definitions/ReqIFDatatypeDefinition";
import { SpecificationType, SpecObjectType } from "../src/reqif-naive/definitions/ReqIFSpecTypes";
import { IReqIFHeader } from "../src/reqif-naive/ReqIFHeader";

import { yparse, exportXML } from "../src/yreqif/yparser";
import { yReqIF } from "../src/yreqif/yreqif";

const yreqif = new yReqIF();

//Datatype Definitions
const dt_integer = new DatatypeDefinitionInteger({
    identifier: "basic_integer",
    longName: "Integer",
    desc: "Default integer type"
});

const dt_string = new DatatypeDefinitionString({
    identifier: "basic_string",
    longName: "String",
    maxLength: 10000,
    desc: "Default string type"
});

//Object types definitions

const specObjectType = new SpecObjectType({
    identifier: "basic_object",
    longName: "Object",
    //Attributes: Content
});
const specificationType = new SpecificationType();

//Objects
const specObject = new SpecObject({
    // type: "", //Implement 
});
const specification = new Specification();

//List of all objects

let yObjects = [
    //Adding DatatypeDefinisions
    dt_integer, 
    dt_string,
    //Types
    specObjectType, 
    specificationType, 
    //Everything else
    specObject, 
    specification];

//-----------------------------------------    
//Creating 
yObjects.map((v) => yreqif.create(v));

console.log("Created new objects: ");
console.log(yreqif.to_JSON());

//-----------------------------------------
//Updating
let upd: IDatatypeDefinitionInteger = {
    identifier: dt_integer.identifier,
    longName: "Modified Integer"
};

yreqif.update(upd);

yreqif.update({
    identifier: yreqif.reqif.theHeader.identifier,
    comment: "Test updated comments"
} as IReqIFHeader);

console.log("Created new objects: ");
console.log(yreqif.to_JSON());

//-----------------------------------------
//Saving

console.log("Saving: ", exportXML(yreqif));

//-----------------------------------------
//Deleting
console.log("Trying to delete theHeader");

yreqif.delete(yreqif.reqif.theHeader);

yObjects.map((v) => yreqif.delete(v));

console.log("After deleting: ");
console.log(yreqif.to_JSON());
