import { toJSON } from "../src/utils";
import { yparse, importXML, exportXML } from "../src/yreqif/yparser";

import { sample_xml1 } from "./samples/sample_xml1";

let data = yparse(sample_xml1); //sample_xml2 is not supported yet

console.log(toJSON(data));

let yreqif = importXML(data);

//Output parsed structure
// console.log(yreqif.to_JSON());


//-----------------------------------------
//Saving

console.log("Saving: ", exportXML(yreqif));

