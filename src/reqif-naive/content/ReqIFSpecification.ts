
import { ISpecElementWithAttributes, SpecElementWithAttributes } from "../basic/ReqIFSpecElementWithAttributes";
import { RelationGroup } from "./ReqIFRelationGroup";
import { SpecObject } from "./ReqIFSpecObject";
import { SpecificationType } from "../definitions/ReqIFSpecTypes";

export interface ISpecification extends ISpecElementWithAttributes {
    type?: SpecificationType;
    // root?: SpecHierarchy;
    // sourceSpecification?: RelationGroup;
    // targetSpecificaiton?: RelationGroup;
    children?: SpecHierarchy[]; //ordered
    // coreContent?:todo
}

export class Specification extends SpecElementWithAttributes {
    type?: SpecificationType;
    // root?: SpecHierarchy;
    // sourceSpecification?: RelationGroup;
    // targetSpecificaiton?: RelationGroup;
    children?: SpecHierarchy[]; //ordered
    // coreContent?:todo
    constructor(props?: ISpecification) {
        super(props);
        if(props) {
            this.type = props['type'];
            // this.root = props['root']; 
            // this.sourceSpecification = props['sourceSpecification'];
            // this.targetSpecificaiton = props['targetSpecificaiton'];
            this.children = props['children'];
        }
    }
}

export interface ISpecHierarchy extends ISpecElementWithAttributes {
    isTableInternal?: boolean;
    object?: SpecObject | string;
    parent?: SpecHierarchy | string;
    children?: SpecHierarchy[]; //ordered
    root?: Specification | string;
}

export class SpecHierarchy extends SpecElementWithAttributes {
    isTableInternal?: boolean;
    object?: SpecObject | string;
    parent?: SpecHierarchy | string;
    children?: SpecHierarchy[]; //ordered
    root?: Specification | string;

    constructor(props?: ISpecHierarchy) {
        super(props);
        if(props) {
            this.isTableInternal = props['isTableInternal'];
            this.object = props['object']; 
            this.parent = props['parent'];
            this.children = props['children'];
            this.root = props['root'];
        } else {
            this.isTableInternal = false;
            // this.object = props['object']; 
            // this.parent = props['parent'];
            // this.children = props['children'];
            // this.root = props['root'];
        }

    }
}
