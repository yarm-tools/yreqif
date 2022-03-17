import { SpecElementWithAttributes } from "../basic/ReqIFSpecElementWithAttributes";
import { RelationGroup } from "./ReqIFRelationGroup";
import { SpecRelationType } from "../definitions/ReqIFSpecTypes";

export class SpecRelation extends SpecElementWithAttributes {
    type?: SpecRelationType;
    specRelations?: RelationGroup[];

    constructor(props?:SpecRelation) {
        super(props);
        if(props) {
            this.type = props['type'];
            this.specRelations = props['specRelations'];
        }
    }
}

