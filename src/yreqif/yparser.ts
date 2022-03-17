import _ from "lodash";

import { parse as fast_xml_parse, j2xParser} from "fast-xml-parser";

import { ToArray, toJSON } from "../utils";

import { ReqIF } from "../reqif-naive/ReqIF";

import { yReqIF, yIndex } from "./yreqif";
import { ClassesToXMLMap, ExportingFunctionsMap, ExtractingFunctionsMap, RefTypes, XMLToClassesMap } from "./ymaps";
import { Identifiable } from "../reqif-naive/basic/ReqIFBasicClasses";

//Global definitions

//TODO: Instead of global index create new for this exact file
let INDEX: yIndex = {};

//-------------------------------------

export function yparse(xml: string) {
    //parsing source
    return fast_xml_parse(xml, {
        ignoreAttributes : false,
    });
}

//----------------------
//helper parser function

export function getFirstElement<Type>(data: any [] | void) {
    if(data) {
        return data[0] as Type;
    }
}

//---------------------
//Defining helping functions for extractors

function applyExtractingFunction(classProto:any, data: any) {
    var extractingFunction = ExtractingFunctionsMap[classProto.name];
    if(extractingFunction) {
        return extractingFunction(data);
    }
}

function addToIndex(identifiable: any): void {
    if(identifiable instanceof Identifiable) { // adding to index here
        INDEX[identifiable.identifier] = identifiable;
    }
}

function makeMappedClass(className: string, data?: unknown): any {
    var mappedClass = XMLToClassesMap[className];
    if(mappedClass) {
        var temp = new mappedClass(extractProps(XMLToClassesMap[className], data));
        addToIndex(temp)
        return temp;
    }
}

//---------------------
//Defining extracting functions

export function extractProps(classProto: any, data: any): unknown {
    //Defining exit conditions when function should exit
    if(!classProto) {
        return;
    }

    if((Object.getPrototypeOf(classProto) == null) || (Object.getPrototypeOf(classProto) == undefined)) {
        return;
    }

    if(classProto['name'] == "") {
        return;
    }
    
    //------

    //Recursively extracting values from it's ancestors
    var parentsProps = extractProps(Object.getPrototypeOf(classProto), data);
    
    var extractedProps = applyExtractingFunction(classProto, data);

    if(!extractedProps) {        
        console.error("Extraction function not found for: ", classProto.name)
    }

    return Object.assign({}, parentsProps, extractedProps);
}

function extractRef(source: any) {
    let firstClassName: string = Object.keys(source)[0]; 
    if(RefTypes.indexOf(firstClassName) != -1) { //checking for ref types!
        return [source[firstClassName]];
    }
}

export function extractData(source: any): any[] | void {
    if(source) {
        let refClass = extractRef(source);

        if(refClass) { //checking for ref types!
            return refClass;
        } else {
            var res = Object.keys(source).map(function(className: string) {//iterating over all objects in xml
                return ToArray(source[className]).map((data) => { //iterating over all values including arrays
                    var mappedClass = makeMappedClass(className, data);
                    if(!mappedClass) {
                        console.error('***************** Class not found: ', className)
                    }
                    return mappedClass;
                });
            });
            return _.flattenDeep(res);
        }
    }
}

//------------------------------------------
export function exportObj(source: any): any {

    let res = {};
    let s = Object.getPrototypeOf(source);

    if(Array.isArray(source)) {
        res = source.map(exportData);
    } else {
        while(s.constructor.name != "Object") {
            if(s.constructor) {
                if(ExportingFunctionsMap[s.constructor.name]) {
                    res = Object.assign(res, ExportingFunctionsMap[s.constructor.name](source));
                } else {
                    console.error('Exporting function not found for: ',  s.constructor.name);
                }
            }
            
            s = Object.getPrototypeOf(s);
        }
    }
    
    return res;
}

export function exportData(source: any): Object {
    if(source) {
        if(ClassesToXMLMap[source.constructor.name]) {
            let t: any = {};
            let prop = ClassesToXMLMap[source.constructor.name] as string;
            t[prop] = exportObj(source);
            return t;
        } else {
            return exportObj(source);
        }
    }
    console.log("Error exporting: ", source);
    return {};
}
 
//------------------------------------------

function prepareXMLRepresentation(reqif: ReqIF): Object {
    return exportData(reqif);
}

//------------------------------------------
export function importXML(data: unknown) {
    INDEX = {};

    let res = new yReqIF({
        reqif: getFirstElement<ReqIF>(extractData(data)) || new ReqIF(),
        index: INDEX
    });
    
    INDEX = {};//Resetting index as is global, cleaning it

    return res;
}

//--------------------

export function exportXML(yreqif: yReqIF): string {

    //default options need not to set
    var defaultOptions = {
        ignoreAttributes : false,
        preserveArrays: true,
        indentBy: "  "
    };

    var parser = new j2xParser(defaultOptions);

    var xmlRepresentation = prepareXMLRepresentation(yreqif.reqif);
    // console.log("------ xmlRepresentation:", toJSON(xmlRepresentation));

    var preparedXML = {

    }

    var xml = parser.parse(xmlRepresentation);
    return xml;
}