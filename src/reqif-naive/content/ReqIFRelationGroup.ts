import { SpecRelation } from "./ReqIFSpecRelation";
import { RelationGroupType } from "../definitions/ReqIFSpecTypes";
import { SpecElementWithAttributes } from "../basic/ReqIFSpecElementWithAttributes";

export class RelationGroup extends SpecElementWithAttributes {
    type?: RelationGroupType;
    specRelations?: SpecRelation[];

    constructor(props?:RelationGroup) {
        super(props);
        if(props) {
            this.type = props['type'];
            this.specRelations = props['specRelations'];
        }
    }
}

