/*
create
update
delete
*/

import { Identifiable } from "../reqif-naive/basic/ReqIFBasicClasses";
import { ReqIFHeader } from "../reqif-naive/ReqIFHeader";
import { yReqIF } from "./yreqif";

//id should be there
function ruleIdenifierCantBeEmpty(obj:Identifiable) {
    return true;
}

//------------------------------------------------------------
export function canCreate(yreqif: yReqIF, action: any): boolean {
    return true;
}

export function canDelete(yreqif: yReqIF, action: any): boolean {
    //TODO: Rule that can't delete header!

    let obj: Identifiable = yreqif.getObject(action.identifier);

    //Rule: Can't remove header
    if(obj instanceof ReqIFHeader) {
        return false;
    }
    if(!ruleIdenifierCantBeEmpty(obj)) {
        return false;
    }
    return true; //true by default
    //check cases  what would happen if deleted. Any backlincks?
    //Suggest merging?
}

export function canUpdate(yreqif: yReqIF, action: any): boolean {
    let obj: Identifiable = yreqif.getObject(action.identifier);

    if(!ruleIdenifierCantBeEmpty(obj)) {
        return false;
    }
    return true; //true by default
    //check cases  what would happen if deleted. Any backlincks?
    //Suggest merging?
}