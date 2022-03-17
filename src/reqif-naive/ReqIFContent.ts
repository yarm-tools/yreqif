import { SpecObject } from "./content/ReqIFSpecObject"
import { SpecRelation } from "./content/ReqIFSpecRelation"
import { Specification } from "./content/ReqIFSpecification"
import { RelationGroup } from "./content/ReqIFRelationGroup"
import { DatatypeDefinition } from "./definitions/ReqIFDatatypeDefinition"
import { SpecType } from "./definitions/ReqIFSpecTypes"

export interface IReqIFContent {
    dataTypes?: DatatypeDefinition[];
    specTypes?: SpecType[];
    specObjects?: SpecObject[];
    specRelations?: SpecRelation[];
    specifications?: Specification[];
    specRelationsGroup?: RelationGroup[];
}

export class ReqIFContent {
    dataTypes: DatatypeDefinition[];
    specTypes: SpecType[];
    specObjects: SpecObject[];
    specRelations: SpecRelation[];
    specifications: Specification[];
    specRelationsGroup: RelationGroup[];

    constructor(props?: IReqIFContent) {
        if(props) {
            this.dataTypes = props["dataTypes"] || [];
            this.specTypes = props["specTypes"] || [];
            this.specObjects = props["specObjects"] || [];
            this.specRelations = props["specRelations"] || [];
            this.specifications = props["specifications"] || [];
            this.specRelationsGroup = props["specRelationsGroup"] || [];
        } else {
            this.dataTypes = [];
            this.specTypes = [];
            this.specObjects = [];
            this.specRelations = [];
            this.specifications = [];
            this.specRelationsGroup = [];
        }
    }
}