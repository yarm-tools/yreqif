import { DatatypeDefinition, 
    DatatypeDefinitionEnumeration 
} from "./ReqIFDatatypeDefinition";

import { AttributeDefinition, 
    AttributeDefinitionBoolean, 
    AttributeDefinitionDate, 
    AttributeDefinitionInteger, 
    AttributeDefinitionReal, 
    AttributeDefinitionString, 
    AttributeDefinitionXHTML, 
    AttributeValueEnumeration 
} from "./ReqIFSpecTypes";

/*---------------------------------------------------------------------------
Basic abstract interface es
----------------------------------------------------------------------------*/

export class AttributeValue {
    // specElAt?: SpecElementWithAttributes[];
    // defaultValue?: AttributeDefinition;
    definition?: AttributeDefinition | DatatypeDefinition;

    constructor(props?: AttributeValue) {
        if(props) {
            this.definition = props['definition'];
        }
    }
}

/*
------------------------------------------------------------------------------
Simple interface 
------------------------------------------------------------------------------
*/

export class  AttributeValueSimple extends AttributeValue {
    constructor(props?: AttributeValueSimple) {
        super(props);
    }
}

/*
------------------------------------------------------------------------------
Types definition
------------------------------------------------------------------------------
*/

//XHTML

export interface AttributeValueXHTML extends AttributeValue {
    isSimplified: boolean;
    defaultValue?: AttributeDefinitionXHTML;

    attributeValue?: XhtmlContent;
}

export interface  XhtmlContent {
    theValue: string;
    theOriginalValue: string;
}

//-----------
//Enumeration

export interface  EnumValue {
    values?: AttributeValueEnumeration;
    specifiedValues?: DatatypeDefinitionEnumeration[];//ordered
    enumValue?: EmbeddedValue
}

export interface  EmbeddedValue {
    key: number;
    otherContent: string;//should be link to other content
}

//----------
//Boolean

export interface AttributeValueBoolean extends AttributeValueSimple {
    theValue: boolean;
    defaultValue?: AttributeDefinitionBoolean;
}

//---------
//Date

export interface  AttributeValueDate extends AttributeValueSimple {
    theValue: Date;
    defaultValue?: AttributeDefinitionDate;
}

//---------
//Integer

export class AttributeValueInteger extends AttributeValueSimple {
    theValue?: number;
    defaultValue?: AttributeDefinitionInteger;

    constructor(props?: AttributeValueInteger) {
        super(props);
        if(props) {
            this.theValue = props['theValue'];
            this.defaultValue = props['defaultValue'];
        }
    }
}


//---------
//Real

export interface  AttributeValueReal extends AttributeValueSimple {
    theValue: number;
    defaultValue?: AttributeDefinitionReal;
}

//---------
//String

export class AttributeValueString extends AttributeValueSimple {
    theValue?: string;
    defaultValue?: AttributeDefinitionString;

    constructor(props?: AttributeValueString) {
        super(props);
        if(props) {
            this.theValue = props['theValue'];
            this.defaultValue = props['defaultValue'];
        }
    }
}



