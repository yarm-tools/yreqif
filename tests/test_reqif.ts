/*to run type:
Seems like tsc caches files and doesn't rebuild files unles resaved in case of automatic path change while moving files from
pne dir into another
//tsc test_reqif.ts -outDir ./build/
//node ./build/test_reqif.js 
*/

/*
To use fast xml parser on local machine
1. install globally using 
npm install -g fast-xml-parser
2. npm link fast-xml-parser
*/

import { toJSON } from "../src/utils";
import { yparse, importXML } from "../src/yreqif/yparser";

import { sample_xml, sample_xml1, sample_xml2 } from "./sample_xml";

let data = yparse(sample_xml1); //sample_xml2 is not supported yet

console.log(toJSON(data));

let yreqif = importXML(data);

//Output parsed structure
console.log(yreqif.to_JSON());

