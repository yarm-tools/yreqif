/*---------------------------------------------------------------------------
Abstract interface es
----------------------------------------------------------------------------*/
import { Identifiable, IIdentifiable } from "../basic/ReqIFBasicClasses";

export interface IDatatypeDefinition extends IIdentifiable {

}

export class DatatypeDefinition extends Identifiable {
    constructor(props?: IDatatypeDefinition) {
        super(props);
    }
}

export interface IDatatypeDefinitionSimple extends IDatatypeDefinition {

}

export class DatatypeDefinitionSimple extends DatatypeDefinition {
    constructor(props?: IDatatypeDefinitionSimple) {
        super(props);
    }
}

/*---------------------------------------------------------------------------
Implementations
----------------------------------------------------------------------------*/

//XHTML

export class DatatypeDefinitionXHTML extends DatatypeDefinition {
    constructor(props?: DatatypeDefinitionXHTML) {
        super(props);
    }
}

//Enumeration

export class DatatypeDefinitionEnumeration extends DatatypeDefinition {
    constructor(props?: DatatypeDefinitionEnumeration) {
        super(props);
    }
}

//Boolean

export class  DatatypeDefinitionBoolean extends DatatypeDefinitionSimple {
    constructor(props?: DatatypeDefinitionBoolean) {
        super(props);
    }
}

//Date

export class  DatatypeDefinitionDate extends DatatypeDefinitionSimple {
    constructor(props?: DatatypeDefinitionDate) {
        super(props);
    }
}

//Integer

export interface IDatatypeDefinitionInteger extends IDatatypeDefinitionSimple {
    max?: number; //should be int
    min?: number; //should be int
}

export class  DatatypeDefinitionInteger extends DatatypeDefinitionSimple {
    max?: number; //should be int
    min?: number; //should be int

    constructor(props?: IDatatypeDefinitionInteger) {
        super(props);
        if(props) {
            this.max = props['max'];
            this.min = props['min'];
        }
    }
}

//Real

export class  DatatypeDefinitionReal extends DatatypeDefinitionSimple {
    accuracy?: number;//should be int
    max?: number;
    min?: number;

    constructor(props?: DatatypeDefinitionReal) {
        super(props);
        if(props) {
            this.accuracy = props['accuracy'];
            this.max = props['max'];
            this.min = props['min'];
        }
    }
}

//String

export interface IDatatypeDefinitionString extends IDatatypeDefinitionSimple {
    maxLength?: number; //should be int
}

export class DatatypeDefinitionString extends DatatypeDefinitionSimple {
    maxLength?: number; //should be int
    constructor(props?: IDatatypeDefinitionString) {
        super(props);
        if(props) {
            this.maxLength = props['maxLength'];
        }
    }
}
