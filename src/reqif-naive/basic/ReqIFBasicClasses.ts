//------------------------------------------------------------------------------
//Identifiable

import { v4 as uuidv4 } from 'uuid';

export interface IIdentifiable {
    desc?: string; //[0..1]
    identifier?: string; //UUID
    lastChange?: Date;
    longName?: string; //[0..1];

    alternativeID?: AlternativeID; //Actually
}

//TODO How to connect Identifiable and AlternativeID???? check page 29 figure 10.2 from ReqIF spec
export class Identifiable implements IIdentifiable {
    desc?: string; //[0..1]
    identifier: string; //UUID
    lastChange?: Date;
    longName?: string; //[0..1];

    alternativeID?: AlternativeID; //Actually

    constructor(props?:IIdentifiable) {
        if(props) {
            this.identifier = props['identifier'] || uuidv4() as string;
            this.desc = props['desc'];
            this.longName = props['longName'];
            this.lastChange = props['lastChange'];
        } else {
            this.identifier = uuidv4() as string;
        }
    }
}

export interface AlternativeID {
    identifier: string;
    ident?: Identifiable;

}

//----------------------
//Access restriction

//should be abstract interface
export class AccessControlledElement extends Identifiable {
    isEditable?: boolean;

    constructor(props?:AccessControlledElement) {
        super(props);
        if(props) {
            this.isEditable = props['isEditable'];
        }
    }
}
