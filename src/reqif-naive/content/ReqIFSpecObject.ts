
import { ISpecElementWithAttributes, SpecElementWithAttributes } from "../basic/ReqIFSpecElementWithAttributes";
import { SpecHierarchy } from "./ReqIFSpecification";
import { SpecRelation } from "./ReqIFSpecRelation";

import { SpecObjectType } from "../definitions/ReqIFSpecTypes";

//------------------------------------------------------------------------------

export interface ISpecObject extends ISpecElementWithAttributes {
    type?: SpecObjectType;
    object?: SpecHierarchy;
    source?: SpecRelation; //Global shared object, maybe in external source e.g. wikipedia 
    target?: SpecRelation; //Global shared object, maybe in external source e.g. wikipedia 
}

export class SpecObject extends SpecElementWithAttributes {
    type?: SpecObjectType;
    object?: SpecHierarchy;
    source?: SpecRelation; //Global shared object, maybe in external source e.g. wikipedia 
    target?: SpecRelation; //Global shared object, maybe in external source e.g. wikipedia 
    
    constructor(props?: ISpecObject) {
        super(props);
        if(props) {
            this.type = props['type'];
            this.object = props['object']; 
            this.source = props['source'];
            this.target = props['target'];
        }
    }
}