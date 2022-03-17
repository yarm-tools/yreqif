import * as _ from "lodash";

//---------------------
import { IIdentifiable, Identifiable } from "../reqif-naive/basic/ReqIFBasicClasses";
import { ReqIF } from "../reqif-naive/ReqIF";

import { canUpdate, canDelete, canCreate } from "./yvalidation_rules";

//---------------------
import { DatatypeDefinition } from "../reqif-naive/definitions/ReqIFDatatypeDefinition"
import { SpecType } from "../reqif-naive/definitions/ReqIFSpecTypes"
import { Specification, SpecHierarchy } from "../reqif-naive/content/ReqIFSpecification"
import { SpecObject } from "../reqif-naive/content/ReqIFSpecObject"

import { ReqIFHeader } from "../reqif-naive/ReqIFHeader"

//--------------------
//Types and other usefull things

export type yIndex = {[key: string]: any};

export interface IyReqIF {
    reqif: ReqIF; //Plain ReqIF orbject
    index: yIndex; //Indexed property that contains links to all identifiable objects
}

//--------------------

export class yReqIF implements IyReqIF {
    reqif: ReqIF; //Plain ReqIF orbject
    index: yIndex; //Indexed property that contains links to all identifiable objects

    constructor(props?: IyReqIF) {
        if(props) {
            this.reqif = props['reqif'];
            this.index = props['index'];
        } else {
            this.reqif = new ReqIF();
            this.index = {};
            this.doIndex(this.reqif.theHeader);
        }
    };

    doIndex(obj: Identifiable) {
        if(this.index) {
            this.index[obj.identifier] = obj;
        }
    }

    removeIndex(obj: IIdentifiable | string) {
        let id = ""

        if(typeof obj == 'string') {
            //TODO: Finish
            id = obj;
        } else {
            id = obj.identifier || "";
        }

        delete this.index[id];
    }

    getObject(id: string) {
        if(this.index) {
            return this.index[id];
        }
    }

    //-------------
    to_JSON() {
        return JSON.stringify(this.reqif, null, 4)
    }
    //-------------
    create<Type extends DatatypeDefinition | SpecType | Specification | SpecObject | SpecHierarchy>(obj: Type) {
        if(canCreate(this, obj)) {
            if(obj instanceof DatatypeDefinition) {
                console.log('Creating dataTypes');
                this.reqif.coreContent.dataTypes.push(obj)//
            } else if(obj instanceof SpecType) {
                this.reqif.coreContent.specTypes.push(obj)//
            } else if(obj instanceof Specification) {
                this.reqif.coreContent.specifications.push(obj)//
            } else if(obj instanceof SpecObject) {
                this.reqif.coreContent.specObjects.push(obj)//
            } else if(obj instanceof SpecHierarchy) {
                //todo: check if has 
                // yreqif.reqif.coreContent?.specTypes?.push(obj)//
            }
            //add to index!
            this.doIndex(obj)
        } else {
            console.error('Not allowed to create object', obj);
        }
        
    } 

    update(obj: IIdentifiable) {
        if(canUpdate(this, obj)) {
            this.force_update(obj);
        } else {
            console.error('Not allowed to update object', obj);
        }
    } 

    force_update(obj: IIdentifiable) {
        if(obj.identifier) {
            let to: Identifiable = this.index[obj.identifier];
            _.assign(to, obj);
        }

        // if(props instanceof DatatypeDefinition) {
        //     this.reqif.coreContent?.dataTypes?.push(props)//
        // } else if(props instanceof SpecType) {
        //     this.reqif.coreContent?.specTypes?.push(props)//
        // } else if(props instanceof Specification) {
        //     this.reqif.coreContent?.specifications?.push(props)//
        // } else if(props instanceof SpecObject) {
        //     this.reqif.coreContent?.specObjects?.push(props)//
        // } else if(props instanceof SpecHierarchy) {
        //     // yreqif.reqif.coreContent?.specTypes?.push(props)//
        // }
    }
    
    delete(obj: IIdentifiable) {
        if(canDelete(this, obj)) {
            this.force_delete(obj);
        } else {
            console.error('Not allowed to delete object', obj);
        }
    }

    force_delete(obj: IIdentifiable) {
        function doFilter(id: IIdentifiable) {
            return id.identifier != obj.identifier;
        }
        //update index!
        //and proper deletion from different plases
        this.removeIndex(obj);
        
        //TODO:implement simple remove
        //What to do with cyclic changes when removes datatype that is used?
        if(obj instanceof DatatypeDefinition) {
            this.reqif.coreContent.dataTypes = this.reqif.coreContent.dataTypes.filter(doFilter);
        } else if(obj instanceof SpecType) {
            this.reqif.coreContent.specTypes = this.reqif.coreContent.specTypes.filter(doFilter);
        } else if(obj instanceof Specification) {
            this.reqif.coreContent.specifications = this.reqif.coreContent.specifications.filter(doFilter);
        } else if(obj instanceof SpecObject) {
            this.reqif.coreContent.specObjects = this.reqif.coreContent.specObjects.filter(doFilter);
        } else if(obj instanceof SpecHierarchy) {
            this.reqif.coreContent.specTypes = this.reqif.coreContent.specTypes.filter(doFilter);
        } else {
            console.error('Trying to delete unknown object!')
            throw "Can't delete object of type: " + obj.constructor.name;
        }
    }
}

//--------------------

export const yCreate = {
    DatatypeDefinition,
    SpecType,
    Specification,
    SpecObject,
    SpecHierarchy,
}

export const yUpdate = {
    DatatypeDefinition,
    SpecType,
    Specification,
    SpecObject,
    SpecHierarchy,

    ReqIFHeader,
}

export const yDelete = {
    DatatypeDefinition,
    SpecType,
    Specification,
    SpecObject,
    SpecHierarchy,
}

//---------------------
//CRUD operations
//Assuming that all edits are subclasses of identifiable

/* 
    Create:
        DataType
        SpecType
        Specification
        SpecObject
        SpecHierarchy
    Update:
        DataType
        SpecType
        Specification
        SpecObject
        SpecHierarchy
        +
        Header

        Update could be:
            Add value
            Modify value
            Remove value

            Value could be:
                Build-in value
                Value based on specification


    Delete:
        DataType
        SpecType
        Specification
        SpecObject
        SpecHierarchy
*/


/*
//
Ideas:
1. Everything that could be edited is Identifiable

CRUD operations

1. Create
2. Read
3. Update
4. Delete

Additional operations
5. Visualisations!

At each Identifiable update change it's last-updated field.


Classes to work with
1. ReqIf header - 
update header's fields
2. DataType - 
    create
    
    update

    delete 
3. SpecType - create/update/delete
4. SpecObject - create/update/delete. 
5. Specification

*/