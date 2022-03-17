//-------------------------------------------------------
//SpecElementWithAttributes

import { AttributeValue } from "../definitions/ReqIFAttributeValue";
import { Identifiable, IIdentifiable } from "./ReqIFBasicClasses";

export interface ISpecElementWithAttributes extends IIdentifiable {
    values?: AttributeValue[]
}

export class SpecElementWithAttributes extends Identifiable {
    values?: AttributeValue[];

    constructor(props?: ISpecElementWithAttributes) {
        super(props);
        if(props) {
            this.values = props['values'];
        }
    }
}

