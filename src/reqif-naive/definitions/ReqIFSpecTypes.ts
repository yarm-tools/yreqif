import { Identifiable, AccessControlledElement } from "../basic/ReqIFBasicClasses";
import { RelationGroup } from "../content/ReqIFRelationGroup";
import { Specification } from "../content/ReqIFSpecification";
import { SpecObject } from "../content/ReqIFSpecObject";
import { SpecRelation } from "../content/ReqIFSpecRelation";
import { AttributeValue, 
    AttributeValueBoolean, 
    AttributeValueDate, 
    AttributeValueInteger, 
    AttributeValueReal, 
    AttributeValueString, 
    AttributeValueXHTML, 
    EnumValue
} from "./ReqIFAttributeValue";

//------------------------------------------------------------------------------

export class SpecType extends Identifiable {
    specAttributes?: AttributeDefinition[];

    constructor(props?: SpecType) {
        super(props);
        if(props) {
            this.specAttributes = props['specAttributes'];
        }
    }
}

export class SpecificationType extends SpecType {
    specification?: Specification[];

    constructor(props?: SpecificationType) {
        super(props);
        if(props) {
            this.specification = props['specification'];
        }
    }
}

export class SpecObjectType extends SpecType {
    specObject?: SpecObject[];

    constructor(props?: SpecObjectType) {
        super(props);
        if(props) {
            this.specObject = props['specObject'];
        }
    }
}

export class SpecRelationType extends SpecType {
    specRelation?: SpecRelation[];

    constructor(props?: SpecRelationType) {
        super(props);
        if(props) {
            this.specRelation = props['specRelation'];
        }
    }
}

export class RelationGroupType extends SpecType {
    relationGroup?: RelationGroup[];

    constructor(props?: RelationGroupType) {
        super(props);
        if(props) {
            this.relationGroup = props['relationGroup'];
        }
    }

    // constructor() {
    //     super();

    //     this.relationGroup = [];
    // }
}

/*---------------------------------------------------------------------------
Attributes definitions
----------------------------------------------------------------------------*/

//Abstract definitions
export class AttributeDefinition extends AccessControlledElement {
    type?: SpecType;

    constructor(props?: AttributeDefinition) {
        super(props);
        if(props) {
            this.type = props['type'];
        }
    }
}

export class AttributeDefinitionSimple extends AttributeDefinition {
    // definition?: AttributeValueSimple;
    // owningDefinition?: AttributeValueSimple;

    // constructor(props?: AttributeDefinitionSimple) {
    //     super(props);
    //     if(props) {
    //         this.definition = props['definition'];
    //         this.owningDefinition = props['owningDefinition'];
    //     }
    // }
}

//Implementations

//XHTML
export interface AttributeDefinitionXHTML extends AttributeDefinition {
    definition: AttributeValueXHTML;
    owningDefinition?: AttributeValueXHTML;

    // constructor(definition?:AttributeValueXHTML) {
    //     super();
    //     this.definition = definition || new AttributeValueXHTML();
    // }
}

//Enumeration
export interface AttributeDefinitionEnumeration extends AttributeDefinition {
    multiValued?: boolean//Dafult false
    
    definition: AttributeValueEnumeration;
    owningDefinition?: AttributeValueEnumeration;

}

export interface  AttributeValueEnumeration extends AttributeValue {
    defaultValue?: AttributeDefinitionEnumeration;
    values: EnumValue[];//default []
}

//Boolean

export interface AttributeDefinitionBoolean extends AttributeDefinitionSimple {
    definition: AttributeValueBoolean;
    owningDefinition?: AttributeValueBoolean;
}

//Date

export interface  AttributeDefinitionDate extends AttributeDefinitionSimple {
    definition: AttributeValueDate;
    owningDefinition?: AttributeValueDate;
}

//Integer

export class AttributeDefinitionInteger extends AttributeDefinitionSimple {
    definition?: AttributeValueInteger;
    owningDefinition?: AttributeValueInteger;

    constructor(props?: AttributeDefinitionInteger) {
        super(props);
        if(props) {
            this.definition = props['definition'];
            this.owningDefinition = props['owningDefinition'];
        }
    }
}

//Real

export interface  AttributeDefinitionReal extends AttributeDefinitionSimple {
    definition: AttributeValueReal;
    owningDefinition?: AttributeValueReal;
}

//String

export class AttributeDefinitionString extends AttributeDefinitionSimple {
    definition?: AttributeValueString;
    owningDefinition?: AttributeValueString;

    constructor(props?: AttributeDefinitionString) {
        super(props);
        if(props) {
            this.definition = props['definition'];
            this.owningDefinition = props['owningDefinition'];
        }
    }
}
